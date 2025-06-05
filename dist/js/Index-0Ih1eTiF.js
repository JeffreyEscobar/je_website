var e=Object.defineProperty,r=(r,t,o)=>((r,t,o)=>t in r?e(r,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[t]=o)(r,"symbol"!=typeof t?t+"":t,o);import{r as t,j as o}from"./vendor-BUdGrdBN.js";import{d as n,L as a,E as s,C as i,a as l,R as d,M as c}from"./ui-p_OACIpo.js";function p(...e){return r=>e.forEach((e=>function(e,r){"function"==typeof e?e(r):null!=e&&(e.current=r)}(e,r)))}var u=t.forwardRef(((e,r)=>{const{children:n,...a}=e,s=t.Children.toArray(n),i=s.find(b);if(i){const e=i.props.children,n=s.map((r=>r===i?t.Children.count(e)>1?t.Children.only(null):t.isValidElement(e)?e.props.children:null:r));return o.jsx(m,{...a,ref:r,children:t.isValidElement(e)?t.cloneElement(e,void 0,n):null})}return o.jsx(m,{...a,ref:r,children:n})}));u.displayName="Slot";var m=t.forwardRef(((e,r)=>{const{children:o,...n}=e;if(t.isValidElement(o)){const e=function(e){let r=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,t=r&&"isReactWarning"in r&&r.isReactWarning;if(t)return e.ref;if(r=Object.getOwnPropertyDescriptor(e,"ref")?.get,t=r&&"isReactWarning"in r&&r.isReactWarning,t)return e.props.ref;return e.props.ref||e.ref}(o);return t.cloneElement(o,{...h(n,o.props),ref:r?p(r,e):e})}return t.Children.count(o)>1?t.Children.only(null):null}));m.displayName="SlotClone";var g=({children:e})=>o.jsx(o.Fragment,{children:e});function b(e){return t.isValidElement(e)&&e.type===g}function h(e,r){const t={...r};for(const o in r){const n=e[o],a=r[o];/^on[A-Z]/.test(o)?n&&a?t[o]=(...e)=>{a(...e),n(...e)}:n&&(t[o]=n):"style"===o?t[o]={...n,...a}:"className"===o&&(t[o]=[n,a].filter(Boolean).join(" "))}return{...e,...t}}function f(e){var r,t,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e)if(Array.isArray(e)){var n=e.length;for(r=0;r<n;r++)e[r]&&(t=f(e[r]))&&(o&&(o+=" "),o+=t)}else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}function x(){for(var e,r,t=0,o="",n=arguments.length;t<n;t++)(e=arguments[t])&&(r=f(e))&&(o&&(o+=" "),o+=r);return o}const v=e=>"boolean"==typeof e?`${e}`:0===e?"0":e,y=x,w=e=>{const r=z(e),{conflictingClassGroups:t,conflictingClassGroupModifiers:o}=e;return{getClassGroupId:e=>{const t=e.split("-");return""===t[0]&&1!==t.length&&t.shift(),j(t,r)||N(e)},getConflictingClassGroupIds:(e,r)=>{const n=t[e]||[];return r&&o[e]?[...n,...o[e]]:n}}},j=(e,r)=>{if(0===e.length)return r.classGroupId;const t=e[0],o=r.nextPart.get(t),n=o?j(e.slice(1),o):void 0;if(n)return n;if(0===r.validators.length)return;const a=e.join("-");return r.validators.find((({validator:e})=>e(a)))?.classGroupId},k=/^\[(.+)\]$/,N=e=>{if(k.test(e)){const r=k.exec(e)[1],t=r?.substring(0,r.indexOf(":"));if(t)return"arbitrary.."+t}},z=e=>{const{theme:r,prefix:t}=e,o={nextPart:new Map,validators:[]};return A(Object.entries(e.classGroups),t).forEach((([e,t])=>{C(t,o,e,r)})),o},C=(e,r,t,o)=>{e.forEach((e=>{if("string"!=typeof e){if("function"==typeof e)return I(e)?void C(e(o),r,t,o):void r.validators.push({validator:e,classGroupId:t});Object.entries(e).forEach((([e,n])=>{C(n,E(r,e),t,o)}))}else{(""===e?r:E(r,e)).classGroupId=t}}))},E=(e,r)=>{let t=e;return r.split("-").forEach((e=>{t.nextPart.has(e)||t.nextPart.set(e,{nextPart:new Map,validators:[]}),t=t.nextPart.get(e)})),t},I=e=>e.isThemeGetter,A=(e,r)=>r?e.map((([e,t])=>[e,t.map((e=>"string"==typeof e?r+e:"object"==typeof e?Object.fromEntries(Object.entries(e).map((([e,t])=>[r+e,t]))):e))])):e,P=e=>{if(e<1)return{get:()=>{},set:()=>{}};let r=0,t=new Map,o=new Map;const n=(n,a)=>{t.set(n,a),r++,r>e&&(r=0,o=t,t=new Map)};return{get(e){let r=t.get(e);return void 0!==r?r:void 0!==(r=o.get(e))?(n(e,r),r):void 0},set(e,r){t.has(e)?t.set(e,r):n(e,r)}}},D=e=>{const{separator:r,experimentalParseClassName:t}=e,o=1===r.length,n=r[0],a=r.length,s=e=>{const t=[];let s,i=0,l=0;for(let p=0;p<e.length;p++){let d=e[p];if(0===i){if(d===n&&(o||e.slice(p,p+a)===r)){t.push(e.slice(l,p)),l=p+a;continue}if("/"===d){s=p;continue}}"["===d?i++:"]"===d&&i--}const d=0===t.length?e:e.substring(l),c=d.startsWith("!");return{modifiers:t,hasImportantModifier:c,baseClassName:c?d.substring(1):d,maybePostfixModifierPosition:s&&s>l?s-l:void 0}};return t?e=>t({className:e,parseClassName:s}):s},R=e=>{if(e.length<=1)return e;const r=[];let t=[];return e.forEach((e=>{"["===e[0]?(r.push(...t.sort(),e),t=[]):t.push(e)})),r.push(...t.sort()),r},S=/\s+/;function M(){let e,r,t=0,o="";for(;t<arguments.length;)(e=arguments[t++])&&(r=G(e))&&(o&&(o+=" "),o+=r);return o}const G=e=>{if("string"==typeof e)return e;let r,t="";for(let o=0;o<e.length;o++)e[o]&&(r=G(e[o]))&&(t&&(t+=" "),t+=r);return t};function O(e,...r){let t,o,n,a=function(i){const l=r.reduce(((e,r)=>r(e)),e());return t=(e=>({cache:P(e.cacheSize),parseClassName:D(e),...w(e)}))(l),o=t.cache.get,n=t.cache.set,a=s,s(i)};function s(e){const r=o(e);if(r)return r;const a=((e,r)=>{const{parseClassName:t,getClassGroupId:o,getConflictingClassGroupIds:n}=r,a=[],s=e.trim().split(S);let i="";for(let l=s.length-1;l>=0;l-=1){const e=s[l],{modifiers:r,hasImportantModifier:d,baseClassName:c,maybePostfixModifierPosition:p}=t(e);let u=Boolean(p),m=o(u?c.substring(0,p):c);if(!m){if(!u){i=e+(i.length>0?" "+i:i);continue}if(m=o(c),!m){i=e+(i.length>0?" "+i:i);continue}u=!1}const g=R(r).join(":"),b=d?g+"!":g,h=b+m;if(a.includes(h))continue;a.push(h);const f=n(m,u);for(let t=0;t<f.length;++t){const e=f[t];a.push(b+e)}i=e+(i.length>0?" "+i:i)}return i})(e,t);return n(e,a),a}return function(){return a(M.apply(null,arguments))}}const F=e=>{const r=r=>r[e]||[];return r.isThemeGetter=!0,r},W=/^\[(?:([a-z-]+):)?(.+)\]$/i,q=/^\d+\/\d+$/,B=new Set(["px","full","screen"]),_=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,$=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,V=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,L=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,T=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,Z=e=>H(e)||B.has(e)||q.test(e),J=e=>ie(e,"length",le),H=e=>Boolean(e)&&!Number.isNaN(Number(e)),U=e=>ie(e,"number",H),K=e=>Boolean(e)&&Number.isInteger(Number(e)),Q=e=>e.endsWith("%")&&H(e.slice(0,-1)),X=e=>W.test(e),Y=e=>_.test(e),ee=new Set(["length","size","percentage"]),re=e=>ie(e,ee,de),te=e=>ie(e,"position",de),oe=new Set(["image","url"]),ne=e=>ie(e,oe,pe),ae=e=>ie(e,"",ce),se=()=>!0,ie=(e,r,t)=>{const o=W.exec(e);return!!o&&(o[1]?"string"==typeof r?o[1]===r:r.has(o[1]):t(o[2]))},le=e=>$.test(e)&&!V.test(e),de=()=>!1,ce=e=>L.test(e),pe=e=>T.test(e),ue=O((()=>{const e=F("colors"),r=F("spacing"),t=F("blur"),o=F("brightness"),n=F("borderColor"),a=F("borderRadius"),s=F("borderSpacing"),i=F("borderWidth"),l=F("contrast"),d=F("grayscale"),c=F("hueRotate"),p=F("invert"),u=F("gap"),m=F("gradientColorStops"),g=F("gradientColorStopPositions"),b=F("inset"),h=F("margin"),f=F("opacity"),x=F("padding"),v=F("saturate"),y=F("scale"),w=F("sepia"),j=F("skew"),k=F("space"),N=F("translate"),z=()=>["auto",X,r],C=()=>[X,r],E=()=>["",Z,J],I=()=>["auto",H,X],A=()=>["","0",X],P=()=>[H,X];return{cacheSize:500,separator:":",theme:{colors:[se],spacing:[Z,J],blur:["none","",Y,X],brightness:P(),borderColor:[e],borderRadius:["none","","full",Y,X],borderSpacing:C(),borderWidth:E(),contrast:P(),grayscale:A(),hueRotate:P(),invert:A(),gap:C(),gradientColorStops:[e],gradientColorStopPositions:[Q,J],inset:z(),margin:z(),opacity:P(),padding:C(),saturate:P(),scale:P(),sepia:A(),skew:P(),space:C(),translate:C()},classGroups:{aspect:[{aspect:["auto","square","video",X]}],container:["container"],columns:[{columns:[Y]}],"break-after":[{"break-after":["auto","avoid","all","avoid-page","page","left","right","column"]}],"break-before":[{"break-before":["auto","avoid","all","avoid-page","page","left","right","column"]}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top",X]}],overflow:[{overflow:["auto","hidden","clip","visible","scroll"]}],"overflow-x":[{"overflow-x":["auto","hidden","clip","visible","scroll"]}],"overflow-y":[{"overflow-y":["auto","hidden","clip","visible","scroll"]}],overscroll:[{overscroll:["auto","contain","none"]}],"overscroll-x":[{"overscroll-x":["auto","contain","none"]}],"overscroll-y":[{"overscroll-y":["auto","contain","none"]}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[b]}],"inset-x":[{"inset-x":[b]}],"inset-y":[{"inset-y":[b]}],start:[{start:[b]}],end:[{end:[b]}],top:[{top:[b]}],right:[{right:[b]}],bottom:[{bottom:[b]}],left:[{left:[b]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",K,X]}],basis:[{basis:z()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",X]}],grow:[{grow:A()}],shrink:[{shrink:A()}],order:[{order:["first","last","none",K,X]}],"grid-cols":[{"grid-cols":[se]}],"col-start-end":[{col:["auto",{span:["full",K,X]},X]}],"col-start":[{"col-start":I()}],"col-end":[{"col-end":I()}],"grid-rows":[{"grid-rows":[se]}],"row-start-end":[{row:["auto",{span:[K,X]},X]}],"row-start":[{"row-start":I()}],"row-end":[{"row-end":I()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",X]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",X]}],gap:[{gap:[u]}],"gap-x":[{"gap-x":[u]}],"gap-y":[{"gap-y":[u]}],"justify-content":[{justify:["normal","start","end","center","between","around","evenly","stretch"]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal","start","end","center","between","around","evenly","stretch","baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":["start","end","center","between","around","evenly","stretch","baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[x]}],px:[{px:[x]}],py:[{py:[x]}],ps:[{ps:[x]}],pe:[{pe:[x]}],pt:[{pt:[x]}],pr:[{pr:[x]}],pb:[{pb:[x]}],pl:[{pl:[x]}],m:[{m:[h]}],mx:[{mx:[h]}],my:[{my:[h]}],ms:[{ms:[h]}],me:[{me:[h]}],mt:[{mt:[h]}],mr:[{mr:[h]}],mb:[{mb:[h]}],ml:[{ml:[h]}],"space-x":[{"space-x":[k]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[k]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",X,r]}],"min-w":[{"min-w":[X,r,"min","max","fit"]}],"max-w":[{"max-w":[X,r,"none","full","min","max","fit","prose",{screen:[Y]},Y]}],h:[{h:[X,r,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[X,r,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[X,r,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[X,r,"auto","min","max","fit"]}],"font-size":[{text:["base",Y,J]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",U]}],"font-family":[{font:[se]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractons"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",X]}],"line-clamp":[{"line-clamp":["none",H,U]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",Z,X]}],"list-image":[{"list-image":["none",X]}],"list-style-type":[{list:["none","disc","decimal",X]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[f]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[f]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:["solid","dashed","dotted","double","none","wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",Z,J]}],"underline-offset":[{"underline-offset":["auto",Z,X]}],"text-decoration-color":[{decoration:[e]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:C()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",X]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",X]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[f]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top",te]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",re]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},ne]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[g]}],"gradient-via-pos":[{via:[g]}],"gradient-to-pos":[{to:[g]}],"gradient-from":[{from:[m]}],"gradient-via":[{via:[m]}],"gradient-to":[{to:[m]}],rounded:[{rounded:[a]}],"rounded-s":[{"rounded-s":[a]}],"rounded-e":[{"rounded-e":[a]}],"rounded-t":[{"rounded-t":[a]}],"rounded-r":[{"rounded-r":[a]}],"rounded-b":[{"rounded-b":[a]}],"rounded-l":[{"rounded-l":[a]}],"rounded-ss":[{"rounded-ss":[a]}],"rounded-se":[{"rounded-se":[a]}],"rounded-ee":[{"rounded-ee":[a]}],"rounded-es":[{"rounded-es":[a]}],"rounded-tl":[{"rounded-tl":[a]}],"rounded-tr":[{"rounded-tr":[a]}],"rounded-br":[{"rounded-br":[a]}],"rounded-bl":[{"rounded-bl":[a]}],"border-w":[{border:[i]}],"border-w-x":[{"border-x":[i]}],"border-w-y":[{"border-y":[i]}],"border-w-s":[{"border-s":[i]}],"border-w-e":[{"border-e":[i]}],"border-w-t":[{"border-t":[i]}],"border-w-r":[{"border-r":[i]}],"border-w-b":[{"border-b":[i]}],"border-w-l":[{"border-l":[i]}],"border-opacity":[{"border-opacity":[f]}],"border-style":[{border:["solid","dashed","dotted","double","none","hidden"]}],"divide-x":[{"divide-x":[i]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[i]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[f]}],"divide-style":[{divide:["solid","dashed","dotted","double","none"]}],"border-color":[{border:[n]}],"border-color-x":[{"border-x":[n]}],"border-color-y":[{"border-y":[n]}],"border-color-s":[{"border-s":[n]}],"border-color-e":[{"border-e":[n]}],"border-color-t":[{"border-t":[n]}],"border-color-r":[{"border-r":[n]}],"border-color-b":[{"border-b":[n]}],"border-color-l":[{"border-l":[n]}],"divide-color":[{divide:[n]}],"outline-style":[{outline:["","solid","dashed","dotted","double","none"]}],"outline-offset":[{"outline-offset":[Z,X]}],"outline-w":[{outline:[Z,J]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:E()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[f]}],"ring-offset-w":[{"ring-offset":[Z,J]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:["","inner","none",Y,ae]}],"shadow-color":[{shadow:[se]}],opacity:[{opacity:[f]}],"mix-blend":[{"mix-blend":["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity","plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"]}],filter:[{filter:["","none"]}],blur:[{blur:[t]}],brightness:[{brightness:[o]}],contrast:[{contrast:[l]}],"drop-shadow":[{"drop-shadow":["","none",Y,X]}],grayscale:[{grayscale:[d]}],"hue-rotate":[{"hue-rotate":[c]}],invert:[{invert:[p]}],saturate:[{saturate:[v]}],sepia:[{sepia:[w]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[t]}],"backdrop-brightness":[{"backdrop-brightness":[o]}],"backdrop-contrast":[{"backdrop-contrast":[l]}],"backdrop-grayscale":[{"backdrop-grayscale":[d]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[c]}],"backdrop-invert":[{"backdrop-invert":[p]}],"backdrop-opacity":[{"backdrop-opacity":[f]}],"backdrop-saturate":[{"backdrop-saturate":[v]}],"backdrop-sepia":[{"backdrop-sepia":[w]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[s]}],"border-spacing-x":[{"border-spacing-x":[s]}],"border-spacing-y":[{"border-spacing-y":[s]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",X]}],duration:[{duration:P()}],ease:[{ease:["linear","in","out","in-out",X]}],delay:[{delay:P()}],animate:[{animate:["none","spin","ping","pulse","bounce",X]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[y]}],"scale-x":[{"scale-x":[y]}],"scale-y":[{"scale-y":[y]}],rotate:[{rotate:[K,X]}],"translate-x":[{"translate-x":[N]}],"translate-y":[{"translate-y":[N]}],"skew-x":[{"skew-x":[j]}],"skew-y":[{"skew-y":[j]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",X]}],accent:[{accent:["auto",e]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",X]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":C()}],"scroll-mx":[{"scroll-mx":C()}],"scroll-my":[{"scroll-my":C()}],"scroll-ms":[{"scroll-ms":C()}],"scroll-me":[{"scroll-me":C()}],"scroll-mt":[{"scroll-mt":C()}],"scroll-mr":[{"scroll-mr":C()}],"scroll-mb":[{"scroll-mb":C()}],"scroll-ml":[{"scroll-ml":C()}],"scroll-p":[{"scroll-p":C()}],"scroll-px":[{"scroll-px":C()}],"scroll-py":[{"scroll-py":C()}],"scroll-ps":[{"scroll-ps":C()}],"scroll-pe":[{"scroll-pe":C()}],"scroll-pt":[{"scroll-pt":C()}],"scroll-pr":[{"scroll-pr":C()}],"scroll-pb":[{"scroll-pb":C()}],"scroll-pl":[{"scroll-pl":C()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",X]}],fill:[{fill:[e,"none"]}],"stroke-w":[{stroke:[Z,J,U]}],stroke:[{stroke:[e,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}}));function me(...e){return ue(x(e))}const ge=(be="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",he={variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}},e=>{var r;if(null==(null==he?void 0:he.variants))return y(be,null==e?void 0:e.class,null==e?void 0:e.className);const{variants:t,defaultVariants:o}=he,n=Object.keys(t).map((r=>{const n=null==e?void 0:e[r],a=null==o?void 0:o[r];if(null===n)return null;const s=v(n)||v(a);return t[r][s]})),a=e&&Object.entries(e).reduce(((e,r)=>{let[t,o]=r;return void 0===o||(e[t]=o),e}),{}),s=null==he||null===(r=he.compoundVariants)||void 0===r?void 0:r.reduce(((e,r)=>{let{class:t,className:n,...s}=r;return Object.entries(s).every((e=>{let[r,t]=e;return Array.isArray(t)?t.includes({...o,...a}[r]):{...o,...a}[r]===t}))?[...e,t,n]:e}),[]);return y(be,n,s,null==e?void 0:e.class,null==e?void 0:e.className)});var be,he;const fe=t.forwardRef((({className:e,variant:r,size:t,asChild:n=!1,...a},s)=>{const i=n?u:"button";return o.jsx(i,{className:me(ge({variant:r,size:t,className:e})),ref:s,...a})}));fe.displayName="Button";const xe=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,ve=/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;function ye(e){if(!function(e){return ve.test(e)}(e))throw new Error("Invalid URL provided");return{href:e,target:"_blank",rel:"noopener noreferrer"}}const we=new class{constructor(){r(this,"attempts",new Map),r(this,"maxAttempts",3),r(this,"windowMs",9e5)}isAllowed(e){const r=Date.now(),t=(this.attempts.get(e)||[]).filter((e=>r-e<this.windowMs));return!(t.length>=this.maxAttempts)&&(t.push(r),this.attempts.set(e,t),!0)}},je=n.span`
  color: #1F2937;    /* Dark Slate */
  font-weight: 500;  /* Medium */
`,ke=n.span`
  /* Subtle gradient flair */
  background: linear-gradient(to right, #f97316, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;             /* Standard property for better browser support */
  font-weight: 700;  /* Bold */
`,Ne=n.p`
  margin-top: 12px;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.5px;
  color: #4B5563;
  font-weight: 500;
`,ze=n.div`
  width: 60px;
  height: 2px;
  background: linear-gradient(to right, #f97316, #f59e0b);
  margin: 8px auto;
`,Ce=n.p`
  font-size: 1.125rem;       /* 18px */
  font-weight: 500;          /* Harmonize with headings/CTAs */
  line-height: 1.75;         /* Airier legibility */
  max-width: 640px;          /* Constrain width */
  margin: 24px auto 36px;    /* 24px above, 36px below */
  text-align: center;
  color: #4B5563;            /* Muted slate gray */
`,Ee=n.div`
  display: flex;
  flex-direction: row;       /* Force horizontal layout */
  flex-wrap: nowrap;         /* Prevent buttons from stacking */
  justify-content: center;
  gap: 20px;                 /* Space between buttons */
  margin-top: 24px;
  
  @media (max-width: 640px) {
    padding-left: 32px;      /* Increased space from screen edges */
    padding-right: 32px;
    gap: 16px;               /* Reduce gap between buttons */
    
    /* Make buttons more compact */
    a {
      font-size: 0.875rem !important;  /* Smaller text */
      padding: 8px 16px !important;    /* Reduced padding */
    }
  }
`,Ie=n.div`
  display: flex;
  flex-direction: row;       /* Force horizontal layout */
  flex-wrap: nowrap;         /* Prevent buttons from stacking */
  gap: 24px;                 /* gap-6 equivalent */
  justify-content: center;
  align-items: center;
  
  @media (max-width: 640px) {
    padding-left: 32px;      /* Increased space from screen edges */
    padding-right: 32px;
    gap: 16px;               /* Reduce gap between buttons */
    
    /* Make buttons more compact */
    button {
      font-size: 0.875rem !important;  /* Smaller text */
      padding: 8px 16px !important;    /* Reduced padding */
    }
  }
`,Ae=n.a`
  background-color: #0a66c2;
  color: #fff;
  border-radius: 9999px;            /* Pill shape */
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 8px;                         /* Icon + text spacing */
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: #004182;
    transform: scale(1.05);
    box-shadow: 0 10px 25px rgba(10, 102, 194, 0.25);
  }
`,Pe=n.div`
  position: relative;
  width: 256px;                      /* w-64 equivalent */
  height: 256px;                     /* h-64 equivalent */
  margin: 0 auto 32px auto;         /* mx-auto mb-8 equivalent */
  
  /* Subtle orange radial glow behind the photo */
  &::before {
    content: '';
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    border-radius: 50%;
    background: radial-gradient(
      circle at center,
      rgba(234, 88, 12, 0.15) 0%,
      transparent 60%
    );
    z-index: -1;
  }
`;n.img`
  display: block;
  max-width: 200px;                  /* Appropriate size for project title */
  height: auto;
  margin-bottom: 8px;                /* Match the h3's bottom margin */
  transition: all 0.3s ease;
  
  /* Inherit parent's hover color transition */
  filter: brightness(1);
  
  .group:hover & {
    filter: brightness(1.1) saturate(1.2);
  }
`;const De=n.h2`
  font-size: 2.5rem;                 /* text-4xl equivalent */
  /* Subtle gradient flair */
  background: linear-gradient(to right, #f97316, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;             /* Standard property for better browser support */
  letter-spacing: 0.5px;             /* Add letter spacing */
  font-weight: 700;                  /* Increase weight to bold */
  margin-bottom: 1rem;               /* mb-4 equivalent */
  text-align: center;
  
  @media (min-width: 768px) {
    font-size: 3rem;                 /* md:text-5xl equivalent */
    margin-bottom: 2rem;             /* md:mb-8 equivalent */
  }
`,Re=n.div`
  text-align: center;
  margin-bottom: 4rem;               /* mb-16 equivalent */
  
  h2 {
    margin-bottom: 8px;              /* Reduced spacing: 8-12px */
  }
`,Se=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 48px;                /* Increased horizontal padding */
  max-width: 800px;                  /* Constrained width */
  margin: 0 auto;                    /* Center the card */
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid #D1D5DB;
  border-radius: 1rem;
  transition: all 0.5s ease;
  
  &:hover {
    border-color: rgba(234, 88, 12, 0.5);
    transform: scale(1.05);
    box-shadow: 0 25px 50px rgba(234, 88, 12, 0.2);
  }
`,Me=n.div`
  text-align: center;
  width: 100%;
  
  .project-description {
    color: #6B7280;
    line-height: 1.6;
    margin: 16px 0;
    text-align: center;
  }
  
  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin: 16px 0;
    text-align: center;
  }
  
  .view-link {
    text-align: center;
  }
`,Ge=n.div`
  width: 100%;
  height: 1px;
  background-color: #E5E7EB;
  margin: 8px 0;
`,Oe=n.img`
  display: block;
  max-width: 300px;                  /* Enlarged from 200px for greater prominence */
  height: auto;
  margin: 0 auto 8px auto;           /* Center and add bottom margin */
  transition: all 0.3s ease;
  filter: brightness(1);
  
  &:hover {
    filter: brightness(1.1) saturate(1.2);
  }
`,Fe=()=>o.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-900 overflow-hidden",children:[o.jsxs("div",{className:"fixed inset-0 overflow-hidden pointer-events-none",children:[o.jsx("div",{className:"absolute -top-40 -right-40 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"}),o.jsx("div",{className:"absolute -bottom-40 -left-40 w-80 h-80 bg-gray-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse",style:{animationDelay:"2s"}}),o.jsx("div",{className:"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse",style:{animationDelay:"4s"}})]}),o.jsxs("div",{className:"relative z-10",children:[o.jsx("section",{className:"min-h-screen flex items-center justify-center px-6",children:o.jsxs("div",{className:"text-center space-y-8 max-w-4xl mx-auto",children:[o.jsxs(Pe,{children:[o.jsx("div",{className:"absolute inset-0 bg-white rounded-full animate-pulse border-4 border-gray-300",style:{animation:"borderPulse 3s ease-in-out infinite"}}),o.jsx("div",{className:"absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden",children:o.jsx("img",{src:"/images/profile-C6aDWNrf.jpg",alt:"Jeffrey Escobar Profile",className:"w-full h-full object-cover rounded-full",loading:"eager",decoding:"async"})})]}),o.jsxs("div",{className:"space-y-5",children:[o.jsxs("h1",{className:"text-5xl md:text-8xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-gray-700 bg-clip-text text-transparent animate-fade-in leading-normal pb-2 whitespace-nowrap",children:[o.jsx(je,{children:"Jeffrey"})," ",o.jsx(ke,{children:"Escobar"})]}),o.jsxs("div",{className:"animate-fade-in",style:{animationDelay:"0.5s"},children:[o.jsx(Ne,{children:"SWE | Founder | Technologist"}),o.jsx(ze,{})]}),o.jsx(Ce,{className:"animate-fade-in",style:{animationDelay:"1s"},children:"Driven by vision. Built on discipline. Engineering elegant systems with clarity and control."})]}),o.jsx(Ee,{className:"animate-fade-in",style:{animationDelay:"1.5s",justifyContent:"center"},children:o.jsxs(Ae,{href:"https://linkedin.com/in/jeffreyiescobar",target:"_blank",rel:"noopener noreferrer",children:[o.jsx(a,{className:"w-5 h-5"}),"LinkedIn"]})})]})}),o.jsx("section",{className:"py-20 px-6",children:o.jsxs("div",{className:"max-w-6xl mx-auto",children:[o.jsxs(Re,{children:[o.jsx(De,{children:"Featured Project"}),o.jsx(Ce,{children:"Showcasing my latest work"})]}),o.jsx("div",{className:"max-w-4xl mx-auto",children:o.jsx(Se,{className:"group",children:o.jsxs(Me,{children:[o.jsx(Oe,{src:"/images/FRED-0eV_nKoH.png",alt:"FRED AI Visualizer Logo",loading:"lazy",decoding:"async"}),o.jsx(Ge,{}),o.jsx("p",{className:"project-description",children:"A powerful web app that transforms raw Federal Reserve Economic Data (FRED) into clear, interactive insights. It pulls live data directly from FRED and uses the latest GPT-4o model to deliver smart, real-time analysis. With a user-friendly interface, accurate charts for every dataset, and an integrated AI chatbot that answers questions about any FRED data, it makes economic understanding faster, sharper, and more accessible."}),o.jsxs("div",{className:"tech-tags",children:[o.jsx("span",{className:"px-3 py-1 bg-orange-500/20 text-orange-600 rounded-full text-sm",children:"React"}),o.jsx("span",{className:"px-3 py-1 bg-orange-500/20 text-orange-600 rounded-full text-sm",children:"JavaScript"}),o.jsx("span",{className:"px-3 py-1 bg-orange-500/20 text-orange-600 rounded-full text-sm",children:"Go"}),o.jsx("span",{className:"px-3 py-1 bg-orange-500/20 text-orange-600 rounded-full text-sm",children:"D3.js"}),o.jsx("span",{className:"px-3 py-1 bg-orange-500/20 text-orange-600 rounded-full text-sm",children:"Chart.js"}),o.jsx("span",{className:"px-3 py-1 bg-orange-500/20 text-orange-600 rounded-full text-sm",children:"Tailwind CSS"}),o.jsx("span",{className:"px-3 py-1 bg-orange-500/20 text-orange-600 rounded-full text-sm",children:"FRED API"}),o.jsx("span",{className:"px-3 py-1 bg-orange-500/20 text-orange-600 rounded-full text-sm",children:"OpenAI API"})]}),o.jsx("div",{className:"view-link",children:o.jsxs(fe,{onClick:()=>{window.open("https://github.com/JeffreyEscobar","_blank")},variant:"ghost",className:"text-orange-600 hover:text-gray-900 hover:bg-orange-500/20 p-0 h-auto font-semibold group/btn",children:["View Project",o.jsx(s,{className:"w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform"})]})})]})})})]})}),o.jsx("section",{className:"py-20 px-6",children:o.jsxs("div",{className:"max-w-4xl mx-auto text-center",children:[o.jsx(De,{children:"About Me"}),o.jsx(Ce,{children:"I'm a software engineer with the mind of a founder. Driven by vision. Disciplined by detail. I learned to code because I couldn't stand watching good ideas die in my head. Now I bring them to life with precision and intent. I live by one principle: action without a plan is a nightmare. A plan without action is just a daydream. I focus on building with purpose, staying clear on what matters, and letting the results speak for themselves."}),o.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:[o.jsxs("div",{className:"bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-300 hover:border-orange-500/50 transition-all duration-300 hover:scale-105",children:[o.jsx("div",{className:"bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-xl w-fit mx-auto mb-4",children:o.jsx(i,{className:"w-8 h-8 text-white"})}),o.jsx("h3",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Engineering"}),o.jsx("p",{className:"text-gray-600",children:"End-to-end software systems built with precision, speed, and modern frameworks."})]}),o.jsxs("div",{className:"bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-300 hover:border-orange-500/50 transition-all duration-300 hover:scale-105",style:{animationDelay:"0.2s"},children:[o.jsx("div",{className:"bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-xl w-fit mx-auto mb-4",children:o.jsx(l,{className:"w-8 h-8 text-white"})}),o.jsx("h3",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Product Thinking"}),o.jsx("p",{className:"text-gray-600",children:"Designing clean, intuitive interfaces rooted in real user behavior."})]}),o.jsxs("div",{className:"bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-300 hover:border-orange-500/50 transition-all duration-300 hover:scale-105",style:{animationDelay:"0.4s"},children:[o.jsx("div",{className:"bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-xl w-fit mx-auto mb-4",children:o.jsx(d,{className:"w-8 h-8 text-white"})}),o.jsx("h3",{className:"text-xl font-semibold text-gray-900 mb-3",children:"Exploration"}),o.jsx("p",{className:"text-gray-600",children:"Pushing boundaries with new tools, technologies, and smarter solutions."})]})]})]})}),o.jsx("section",{className:"py-20 px-6",children:o.jsxs("div",{className:"max-w-4xl mx-auto text-center",children:[o.jsx(De,{children:"Let's Connect"}),o.jsx(Ce,{children:"Open to meaningful collaborations and new opportunities. If something resonates, feel free to reach out!"}),o.jsxs(Ie,{children:[o.jsxs(fe,{onClick:()=>{try{const e=ye("https://linkedin.com/in/jeffreyiescobar");if(!we.isAllowed("linkedin"))return void alert("Too many contact attempts. Please wait before trying again.");window.open(e.href,e.target)}catch(e){console.error("Invalid LinkedIn URL")}},className:"bg-[#0a66c2] hover:bg-[#004182] text-white px-12 py-4 rounded-full flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 text-lg",children:[o.jsx(a,{className:"w-6 h-6"}),"LinkedIn"]}),o.jsxs(fe,{onClick:()=>{const e="jeffreyescobar280@gmail.com";!function(e){const r=e.toLowerCase().trim(),t=r.indexOf("@");if(-1===t)return!1;const o=r.substring(0,t);return!(o.includes("..")||o.startsWith(".")||o.endsWith("."))&&xe.test(r)}(e)?console.error("Invalid email address"):we.isAllowed("email")?window.location.href=`mailto:${e}`:alert("Too many contact attempts. Please wait before trying again.")},variant:"outline",className:"border-2 border-gray-400 text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-12 py-4 rounded-full flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gray-500/30 text-lg",children:[o.jsx(c,{className:"w-6 h-6"}),"Email Me"]})]})]})}),o.jsx("footer",{className:"py-8 px-6 border-t border-gray-300/50",children:o.jsx("div",{className:"max-w-4xl mx-auto text-center",children:o.jsx("p",{className:"text-gray-500",children:"Jeffrey Escobar © 2025. All rights reserved."})})})]})]});export{Fe as default};
