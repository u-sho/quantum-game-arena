function t(){}function n(t,n){for(const e in n)t[e]=n[e];return t}function e(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(e)}function c(t){return"function"==typeof t}function s(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function u(t,n,e,o){if(t){const r=i(t,n,e,o);return t[0](r)}}function i(t,e,o,r){return t[1]&&r?n(o.ctx.slice(),t[1](r(e))):o.ctx}function f(t,n,e,o,r,c,s){const u=function(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(void 0===n.dirty)return r;if("object"==typeof r){const t=[],e=Math.max(n.dirty.length,r.length);for(let o=0;o<e;o+=1)t[o]=n.dirty[o]|r[o];return t}return n.dirty|r}return n.dirty}(n,o,r,c);if(u){const r=i(n,e,o,s);t.p(r,u)}}function a(t){return null==t?"":t}function l(t,n){t.appendChild(n)}function d(t,n,e){t.insertBefore(n,e||null)}function h(t){t.parentNode.removeChild(t)}function p(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function g(t){return document.createElement(t)}function $(t){return document.createTextNode(t)}function m(){return $(" ")}function y(){return $("")}function b(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function x(t){return function(n){return n.preventDefault(),t.call(this,n)}}function _(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function w(t){return Array.from(t.childNodes)}function k(t,n,e,o){for(let r=0;r<t.length;r+=1){const o=t[r];if(o.nodeName===n){let n=0;const c=[];for(;n<o.attributes.length;){const t=o.attributes[n++];e[t.name]||c.push(t.name)}for(let t=0;t<c.length;t++)o.removeAttribute(c[t]);return t.splice(r,1)[0]}}return o?function(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}(n):g(n)}function v(t,n){for(let e=0;e<t.length;e+=1){const o=t[e];if(3===o.nodeType)return o.data=""+n,t.splice(e,1)[0]}return $(n)}function E(t){return v(t," ")}function A(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function S(t,n=document.body){return Array.from(n.querySelectorAll(t))}let j;function M(t){j=t}function N(){if(!j)throw new Error("Function called outside component initialization");return j}function O(t){N().$$.on_mount.push(t)}function q(t){N().$$.after_update.push(t)}function C(t,n){N().$$.context.set(t,n)}const L=[],T=[],z=[],B=[],D=Promise.resolve();let F=!1;function P(t){z.push(t)}let G=!1;const H=new Set;function I(){if(!G){G=!0;do{for(let t=0;t<L.length;t+=1){const n=L[t];M(n),J(n.$$)}for(M(null),L.length=0;T.length;)T.pop()();for(let t=0;t<z.length;t+=1){const n=z[t];H.has(n)||(H.add(n),n())}z.length=0}while(L.length);for(;B.length;)B.pop()();F=!1,G=!1,H.clear()}}function J(t){if(null!==t.fragment){t.update(),r(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(P)}}const K=new Set;let Q;function R(){Q={r:0,c:[],p:Q}}function U(){Q.r||r(Q.c),Q=Q.p}function V(t,n){t&&t.i&&(K.delete(t),t.i(n))}function W(t,n,e,o){if(t&&t.o){if(K.has(t))return;K.add(t),Q.c.push((()=>{K.delete(t),o&&(e&&t.d(1),o())})),t.o(n)}}function X(t,n){t.d(1),n.delete(t.key)}function Y(t,n,e,o,r,c,s,u,i,f,a,l){let d=t.length,h=c.length,p=d;const g={};for(;p--;)g[t[p].key]=p;const $=[],m=new Map,y=new Map;for(p=h;p--;){const t=l(r,c,p),u=e(t);let i=s.get(u);i?o&&i.p(t,n):(i=f(u,t),i.c()),m.set(u,$[p]=i),u in g&&y.set(u,Math.abs(p-g[u]))}const b=new Set,x=new Set;function _(t){V(t,1),t.m(u,a),s.set(t.key,t),a=t.first,h--}for(;d&&h;){const n=$[h-1],e=t[d-1],o=n.key,r=e.key;n===e?(a=n.first,d--,h--):m.has(r)?!s.has(o)||b.has(o)?_(n):x.has(r)?d--:y.get(o)>y.get(r)?(x.add(o),_(n)):(b.add(r),d--):(i(e,s),d--)}for(;d--;){const n=t[d];m.has(n.key)||i(n,s)}for(;h;)_($[h-1]);return $}function Z(t,n){const e={},o={},r={$$scope:1};let c=t.length;for(;c--;){const s=t[c],u=n[c];if(u){for(const t in s)t in u||(o[t]=1);for(const t in u)r[t]||(e[t]=u[t],r[t]=1);t[c]=u}else for(const t in s)r[t]=1}for(const s in o)s in e||(e[s]=void 0);return e}function tt(t){return"object"==typeof t&&null!==t?t:{}}function nt(t){t&&t.c()}function et(t,n){t&&t.l(n)}function ot(t,n,o,s){const{fragment:u,on_mount:i,on_destroy:f,after_update:a}=t.$$;u&&u.m(n,o),s||P((()=>{const n=i.map(e).filter(c);f?f.push(...n):r(n),t.$$.on_mount=[]})),a.forEach(P)}function rt(t,n){const e=t.$$;null!==e.fragment&&(r(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function ct(t,n){-1===t.$$.dirty[0]&&(L.push(t),F||(F=!0,D.then(I)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function st(n,e,c,s,u,i,f=[-1]){const a=j;M(n);const l=n.$$={fragment:null,ctx:null,props:i,update:t,not_equal:u,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:e.context||[]),callbacks:o(),dirty:f,skip_bound:!1};let d=!1;if(l.ctx=c?c(n,e.props||{},((t,e,...o)=>{const r=o.length?o[0]:e;return l.ctx&&u(l.ctx[t],l.ctx[t]=r)&&(!l.skip_bound&&l.bound[t]&&l.bound[t](r),d&&ct(n,t)),e})):[],l.update(),d=!0,r(l.before_update),l.fragment=!!s&&s(l.ctx),e.target){if(e.hydrate){const t=w(e.target);l.fragment&&l.fragment.l(t),t.forEach(h)}else l.fragment&&l.fragment.c();e.intro&&V(n.$$.fragment),ot(n,e.target,e.anchor,e.customElement),I()}M(a)}class ut{$destroy(){rt(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const it=[];function ft(n,e=t){let o;const r=[];function c(t){if(s(n,t)&&(n=t,o)){const t=!it.length;for(let e=0;e<r.length;e+=1){const t=r[e];t[1](),it.push(t,n)}if(t){for(let t=0;t<it.length;t+=2)it[t][0](it[t+1]);it.length=0}}}return{set:c,update:function(t){c(t(n))},subscribe:function(s,u=t){const i=[s,u];return r.push(i),1===r.length&&(o=e(c)||t),s(n),()=>{const t=r.indexOf(i);-1!==t&&r.splice(t,1),0===r.length&&(o(),o=null)}}}}export{n as A,R as B,ft as C,u as D,f as E,l as F,t as G,S as H,a as I,Y as J,X as K,b as L,x as M,p as N,r as O,c as P,ut as S,w as a,_ as b,k as c,h as d,g as e,d as f,v as g,A as h,st as i,nt as j,m as k,y as l,et as m,E as n,ot as o,Z as p,tt as q,W as r,s,$ as t,U as u,V as v,rt as w,C as x,q as y,O as z};
