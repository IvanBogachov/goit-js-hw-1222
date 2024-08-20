import SimpleLightbox from 'simplelightbox';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const gallery = document.querySelector('.gallery');

export function renderGallery(data, tagToInsert, append = false) {
  const markupString = markup(data);
  if (append) {
    tagToInsert.insertAdjacentHTML('beforeend', markupString);
  } else {
    tagToInsert.innerHTML = markupString;
  }

  lightbox.refresh();
}

function markup(data) {
  return data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
            <li class="gallery-item hvr-grow">
                <a class="gallery-link" href="${largeImageURL}">
                    <figure class="gallery-figure ">
                        <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy">
                        <figcaption class="gallery-figcaption">
                            <ul class="img-content-wrapper">
                                <li>Likes<span>${likes}</span></li>
                                <li>Views<span>${views}</span></li>
                                <li>Comments<span>${comments}</span></li>
                                <li>Downloads<span>${downloads}</span></li>
                            </ul>
                        </figcaption>
                    </figure>
                </a>
            </li>
          `
    )
    .join('');
}
export function validateGalleryData(galleryData, gallery) {
  if (!galleryData) {
    gallery.innerHTML = '';
    return false;
  } else if (galleryData && galleryData.totalHits === 0) {
    showInfoMessage(MESSAGES.warning, MESSAGES_BG_COLORS.red);
    gallery.innerHTML = '';
    return false;
  } else {
    return true;
  }
}