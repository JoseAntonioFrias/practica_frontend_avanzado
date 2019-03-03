import { scrollTop } from 'components/footer/footer';

const isLiked = id => localStorage.getItem(`article-${id}`);

const toggleLike = (id) => {
  const likeValue = isLiked(id);

  let updateLike = 0;
  if (parseInt(likeValue) === 0) {
    updateLike = 1;
  } else if (parseInt(likeValue) === 1) {
    updateLike = 0;
  }

  localStorage.setItem(`article-${id}`, updateLike);

  // Actualizamos el numero
  const numLikes = document.getElementById('num-likes');
  numLikes.innerHTML = `${updateLike} me gusta`;

};

const setInitialLikeValue = (likeButton, id) => {
  const articleLikes = isLiked(id);

  if (articleLikes === null){
    localStorage.setItem(`article-${id}`, '0');
    likeButton.children[0].classList.add('far');
  }
};

/**
 *
 * @param {*} param0
 */
export const updateArticleDetail = ({
  title,
  author_name,
  image_url,
  video_url,
  paragraphs,
  id
} = { title: 'No title', author_name: 'No author' }) => {
  //contenedor del articulo
  const divArticleDetail = document.getElementById('article-detail');

  //titulo
  const divTitleContainer = document.createElement('div');
  divTitleContainer.classList.add('title-container-detail');

  const h2Title = document.createElement('h1');
  h2Title.classList.add('article-title');
  h2Title.setAttribute('title', 'article title');
  h2Title.innerHTML = `${title}`;


  const articleHeader = document.createElement('div');
  articleHeader.classList.add('article-header');

  //Logo de los "I like"
  const btnLikes = document.createElement('button');
  btnLikes.setAttribute('id', 'like-button');
  btnLikes.classList.add('like-button-detail');

  const iTag = document.createElement('i');
  const arrStyles = ['far', 'fa-heart'];
  iTag.classList.add(...arrStyles);

  btnLikes.appendChild(iTag);

  const pTxtILike = document.createElement('p');
  pTxtILike.setAttribute('id', 'num-likes');
  let numLikes = localStorage.getItem(`article-${id}`);

  pTxtILike.innerHTML =`${numLikes || 0} me gusta`;

  const divLikes = document.createElement('div');
  divLikes.classList.add('article-likes');
  divLikes.appendChild(btnLikes);
  divLikes.appendChild(pTxtILike);

   //párrafo autor
   const pAuthor = document.createElement('p');
   pAuthor.classList.add('article-author-detail');
   pAuthor.innerHTML = `${author_name}`;

  articleHeader.appendChild(divTitleContainer);
   //imagen
  const imgArticleLarge = document.createElement('img');
  if (image_url) {
    const image = image_url;
    imgArticleLarge.setAttribute('src', image);
    imgArticleLarge.setAttribute('alt', 'Imagen del artículo grande');
    imgArticleLarge.classList.add('article-image-detail');
    articleHeader.appendChild(imgArticleLarge);
  }

  //video
  const video = document.createElement('video');
  if (video_url) {
    video.setAttribute('controls', true);
    video.setAttribute('alt', 'video del artículo');
    video.classList.add('article-video-detail');
    const source = document.createElement('source');
    source.setAttribute('src', video_url);
    source.setAttribute('alt', 'Video del artículo');
    video.appendChild(source);
    articleHeader.appendChild(video);
  }

  // botón de volver
  const divBtnVolver = document.createElement('div');

  const linkBtnGoBack = document.createElement('a');
  linkBtnGoBack.setAttribute('href', 'javascript:history.back()');
  linkBtnGoBack.classList.add('back');

  linkBtnGoBack.innerHTML = '<i class="fas fa-chevron-left"></i> Volver al Inicio';

  //Parrafos
  paragraphs = paragraphs || '';

  const divDescription = document.createElement('div');
  divDescription.classList.add('article-detail-description');
  divDescription.innerHTML = `${paragraphs}`;
  divDescription.appendChild(divLikes);

  divTitleContainer.appendChild(h2Title);
  divTitleContainer.appendChild(pAuthor);
  divTitleContainer.appendChild(linkBtnGoBack);

  divArticleDetail.appendChild(articleHeader);
  divArticleDetail.appendChild(divBtnVolver);
  divArticleDetail.appendChild(divDescription);

  //llama al contrendor de likes
  const likeButton = document.getElementById('like-button');
  setInitialLikeValue(likeButton, id);

  likeButton.addEventListener('click', () => {
    likeButton.children[0].classList.toggle('fas');
    toggleLike(id);
  });
};

// arranca la función del footer para el botón del scrollTop
scrollTop();

export default {
  updateArticleDetail
};
