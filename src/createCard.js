export default function createGallery({
  webformatURL,
  largeImageURL,
  likes,
  tags,
  views,
  comments,
  downloads,
}) {
  const card = `<div class="photo-card">
    <a class="gallery__item" href="${largeImageURL}">
    <img class="gallery__image"src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
    <div class="info-item likes">
    <span>Likes:</span>
    <span>${likes}</span>
    </div>
    <div class="info-item views">
    <span>Views:</span>
    <span>${views}</span>
    </div>
    <div class="info-item comments">
    <span>Comments:</span>
    <span>${comments}</span>
    </div>
    <div class="info-item downloads">
    <span>Downloads:</span>
    <span>${downloads}</span>
    </div>
     </div>
  </div> `;
  return card;
}
