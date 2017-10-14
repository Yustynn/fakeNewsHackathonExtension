import { $$ } from '../utils'
import Article from './Article';

export default class ArticleCollector {
  constructor() {
    this.articles = [];
    this.startPollingForArticles()
  }

  startPollingForArticles() {
    const allAnchors = $$('a._52c6');
    const relevantAnchors = allAnchors.slice( this.articles.length );
    const newArticles = relevantAnchors.map((a) => new Article(a))

    this.articles = [...this.articles, ...newArticles]
  }
}
