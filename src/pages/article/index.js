import 'styles/main.scss';
import { updateHeader } from 'components/header/header-component';
import { updateArticleDetail } from 'components/article-detail/article-detail-component';
import queryString from 'query-string';
import ArticleService from 'services/article-service';
import { updateComments } from 'components/comments/comments-component';
import { updateCommentForm } from 'components/comments-form/comments-form';
import PubSub from 'pubsub-js';

const articleServiceInstance = new ArticleService();
const query = queryString.parse(window.location.search);
const articleId = query && query.id;

if (articleId) {
  articleServiceInstance.getArticle(articleId).then((articleJSON) => {
    updateArticleDetail(articleJSON);
  });
}
updateHeader({ title: 'Theatrum Mundi - Artículo', active: 'article-detail' });

updateComments();
updateCommentForm();

PubSub.subscribe('reload', () => {
  updateComments();
});
