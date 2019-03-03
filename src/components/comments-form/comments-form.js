import CommentService from 'services/comment-service';
import { reportValidity, getFormData, getParamQueryString } from 'utils/utils';
import PubSub from 'pubsub-js';

const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};


const addErrorClass = (input) => {
  if (!input.checkValidity()) {
    input.classList.add('error');
  } else {
    input.classList.remove('error');
  }
};

const addCustomValidation = (input) => {
  if (input.name === 'name' && !input.value) {
    input.setCustomValidity('Debes introducir un nombre.');
    addErrorClass(input);
  } else if (input.name === 'email' && (!input.value || !isValidEmail(input.value))) {
    input.setCustomValidity('Debes introducir un email válido.');
    addErrorClass(input);
  } else if (input.name === 'comment' && (!input.value || input.value.length > 500)) {
    input.setCustomValidity('Debes introducir comentario, máx: 500 carácteres.');
    addErrorClass(input);
  } else {
    input.setCustomValidity('');
    addErrorClass(input);
  }
};

const handleValidation = (formInputs) => {
  for (let i = 0; i < formInputs.length; i += 1) {
    const input = formInputs[i];

    input.addEventListener('focus', () => {
      input.classList.add('focus');
    });

    input.addEventListener('blur', () => {
      input.classList.remove('focus');
      addCustomValidation(input);
      addErrorClass(input);
    });
  }
};

export const updateCommentForm = () => {
  const commentForm = document.getElementById('comment-form');
  const submitFormButton = document.getElementById('comment-form-submit');
  const formInputs = commentForm.getElementsByClassName('comment-input');
  const notice = document.getElementById('notice');

  // añado el valor al campo id_article del formulario
  const btnIdArticle = document.getElementById('comment-form-id-article');
  const articleId = getParamQueryString(window.location, 'id').split('/');
  btnIdArticle.setAttribute('value', articleId[0]);

  handleValidation(formInputs);

  submitFormButton.addEventListener('click', (e) => {
    e.preventDefault();
    submitFormButton.disable = true;
    reportValidity(commentForm);
    if (commentForm.checkValidity()) {
      const commentServiceInstance = new CommentService();
      commentServiceInstance.postComment(getFormData(formInputs)).then(
        (response) => {
          if (response === true) {
            console.log('response==>', response);
            notice.innerHTML = 'Tu comentario se ha publicado con éxito';
            commentForm.reset();
            PubSub.publish('reload');
          }
        }
      );
      submitFormButton.disable = false;

      //Actualizamos el número de comentarios en la colección de articulos
      /*
      const articletServiceInstance = new ArticletService();
      articletServiceInstance.putNumComment({comments_number: 'example'},articleId).then(
        (response) => {
          if (response === true) {
          
            //PubSub.publish('reload');
          }
        }
      );
      */
    }
  });
};

export default updateCommentForm;
