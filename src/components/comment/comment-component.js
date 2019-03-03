
export const createComment = ({ id, name, email, comment, author_image_url }) => {

  //contenedor principal
  const divMain = document.createElement('div');
  divMain.setAttribute('id', `comment_${id}`);
  divMain.setAttribute('name', `comment_${id}`);
  divMain.classList.add('comment');

  //contenedor de los DATOS DEL USUARIO
  const divUserInfo = document.createElement('div');
  divUserInfo.classList.add('user-info');

  const spanAuthor = document.createElement('span');
  spanAuthor.classList.add('comment-autor-name');
  spanAuthor.innerHTML=`${name}`;

  const spanEmail = document.createElement('span');
  spanEmail.classList.add('comment-autor-email');
  spanEmail.innerHTML=`${email}`;

  const spanImage = document.createElement('div');
  spanImage.classList.add('comment-img');
  spanImage.innerHTML=`${author_image_url}`;

  const userInfo = document.createElement('div');
  userInfo.classList.add('user-info');

  userInfo.appendChild(spanAuthor);
  userInfo.appendChild(spanEmail);

  //imagen del autor del comentario
  const imageUrl = author_image_url || 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-md.png';

  const autorImage = document.createElement('img');
  autorImage.setAttribute('src', `${imageUrl}`);
  autorImage.setAttribute('alt', 'Imagen del autor del comentario');
  autorImage.classList.add('comment-autor-image');


  //añadimos author y email al contenedor de infpormación del usuario
  divUserInfo.appendChild(autorImage);
  divUserInfo.appendChild(userInfo);

   //contenedor de los COMENTARIOS
   const divContent = document.createElement('div');
   divContent.classList.add('content');

   const pComment = document.createElement('p');
   pComment.innerHTML = `${comment}`;

   //añadimos el comentario a su contenedor
   divContent.appendChild(pComment);

  //añadimos los contenedores de InfoUsuario y content al contenedoer principal
  divMain.appendChild(divUserInfo);
  divMain.appendChild(divContent);

  return divMain;
};

export default {
  createComment
};
