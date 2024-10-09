exports.getCondition = (eleventy, { content }, langCode) => {
  const condition = content.classification.condition.replace(/\n|\r/, ', ');
  const conditionData = `${condition}`;
  const label = eleventy.translate('stateAndEdition', langCode);
  return !content.classification.classification ? '' : `
    <dl id="conditionData" class="definition-list is-grid">
      <dt class="definition-list__term">${label}</dt>
      <dd class="definition-list__definition">
        ${conditionData}
      </dd>
    </dl>
  `;
};
