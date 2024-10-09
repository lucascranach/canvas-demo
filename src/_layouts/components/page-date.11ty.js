exports.getPageDate = (eleventy, langCode) => {
  const currentDay= new Date().getDate();
  const currentMonth = new Date().getMonth() +1;
  const currentYear = new Date().getFullYear();
  return `<p class="date">${eleventy.translate('pageGenerated', langCode)} ${currentDay}.${currentMonth}.${currentYear}</p>`;
}