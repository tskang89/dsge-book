from covers2 import *
from global_land_mask import globe as GL
TEAL="#6fcfb7";DOTC="#3b4a66"
def make_map(lon0,lon1,lat0,lat1,width,center,step=2.0,r=.026):
    sc=width/(lon1-lon0);P=lambda lat,lon:np.array([center[0]+(lon-(lon0+lon1)/2)*sc,center[1]+(lat-(lat0+lat1)/2)*sc,0])
    pts=[]
    for lat in np.arange(lat0+step/2,lat1,step):
        for lon in np.arange(lon0+step/2,lon1,step):
            if GL.is_land(lat,lon): pts.append((lat,lon))
    dots={k:Dot(P(*k),radius=r,color=DOTC) for k in pts}
    return dots,P
def region(dots,f):return VGroup(*[d for k,d in dots.items() if f(*k)])
def glow_dot(p,col,r):
    return VGroup(*[Circle(radius=r+k*.035,stroke_width=0,fill_color=col,fill_opacity=.05).move_to(p) for k in range(1,9)],Dot(p,radius=r,color=col))
class Cover5(Cover):
    def ch8(self):
        a,b=self.heads("한 나라의 충격이 국경을 넘는다","예: 미국(자국)과 유로지역(외국) · 자국 기술충격 +1% · GDP 반응의 정점")
        self.play(FadeIn(a,shift=DOWN*.1),FadeIn(b),run_time=.6)
        dots,P=make_map(-128,38,24,66,W_+.6,CEN+UP*.15,step=1.6,r=.032)
        allg=VGroup(*dots.values())
        self.play(LaggedStart(*[FadeIn(d) for d in allg],lag_ratio=.0008),run_time=1.4)
        US=region(dots,lambda la,lo:24<=la<=49.5 and -125<=lo<=-66);EU=region(dots,lambda la,lo:36<=la<=58 and -10<=lo<=28 and not (la>49.5 and lo<2))
        self.play(US.animate.set_color(YEL),EU.animate.set_color(BLU),run_time=.8)
        cU=P(39,-97);cE=P(49,9)
        lU=VGroup(T("자국",26,YEL,BOLD),T("미국",14,INK)).arrange(RIGHT,buff=.12,aligned_edge=DOWN).next_to(P(24,-97),DOWN,buff=.25)
        lE=VGroup(T("외국",26,BLU,BOLD),T("유로지역",14,INK)).arrange(RIGHT,buff=.12,aligned_edge=DOWN).next_to(P(24,9),DOWN,buff=.25)
        self.play(FadeIn(lU,shift=UP*.1),FadeIn(lE,shift=UP*.1),run_time=.5)
        arc1=ArcBetweenPoints(cU+UP*.08,cE+UP*.08,angle=-PI/3,color=YEL,stroke_width=2.5,stroke_opacity=.7)
        arc2=ArcBetweenPoints(cE+DOWN*.08,cU+DOWN*.08,angle=-PI/5,color=BLU,stroke_width=2.5,stroke_opacity=.7)
        self.play(Create(arc1),Create(arc2),run_time=.8)
        clock=ValueTracker(0)
        def stream(path,col,n):
            g=VGroup()
            for i in range(n):
                d=Dot(radius=.045,color=col)
                def upd(m,i=i):p=(clock.get_value()*.35+i/n)%1;m.move_to(path.point_from_proportion(p));m.set_opacity(np.sin(np.pi*p)**.6)
                d.add_updater(upd);g.add(d)
            return g
        clock.add_updater(lambda m,dt:m.increment_value(dt));self.add(clock,stream(arc1,YEL,8),stream(arc2,BLU,8))
        self.wait(.8)
        # 충격
        rings=[Circle(radius=.1,color=YEL,stroke_width=3).move_to(cU) for _ in range(3)]
        self.play(Flash(cU,color=YEL,line_length=.3,flash_radius=.45,num_lines=14),LaggedStart(*[r.animate.scale(9).set_stroke(opacity=0) for r in rings],lag_ratio=.25),run_time=1.2)
        vU=T("+0.45%",44,YEL,BOLD).next_to(lU,DOWN,buff=.12)
        self.play(FadeIn(vU,scale=.6),run_time=.5)
        pulse=Dot(radius=.12,color="#fff2c8").move_to(arc1.point_from_proportion(0))
        self.play(MoveAlongPath(pulse,arc1),run_time=1.0,rate_func=smooth)
        r2=[Circle(radius=.1,color=BLU,stroke_width=3).move_to(cE) for _ in range(2)]
        vE=T("+0.14%",44,BLU,BOLD).next_to(lE,DOWN,buff=.12)
        self.play(FadeOut(pulse,scale=3),Flash(cE,color=BLU,line_length=.25,flash_radius=.4),LaggedStart(*[r.animate.scale(6).set_stroke(opacity=0) for r in r2],lag_ratio=.3),FadeIn(vE,scale=.6),run_time=1.0)
        self.play(FadeIn(self.src("자료: 교재 제8장 nk_two_country.mod · 국가는 예시")),run_time=.4)
    def ch9(self):
        a,b=self.heads("세계의 충격은 들어오지만, 나가지는 않는다","예: 한국 · 해외 금리 충격(연율 +0.8%p)의 첫 분기 반응")
        self.play(FadeIn(a,shift=DOWN*.1),FadeIn(b),run_time=.6)
        dots,P=make_map(-115,175,-42,72,W_+.6,CEN+UP*.2,step=2.0,r=.027)
        allg=VGroup(*dots.values())
        self.play(LaggedStart(*[FadeIn(d) for d in allg],lag_ratio=.0008),run_time=1.4)
        KR=P(36.5,127.8)
        world=VGroup(*[d for k,d in dots.items() if not (32<=k[0]<=39 and 124<=k[1]<=131)])
        self.play(world.animate.set_color("#4a6a9a"),run_time=.6)
        kr=glow_dot(KR,YEL,.075);kl=VGroup(T("한국",22,YEL,BOLD),T("소규모 개방경제",13,INK)).arrange(DOWN,buff=.03).next_to(KR,DOWN,buff=.22)
        wl=VGroup()
        self.play(FadeIn(kr,scale=.3),FadeIn(kl),FadeIn(wl),run_time=.7)
        # 한국의 파문: 곧 사라짐
        rr=[Circle(radius=.08,color=YEL,stroke_width=2.5).move_to(KR) for _ in range(2)]
        n1=T("한국의 충격 → 세계에 닿지 못한다",15,YEL).next_to(KR,UP,buff=.6).shift(LEFT*.6)
        self.play(LaggedStart(*[r.animate.scale(4).set_stroke(opacity=0) for r in rr],lag_ratio=.3),FadeIn(n1),run_time=1.1)
        self.play(FadeOut(n1),run_time=.3)
        # 세계의 충격: 여러 곳에서 한국으로
        srcs=[P(40,-95),P(50,10)]
        arcs=[ArcBetweenPoints(s,KR,angle=-PI/4,color="#7fb3e6",stroke_width=2,stroke_opacity=.5) for s in srcs]
        tag=VGroup(T("세계 금리 ↑",22,"#7fb3e6",BOLD),T("연율 +0.8%p",14,INK)).arrange(DOWN,buff=.03).move_to(P(-36,-12))
        self.play(*[Create(x) for x in arcs],FadeIn(tag),run_time=.8)
        pls=[Dot(radius=.09,color="#cfe6ff").move_to(x.point_from_proportion(0)) for x in arcs]
        self.play(*[MoveAlongPath(p,x) for p,x in zip(pls,arcs)],run_time=1.3,rate_func=rush_into)
        big=[Circle(radius=.6,color="#7fb3e6",stroke_width=3).move_to(KR) for _ in range(2)]
        self.play(*[FadeOut(p,scale=2) for p in pls],Flash(KR,color=YEL,line_length=.3,flash_radius=.4,num_lines=14),kr.animate.scale(1.5),*[r.animate.scale(.15).set_stroke(opacity=0) for r in big],run_time=.8)
        res=VGroup(VGroup(T("환율",16,INK),T("+0.40% 절하",30,TEAL,BOLD)).arrange(DOWN,buff=.04),VGroup(T("물가",16,INK),T("+0.51%p",30,RED,BOLD)).arrange(DOWN,buff=.04),VGroup(T("GDP",16,INK),T("+0.09%",30,YEL,BOLD)).arrange(DOWN,buff=.04)).arrange(RIGHT,buff=.5).move_to(CEN+DOWN*1.75)
        self.play(LaggedStart(*[FadeIn(r,shift=UP*.1) for r in res],lag_ratio=.25),run_time=.6)
        self.play(FadeIn(self.src("자료: 교재 제9장 모형 · 국가는 예시")),run_time=.4)
for k in (8,9): globals()[f"G{k}"]=type(f"G{k}",(Cover5,),{"N":k})
