exports.getLocation = (eleventy, { content }, langCode) => {
  
  const location = !content.locations[0]
    ? ''
    : `
      <dt class="definition-list__term">${eleventy.translate('location', langCode)}</dt>
      <dd class="definition-list__definition">${content.locations[0].term}</dd>
    `;
  return `
    <dl class="definition-list is-grid">
      <dt class="definition-list__term">${eleventy.translate('owner', langCode)}</dt>
      <dd class="definition-list__definition">${content.owner}</dd>
      <dt class="definition-list__term">${eleventy.translate('repository', langCode)}</dt>
      <dd class="definition-list__definition">${content.repository}</dd>
      ${location}

    </dl>
  `;
};

exports.getArchivalLocation = (eleventy, { content }, langCode) => {
  const location = !content.locationAndDate
    ? ''
    : `
      <dt class="definition-list__term">${eleventy.translate('locationDate', langCode)}</dt>
      <dd class="definition-list__definition">${content.locationAndDate}</dd>
    `;
  return `
    <dl class="definition-list is-grid">
      <dt class="definition-list__term">${eleventy.translate('repositoryAndLocation', langCode)}</dt>
      <dd class="definition-list__definition">${content.repository}</dd>
      ${location}

    </dl>
  `;
}