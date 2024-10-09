exports.getGeoData = (eleventy, data, langCode) => {
  const paintingsWithLocations = data.collections.paintingsDE.filter(painting => {

    return painting.locations.length > 0 && painting.locations[0].geoPosition;
  });
  
  const paintingsGeoData = paintingsWithLocations.map(painting => {

    const lat = painting.locations[0].geoPosition.lat;
    const lng = painting.locations[0].geoPosition.lng;



    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lng, lat]
      },
      properties: {
        title: painting.metadata.title,
        description: painting.metadata.description,
        imgSrc: painting.metadata.imgSrc,
      },
    };
  });

 

  return {
    "type": "FeatureCollection",
    "features": [
      paintingsGeoData
    ]
  };

};