import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import createGallery from './createCard';
import getPhoto from './getPhoto';

const { form, input, gallery, getMoreButton } = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  getMoreButton: document.querySelector('[name = "get__more"]'),
};

let page = 1;

form.addEventListener('submit', onFormSubmitHandler);
getMoreButton.addEventListener('click', getMoreImageHandler);

async function onFormSubmitHandler(e) {
  e.preventDefault();
  const name = input.value;
  page = 1;
  gallery.innerHTML = '';
  getMoreButton.classList.add('hidden');
  try {
    const { data } = await getPhoto(name, page);
    const { hits, totalHits } = data;

    if (totalHits === 0) {
      Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
      return;
    }
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
    totalHits > 40 ? getMoreButton.classList.remove('hidden') : null;

    hits.map(item => {
      const card = createGallery(item);
      gallery.insertAdjacentHTML('beforeend', card);
    });

    let Lightbox = new SimpleLightbox('.photo-card a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
  } catch (error) {
    console.log(error);
  }
}

async function getMoreImageHandler(e) {
  page += 1;
  const name = input.value;
  try {
    const { data } = await getPhoto(name, page);
    const { hits, totalHits } = data;
    console.log(totalHits);
    console.log(hits);
    if (hits.length < 40) {
      Notiflix.Notify.failure(
        `We're sorry, but you've reached the end of search results.`
      );
      getMoreButton.classList.add('hidden');
    }

    hits.map(item => {
      const card = createGallery(item);
      gallery.insertAdjacentHTML('beforeend', card);
    });
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
      `We're sorry, but you've reached the end of search results.`
    );
    getMoreButton.classList.add('hidden');
    return;
  }
  scroll();
}

function scroll() {
  setTimeout(() => {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }, 500);
}
