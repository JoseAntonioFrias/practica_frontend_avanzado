import { appendComponentHR } from 'utils/utils';
import { createArticle } from 'components/article/article-component';
import ArticleService from 'services/article-service';
import { scrollTop } from 'components/footer/footer';

const loadArticles = (articlesJSON, divArticlesContainer) => {
  const updatedArticles = divArticlesContainer;

  // Si no hay artículos mostramos INFO
  if (articlesJSON.length === 0) {
    updatedArticles.innerHTML = 'No articles';
  } else {
    // Si hay artículos entonces los añadimos
    appendComponentHR(updatedArticles,
      articlesJSON.map(articleData => createArticle(articleData)));
  }
};

export const updateArticles = () => {
  // instancia de la clase del servicio de articulos
  const articleServiceInstance = new ArticleService();

  // elemento a partir del cual se empiezan a pintar los artículos
  const divArticlesContainer = document.getElementById('articlesContainer');

  // añade el Spinner de cargar los datos
  divArticlesContainer.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

  articleServiceInstance.getArticles().then((articlesJSON) => {
    divArticlesContainer.innerHTML = '';
    loadArticles(articlesJSON, divArticlesContainer);
  }).catch(() => {
    divArticlesContainer.innerHTML = 'There was an error, please reload';
  });
};

// arranca la función del footer para el botón del scrollTop
scrollTop();

export default updateArticles;
