/**
 * Función que nos devuelve la cadena de la fecha de publicación.
 * @param {String} publicationDate
 */
const calcTimePublication = (publicationDate) => {
  // valores temporales en milisegundos
  const milisegsPorMinuto = 1000 * 60;
  const milisegsPorHora = milisegsPorMinuto * 60;
  const milisegsPorDia = milisegsPorHora * 24;
  const milisegsPorAnyo = milisegsPorDia * 365;

  //Fecha actual en milisegundos.
  let today = new Date().getTime();

  //Convertimos la fecha de publicación a Date para poder realizar operaciones.
  let publicationDateConverted = convertStringToDate(publicationDate);

  // Restamos la fecha de publicación y la fecha actual
  let timeLeft = today - publicationDateConverted;

  //calculamos los años, dias, horas y minutos de diferencia.
  let years = Math.floor(timeLeft / milisegsPorAnyo);
  timeLeft = timeLeft - (years * milisegsPorAnyo);

  let days = Math.floor(timeLeft / milisegsPorDia);
  timeLeft = timeLeft - (days * milisegsPorDia);

  let hours = Math.floor(timeLeft / milisegsPorHora);
  timeLeft = timeLeft - (hours * milisegsPorHora);

  let minutes = Math.floor(timeLeft / milisegsPorMinuto);
  timeLeft = timeLeft - (minutes * milisegsPorMinuto);

  var seconds = Math.floor(timeLeft / 1000);

  //Si es el mismo año y día devolvemos horas y minutos, sino la fecha completa.
  let stringResult = 'Publicado ';
  if (years <= 0 && days <= 0 && hours > 0) {
    stringResult += `hace ${hours} horas y ${minutes} minutos.`;
  } else if (years <= 0 && days <= 0 && hours <= 0 && minutes > 0) {
    stringResult += `hace ${minutes} minutos y ${seconds} segundos.`;
  } else if (years <= 0 && days <= 0 && hours <= 0 && minutes <= 0 && seconds > 0) {
    stringResult += `hace ${seconds} segundos.`;
  } else {
    stringResult += `el ${publicationDate}`;
  }

  return stringResult;

}

/**
 * función que convierte una fecha en formato String en una fecha en formato Date(milisegundos)
 * @param {String} dateString
 */
function convertStringToDate(dateString) {
  let [dateInfo, timeInfo] = dateString.split(' ');
  let [hours, mins, secs] = timeInfo.split(':');
  let [day, month, year] = dateInfo.split('/');

  let date = new Date();
  date.setDate(day);
  date.setMonth(month - 1);
  date.setFullYear(year);
  date.setHours(hours);
  date.setMinutes(mins);
  date.setSeconds(secs);

  return date.getTime();
}

/**
 *
 * @param {Param Names} param0
 */
