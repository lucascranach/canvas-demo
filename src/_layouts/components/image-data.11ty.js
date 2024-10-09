exports.getImageData = (eleventy, data, langCode) => {

  const publishedPaintings = data.collections.paintingsDE.filter(painting => painting.metadata.isPublished === true && painting.images.overall);
  
  const paintingsData = publishedPaintings.map(painting => {
    const smallImage = painting.images.overall.images[0].sizes.small;
    return smallImage.src.replace('https://lucascranach.org/imageserver-2022/', '');
  });

  return {
      paintings: paintingsData.slice(0, 2000)
  };

};