exports.getImageStripe = (eleventy, { content }, langCode, config, hasSeperator = false, isExpanded = false) => {
  const imageStack = content.images;
  const { contentTypes } = config;
  const cdaId = content.metadata.id;
  const objectTitle = eleventy.altText(content.metadata.title);

  const imageStripe = Object.keys(contentTypes).map((key) => {
    if (!imageStack || !imageStack[key]) return;
    const { images } = imageStack[key];
    const html = images.map((image) => {
      const title = image.metadata && image.metadata[langCode] ? eleventy.altText(image.metadata[langCode].description) : `${key}`;
      return `
        <li
          class="image-stripe-list__item has-interaction js-is-collectable"
          title="${image.id}"
          data-collected="false" 
          data-cda-id="${cdaId}"
          data-object-title="${objectTitle}"
          data-image-type="${key}" 
          data-image-id="${image.id}"
          data-image-preview-url="${image.sizes.small.src}"
          data-image-tiles-url="${image.sizes.tiles.src}"
          data-js-change-image='{"key":"${key}","id":"${image.id}"}'>
          <img loading="lazy" src="${image.sizes.small.src}" alt="${title}" >
        </li>
      `;
    });
    return (html.join(''));
  });

  const availablecontentTypes = Object.keys(contentTypes).map((key) => {
    if (!imageStack || !imageStack[key]) return false;
    const numberOfImages = imageStack[key].images.length;
    const type = (numberOfImages === 0) ? '' : `<option value="${key}">${eleventy.translate(key, langCode)} (${numberOfImages})</option>`;
    return type;
  });

  const imageTypeselector = `
    <div class="imagetype-selector">
      <select size="1" data-js-image-selector="true">
        <option value="all">${eleventy.translate('all', langCode)}</option>
        ${availablecontentTypes.join('')}
      </select>
    </div>
  `;

  const cranachCollectBaseUrl = eleventy.getCranachCollectBaseUrl();
  const cranachCollectFrondend= config.cranachCollect.frontend;
  const cranachCompare = `
    <a class="cranach-compare-launcher js-cranach-compare-launcher"
      href="${cranachCollectBaseUrl}${cranachCollectFrondend}"
      data-visible="false" 
      target="_blank">
      ${eleventy.translate('compareImages', langCode)}
    </a>
  `;

  const seperator = hasSeperator ? 'has-strong-separator' : '';
  const expanded = !!isExpanded;

  return `
    <div class="foldable-block ${seperator}">
      <h2 class="foldable-block__headline is-expand-trigger js-expand-trigger" data-js-expanded="${expanded}" data-js-expandable="image-stripe">
        ${eleventy.translate('illustrations', langCode)}</h2>
      <div id="image-stripe" class="expandable-content image-stripe">
        <div class="image-stripe-navigation">
          ${imageTypeselector}
          ${cranachCompare}
        </div>
        <ul class="image-stripe-list">
          ${imageStripe.join('')}
        </ul>
      </div>
    </div>
  `;
};
