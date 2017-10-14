import ext from "./utils/ext";

async function parseFacebookUrl(url) {
  const res = await fetch(url)
  const text = await res.text()
  return text
    .match(/replace\("(.*?)"/) // wew regex magic
    [1] 
    .replace(/\\/g, '')
}

ext.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.action === "perform-save") {
      console.log("Extension Type: ", "/* @echo extension */");
      console.log("PERFORM AJAX", request.data);

      sendResponse({ action: "saved" });
    }
    else if (request.action === "request-parse-fb-url") {
      const url = parseFacebookUrl(request.data)
      sendResponse({ action: 'send-parsed-fb-url', url })
    }
  }
);


