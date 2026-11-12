from manim import *
import json, manimpango, numpy as np
from scipy.interpolate import PchipInterpolator
from scipy.stats import gaussian_kde, beta as BETA
F="/home/user/dsge-book/motion/node_modules/pretendard/dist/public/static/"
for w in ["Regular","SemiBold","Bold","Light","ExtraBold"]: manimpango.register_font(F+f"Pretendard-{w}.otf")
BG="#111a2b";YEL="#F4D345";BLU="#58C4DD";GRN="#83C167";RED="#FC6255";INK="#ECE6D6";MUT="#8b95a8";GR="#2e3a52";AXC="#5f6a80"
config.background_color=BG
D=json.load(open("covdata.json"));I8=json.load(open("irf.json"));HD=json.load(open("hd.json"))
T=lambda s,size,col=INK,w=NORMAL:Text(s,font="Pretendard",font_size=size,color=col,weight=w)
CEN=RIGHT*3.25+DOWN*.35;W_,H_=6.2,3.9
def irf(v):
    p=PchipInterpolator(list(range(len(v)+1)),[0.0]+list(v));return lambda x:float(p(x))
def axes(xr,yr,xt,yt,yfmt="{:.1f}",ylab=None,xlab=None):
    x0,x1=xr;y0,y1=yr
    ax=Axes(x_range=[x0,x1,x1-x0],y_range=[y0,y1,y1-y0],x_length=W_,y_length=H_,tips=False,axis_config={"color":AXC,"stroke_width":2,"include_ticks":False}).move_to(CEN)
    grid=VGroup(*[DashedLine(ax.c2p(x0,v),ax.c2p(x1,v),color=GR,stroke_width=1,dash_length=.05) for v in yt if abs(v)>1e-9])
    nums=VGroup(*[T(s,15,MUT).next_to(ax.c2p(v,y0),DOWN,buff=.12) for v,s in xt],*[T(yfmt.format(v) if abs(v)>1e-9 else "0",15,MUT).next_to(ax.c2p(x0,v),LEFT,buff=.12) for v in yt])
    if xlab: nums.add(T(xlab,15,MUT).next_to(ax.c2p(x1,y0),DOWN,buff=.42).align_to(ax.c2p(x1,y0),RIGHT))
    if ylab: nums.add(T(ylab,15,MUT).next_to(ax.c2p(x0,y1),UP,buff=.12).align_to(ax.c2p(x0,y1),LEFT))
    return ax,grid,nums
def note(big,small,col,at,target,big_size=26):
    g=VGroup(T(big,big_size,col,BOLD),*([T(small,16,INK)] if small else [])).arrange(DOWN,aligned_edge=LEFT,buff=.06);g.move_to(at,aligned_edge=LEFT)
    if target is None: return g,None
    dv=target-g.get_center();d=np.array([np.sign(dv[0]),np.sign(dv[1]) if abs(dv[1])>g.height/2 else 0,0])
    return g,Arrow(g.get_critical_point(d)+d*.06,target,buff=.1,color=col,stroke_width=2.5,max_tip_length_to_length_ratio=.2)
INFO={1:("DSGE 모형 개관",["경제는 왜 오르내리고","모형은 그것을 어떻게 설명하는가"]),2:("기본 RBC 모형",["생산성 충격 하나로","경기변동을 설명할 수 있을까"]),
 3:("Dynare를 이용한 모형 풀이",["모형을 컴퓨터로","어떻게 풀어내는가"]),4:("베이지안 추정",["자료는 모형의 모수에 대해","무엇을 말해 주는가"]),
 5:("가격 경직성",["가격이 천천히 움직이면","무엇이 달라지는가"]),6:("뉴케인지안 3방정식 모형",["산출, 인플레이션, 금리는","어떻게 맞물려 움직이는가"]),
 7:("최적 통화정책",["중앙은행은","어떻게 행동해야 하는가"]),8:("두국가 모형",["한 나라의 충격은","어떻게 국경을 넘는가"]),
 9:("소규모 개방경제 모형",["세계 시장의 가격을 받아들이는","작은 나라는 어떻게 움직이는가"])}
