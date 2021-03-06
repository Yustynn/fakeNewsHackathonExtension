//const FAKE_OPACITY = 0.3;
const reportFakeHTML = '<span class="_1mto"><div endpoint="/share/share_now_menu/?app_id=2309869772&amp;dialog_uri=%2Fajax%2Fsharer%2F%3Fs%3D99%26appid%3D2309869772%26id%3D10155918504174060%26p%255B0%255D%3D6013004059%26p%255B1%255D%3D10155918504174060%26share_source_type%3Dunknown%26feedback_source%3D1&amp;share_rel=dialog&amp;shareable_id=10155918504174060&amp;share_type=99&amp;feedback_source=1&amp;sharer_id=6013004059&amp;caret_id=u_ps_0_0_3&amp;story_container_id=u_ps_0_0_2&amp;collection_id=92&amp;object_id=1788452691166662&amp;actor_id=100022511109856" endpointdata="[object Object]" layerbehaviors="function i(j){&quot;use strict&quot;;this._layer=j},function k(){&quot;use strict&quot;;i.apply(this,arguments)},function h(i){&quot;use strict&quot;;this._layer=i}" loadingmenu="[object Object]" class="uiPopover _6a"><span class="_27de _p" role="button" aria-controls="u_2f_0"><a href="#" data-testid="ufi_share_link_loaded" class="_5f9b" role="button" tabindex="0" data-ft="{ &quot;tn&quot;: &quot;J&quot;, &quot;type&quot;: 25 }" title="Send this to friends or post it on your Timeline.">Report FAKE<span class="UFIShareLinkSpinner _1wfk img _55ym _55yn _55yo _5tqs" role="progressbar" aria-valuetext="Loading..." aria-busy="true" aria-valuemin="0" aria-valuemax="100"></span></a></span></div></span>'

export default class Article {
  constructor(a, fakenessRating, url=null) {
    const { random, max } = Math;

    this.fakenessRating = random() > 0.7 ? max(fakenessRating, 0.2) : 1;
    this.url = url || a.href;
    this.visited = true;

    const reportFakeNodeParent = document.createElement('span');
    reportFakeNodeParent.innerHTML = reportFakeHTML;
    const reportFakeNode = reportFakeNodeParent.childNodes[0]


    Array.from( reportFakeNode.querySelectorAll('a') ).forEach( (a) => {
      a.style.color = 'red';
    })
    
    this.articleNode = a.closest('._3ccb');

    reportFakeNode.onclick = () => {
      this.articleNode.style.opacity = 0.2;
      const a = reportFakeNode.querySelectorAll('a')[0]
      a.style.color = 'green';
      a.innerHTML = 'Fakeness Reported!'
    }
    
    // Add report fake node
    const bar = this.articleNode.querySelectorAll('._42nr')[0]
    if (bar) bar.appendChild(reportFakeNodeParent.childNodes[0]);

    this.setOpacity()
  }

  setOpacity() {
    const { fakenessRating } = this;
    const opacityValue = (fakenessRating == -1) ? 1 : fakenessRating;
    this.isFake = true;
    this.articleNode.style.opacity = fakenessRating;
  }
}

console.log('lol')
