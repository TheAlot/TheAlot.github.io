import{S as a,i as c,s as u,e as f,t as _,a as m,b as d,c as p,d as y,f as v,n as l,g,h as w,m as b,j as A,k as L,l as B}from"./vendor.f24dc047.js";const O=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}};O();function E(s){let t,r;return{c(){t=f("button"),r=_(s[0]),m(t,"--height",s[1]),d(t,"class","svelte-14g40lk")},m(o,e){p(o,t,e),y(t,r)},p(o,[e]){e&1&&v(r,o[0]),e&2&&m(t,"--height",o[1])},i:l,o:l,d(o){o&&g(t)}}}function N(s,t,r){let{title:o="Button"}=t,{height:e="1.25em 2em"}=t;return s.$$set=n=>{"title"in n&&r(0,o=n.title),"height"in n&&r(1,e=n.height)},[o,e]}class S extends a{constructor(t){super();c(this,t,N,E,u,{title:0,height:1})}}function j(s){let t,r,o;return r=new S({}),{c(){t=f("main"),w(r.$$.fragment),d(t,"class","svelte-1vlrom")},m(e,n){p(e,t,n),b(r,t,null),o=!0},p:l,i(e){o||(A(r.$$.fragment,e),o=!0)},o(e){L(r.$$.fragment,e),o=!1},d(e){e&&g(t),B(r)}}}class k extends a{constructor(t){super();c(this,t,null,j,u,{})}}const h=document.getElementById("app");if(!h)throw new Error('Html did not contain an element with id="app"');new k({target:h});