exports.getProvenance = (eleventy, { content }, langCode) => (!content.provenance ? '' : `
<div class="foldable-block has-strong-separator">
  <h2 class="foldable-block__headline is-expand-trigger js-expand-trigger" data-js-expanded="false" data-js-expandable="provenance">
    ${eleventy.translate('provenance', langCode)}</h2>
  <div class="expandable-content" id="provenance">
  ${eleventy.markdownify(content.provenance)}
  </div>
</div>
`);