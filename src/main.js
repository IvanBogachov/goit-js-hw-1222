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
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = '';
let currentPage = 1;

form.addEventListener('submit', onSubmitForm);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSubmitForm(event) {
  event.preventDefault();

  iziToast.destroy();
  gallery.innerHTML = '';
  showLoader();

  const formData = new FormData(event.target);
  searchQuery = formData.get('search').trim();

  if (!searchQuery) {
    showInfoMessage(MESSAGES.info, MESSAGES_BG_COLORS.red);
    hideLoader();
    return;
  }

  currentPage = 1;
  loadMoreBtn.classList.add('is-hidden');

  try {
    const galleryData = await getGalleryData(searchQuery, currentPage);
    if (validateGalleryData(galleryData)) {
      renderGallery(galleryData, gallery);
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    showInfoMessage(MESSAGES.exception + error, MESSAGES_BG_COLORS.orange);
  } finally {
    hideLoader();
    event.target.reset();
  }
}

async function onLoadMore() {
  currentPage += 1;
  showLoader();

  try {
    const galleryData = await getGalleryData(searchQuery, currentPage);
    if (validateGalleryData(galleryData)) {
      renderGallery(galleryData, gallery, true);
      smoothScroll();
    }

    if (galleryData.hits.length < 15) {
      loadMoreBtn.classList.add('is-hidden');
      showInfoMessage(MESSAGES.endOfSearch, MESSAGES_BG_COLORS.orange);
    }
  } catch (error) {
    showInfoMessage(MESSAGES.exception + error, MESSAGES_BG_COLORS.orange);
  } finally {
    hideLoader();
  }
}

// function smoothScroll() {
//   const { height: cardHeight } = document
//     .querySelector('.gallery')
//     .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }

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
