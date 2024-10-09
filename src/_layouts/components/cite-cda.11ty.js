exports.getCiteCDA = (eleventy, data, langCode) => {
  const headline = eleventy.translate('citeCdaHeadline', langCode);
  const citeWithAutor = eleventy.translate('citeWithAutor', langCode);
  const citeWithAutorText = eleventy.convertTagsInText(eleventy.translate('citeWithAutorText', langCode));
  const citeWithoutAutor = eleventy.translate('citeWithoutAutor', langCode);
  const citeWithoutAutorText = eleventy.convertTagsInText(eleventy.translate('citeWithoutAutorText', langCode));
  let citeTemplate = `
    <h2 class="is-expand-trigger js-expand-trigger" data-js-expanded="false" data-js-expandable="citing-hints">${headline}</h2>
    <dl id="citing-hints" class="expandable-content definition-list is-stacked">
      <dt class="definition-list__term">${citeWithAutor}</dt>
      <dd class="definition-list__definition js-date-accessed">${citeWithAutorText}</dd>
      <dt class="definition-list__term">${citeWithoutAutor}</dt>
      <dd class="definition-list__definition js-date-accessed">${citeWithoutAutorText}</dd>
    </dl>
  `;

  const maxLength = 120;
  const shortenText = data.content.metadata.title.length > maxLength ? `${data.content.metadata.title.substring(0, maxLength)}…` : data.content.metadata.title;
  citeTemplate = citeTemplate.replace(/{{objectTitle}}/g, shortenText);
  citeTemplate = citeTemplate.replace(/{{objectUrl}}/g, data.content.url);

  return citeTemplate;
};
