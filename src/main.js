import iziToast from 'izitoast';
import {
  MESSAGES,
  MESSAGES_BG_COLORS,
  showInfoMessage,
} from './js/message-izi.js';
import { getGalleryData } from './js/paxabay-api.js';
import { renderGallery, validateGalleryData } from './js/render-functions.js';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  iziToast.destroy();
  gallery.innerHTML = '';
  showLoader();

  const formData = new FormData(event.target);
  const { search } = Object.fromEntries(formData.entries());

  if (!search.trim()) {
    showInfoMessage(MESSAGES.info, MESSAGES_BG_COLORS.red);
    gallery.innerHTML = '';
    hideLoader();
    return;
  }

  getGalleryData(search.trim())
    .then(galleryData => {
      if (validateGalleryData(galleryData)) {
        renderGallery(galleryData, gallery);
      }
    })
    .catch(error => {
      showInfoMessage(MESSAGES.exception + error, MESSAGES_BG_COLORS.orange);
    })
    .finally(() => {
      hideLoader(); // Сховати завантажувач
      event.target.reset();
    });
}

function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.remove('is-hidden');
  }
}

function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('is-hidden');
  }
}
