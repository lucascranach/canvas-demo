exports.getExhibitions = (eleventy, { content }, langCode) => (!content.exhibitionHistory ? '' : `
<div class="foldable-block has-strong-separator"> 
  <h2 class="foldable-block__headline is-expand-trigger js-expand-trigger" data-js-expanded="false" data-js-expandable="exhibition-history">
    ${eleventy.translate('exhibitions', langCode)}</h2>
  <div class="expandable-content" id="exhibition-history">
  ${eleventy.markdownify(content.exhibitionHistory)}
  </div>
</div>`);