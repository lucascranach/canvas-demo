const frontMatterData = {
    permalink: 'cda-data.geojson'
};

class Overview {

    data() {
      return frontMatterData;
    }
  
    render(data) {

      const poisWithCoords = data.collections.paintingsDE.filter((painting) =>  
        painting.locations.length > 0 
        && painting.locations[0].geoPosition 
        && painting.metadata.imgSrc);
      
      const features = poisWithCoords.map((painting) => {
        
        const lat = painting.locations[0].geoPosition.lat;
        const lng = painting.locations[0].geoPosition.lng;

        const baseUrl = this.getBaseUrl();
        const url = `https://lucascranach.org/de/${painting.inventoryNumber}`;

        const feature = {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              parseFloat(lng),
              parseFloat(lat)
            ]
          },
          "properties": {
            title: painting.metadata.title,
            repository: painting.repository,
            imgSrc: painting.metadata.imgSrc,
            url
          }
        };

        return JSON.stringify(feature);
      });
      
      return `
        {
          "type": "FeatureCollection",
          "features": [
            ${features.join(",\n")}
          ]
        }
      `;
    }
  }
  
module.exports = Overview;

