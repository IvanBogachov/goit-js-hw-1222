import{i as d,S as m}from"./assets/vendor-f33cd494.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();const s={info:"Please enter a value in the search field!",warning:"Sorry, there are no images matching your search query. Please try again!",error:"Sorry, there are no connection to the server. Please try again later! ",exception:"Exception: We have some issue with connection. Please try again later! "},l={green:"#59a10d",orange:"#ffa000",red:"#ef4040"};function c(e,t){d.info({position:"topRight",backgroundColor:`${t}`,message:`${e}`})}const p={method:"GET"},h="45418693-8ae3627eda45814ae2d20cf49",y="https://pixabay.com/api/?";function S(e){const t=new URLSearchParams({key:h,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(y+t,p).then(o=>o.ok?o.json():(c(s.error,l.orange),null)).catch(o=>(c(`${s.exception} ERROR:  ${o}`,l.orange),null))}const L=new m(".gallery a",{captionsData:"alt",captionDelay:250});function E(e,t){t.innerHTML=$(e),L.refresh()}function $(e){return e.hits.map(({webformatURL:t,largeImageURL:o,tags:i,likes:r,views:n,comments:a,downloads:g})=>`
            <li class="gallery-item hvr-grow">
                <a class="gallery-link" href="${o}">
                    <figure class="gallery-figure ">
                        <img class="gallery-image" src="${t}" alt="${i}" loading="lazy">
                        <figcaption class="gallery-figcaption">
                            <ul class="img-content-wrapper">
                                <li>Likes<span>${r}</span></li>
                                <li>Views<span>${n}</span></li>
                                <li>Comments<span>${a}</span></li>
                                <li>Downloads<span>${g}</span></li>
                            </ul>
                        </figcaption>
                    </figure>
                </a>
            </li>
          `).join("")}function w(e){return e?e&&e.totalHits===0?(showInfoMessage(MESSAGES.warning,MESSAGES_BG_COLORS.red),gallery.innerHTML="",!1):!0:(gallery.innerHTML="",!1)}const M=document.querySelector(".search-form"),f=document.querySelector(".gallery");M.addEventListener("submit",O);function O(e){e.preventDefault(),d.destroy(),f.innerHTML="",P();const t=new FormData(e.target),{search:o}=Object.fromEntries(t.entries());if(!o.trim()){c(s.info,l.red),f.innerHTML="",u();return}S(o.trim()).then(i=>{w(i)&&E(i,f)}).catch(i=>{c(s.exception+i,l.orange)}).finally(()=>{u(),e.target.reset()})}function P(){const e=document.querySelector(".loader");e&&e.classList.remove("is-hidden")}function u(){const e=document.querySelector(".loader");e&&e.classList.add("is-hidden")}
//# sourceMappingURL=commonHelpers.js.map
