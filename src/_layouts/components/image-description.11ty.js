exports.getImageDescriptionObjectInfo = ({ content }) => {
  const date = content.metadata.date ? `, ${content.metadata.date}` : '';
  const attribution = !content.metadata.subtitle ? '' : `<li class="image-description-text has-small-separator">${content.metadata.subtitle}</li>`;

  return `
    <ul class="image-caption">
      <li class="image-caption__title">${content.metadata.title}${date}</li>
      ${attribution}
    </ul>
  `;
};