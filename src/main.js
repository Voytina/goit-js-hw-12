import { getImages } from './js/pixabay-api';
import { renderImages } from './js/render-function';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const list = document.querySelector('.list');
const loader = document.querySelector('.box__loader');





const lightbox = new SimpleLightbox('.gallery-link', {
        captionsData: 'alt',
        captionsDelay: 250,
        });

form.addEventListener('submit', (e) => {

    e.preventDefault();
loader.classList.toggle("hidden")
    const value = form.elements.search.value.trim();
    if (value === '') {
    loader.classList.toggle('hidden');
     return iziToast.warning({message: "Please try again! Write something.", position: "topRight", color: "orange"})
    }
    

    getImages(value)
        .then(data => {

            if (data.hits.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    color: 'red',
                    position: 'topRight',
                })
                loader.classList.toggle('hidden');
                return;
            }

        loader.classList.toggle('hidden');
        const showApi = renderImages(data.hits);
        list.innerHTML = showApi;
        lightbox.refresh();
        }).catch(error => {
            loader.classList.toggle("hidden")
        console.error('Error', error);
    })
  
    e.target.reset()   

})


