import APIService from './API-service';

class CommentService {
  constructor() {
    this.APIServiceInstance = new APIService();
    this.model = 'comments';
  }

  async getCommentsByIdArticle(idArticle) {
    return this.APIServiceInstance.get(`${this.model}/?id_article=${idArticle}`);
  }

  async postComment(comment) {
    return this.APIServiceInstance.post(comment, this.model);
  }

  async getCommentsPaginate(idArticle, offset) {
    return this.APIServiceInstance.getPaginate(`${this.model}/?id_article=${idArticle}${offset}`);
  }

}

export default CommentService;