export const createArticle = ({ id, title, summary, image_url, video_url, author_name, author_image_url,
  date_publication, comments_number } = { title: 'No title', author_name: 'No author' }) => {

  // -----------------  ARTÍCULO  ------------------------------
  const articleTag = document.createElement('article');
  articleTag.setAttribute('id', `article_${id}`);
  articleTag.setAttribute('name', `article_${id}`);
  articleTag.classList.add('article-container');

  // -----------------  IMAGEN GENERAL DEL ARTÍCULO --------------------------------
  // contenedor de la imagen
  const divImage = document.createElement('div');
  divImage.classList.add('article-photo');

  // link de la imagen
  const linkImage = document.createElement('a');
  linkImage.setAttribute('href', `/article/?id=${id}`);

  // imagen
  if (image_url) {
    const image = document.createElement('img');
    image.setAttribute('src', image_url);
    image.setAttribute('alt', 'Imagen del artículo');
    image.setAttribute('title', 'Titulo del artículo');
    image.classList.add('article-image');

    linkImage.appendChild(image);
    divImage.appendChild(linkImage);
  }

  // video
  if (video_url) {
    const video = document.createElement('video');
    video.setAttribute('controls', true);
    video.setAttribute('alt', 'video del artículo');
    video.classList.add('article-video');
    const source = document.createElement('source');
    source.setAttribute('src', video_url);
    source.setAttribute('alt', 'Video del artículo');
    video.appendChild(source);
    linkImage.appendChild(video);
    divImage.appendChild(linkImage);
  }

  // -----------------  CONTENEDOR CENTRAL  ------------------------------
  // contenedor central
  const divCentral = document.createElement('div');
  divCentral.classList.add('content-column');

  // Contenedor titulo/autor
  const divTitleAuthor = document.createElement('div');
  divTitleAuthor.classList.add('title-author');

  // párrafo título
  const linkImageTitle = document.createElement('a');
  linkImageTitle.setAttribute('href', `/article/?id=${id}`);

  const pTitle = document.createElement('h3');
  pTitle.classList.add('title');
  pTitle.innerHTML = title;

  linkImageTitle.appendChild(pTitle);

  //párrafo autor
  const pAuthor = document.createElement('p');
  pAuthor.classList.add('author');
  pAuthor.innerHTML = author_name;

  // Las añadimos al contenedor divTitleAuthor
  divTitleAuthor.appendChild(linkImageTitle);

  // Contenedor descripción del artículo
  const divSummary = document.createElement('div');
  divSummary.classList.add('article-summary');

  // link de la Descripción
  const linkSummary = document.createElement('a');
  linkSummary.setAttribute('href', `/article/?id=${id}`);

  // Texto de la descripción
  const pSummary = document.createElement('p');
  pSummary.classList.add('summary-text');
  pSummary.innerHTML = summary;

  // Añadimos la descripción a su contenedor divSummary
  linkSummary.appendChild(pSummary);
  divSummary.appendChild(linkSummary);

  // los añadimos divTitleAuthor y al contenedor central
  divCentral.appendChild(divTitleAuthor);
  divCentral.appendChild(divSummary);

  // -----------------  RESTO DATOS: COLUMNA DE LA IZQUIERDA ------------------------------
  // contenedor izquierda
  const divExtras = document.createElement('div');
  divExtras.classList.add('article-extras');

  // contenedor Imagen del autor
  const divImageAuthor = document.createElement('div');
  divImageAuthor.classList.add('article-photo-author');

  // imagen
  const imgAuthor = document.createElement('img');
  imgAuthor.setAttribute('src', author_image_url);
  imgAuthor.setAttribute('alt', 'Imagen del autor del artículo');
  //imgAuthor.classList.add('article-image-author');

  // fecha de publicación
  const divDatePublication = document.createElement('div');
  divDatePublication.classList.add('publication-info');

  const pPublicationDate = document.createElement('p');
  pPublicationDate.classList.add('date');
  pPublicationDate.innerHTML = calcTimePublication(date_publication);
  divDatePublication.appendChild(pAuthor);
  divDatePublication.appendChild(pPublicationDate);

  // Número de comentarios
  const linkComments = document.createElement('a');
  linkComments.setAttribute('href', `/article/?id=${id}/#comments`);
  const divNumberComments = document.createElement('div');
  const arrStyles = ['number-of-comments', 'hint'];
  divNumberComments.classList.add(...arrStyles);
  linkComments.innerHTML = `<i class="far fa-comment"></i> ${comments_number}`;
  divNumberComments.appendChild(linkComments);
  divImageAuthor.appendChild(imgAuthor);
  divImageAuthor.appendChild(divDatePublication);

  // Añadimos los elementos a su contenedor divExtras
  divExtras.appendChild(divImageAuthor);
  divExtras.appendChild(divNumberComments);

  const articleContent = document.createElement('div');
  articleContent.classList.add('article-content');

  // Añadimos los contenedores al artículo
  articleContent.appendChild(divImage);
  articleContent.appendChild(divCentral);
  divCentral.appendChild(divExtras);
  articleTag.appendChild(articleContent);

  return articleTag;
};

export default {
  createArticle
};
