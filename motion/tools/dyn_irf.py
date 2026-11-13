#!/usr/bin/env python3
"""교재 Dynare 코드(.mod)를 Dynare(Octave)로 풀어 충격반응·정상상태·모수를 JSON 으로 뽑는다.
그래프 수치를 손으로 옮기지 말고 이 결과를 쓴다(style-guide: 그래프는 정확하게).

  python3 motion/tools/dyn_irf.py $SCRATCH/book/Download_Codes/nk_two_country/nk_two_country.mod $SCRATCH/irf/ch8.json

- .mod 가 있는 폴더를 스크래치의 작업 폴더로 복사해 실행한다(원본·저장소를 건드리지 않음).
- 출력: {"irfs": {"변수_충격": [...]}, "ss": {변수: 값}, "params": {이름: 값}}
- 모수를 바꿔 보려면 --set 이름=값 (여러 번), 예: --set phi_pi=1.2  (.mod 의 `이름 = 값;` 줄을 바꿔 실행)
- .mod 와 결과 JSON 은 교재 내용이므로 커밋하지 않는다.
"""
import argparse, json, os, re, shutil, subprocess, sys, tempfile

ap = argparse.ArgumentParser()
ap.add_argument("mod"); ap.add_argument("out")
ap.add_argument("--set", action="append", default=[], help="모수=값")
a = ap.parse_args()
src = os.path.abspath(a.mod); name = os.path.splitext(os.path.basename(src))[0]
work = tempfile.mkdtemp(prefix="dyn_", dir=os.path.dirname(os.path.abspath(a.out)) or ".")
shutil.copytree(os.path.dirname(src), work, dirs_exist_ok=True)
mp = os.path.join(work, name + ".mod"); s = open(mp, encoding="utf-8").read()
for kv in a.set:
    k, v = kv.split("=", 1)
    s, n = re.subn(rf"(^|\n)(\s*){re.escape(k)}\s*=\s*[^;]+;", rf"\1\2{k} = {v};", s, count=1)
    if not n: sys.exit(f"모수 {k} 를 .mod 에서 찾지 못함")
open(mp, "w", encoding="utf-8").write(s)
dump = r"""
o=struct(); f=fieldnames(oo_.irfs); I=struct(); for i=1:numel(f), I.(f{i})=oo_.irfs.(f{i}); end
S=struct(); for i=1:M_.endo_nbr, S.(strtrim(M_.endo_names{i}))=oo_.steady_state(i); end
P=struct(); for i=1:M_.param_nbr, P.(strtrim(M_.param_names{i}))=M_.params(i); end
o.irfs=I; o.ss=S; o.params=P; fid=fopen('__out.json','w'); fprintf(fid,'%s',jsonencode(o)); fclose(fid);
"""
cmd = f"addpath /usr/lib/dynare/matlab; dynare {name} noclearall nograph nolog; {dump}"
r = subprocess.run(["octave", "--no-gui", "--quiet", "--eval", cmd], cwd=work, capture_output=True, text=True)
jp = os.path.join(work, "__out.json")
if r.returncode or not os.path.exists(jp):
    sys.stderr.write(r.stdout[-3000:] + r.stderr[-3000:]); sys.exit("Dynare 실행 실패")
shutil.move(jp, a.out); shutil.rmtree(work, ignore_errors=True)
d = json.load(open(a.out)); print(a.out, f"irfs {len(d['irfs'])}개, 변수 {len(d['ss'])}개, 모수 {len(d['params'])}개")
