var k=Object.defineProperty,P=Object.defineProperties;var G=Object.getOwnPropertyDescriptors;var v=Object.getOwnPropertySymbols;var H=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var E=(e,t,r)=>t in e?k(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,m=(e,t)=>{for(var r in t||(t={}))H.call(t,r)&&E(e,r,t[r]);if(v)for(var r of v(t))j.call(t,r)&&E(e,r,t[r]);return e},x=(e,t)=>P(e,G(t));import{r as c,l as U,u as W,a as B,i as N,j as l,b as y,R as D,c as F}from"./vendor.331803d5.js";const $=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}};$();const q=({setStory:e})=>{const t=`Once upon a time...
    -(opts)
    + There were two choices.
    + There were four lines of content.
   
   - They lived happily ever after.
       -> opts
   `,r=c.exports.useRef(null),[i,n]=c.exports.useState([]),s=U(a=>i.map(o=>{const d=a.lineBlockAt(o.index);return{from:d.from,to:d.to,severity:o.type.includes("ERROR")?"error":o.type.includes("WARNING")?"warning":"info",message:o.msg}})),{setContainer:u}=W({container:r.current,extensions:[s,B()],value:t,minHeight:"100%",height:"100%",theme:"dark",onChange:(a,o)=>{p(a)}}),p=a=>{const o=[],d=(f,Q)=>{var A=/^(ERROR|WARNING|RUNTIME ERROR|RUNTIME WARNING|TODO): ('([^']+)' )?line (\d+): (.*)/;let h=f.match(A);if(h){const L=h[1],M=h[3],g=parseInt(h[4]),T=h[5],b=/\n/gi,R=[];let C=null;for(;C=b.exec(a);)R.push(C.index+1);const _=R[g-1]||0;o.push({type:L,filename:M,lineNumber:g,index:_,msg:T})}},S=new N.exports.CompilerOptions(null,[],!1,d,null),I=new N.exports.Compiler(a,S);try{const f=I.Compile();e(f)}catch(f){console.error(f)}finally{n(o)}};return c.exports.useEffect(()=>{p(t)},[]),c.exports.useEffect(()=>{r.current&&u(r.current)},[r.current]),l("div",{ref:r})},O={texts:[],choices:[]};function K(e,t){switch(t.type){case"reset":return O;case"add_text":return x(m({},e),{texts:e.texts.concat(t.payload)});case"add_choice":return x(m({},e),{choices:e.choices.concat(t.payload)});case"clear_choices":return x(m({},e),{choices:[]});default:throw new Error}}const z=({story:e})=>{const[t,r]=c.exports.useReducer(K,O),[i,n]=c.exports.useState([]),s=c.exports.useRef(null);if(c.exports.useEffect(()=>{if(e!==null)return w(e,r),()=>{r({type:"reset"})}},[e]),c.exports.useLayoutEffect(()=>{if(e!==null)for(let o of i)try{e.ChooseChoiceIndex(o)}catch{break}},[e]),e===null)return null;const{texts:u,choices:p}=t,a=o=>()=>{r({type:"clear_choices"}),n(i.concat(o)),e.ChooseChoiceIndex(o),w(e,r)};return l("div",{children:y("div",{className:"container",ref:s,children:[u.map((o,d)=>l("p",{children:o},d)),p.length>0&&p.map(o=>l("p",{className:"choice",children:y("a",{href:"#",onClick:a(o.index),children:[o.index,". ",o.text]})},`choice-${o.index}`))]})})};function w(e,t){for(;e.canContinue;){var r=e.Continue();e.currentTags,t({type:"add_text",payload:r})}e.currentChoices.forEach(function(i,n){t({type:"add_choice",payload:{text:i.text,index:i.index}})})}function J(){c.exports.useState(0);const[e,t]=c.exports.useState(null);return l("div",{className:"App",children:y("div",{className:"row",children:[l(q,{setStory:t}),l(z,{story:e})]})})}D.render(l(F.StrictMode,{children:l(J,{})}),document.getElementById("root"));
