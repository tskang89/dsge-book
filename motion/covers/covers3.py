from covers2 import *
NS=json.load(open("nsweep_peak.json"));IR8=json.load(open("ir8.json"))
class Cover3(Cover):
    # ---------- 6장: 테일러 원칙 슬라이더 ----------
    def ch6(self):
        b,s_,k=.99,1,.25*(1-.99*.75)/.75*2
        def ev(p):
            a11=1+k/(s_*b);a12=(p-1/b)/s_;a21=-k/b;a22=1/b;tr=a11+a22;dt=a11*a22-a12*a21;D=tr*tr-4*dt
            if D>=0: return abs((tr+np.sqrt(D))/2),abs((tr-np.sqrt(D))/2)
            m=np.sqrt(dt);return m,m
        ax,grid,nums=axes((0,3),(.6,1.6),[(v,f"{v:g}") for v in [0,.5,1,1.5,2,2.5,3]],[.8,1.0,1.2,1.4,1.6],"{:.1f}",xlab="φπ")
        a,b_=self.heads("테일러 원칙: φπ가 1을 넘는 순간","세로: 체계 행렬 두 고유값의 크기 |λ| · β = 0.99, σ = 1, κ ≈ 0.172")
        red=Rectangle(width=ax.c2p(1,0)[0]-ax.c2p(0,0)[0],height=H_,stroke_width=0,fill_color=RED,fill_opacity=.0).move_to((ax.c2p(0,.6)+ax.c2p(1,1.6))/2)
        grn=Rectangle(width=ax.c2p(3,0)[0]-ax.c2p(1,0)[0],height=H_,stroke_width=0,fill_color=GRN,fill_opacity=.0).move_to((ax.c2p(1,.6)+ax.c2p(3,1.6))/2)
        unit=DashedLine(ax.c2p(0,1),ax.c2p(3,1),color=INK,stroke_width=1.6,dash_length=.07);ul=T("|λ| = 1",15,INK).next_to(ax.c2p(3,1),UP,buff=.06).align_to(ax.c2p(3,1),RIGHT)
        self.play(Create(ax),FadeIn(nums),FadeIn(a,shift=DOWN*.1),FadeIn(b_),FadeIn(red),FadeIn(grn),run_time=1.0)
        if len(grid): self.play(LaggedStart(*[Create(g) for g in grid],lag_ratio=.1),Create(unit),FadeIn(ul),run_time=.6)
        c1=ax.plot(lambda p:ev(p)[0],x_range=[0,3,.005],color=YEL,stroke_width=4);c2=ax.plot(lambda p:ev(p)[1],x_range=[0,3,.005],color=BLU,stroke_width=4)
        self.play(Create(c1),Create(c2),run_time=1.6)
        tr=ValueTracker(.2)
        vl=always_redraw(lambda:DashedLine(ax.c2p(tr.get_value(),.6),ax.c2p(tr.get_value(),1.6),color=MUT,stroke_width=1.4,dash_length=.06))
        d1=always_redraw(lambda:Dot(ax.c2p(tr.get_value(),ev(tr.get_value())[0]),radius=.07,color=YEL));d2=always_redraw(lambda:Dot(ax.c2p(tr.get_value(),ev(tr.get_value())[1]),radius=.07,color=BLU))
        def ro():
            p=tr.get_value();ok=p>1
            g=VGroup(T(f"φπ = {p:.2f}",22,INK,BOLD),T("두 고유값 모두 > 1  ⟹  유일한 해" if ok else "한 고유값 < 1  ⟹  해가 무수히 많다",16,GRN if ok else RED,BOLD)).arrange(DOWN,aligned_edge=LEFT,buff=.06)
            return g.move_to(ax.c2p(1.45,.74),aligned_edge=LEFT)
        rd=always_redraw(ro)
        self.add(vl,d1,d2,rd);self.play(tr.animate.set_value(.97),red.animate.set_fill(opacity=.13),run_time=1.4,rate_func=linear)
        self.play(tr.animate.set_value(1.03),run_time=.4,rate_func=linear)
        self.play(Flash(ax.c2p(1,1),color=GRN,line_length=.2,flash_radius=.3),grn.animate.set_fill(opacity=.12),run_time=.5)
        self.play(tr.animate.set_value(2.2),run_time=1.4)
        lab=VGroup(T("테일러 원칙",24,GRN,BOLD),T("φπ > 1: 금리를 인플레이션보다 더 크게",15,INK)).arrange(DOWN,aligned_edge=LEFT,buff=.05).move_to(ax.c2p(1.15,1.48),aligned_edge=LEFT)
        bad=VGroup(T("φπ < 1",18,RED,BOLD),T("해가 무수히 많다",14,INK)).arrange(DOWN,aligned_edge=LEFT,buff=.04).move_to(ax.c2p(.06,1.17),aligned_edge=LEFT)
        self.play(FadeIn(lab,shift=UP*.1),FadeIn(bad),run_time=.6)
        self.play(FadeIn(self.src("자료: 교재 제6장 6.7.2절 (블랑샤-칸 조건의 수치 확인)")),run_time=.4)
    # ---------- 8장: 용수철로 이어진 두 경제 ----------
    def ch8(self):
        fh,ff,fs=irf(IR8["a"]["gdp"][:19]),irf(IR8["a"]["gdps"][:19]),irf(IR8["a"]["s"][:19])
        a,b=self.heads("용수철로 이어진 두 경제","자국 기술충격 +1% · 블록 높이 = GDP(정상상태 대비 %) · 펜이 경로를 기록")
        x0=CEN[0]-W_/2+.35;x1=CEN[0]+.55;yb=CEN[1]-1.55;sc=2.9/.5;dx=(x1-x0)/19
        base=Line([x0,yb,0],[x1,yb,0],color=AXC,stroke_width=2);yax=Line([x0,yb,0],[x0,yb+3.1,0],color=AXC,stroke_width=2)
        grid=VGroup(*[DashedLine([x0,yb+v*sc,0],[x1,yb+v*sc,0],color=GR,stroke_width=1,dash_length=.05) for v in [.1,.2,.3,.4,.5]])
        yn=VGroup(*[T(f"{v:.1f}",14,MUT).next_to([x0,yb+v*sc,0],LEFT,buff=.1) for v in [.1,.2,.3,.4,.5]])
        xn=VGroup(*[T(str(q),14,MUT).next_to([x0+q*dx,yb,0],DOWN,buff=.1) for q in [1,5,9,13,17]]);xl=T("분기",14,MUT).next_to([x1,yb,0],DOWN,buff=.38).align_to([x1,yb,0],RIGHT)
        self.play(FadeIn(a,shift=DOWN*.1),FadeIn(b),Create(base),Create(yax),FadeIn(yn),FadeIn(xn),FadeIn(xl),run_time=.9)
        self.play(LaggedStart(*[Create(g) for g in grid],lag_ratio=.1),run_time=.5)
        XH,XF=x1+.85,x1+2.35;t=ValueTracker(0)
        def blk(X,f,col,lab):
            def g():
                y=yb+f(t.get_value())*sc
                sq=RoundedRectangle(corner_radius=.1,width=.8,height=.6,stroke_color=col,stroke_width=3,fill_color=col,fill_opacity=.22).move_to([X,y+.3,0])
                return VGroup(sq,T(lab,19,col,BOLD).move_to(sq))
            return always_redraw(g)
        def arm(X,f,col):return always_redraw(lambda:VGroup(Line([X-.4,yb+f(t.get_value())*sc+.3,0],[x1,yb+f(t.get_value())*sc,0],color=col,stroke_width=1.6),Dot([x1,yb+f(t.get_value())*sc,0],radius=.05,color=col)))
        def trace(f,col,w):
            def g():
                tt=t.get_value();n=max(2,int(tt*12)+2);taus=np.linspace(0,tt,n)
                m=VMobject(color=col,stroke_width=w);m.set_points_as_corners([[x1-(tt-u)*dx,yb+f(u)*sc,0] for u in taus]);return m
            return always_redraw(g)
        def spring():
            yH=yb+fh(t.get_value())*sc+.3;yF=yb+ff(t.get_value())*sc+.3;A_=np.array([XH+.4,yH,0]);B_=np.array([XF-.4,yF,0])
            L=B_-A_;u=L/np.linalg.norm(L);nrm=np.array([-u[1],u[0],0]);n=12;pts=[A_]
            for i in range(1,n):pts.append(A_+L*i/n+nrm*(.09 if i%2 else -.09))
            pts.append(B_);m=VMobject(color=TEAL if False else "#6fcfb7",stroke_width=2.5);m.set_points_as_corners(pts);return m
        H=blk(XH,fh,YEL,"자국");Fm=blk(XF,ff,BLU,"외국");sp=always_redraw(spring);aH=arm(XH,fh,YEL);aF=arm(XF,ff,BLU);trH=trace(fh,YEL,4);trF=trace(ff,BLU,3.2)
        spl=always_redraw(lambda:VGroup(T("용수철",15,"#6fcfb7",BOLD),T("무역 · 금융 · 환율",13,"#6fcfb7")).arrange(DOWN,buff=.03).move_to([(XH+XF)/2,yb+(fh(t.get_value())+ff(t.get_value()))/2*sc-.35,0]))
        self.play(FadeIn(H),FadeIn(Fm),Create(sp),FadeIn(spl),run_time=.7);self.add(aH,aF,trH,trF)
        bolt=VGroup(T("기술충격 +1%",15,INK,BOLD)).next_to([XH,yb+.6,0],UP,buff=.9)
        ar=Arrow(bolt.get_bottom(),[XH,yb+.55,0],buff=.05,color=INK,stroke_width=2.5,max_tip_length_to_length_ratio=.25)
        self.play(FadeIn(bolt),GrowArrow(ar),run_time=.4);self.play(Flash([XH,yb+.25,0],color=YEL,line_length=.2,flash_radius=.4),FadeOut(ar),FadeOut(bolt),run_time=.4)
        self.play(t.animate.set_value(19),run_time=4.2,rate_func=linear)
        pH=[x0+5*dx,yb+fh(5)*sc,0];pF=[x0+6*dx,yb+ff(6)*sc,0]
        g1,a1=note("+0.45%","자국 GDP, 5분기째 정점",YEL,[x0+8.0*dx,yb+.5*sc,0],np.array(pH));g2,a2=note("+0.14%","외국으로 전파",BLU,[x0+2.6*dx,yb+.235*sc,0],np.array(pF),24)
        self.play(FadeIn(g1),GrowArrow(a1),run_time=.6);self.play(FadeIn(g2),GrowArrow(a2),run_time=.6)
        self.play(FadeIn(self.src("자료: 교재 제8장 nk_two_country.mod (기술충격 +1%)")),run_time=.4)
    # ---------- 9장: 자국의 크기를 0으로 ----------
    def ch9(self):
        Ns=np.array([p[0] for p in NS])[::-1];HF=np.array([p[1] for p in NS])[::-1];FH=np.array([p[2] for p in NS])[::-1]
        fHF=lambda n:float(np.interp(n,Ns,HF));fFH=lambda n:float(np.interp(n,Ns,FH))
        X=lambda n:.5-n
        ax,grid,nums=axes((0,.5),(0,.3),[(.5-v,f"{v:g}") for v in [.5,.4,.3,.2,.1,0]],[.05,.1,.15,.2,.25,.3],"{:.2f}")
        a,b=self.heads("자국의 크기를 0으로","가로: 자국의 크기 N · 세로: 기술충격 +1%가 상대국 GDP에 주는 영향(정점 %)")
        self.play(Create(ax),FadeIn(nums),FadeIn(a,shift=DOWN*.1),FadeIn(b),run_time=1.0)
        self.play(LaggedStart(*[Create(g) for g in grid],lag_ratio=.1),run_time=.5)
        n=ValueTracker(.5)
        def path(f,col,w):
            def g():
                nn=n.get_value();xs=np.linspace(.5,nn,max(2,int((.5-nn)*200)+2))
                m=VMobject(color=col,stroke_width=w);m.set_points_as_corners([ax.c2p(X(v),f(v)) for v in xs]);return m
            return always_redraw(g)
        pB=path(fFH,BLU,4);pY=path(fHF,YEL,4.5)
        dB=always_redraw(lambda:Dot(ax.c2p(X(n.get_value()),fFH(n.get_value())),radius=.07,color=BLU));dY=always_redraw(lambda:Dot(ax.c2p(X(n.get_value()),fHF(n.get_value())),radius=.07,color=YEL))
        C0=ax.c2p(.385,.235)
        def inset():
            nn=n.get_value();rH=.36*np.sqrt(nn/.5)+.02;rF=.36*np.sqrt((1-nn)/.5)
            cH=Circle(radius=rH,stroke_color=YEL,stroke_width=2.5,fill_color=YEL,fill_opacity=.25).move_to(C0+LEFT*.65);cF=Circle(radius=rF,stroke_color=BLU,stroke_width=2.5,fill_color=BLU,fill_opacity=.18).move_to(C0+RIGHT*.6)
            wHF=.5+9*fHF(nn);wFH=.5+9*fFH(nn)
            a1=Arrow(C0+LEFT*.65+RIGHT*rH+UP*.1,C0+RIGHT*.6+LEFT*rF+UP*.1,buff=.04,color=YEL,stroke_width=wHF,max_tip_length_to_length_ratio=.15)
            a2=Arrow(C0+RIGHT*.6+LEFT*rF+DOWN*.1,C0+LEFT*.65+RIGHT*rH+DOWN*.1,buff=.04,color=BLU,stroke_width=wFH,max_tip_length_to_length_ratio=.15)
            l=T(f"N = {nn:.2f}",20,INK,BOLD).move_to(C0+UP*.55+LEFT*.65)
            return VGroup(cF,cH,a2,a1,l)
        ins=always_redraw(inset)
        lB=T("외국 충격 → 자국",17,BLU,BOLD).next_to(ax.c2p(0,fFH(.5)),UP,buff=.1).align_to(ax.c2p(0,0),LEFT).shift(RIGHT*.1)
        lY=T("자국 충격 → 외국",17,YEL,BOLD).next_to(ax.c2p(0,fHF(.5)),DOWN,buff=.12).align_to(ax.c2p(0,0),LEFT).shift(RIGHT*.1)
        self.add(pB,pY,dB,dY);self.play(FadeIn(ins),FadeIn(lB),FadeIn(lY),run_time=.6)
        self.play(n.animate.set_value(.005),run_time=4.2,rate_func=smooth)
        g1,a1=note("0.13% 그대로","세계의 충격은 여전히 들어온다",BLU,ax.c2p(.03,.205),ax.c2p(X(.005),fFH(.005)))
        g2,a2=note("→ 0","자국의 충격은 세계에 닿지 않는다",YEL,ax.c2p(.22,.065),ax.c2p(X(.005),fHF(.005)))
        self.play(FadeIn(g1),GrowArrow(a1),run_time=.6);self.play(FadeIn(g2),GrowArrow(a2),run_time=.6)
        self.play(FadeIn(self.src("자료: 교재 제8장 모형으로 계산 (γ* = Nγ/(1−N)로 대칭 정상상태 유지)")),run_time=.4)
for k in (6,8,9): globals()[f"E{k}"]=type(f"E{k}",(Cover3,),{"N":k})
