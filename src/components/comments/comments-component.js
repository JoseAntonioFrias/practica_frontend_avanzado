import { appendComponent, getParamQueryString } from 'utils/utils';
import { createComment } from 'components/comment/comment-component';
import CommentService from 'services/comment-service';
//import { getTotalNumComments } from 'utils/count-properties';

const loadComments = (commentsJSON, divCommentsContainer) => {
  const updatedComments = divCommentsContainer;

  if (commentsJSON.length !== 0) {
    appendComponent(updatedComments,
      commentsJSON.map(commentData => createComment(commentData)));
  }
};

const updateNumComments = (parentNode, lengthArr) => {
  if (lengthArr === 1) {
    parentNode.innerHTML = `<div class="comments-header"> <p class="total-comments">${lengthArr} comentario </p> <i class="far fa-comment"></i></div>`;
  } else {
    parentNode.innerHTML = `<div class="comments-header"> <p class="total-comments">${lengthArr} comentarios</p><i class="far fa-comment"></i></div>`;
  }
}

export const updateComments = () => {
  //instancia de la clase del servicio de articulos
  const commentServiceInstance = new CommentService();

  //elemento a partir del cual se empiezan a pintar los comentarios
  const divCommentsContainer = document.getElementById('comments');

  //añade el Spinner de cargar los datos
  //divCommentsContainer.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

  divCommentsContainer.innerHTML ='<div id="pageSpinner"><div id="page-spinner-copy">Cargando datos...</div></div>';

  const articleId = getParamQueryString(window.location,'id').split('/');

  //const offset = '&_page=1&_limit=2';

  if (articleId[0]) {
    //commentServiceInstance.getCommentsPaginate(articleId[0], offset).then((commentsJSON) => {
    commentServiceInstance.getCommentsByIdArticle(articleId[0]).then((commentsJSON) => {
      
      //recuperamos la cabecera X-Total-Count que no indica el número total de comentarios
      //const numComments = getTotalNumComments();

      divCommentsContainer.innerHTML = '';
      //updateNumComments(divCommentsContainer, numComments)
      updateNumComments(divCommentsContainer, commentsJSON.length)
      loadComments(commentsJSON , divCommentsContainer);
    }).catch(() => {
      divCommentsContainer.innerHTML = 'Ha ocurrido un error, intentalo de nuevo más tarde.';
    });
  }
};

export default updateComments;
