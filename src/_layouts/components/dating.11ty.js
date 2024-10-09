exports.getDating = (eleventy, { content }, langCode) => {
  const prefix = content.metadata.id;
  const numberOfItems = 2;
  const combinedDates = content.dating.historicEventInformations
    ? [{ text: content.dating.dated, remarks: content.dating.remarks, editionNumber: content.dating.editionNumber }, ...content.dating.historicEventInformations]
    : [{ text: content.dating.dated, remarks: content.dating.remarks, editionNumber: content.dating.editionNumber }];
  const datesShortListItems = combinedDates.slice(0, numberOfItems);
  const datesShortList = datesShortListItems.map((item) => item.text);

  const sortedCombinedDates = combinedDates.sort((a, b) => {

    // Gibt es eine Editionsnummer? (29.11.2023) Nur für Grafiken relevant
    if(a.editionNumber && a.editionNumber >= 0){
      if (a.editionNumber < b.editionNumber) return -1;
      if (a.editionNumber > b.editionNumber) return 1;
      return 0;
    }

    // Wenn es keine gibt, sortiere nach Beginn
    if (a.begin < b.begin) return -1;
    if (a.begin > b.begin) return 1;
    return 0;
  });

  const datesFullList = sortedCombinedDates.map((item) => ({ text: `${item.text}`, remark: item.remarks }));
  const label = datesFullList.length > 1 ? eleventy.translate('productionDates', langCode) : eleventy.translate('productionDate', langCode);
  const remarkDataTableData = {
    id: 'Dates',
    content: datesFullList,
    isAdditionalContentTo: `${prefix}-dataList`,
    title: label,
    context: prefix,
  };
  const allDates = eleventy.getRemarkDataTable(remarkDataTableData);

  return datesShortListItems.length === 0 ? '' : `
    <dl id="${prefix}-dataList" class="definition-list is-grid">
      <dt class="definition-list__term">${label}</dt>
      <dd class="definition-list__definition">${datesShortList.join('<br>')}</dd>
    </dl>

    ${allDates}
  `;
};