class Cover(Scene):
    N=8
    def left(self):
        n=self.N;title,dek=INFO[n]
        kick=T(f"제{n}장  ·  CHAPTER {n}",22,YEL,BOLD);kick.move_to(LEFT*6.25+UP*2.55,aligned_edge=LEFT)
        size=84 if len(title)<=7 else 66
        ttl=T(title,size,INK,BOLD).next_to(kick,DOWN,buff=.32,aligned_edge=LEFT)
        if ttl.width>5.4: ttl.scale_to_fit_width(5.4).next_to(kick,DOWN,buff=.32,aligned_edge=LEFT)
        dk=VGroup(*[T(d,32,INK) for d in dek]).arrange(DOWN,aligned_edge=LEFT,buff=.18).next_to(ttl,DOWN,buff=.55,aligned_edge=LEFT)
        rule=Line(ORIGIN,RIGHT*5.2,color=GR,stroke_width=2).next_to(dk,DOWN,buff=.55,aligned_edge=LEFT)
        meta=T("동태 확률 일반균형 모형",18,MUT).next_to(rule,DOWN,buff=.22,aligned_edge=LEFT)
        self.play(FadeIn(kick,shift=RIGHT*.2),run_time=.5);self.play(Write(ttl),run_time=1.5)
        self.play(LaggedStart(*[FadeIn(d,shift=UP*.15) for d in dk],lag_ratio=.35),run_time=1.0);self.play(Create(rule),FadeIn(meta),run_time=.6)
    def heads(self,ct,cs):
        a=T(ct,24,INK,SEMIBOLD);a.move_to(CEN+LEFT*W_/2+UP*(H_/2+.78),aligned_edge=LEFT)
        b=T(cs,15,MUT).next_to(a,DOWN,buff=.12,aligned_edge=LEFT);return a,b
    def src(self,s):
        return T(s,14,MUT).move_to(CEN+LEFT*W_/2+DOWN*(H_/2+.62),aligned_edge=LEFT)
    def construct(self):
        self.left();getattr(self,f"ch{self.N}")();self.wait(1.4)
    def frame_in(self,ax,grid,nums,ct,cs,extra=()):
        a,b=self.heads(ct,cs);self.play(Create(ax),FadeIn(nums),FadeIn(a,shift=DOWN*.1),FadeIn(b),*[FadeIn(e) for e in extra],run_time=1.0)
        if len(grid): self.play(LaggedStart(*[Create(g) for g in grid],lag_ratio=.12),run_time=.5)
    # ---------- 1장: 연표 ----------
    def ch1(self):
        a,b=self.heads("DSGE 모형이 걸어온 길","1976 ~ 2018 · 주요 전환점");s=self.src("자료: 교재 제1장 1.2절")
        EV=[(1976,"루카스 비판","Lucas (1976)",MUT),(1982,"RBC 모형","Kydland–Prescott (1982)",YEL),("1990s","뉴케인지안 모형","가격 경직성의 도입",BLU),
            (2005,"중규모 DSGE","Christiano–Eichenbaum–Evans (2005)",GRN),(2007,"베이지안 추정","Smets–Wouters (2007)",YEL),(2008,"글로벌 금융위기","금융마찰 · 비판의 계기",RED),(2018,"HANK","Kaplan–Moll–Violante (2018)",BLU)]
        top,bot=CEN[1]+H_/2-.1,CEN[1]-H_/2+.1;x=CEN[0]-W_/2+1.35;n=len(EV);ys=[top-(top-bot)*i/(n-1) for i in range(n)]
        line=Line([x,top+.15,0],[x,bot-.15,0],color=AXC,stroke_width=2.5)
        items=[]
        for (y,ti,su,col),yy in zip(EV,ys):
            d=Dot([x,yy,0],radius=.075,color=col);yl=T(str(y),20,col,BOLD).next_to([x,yy,0],LEFT,buff=.22)
            g=VGroup(T(ti,21,INK,BOLD),T(su,14,MUT)).arrange(DOWN,aligned_edge=LEFT,buff=.04).move_to([x+.3,yy,0],aligned_edge=LEFT)
            items.append(VGroup(d,yl,g))
        self.play(FadeIn(a,shift=DOWN*.1),FadeIn(b),Create(line),run_time=.8)
        dot=Dot([x,top+.15,0],radius=.1,color=INK);self.add(dot)
        for it in items:
            self.play(dot.animate.move_to(it[0].get_center()),FadeIn(it[0],scale=.5),FadeIn(it[1],shift=RIGHT*.1),FadeIn(it[2],shift=RIGHT*.15),run_time=.55)
        self.play(FadeOut(dot),Flash(items[5][0].get_center(),color=RED,line_length=.18,flash_radius=.25),run_time=.5);self.play(FadeIn(s),run_time=.4)
    # ---------- 2장: HP 순환 성분 ----------
    def ch2(self):
        t,cy=HD["t"],HD["cy"];ax,grid,nums=axes((1959,2010),(-5.5,4.8),[(v,str(v)) for v in [1960,1970,1980,1990,2000,2010]],[-4,-2,0,2,4],"{:+.0f}")
        bands=VGroup(*[Rectangle(width=ax.c2p(b_,0)[0]-ax.c2p(a_,0)[0],height=H_,stroke_width=0,fill_color=MUT,fill_opacity=.16).move_to((ax.c2p(a_,-5.5)+ax.c2p(b_,4.8))/2) for a_,b_ in D["usrec"] if a_>=1959])
        self.frame_in(ax,grid,nums,"미국 실질 GDP의 순환 성분","HP 필터(λ = 1600) · 추세 대비 % · 음영: NBER 경기침체",[bands])
        cv=VMobject(color=YEL,stroke_width=3);cv.set_points_as_corners([ax.c2p(a_,b_) for a_,b_ in zip(t,cy)])
        tr=ValueTracker(0);dot=always_redraw(lambda:Dot(cv.point_from_proportion(tr.get_value()),radius=.06,color=YEL))
        self.add(dot);self.play(Create(cv),tr.animate.set_value(1),run_time=3.0,rate_func=linear);self.remove(dot)
        i=int(np.argmin(cy));g,ar=note(f"{cy[i]:+.1f}%",f"{int(t[i])}년 경기침체의 바닥",RED,ax.c2p(1985,-4.4),ax.c2p(t[i],cy[i]))
        self.play(FadeIn(Dot(ax.c2p(t[i],cy[i]),radius=.07,color=RED),scale=.5),GrowArrow(ar),FadeIn(g),run_time=.7)
        g2=T("경기변동 = 추세로부터의 이탈",20,INK,SEMIBOLD).move_to(ax.c2p(1984,4.25),aligned_edge=LEFT);self.play(FadeIn(g2,shift=UP*.1),run_time=.5)
        self.play(FadeIn(self.src("자료: 교재 제2장 2.1절 (미국 실질 GDP, 1959–2009)")),run_time=.4)
    # ---------- 3장: 블랑샤-칸 고유값 ----------
    def ch3(self):
        a,b=self.heads("check: 블랑샤-칸 조건","rbc.mod 선형화 체계의 고유값 · 단위원과 비교");s=self.src("자료: 교재 제3장 rbc.mod · check")
        O=CEN+LEFT*1.85+UP*.05;R=1.15
        hx=Line(O+LEFT*1.35,O+RIGHT*1.45,color=AXC,stroke_width=2);vy=Line(O+DOWN*1.35,O+UP*1.35,color=AXC,stroke_width=2)
        circ=Circle(radius=R,color=INK,stroke_width=2.5).move_to(O);cl=T("|λ| = 1",15,INK).next_to(O+R*np.array([.7,.7,0]),UR,buff=.04)
        rl=T("실수축",13,MUT).next_to(O+RIGHT*1.45,DOWN,buff=.08);il=T("허수축",13,MUT).next_to(O+UP*1.35,RIGHT,buff=.08)
        self.play(FadeIn(a,shift=DOWN*.1),FadeIn(b),Create(hx),Create(vy),FadeIn(rl),FadeIn(il),run_time=.8)
        self.play(Create(circ),FadeIn(cl),run_time=.9)
        P=lambda v:O+RIGHT*R*v
        sm=VGroup(Dot(P(.95),radius=.04,color=GRN),Dot(P(.96),radius=.04,color=GRN),Dot(P(1.052),radius=.04,color=RED))
        self.play(LaggedStart(*[FadeIn(d,scale=.3) for d in sm],lag_ratio=.3),run_time=.7)
        box=Square(side_length=.42,color=YEL,stroke_width=2).move_to(P(1.0))
        IN=CEN+RIGHT*1.55+UP*.75;iw,ih=2.9,1.35
        inset=Rectangle(width=iw,height=ih,color=YEL,stroke_width=2).move_to(IN)
        l1=Line(box.get_corner(UR),inset.get_corner(UL),color=YEL,stroke_width=1.2,stroke_opacity=.6);l2=Line(box.get_corner(DR),inset.get_corner(DL),color=YEL,stroke_width=1.2,stroke_opacity=.6)
        self.play(Create(box),run_time=.4);self.play(Create(inset),Create(l1),Create(l2),run_time=.7)
        X=lambda v:IN+RIGHT*((v-1.0)/.08)*(iw*.42)
        nl=Line(X(.915),X(1.07),color=AXC,stroke_width=2);one=DashedLine(X(1)+UP*.5,X(1)+DOWN*.5,color=INK,stroke_width=1.5,dash_length=.06)
        onel=T("1",15,INK).next_to(X(1)+DOWN*.5,DOWN,buff=.04)
        inside=T("안정",14,GRN).move_to(X(.955)+UP*.48);outside=T("폭발",14,RED).move_to(X(1.045)+UP*.48)
        bd=[Dot(X(.950),radius=.07,color=GRN),Dot(X(.960),radius=.07,color=GRN),Dot(X(1.052),radius=.07,color=RED)]
        bl=[T("0.950",15,GRN,BOLD).next_to(bd[0],DOWN+LEFT*.3,buff=.08),T("0.960",15,GRN,BOLD).next_to(bd[1],DOWN+RIGHT*.3,buff=.08),T("1.052",15,RED,BOLD).next_to(bd[2],DOWN,buff=.08)]
        infa=VGroup(Arrow(X(1.075)+LEFT*.05,X(1.075)+RIGHT*.22,buff=0,color=RED,stroke_width=3,max_tip_length_to_length_ratio=.35),T("∞",20,RED,BOLD).next_to(X(1.075)+RIGHT*.1,UP,buff=.04))
        self.play(Create(nl),Create(one),FadeIn(onel),FadeIn(inside),FadeIn(outside),run_time=.6)
        self.play(*[TransformFromCopy(sm[i],bd[i]) for i in range(3)],run_time=.9);self.play(*[FadeIn(x) for x in bl],GrowArrow(infa[0]),FadeIn(infa[1]),run_time=.6)
        g1=VGroup(T("단위원 밖 고유값 2개",19,RED,BOLD),T("= 전방 변수 2개  c(+1), rk(+1)",15,INK),T("⟹ 유일한 안정적 해",20,GRN,BOLD)).arrange(DOWN,aligned_edge=LEFT,buff=.1)
        g1.move_to(CEN+RIGHT*.15+DOWN*1.1,aligned_edge=LEFT)
        self.play(LaggedStart(*[FadeIn(x,shift=LEFT*.1) for x in g1],lag_ratio=.4),run_time=1.1);self.play(FadeIn(s),run_time=.4)
    # ---------- 4장: 사전 → 사후 ----------
    def ch4(self):
        ax,grid,nums=axes((0,1),(0,45),[(v,f"{v:.1f}") for v in [0,.2,.4,.6,.8,1.0]],[10,20,30,40],"{:.0f}",xlab="ρ")
        self.frame_in(ax,grid,nums,"사전분포에서 사후분포로: 기술충격 지속성 ρ","세로: 확률밀도 · 사전 Beta(평균 0.5, 표준편차 0.2) · 사후 MH 표본")
        m,sd=.5,.2;k=m*(1-m)/sd**2-1;pa,pb=m*k,(1-m)*k
        prior=ax.plot(lambda x:float(BETA.pdf(x,pa,pb)),x_range=[.001,.999,.002],color=BLU,stroke_width=3.5)
        kd=gaussian_kde(np.array(D["rho"]));post=ax.plot(lambda x:float(kd(x)[0]),x_range=[.9,.9995,.0005],color=YEL,stroke_width=4)
        self.play(Create(prior),run_time=1.4)
        g,ar=note("사전분포","데이터를 보기 전의 믿음",BLU,ax.c2p(.06,12),ax.c2p(.3,float(BETA.pdf(.3,pa,pb))))
        self.play(FadeIn(g),GrowArrow(ar),run_time=.6)
        self.play(Create(post),run_time=1.6)
        area=ax.get_area(post,x_range=[.960,.991],color=YEL,opacity=.25)
        g2,ar2=note("사후분포","평균 0.976 · 90% HPD [0.960, 0.991]",YEL,ax.c2p(.3,38),ax.c2p(.952,30))
        self.play(FadeIn(area),FadeIn(g2),GrowArrow(ar2),run_time=.8)
        g3=T("데이터가 믿음을 좁힌다",20,INK,SEMIBOLD).move_to(ax.c2p(.3,26),aligned_edge=LEFT);self.play(FadeIn(g3,shift=UP*.1),run_time=.5)
        self.play(FadeIn(self.src("자료: 교재 제4장 추정 결과 (미국 GDP 자료)")),run_time=.4)
    # ---------- 5장: 칼보 생존 확률 ----------
    def ch5(self):
        th=.75;ax,grid,nums=axes((0,13),(0,1.05),[(k,str(k)) for k in [0,2,4,6,8,10,12]],[.25,.5,.75,1.0],"{:.2f}",xlab="경과 분기 k")
        self.frame_in(ax,grid,nums,"칼보 가격: 가격이 그대로 남을 확률","θ = 0.75 · k분기 동안 가격을 바꾸지 못할 확률 θᵏ")
        bars=VGroup(*[Rectangle(width=W_/13*.62,height=max(1e-3,th**k*H_/1.05),stroke_width=0,fill_color=YEL,fill_opacity=.85).move_to(ax.c2p(k,0),aligned_edge=DOWN) for k in range(0,13)])
        self.play(LaggedStart(*[GrowFromEdge(b_,DOWN) for b_ in bars],lag_ratio=.12),run_time=2.2)
        cv=ax.plot(lambda x:th**x,x_range=[0,12.5,.05],color=BLU,stroke_width=3)
        self.play(Create(cv),run_time=1.0)
        g,ar=note("0.75","1분기 뒤에도 가격 그대로일 확률",YEL,ax.c2p(2.3,.92),ax.c2p(1,.75))
        self.play(FadeIn(g),GrowArrow(ar),run_time=.6)
        g2=VGroup(T("평균 지속 기간",18,INK),T("1 / (1 − θ) = 4분기",28,BLU,BOLD)).arrange(DOWN,aligned_edge=LEFT,buff=.06).move_to(ax.c2p(6.5,.6),aligned_edge=LEFT)
        self.play(FadeIn(g2,shift=UP*.1),Indicate(bars[4],color=BLU,scale_factor=1.0),run_time=.8)
        self.play(FadeIn(self.src("자료: 교재 제5장 모수설정 (칼보 θ = 0.75)")),run_time=.4)
    # ---------- 6장: AD–AS ----------
    def ch6(self):
        ax,grid,nums=axes((-2,2),(-1.5,1.5),[],[],xlab="산출량 갭 →")
        a,b=self.heads("세 방정식을 한 그림으로: AD–AS","가로: 산출량 갭 · 세로: 인플레이션 · 한 시점 단면의 개념도")
        h=DashedLine(ax.c2p(-2,0),ax.c2p(2,0),color=GR,stroke_width=1.5);v=DashedLine(ax.c2p(0,-1.5),ax.c2p(0,1.5),color=GR,stroke_width=1.5)
        self.play(Create(ax),FadeIn(nums),FadeIn(a,shift=DOWN*.1),FadeIn(b),Create(h),Create(v),run_time=1.0)
        k,m=.3,.75;AS=ax.plot(lambda y:k*y,x_range=[-2,2],color=GRN,stroke_width=4);sh=ValueTracker(0)
        AD=always_redraw(lambda:ax.plot(lambda y:sh.get_value()/1.5-m*y,x_range=[max(-2,(sh.get_value()/1.5-1.5)/m),min(2,(sh.get_value()/1.5+1.5)/m)],color=BLU,stroke_width=4))
        ADg=ax.plot(lambda y:-m*y,x_range=[-1.99,1.99],color=BLU,stroke_width=2.5,stroke_opacity=.4)
        la=T("AS  (필립스 곡선)",17,GRN,BOLD).next_to(ax.c2p(-1.9,k*-1.9),DOWN,buff=.15).align_to(ax.c2p(-1.95,0),LEFT)
        ld=T("AD  (IS + 준칙)",17,BLU,BOLD).next_to(ax.c2p(1.15,-m*1.15),RIGHT,buff=.15)
        self.play(Create(AS),FadeIn(la),run_time=.9);self.add(AD);self.play(FadeIn(ld),run_time=.6)
        eq=always_redraw(lambda:Dot(ax.c2p((sh.get_value()/1.5)/(k+m),k*(sh.get_value()/1.5)/(k+m)),radius=.08,color=YEL))
        self.play(FadeIn(eq,scale=.4),run_time=.4);self.add(ADg)
        self.play(sh.animate.set_value(1.2),run_time=1.6)
        p=ax.c2p(.8/(k+m),k*.8/(k+m))
        g,ar=note("수요 충격 → AD 오른쪽","갭 ↑ · 인플레이션 ↑ (상충 없음)",YEL,ax.c2p(.35,1.2),p,24)
        self.play(FadeIn(g),GrowArrow(ar),Flash(p,color=YEL,line_length=.18,flash_radius=.25),run_time=.8)
        self.play(FadeIn(self.src("자료: 교재 제6장 6.6절 (한 시점 단면의 개념도)")),run_time=.4)
    # ---------- 7장: 손실 타원과 접점 ----------
    def ch7(self):
        KAP,LAM,f=.17167,.028611,.25;ax,grid,nums=axes((-2,.5),(-.1,.35),[(v,f"{v:+.1f}" if v else "0") for v in [-2,-1.5,-1,-.5,0,.5]],[-.1,.1,.2,.3],"{:+.1f}")
        a,b=self.heads("재량 하의 최적 정책: 손실 타원과 제약","가로: 산출량 갭 % · 세로: 인플레이션 분기 %p · κ = 0.172, λ = 0.029, f = 0.25")
        h=DashedLine(ax.c2p(-2,0),ax.c2p(.5,0),color=GR,stroke_width=1.5);v=DashedLine(ax.c2p(0,-.1),ax.c2p(0,.35),color=GR,stroke_width=1.5)
        self.play(Create(ax),FadeIn(nums),FadeIn(a,shift=DOWN*.1),FadeIn(b),Create(h),Create(v),run_time=1.0)
        ln=ax.plot(lambda x:KAP*x+f,x_range=[-2,.5],color=RED,stroke_width=4)
        lab=T("필립스 곡선 (제약)",17,RED,BOLD).next_to(ax.c2p(-.05,KAP*-.05+f),LEFT,buff=.1).shift(UP*.25)
        self.play(Create(ln),FadeIn(lab),run_time=1.0)
        xs,ys=-KAP*f/(KAP**2+LAM),LAM*f/(KAP**2+LAM);Lopt=ys**2+LAM*xs**2
        Lt=ValueTracker(Lopt*4)
        def ell():
            L=Lt.get_value();segs=[];cur=[]
            for t in np.linspace(0,2*np.pi,400):
                xx,yy=np.sqrt(L/LAM)*np.cos(t),np.sqrt(L)*np.sin(t)
                if -2<=xx<=.5 and -.1<=yy<=.35: cur.append(ax.c2p(xx,yy))
                elif cur: segs.append(cur);cur=[]
            if cur: segs.append(cur)
            g=VGroup()
            for sg in segs:
                if len(sg)>1: e=VMobject(color=YEL,stroke_width=3);e.set_points_as_corners(sg);g.add(e)
            return g
        clip_note=None
        E=always_redraw(ell);ghost=VGroup(*[ell() for _ in []])
        for L in [Lopt*4,Lopt*2.2]:
            Lt.set_value(L);gh=ell().set_stroke(opacity=.3);ghost.add(gh)
        self.play(*[Create(x) for x in ghost],run_time=.8)
        Lt.set_value(Lopt*4);self.add(E);self.play(Lt.animate.set_value(Lopt),run_time=1.8,rate_func=smooth)
        p=ax.c2p(xs,ys);dot=Dot(p,radius=.08,color=YEL)
        g,ar=note("접점 = 최적점","갭 −0.74% · 인플레이션 +0.12%p",YEL,ax.c2p(-.62,-.045),p,24)
        self.play(FadeIn(dot,scale=.4),Flash(p,color=YEL,line_length=.18,flash_radius=.25),FadeIn(g),GrowArrow(ar),run_time=.8)
        self.play(FadeIn(self.src("자료: 교재 제7장 모수설정 · 인플레이션 압력 f = 0.25 (연율 1%p) 예시")),run_time=.4)
    # ---------- 8장: 두 나라 GDP ----------
    def ch8(self):
        fh,ff=irf(I8["h"][:19]),irf(I8["f"][:19]);ax,grid,nums=axes((0,20),(0,.5),[(q,str(q)) for q in [1,5,9,13,17]],[.1,.2,.3,.4,.5],"{:.1f}",xlab="분기")
        self.frame_in(ax,grid,nums,"자국 기술충격 이후 두 나라의 GDP","생산성 +1% 충격 · 정상상태 대비 %")
        ch=ax.plot(fh,x_range=[0,19,.05],color=YEL,stroke_width=4.5);cf=ax.plot(ff,x_range=[0,19,.05],color=BLU,stroke_width=3.5)
        tr=ValueTracker(0);vl=always_redraw(lambda:DashedLine(ax.c2p(tr.get_value(),0),ax.c2p(tr.get_value(),.5),color=MUT,stroke_width=1.4,dash_length=.06))
        dh=always_redraw(lambda:Dot(ax.c2p(tr.get_value(),fh(tr.get_value())),radius=.065,color=YEL));df=always_redraw(lambda:Dot(ax.c2p(tr.get_value(),ff(tr.get_value())),radius=.06,color=BLU))
        lh=always_redraw(lambda:T(f"자국 {fh(tr.get_value()):+.2f}",17,YEL,BOLD).next_to(ax.c2p(tr.get_value(),fh(tr.get_value())),UR,buff=.08))
        lf=always_redraw(lambda:T(f"외국 {ff(tr.get_value()):+.2f}",17,BLU,BOLD).next_to(ax.c2p(tr.get_value(),ff(tr.get_value())),DR,buff=.08))
        self.add(vl,dh,df,lh,lf);self.play(Create(ch),Create(cf),tr.animate.set_value(5),run_time=1.8,rate_func=linear)
        self.play(Flash(ax.c2p(5,fh(5)),color=YEL,line_length=.2,flash_radius=.3),run_time=.5);self.play(tr.animate.set_value(19),run_time=1.6)
        self.play(*[FadeOut(x) for x in [vl,dh,df,lh,lf]],run_time=.4)
        e=VGroup(T("자국",17,YEL,BOLD).next_to(ch.get_end(),RIGHT,buff=.1),T("외국",17,BLU,BOLD).next_to(cf.get_end(),RIGHT,buff=.1))
        g1,a1=note("+0.45%","자국, 5분기째 정점",YEL,ax.c2p(7.3,.47),ax.c2p(5,fh(5)));g2,a2=note("+0.14%","외국도 함께 오른다",BLU,ax.c2p(8.7,.225),ax.c2p(6,ff(6)))
        self.play(FadeIn(e),FadeIn(g1),GrowArrow(a1),run_time=.7);self.play(FadeIn(g2),GrowArrow(a2),run_time=.7)
        self.play(FadeIn(self.src("자료: 교재 제8장 nk_two_country.mod")),run_time=.4)
    # ---------- 9장: 대외채권의 단위근 ----------
    def ch9(self):
        rs=np.random.default_rng(78);N=100;eps=rs.standard_normal(N);rw=np.cumsum(eps);ar=np.zeros(N)
        for i in range(N): ar[i]=(.8*ar[i-1] if i else 0)+eps[i]
        mx=float(np.ceil(max(abs(rw).max(),abs(ar).max())/2)*2+1)
        ax,grid,nums=axes((0,99),(-mx,mx),[],[],xlab="시간 →")
        a,b=self.heads("왜 리스크 프리미엄이 필요한가","세로: 대외채권의 정상상태 이탈 · 같은 충격열로 그린 개념도")
        h=DashedLine(ax.c2p(0,0),ax.c2p(99,0),color=GR,stroke_width=1.5)
        self.play(Create(ax),FadeIn(nums),FadeIn(a,shift=DOWN*.1),FadeIn(b),Create(h),run_time=1.0)
        c1=VMobject(color=RED,stroke_width=3.2);c1.set_points_as_corners([ax.c2p(i,v) for i,v in enumerate(rw)])
        c2=VMobject(color=GRN,stroke_width=3.2);c2.set_points_as_corners([ax.c2p(i,v) for i,v in enumerate(ar)])
        self.play(Create(c1),run_time=2.0,rate_func=linear)
        g1=VGroup(MarkupText("φ<sub>b</sub> = 0",font="Pretendard",font_size=22,color=RED,weight=BOLD),T("확률 보행: 충격이 그대로 쌓인다",15,INK)).arrange(DOWN,aligned_edge=LEFT,buff=.05)
        g1.move_to(ax.c2p(4,mx*.78),aligned_edge=LEFT)
        self.play(FadeIn(g1),run_time=.5)
        self.play(Create(c2),run_time=2.0,rate_func=linear)
        g2=VGroup(MarkupText("φ<sub>b</sub> &gt; 0",font="Pretendard",font_size=22,color=GRN,weight=BOLD),T("정상상태로 되돌아온다",15,INK)).arrange(DOWN,aligned_edge=LEFT,buff=.05).move_to(ax.c2p(4,-mx*.55),aligned_edge=LEFT)
        self.play(FadeIn(g2),run_time=.5)
        self.play(FadeIn(self.src("자료: 교재 제9장 9.2.3절 (Schmitt-Grohé–Uribe 2003)")),run_time=.4)
for k in range(1,10): globals()[f"C{k}"]=type(f"C{k}",(Cover,),{"N":k})
