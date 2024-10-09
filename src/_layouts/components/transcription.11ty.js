const getTranscriptionMetaData = (eleventy, { content }, langCode) => {
  const transcriptionDate = !content.transcriptionDate
    ? ''
    : `
      <dt class="definition-list__term">${eleventy.translate('trans-date', langCode)}</dt>
      <dd class="definition-list__definition">${content.transcriptionDate}</dd>
    `;

  const transcribedBy = !content.transcribedBy
    ? ''
    : `
      <dt class="definition-list__term">${eleventy.translate('trans-by', langCode)}</dt>
      <dd class="definition-list__definition">${content.transcribedBy}</dd>
    `;

  const transcribedAccordingTo = !content.transcribedAccordingTo
    ? ''
    : `
      <dt class="definition-list__term">${eleventy.translate('trans-to', langCode)}</dt>
      <dd class="definition-list__definition">${content.transcribedAccordingTo}</dd>
    `;

  return `
    <dl class="definition-list is-grid">
    ${transcribedBy}
    ${transcriptionDate}
    ${transcribedAccordingTo}
    </dl>
  `;
};

exports.getTranscription = (eleventy, { content }, langCode) => {
  const prefix = content.metadata.id;
  const transcriptionItems = content.transcription.split(/\n/);
  const label = eleventy.translate('transcription', langCode);
  const transciptionMeta = getTranscriptionMetaData(eleventy, { content }, langCode);

  return !content.transcription ? '' : `
  <div class="foldable-block has-strong-separator">
    <h2 class="foldable-block__headline is-expand-trigger js-expand-trigger" data-js-expanded="false" data-js-expandable="transcription">
      ${label}</h2>
    <div class="expandable-content" id="transcription">
      <p>
        ${transcriptionItems.join('<br>')}
      </p>
      ${transciptionMeta}
    </div>
  </div>

  `;
};


