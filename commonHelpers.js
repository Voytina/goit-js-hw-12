import{a as S,S as w,i as u}from"./assets/vendor-f736e62a.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();async function g(s,r=1){const o="https://pixabay.com/api/",i=new URLSearchParams({key:"43216493-c3660c641d44e8d68813e69e4",q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:15}),e=`${o}?${i}`;try{return(await S(e)).data}catch(t){console.log(t)}}function h(s){return s.map(({largeImageURL:r,webformatURL:o,tags:i,likes:e,views:t,comments:n,downloads:b})=>`<li class="list-item">
     <a class="gallery-link" href ="${r}">
     <img src="${o}" alt="${i}" class="gallery-image"
     </a>
     
      <ul class="information-list">
        <li class="item-information-container">
          <h2 class="main-info">Likes </h2>
            <p class="info">${e}</p>
          
        </li>
        <li class="item-information-container">
          <h2 class="main-info"> Views</h2>
            <p class="info">${t}</p>
          
        </li>
        <li class="item-information-container">
          <h2 class="main-info">Comments </h2>
            <p class="info">${n}</p>
          
        </li>
        <li class="item-information-container">
          <h2 class="main-info">Downloads </h2>
            <p class="info">${b}</p>
        </li>
      </ul>
   
    </li>`).join("")}const f=document.querySelector(".form"),p=document.querySelector(".list"),a=document.querySelector(".box__loader"),d=document.querySelector(".load-button");let y=1,l="",m=0,c=0;const P=()=>{y=1,m=0,c=0},L=new w(".gallery-link",{captionsData:"alt",captionsDelay:250});f.addEventListener("submit",s=>{if(s.preventDefault(),a.classList.toggle("hidden"),l=f.elements.search.value.trim(),P(),l==="")return a.classList.toggle("hidden"),u.warning({message:"Please try again! Write something.",position:"topRight",color:"orange"});(async()=>{try{const o=await g(l);if(o.hits.length===0){u.error({message:"Sorry, there are no images matching your search query. Please try again!",color:"red",position:"topRight"}),a.classList.toggle("hidden");return}o.total>15&&(d.classList.remove("hidden"),m=o.total,c+=15),a.classList.toggle("hidden"),p.innerHTML=h(o.hits),L.refresh()}catch(o){console.error(o),a.classList.toggle("hidden")}})(),s.target.reset()});d.addEventListener("click",async()=>{try{const s=await g(l,y+=1);p.insertAdjacentHTML("beforeend",h(s.hits)),c+=15,L.refresh(),c>m&&d.classList.add("hidden")}catch(s){console.error(s)}});
//# sourceMappingURL=commonHelpers.js.map
