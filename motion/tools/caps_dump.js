#!/usr/bin/env node
/* 장면 원본(scenes.js)에서 장면 순서·길이·자막 시각을 뽑아 JSON 으로 출력한다(브라우저 없이).
   node motion/tools/caps_dump.js 장면.js  →  [{"id","title","dur","caps":[[초,"자막"],…]},…]
   FIT 은 반영하고 SEG 는 무시한다(음성 길이 계산의 기준이 원래 시각이므로). */
const vm = require("vm"), fs = require("fs");
const src = fs.readFileSync(process.argv[2], "utf8").replace(/const SEG=\{[^\n]*\};?/, "const SEG={};");
const prelude = `const st=()=>({style:{},setAttribute(){},appendChild(){},insertBefore(){},addEventListener(){},querySelector(){return st()},querySelectorAll(){return []},children:[],classList:{add(){},contains(){return false}}});
function K(t){return t};function tx(s){return s};function E(){return st()};function A(){return st()};function M(){return st()};function S(){return st()};function LY(){return st()};function svgLayer(){return st()};
function ap(){};function wipe(){};function draw(){};function glow(){};function rng(s){let x=s||1;return ()=>{x=(x*16807)%2147483647;return x/2147483647}};function gauss(r){return 0};function axes(){return st()};function poly(){return ""};
function header(){return st()};function hdUpdate(){};function CX(){return st()};const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),ease=x=>x,eout=x=>x,P=()=>0,lerp=(a,b,t)=>a,W=1920,H=1080,stage=st(),document={createElement:()=>st(),getElementById:()=>st(),querySelector:()=>st(),createElementNS:()=>st()};`;
const out = [];
const ctx = { __push: o => out.push(o), Math, String, JSON, Array, Object, Number, console, parseFloat, parseInt, isFinite };
vm.runInNewContext(prelude + `
function scene(o){const nd=(typeof FIT!=="undefined"&&FIT[o.id])||o.dur;if(nd!==o.dur){const f=nd/o.dur;o.caps=o.caps.map(([t,x])=>[t*f,x]);o.dur=nd}
  __push({id:o.id,title:o.title,dur:o.dur,caps:o.caps})};\n` + src, ctx);
process.stdout.write(JSON.stringify(out));
