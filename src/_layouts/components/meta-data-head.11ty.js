exports.getHeader = ({ content }) => {
  const descLength = 150;
  console.log(content);
  const title = content.metadata.title.replace(/"/g, '\'').replace(/<(.*?)>/g, '');
  const { url } = content;
  const image = content.metadata.imgSrc;
  const desc = content.description && content.description.length > descLength
    ? `${content.description.substr(0, descLength)} …`
    : content.description;

  const currentDay= new Date().getDate();
  const currentMonth = new Date().getMonth() +1;
  const currentYear = new Date().getFullYear();
  const publishDate = `${currentYear}-${currentMonth}-${currentDay}`;

  return `
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${image}">
    <meta property="og:type" content="website">
    <meta name="description" content="${desc}">
    <meta property="article:published_time" content="${publishDate}">
    <meta name="author" content="Cranach Digital Archive Team // TH Köln">
  `;
};
