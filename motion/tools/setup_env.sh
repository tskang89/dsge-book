#!/usr/bin/env bash
# 모션 그래픽 작업 도구 일괄 설치(멱등). 저장소 루트의 부모 폴더나 루트 어디서든 실행 가능.
#   bash motion/tools/setup_env.sh
set -e
R="$(cd "$(dirname "$0")/../.." && pwd)"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
# 글꼴(보충 기호) · ffmpeg · Manim 빌드 의존 · Dynare(Octave) — 교재 .mod 를 직접 풀어 그래프 수치를 얻는다
apt-get install -y -qq --no-install-recommends fonts-noto-cjk ffmpeg pkg-config libcairo2-dev libpango1.0-dev dynare octave >/dev/null
# 빌드 도구: KaTeX · Pretendard
(cd "$R/motion" && npm ci --silent)
# 빌드·복호화·자료 처리
pip install -q fonttools brotli cryptography statsmodels
# Manim (시스템 pip 로는 의존 패키지 빌드가 실패하므로 venv)
[ -x /opt/mvenv/bin/manim ] || { python3 -m venv /opt/mvenv && /opt/mvenv/bin/pip install -q -r "$R/motion/requirements-manim.txt"; }
echo "setup_env: done"
