import { $$ } from '../utils'
import Article from './Article';

export default class ArticleCollector {
  constructor() {
    this.articles = [];
    this.startPollingForArticles()
  }

  getUrls() {
    return this.articles.map( (a) => a.url )
  }

  async getFakenessFromAnchors(anchors) {
    const urls = anchors.map((a) => a.href);
     
  }

  startPollingForArticles() {
    setInterval(() => {
      const allAnchors = Array.from( $$('a._52c6') );
      const relevantAnchors = allAnchors.slice( this.articles.length );
      const relevantFakeness = this.getFakenessFromAnchors(relevantAnchors);

      const newArticles = relevantAnchors.map((a, idx) => {
        return new Article(a, relevantFakeness[idx])
      })

      this.articles = [...this.articles, ...newArticles]
    }, 1000)
  }
}
