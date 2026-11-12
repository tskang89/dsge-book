import re,sys,base64
src,vid,out=sys.argv[1:4]
s=open(src).read()
i=s.index('scene({id:"title"');j=s.index('\n});',i)+4
blk=s[i:j]
m=re.match(r'scene\(\{id:"title",title:"([^"]*)",dur:(\d+),caps:(\[\[.*?\]\]),\n?build',blk,re.S)
title,dur,caps=m.groups()
b64=base64.b64encode(open(vid,'rb').read()).decode()
new=f'''scene({{id:"title",title:"{title}",dur:{dur},caps:{caps},
/* 표지: Manim 으로 만든 표지 영상(장면 시간에 맞춰 재생·탐색) */
build(el){{el.style.background="#111a2b";const v=document.createElement("video");v.src="data:video/mp4;base64,{b64}";v.muted=true;v.playsInline=true;v.preload="auto";
  Object.assign(v.style,{{position:"absolute",left:"0px",top:"-44px",width:"1920px",height:"1080px"}});el.appendChild(v);
  setInterval(()=>{{if(el.style.display==="none"&&!v.paused)v.pause()}},250);return{{v}}}},
update(c,lt){{const v=c.v,d=v.duration||0,tg=Math.min(lt,Math.max(0,d-.04)),pl=typeof playing!=="undefined"&&playing;
  try{{if(pl&&lt<d-.05){{if(v.paused){{v.currentTime=tg;v.play().catch(()=>{{}})}}else if(Math.abs(v.currentTime-tg)>.25)v.currentTime=tg}}
  else{{if(!v.paused)v.pause();if(Math.abs(v.currentTime-tg)>.02)v.currentTime=tg}}}}catch(e){{}}}}
}});'''
open(out,'w').write(s[:i]+new+s[j:])
print(title,dur,len(blk),'->',len(new))
