import APIService from './API-service';

class ArticleService {
  constructor() {
    this.APIServiceInstance = new APIService();
    this.model = 'articles';
  }

  async getArticles() {
    return this.APIServiceInstance.get(this.model);
  }

  async getArticle(id) {
    return this.APIServiceInstance.get(`${this.model}/${id}`);
  }

  async putNumComment(article) {
    return this.APIServiceInstance.put(article, `${this.model}/${id}`);
  }
}

export default ArticleService;
