const getDataList = (data, title) => {
  const items = data.map((item) => `<li class="info-list__item">${item}</li>`);

  return items.length === 0 ? ''
    : `
    <h3 class="inner-title">${title}:</h3>
    <ul class="info-list additional-content__list">
      ${items.join('')}
    </ul>
  `;
};

const getInscriptions = (eleventy, content, langCode) => {
  let inscriptionsRaw = `${content.inscription}`.replace(/:\n/, ': ');
  inscriptionsRaw = inscriptionsRaw.replace(/\n *?\n/sg, '\n\n');
  const inscriptionsData = inscriptionsRaw.split(/\n/);
  const inscriptionsTitle = eleventy.translate('inscriptionsInnerHeadline', langCode);
  return inscriptionsRaw ? getDataList(inscriptionsData, inscriptionsTitle) : '';
};

const getLabels = (eleventy, content, langCode) => {
  let labelsRaw = `${content.markings}`.replace(/:\n/, ': ');
  labelsRaw = labelsRaw.replace(/\n *?\n/sg, '\n\n');
  const labelsData = labelsRaw.split(/\n/);
  const titleTitle = eleventy.translate('labelsInnerHeadline', langCode);
  return labelsRaw ? getDataList(labelsData, titleTitle) : '';
};

exports.getInscriptionsAndLabels = (eleventy, { content }, langCode) => {
  const numberOfWords = 20;
  const inscriptionsAndLabels = content.inscription || content.markings;
  let inscriptionsAndLabelsRaw = content.inscription ? `${content.inscription} ${content.markings}` : content.markings;
  inscriptionsAndLabelsRaw = inscriptionsAndLabelsRaw.replace(/\[.*?]/g, '');
  const inscriptions = getInscriptions(eleventy, content, langCode);
  const labels = getLabels(eleventy, content, langCode);

  const words = inscriptionsAndLabelsRaw.split(/ /);
  const preview = words.length > numberOfWords ? `${words.slice(0, numberOfWords).join(' ')} …` : inscriptionsAndLabelsRaw;
  const label = eleventy.translate('inscriptionsOuterHeadline', langCode);
  const id = 'InscriptionsAndLabels';

  return !inscriptionsAndLabels ? '' : `
    <dl id="${id}" class="definition-list is-grid">
      <dt class="definition-list__term">${label}</dt>
      <dd class="definition-list__definition">${preview}</dd>
    </dl>
    <div id="completeData${id}" class="additional-content js-additional-content" data-is-additional-content-to="${id}">
      <h2 class="additional-content__title js-collapse-additional-content has-interaction">${label}</h2>
      ${inscriptions}
      ${labels}
    </div>
  `;
};
