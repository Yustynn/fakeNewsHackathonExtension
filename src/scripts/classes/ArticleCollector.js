import { $$ } from '../utils'
import { post } from '../utils/api'
import Article from './Article';

const POLL_INTERVAL = 1000;

export default class ArticleCollector {
  constructor() {
    console.log('starting')
    this.articles = [];
    this.pollForArticles()
  }

  getUrls() {
    return this.articles.map( (a) => a.url )
  }

  async getFakenessFromAnchors(anchors) {
    const urls = anchors.map( (a) => a.href );
    const res = await post('/articles', { urls })

    return res.map( (obj) => obj.score )
  }

  pollForArticles() {
    const allAnchors = Array.from( $$('a._52c6') );
    const relevantAnchors = allAnchors.slice( this.articles.length );
    this.getFakenessFromAnchors(relevantAnchors)
    .then( (relevantFakeness) => {
      const newArticles = relevantAnchors.map((a, idx) => {
        return new Article(a, relevantFakeness[idx])
      })

      this.articles = [...this.articles, ...newArticles]

      setTimeout(this.pollForArticles.bind(this), POLL_INTERVAL)
    })
  }
}
