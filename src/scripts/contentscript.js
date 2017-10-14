import ext from "./utils/ext";
import { $$ } from './utils';

var extractTags = () => {
  var url = document.location.href;
  if(!url || !url.match(/^http/)) return;

  var data = {
    title: "",
    description: "",
    url: document.location.href
  }

  var ogTitle = document.querySelector("meta[property='og:title']");
  if(ogTitle) {
    data.title = ogTitle.getAttribute("content")
  } else {
    data.title = document.title
  }

  var descriptionTag = document.querySelector("meta[property='og:description']") || document.querySelector("meta[name='description']")
  if(descriptionTag) {
    data.description = descriptionTag.getAttribute("content")
  }

  return data;
}

console.log('lull')
const printLinks = (node = $$('body')[0]) => {
  setTimeout(() => {
    const anchors = ($$('a[data-lynx-uri]'));
    console.log('printed leh')

    console.log(anchors);

    anchors.forEach(a => console.log(a.href))
  }, 1000)
}

//setInterval(printLinks, 1000)

function onRequest(request, sender, sendResponse) {
  if (request.action === 'process-page') {
    sendResponse(extractTags())
  }
}

ext.runtime.onMessage.addListener(onRequest);
