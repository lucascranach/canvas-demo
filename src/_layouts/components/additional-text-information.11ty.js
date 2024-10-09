exports.getAdditionalTextInformation = (eleventy, { content }, langCode) => {
  const additionalInfos = content.additionalTextInformation;
  const additionalInfoTypes = additionalInfos.map((item) => item.type);
  const getSluggedType = (type) => eleventy.slugify(type);
  const getHeadline = (sluggedType) => eleventy.translate(sluggedType, langCode, 'maybe');
  // eslint-disable-next-line max-len
  const uniqueAdditionalInfoTypes = additionalInfoTypes.filter((item, index) => additionalInfoTypes.indexOf(item) === index);
  const getTypeContent = (type) => {
    const typeContent = additionalInfos.filter((item) => item.type === type);    
    return typeContent.length === 0 ? '' : typeContent.map((item) => {
      const formatedText = eleventy.getFormatedText(item.text);
      return `
        <div class="block has-padding">
          ${formatedText}
        </div>
      `;
    });
  };
  return uniqueAdditionalInfoTypes.length === 0 ? '' : uniqueAdditionalInfoTypes.map((type) => {
    const sluggedType = getSluggedType(type);
    const typeHeadline = getHeadline(sluggedType);
    return `
      <div class="foldable-block has-strong-separator">
        <h2 class="foldable-block__headline is-expand-trigger js-expand-trigger" data-js-expanded="false" data-js-expandable="${sluggedType}">${typeHeadline}</h2>
        <div class="expandable-content" id="${sluggedType}">
          ${getTypeContent(type).join('')}
        </div>
      </div>
    `
  });
};
