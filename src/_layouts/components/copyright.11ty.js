exports.getCopyright = () => {
  const currentYear = new Date().getFullYear();
  return `<p>© Stiftung Museum Kunstpalast, Düsseldorf / Technische Hochschule Köln, ${currentYear}</p>`;
};