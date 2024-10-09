exports.getImproveCDA = (eleventy, { content }, config, langCode) => {
  const title = encodeURI(content.metadata.title);
  const objectUrl = encodeURI(content.url);
  const issueUrls = config.issueReportUrl;
  const improveCdaHeadline = eleventy.translate('improveCdaHeadline', langCode);
  const contactUs = eleventy.translate('contactUs', langCode);
  const foundABug = eleventy.translate('foundABug', langCode);
  const foundABugUrl = issueUrls.bug.replace(/artefactTitle/, title).replace(/artefactUrl/, objectUrl);
  return `
      <h2>${improveCdaHeadline}</h2>
      <p>${contactUs} <a href="${foundABugUrl}" target="_blank">${foundABug}</a></p>
    `;
}
