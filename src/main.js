import { getImages } from './js/pixabay-api';
import { renderImages } from './js/render-function';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const list = document.querySelector('.list');
const loader = document.querySelector('.box__loader');
const buttonLoadMore = document.querySelector('.load-button');

let page = 1;
let value = '';
let totalImages = 0;
let counter = 0;
const reset = () => {
  page = 1;
  totalImages = 0;
  counter = 0;
};
const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionsDelay: 250,
});

form.addEventListener('submit', e => {
  e.preventDefault();
  loader.classList.toggle('hidden');
  value = form.elements.search.value.trim();
  reset();

  if (value === '') {
    loader.classList.toggle('hidden');
    return iziToast.warning({
      message: 'Please try again! Write something.',
      position: 'topRight',
      color: 'orange',
    });
  }

  const getPhoto = async () => {
    try {
      const data = await getImages(value);

      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          color: 'red',
          position: 'topRight',
        });
        loader.classList.toggle('hidden');
        return;
      }

      if (data.total > 15) {
        buttonLoadMore.classList.remove('hidden');
        totalImages = data.total;
        counter += 15;
      }

      loader.classList.toggle('hidden');
      list.innerHTML = renderImages(data.hits);
      lightbox.refresh();
    } catch (error) {
      console.error(error);
      loader.classList.toggle('hidden');
    }
  };
  getPhoto();

  e.target.reset();
});

buttonLoadMore.addEventListener('click', async () => {
  try {
    const data = await getImages(value, (page += 1));
    list.insertAdjacentHTML('beforeend', renderImages(data.hits));
    counter += 15;
    lightbox.refresh();

    if (counter > totalImages) {
      buttonLoadMore.classList.add('hidden');
    }
  } catch (error) {
    console.error(error);
  }
});

console.log('hello');
