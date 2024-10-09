let poisGeoJSON;
let map;


const colors = {};

const popupOptions = {
  closeButton: false,
  closeOnClick: true,
  maxWidth: '30ch'
};

/* Functions
############################################################################ */

const getColors = () => {
  const body = document.querySelector('body');
  colors.accent = getComputedStyle(body).getPropertyValue("--accent");
  colors.accentDark = getComputedStyle(body).getPropertyValue("--accent-dark");
  colors.accentDarker = getComputedStyle(body).getPropertyValue("--accent-darker");
};

const initMap = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoianVsaWVsbCIsImEiOiJja2d0cmJia2cwbW8wMnRtanE3Z3Z5aGxoIn0.lLrglrscfprCZCJO-ymRpg';
  map = new mapboxgl.Map({
	  container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v9',
    center: [13.65, 50.9847674],
    minZoom: 1,
    maxZoom: 20,
    zoom: 8
  });
};

const addMapData = (filteredGeoJSON = null) => {
  map.on('load', () => {
    map.addSource('pois', {
      type: 'geojson',
      data: filteredGeoJSON || poisGeoJSON,
      cluster: true,
      clusterRadius: 50,
      clusterMaxZoom: 10
    });

    if (filteredGeoJSON) {
      setMapBounds(filteredGeoJSON);
    }
    
    addClusterLayer();
    addUnclusteredLayer();
    addClusterCount();
    addClusterListener();

  });
};

const loadData = async () => {
  fetch('cda-data.geojson')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      poisGeoJSON = data;
      addMapData();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

/* Clustered Elements
############################################################################ */

const addClusterLayer = () => {
  // Design for cluster
  map.addLayer({
    id: 'clusters',
    type: 'circle',
    source: 'pois',
    filter: ['has', 'point_count'],
    paint: {
      'circle-stroke-width': 1,
      'circle-stroke-color': '#ffffff',
      'circle-color': [
        'step',
        ['get', 'point_count'],
        colors['accent'],
        75,
        colors['accentDark'],
        500,
        colors['accentDarker'],],
      'circle-radius': [
        'step',
        ['get', 'point_count'],
        20,
        75,
        30,
        500,
        40,
      ],
    },
  });
};

const addClusterCount = () => {
  // Design for cluster text
  map.addLayer({
    id: 'cluster-count',
    type: 'symbol',
    source: 'pois',
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-size': [
        'step',
        ['get', 'point_count'],
        12,
        75,
        16,
        500,
        20,
      ],
    },
    paint: {
      'text-color': '#ffffff',
    },
  });
}

const addClusterPopups = (e, features, clusterId, clusterSource) => {

  const pointCount = features[0].properties.point_count;
  const coordinates = e.features[0].geometry.coordinates.slice();

  clusterSource.getClusterChildren(clusterId, (err, aFeatures) => {
    const clusters = aFeatures.filter((item) => item.id );

    if (clusters.length === 0) {

      console.log(aFeatures);
      let popupText = `<h5 Class="popupCity">asas</h5>`;
      aFeatures.forEach((item) => {
        popupText += renderCard(item, false);
      });

      new mapboxgl.Popup(popupOptions)
      .setLngLat(coordinates)
      .setHTML(popupText)
      .addTo(map);


//      clusterSource.getClusterLeaves(clusterId, pointCount, 0, (error, leavesFeatures) => {
//        let popupText = `<h5 Class="popupCity">${leavesFeatures[0].properties.title}</h5>`;
//          leavesFeatures.forEach((item) => {
//          popupText = renderCard(item, false);
//        });
//        // popupText += renderCard(leavesFeatures[0], false);
//        console.log(leavesFeatures[0]);
//        new mapboxgl.Popup({
//          anchor: 'bottom-left',
//        })
//          .setLngLat(coordinates)
//          .addTo(map);
//      });
    }
  });
}

const clusterClickListener = () => {
  
  map.on('click', 'clusters', (e) => {    
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['clusters'],
    });

    const clusterId = features[0].properties.cluster_id;
    const clusterSource = map.getSource('pois');

    const leaves = clusterSource.getClusterChildren(clusterId, (err, aFeatures) => {
      console.log(aFeatures);
    });


console.log(leaves);
    if(features.length > 1){
     map.getSource('pois').getClusterExpansionZoom(
       clusterId,
       (err, zoom) => {
         map.flyTo({
           center: features[0].geometry.coordinates,
           zoom,
           speed: 2,
         });
       },
     );
    }else{
      addClusterPopups(e, features, clusterId, clusterSource);
    }


    

  });
}


const addClusterListener = () => {
  clusterClickListener();
  unclusteredPointClickListener();

  map.on('mouseenter', 'clusters', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseenter', 'unclustered-point', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'clusters', () => {
    map.getCanvas().style.cursor = '';
  });

  map.on('mouseleave', 'unclustered-point', () => {
    map.getCanvas().style.cursor = '';
  });
}

/* Unclustered Elements
############################################################################ */

const addUnclusteredLayer = () => {
  // Design for single cluster point
  map.addLayer({
    id: 'unclustered-point',
    type: 'circle',
    source: 'pois',
    filter: ['!', ['has', 'point_count']],
    paint: {
      'circle-color': colors['accent'],
      'circle-radius': 10,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff',
    },
  });
}

const unclusteredPointClickListener = () => {

  map.on('click', 'unclustered-point', (e) => {
    console.log('unclustered-point', e.features.length);
    const coordinates = e.features[0].geometry.coordinates.slice();

    currentZoomLevel = map.getZoom();
    map.flyTo({
      center: e.features[0].geometry.coordinates,
      zoom: (currentZoomLevel < 5 ? 5 : currentZoomLevel),
      speed: 2,
    });
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup(popupOptions)
      .setLngLat(coordinates)
      .setHTML(renderCard(e.features[0], false))
      .addTo(map);
  });


}

/* Cards
############################################################################ */

const renderCard = (data) => {
  const { title, imgSrc, url, repository } = data.properties;
  
  return `
    <div class="card popup-card">
      <a href="${url}">
        <div class="image-stripe-list__item" title="${title}">
          <img loading="lazy" src="${imgSrc}" alt="${title}" alt="${title}">
        </div>
        <div class="map-card-content">
          <h5 class="map-card-title">${title}</h5>
          <p class="map-card-desc">${repository}</p>
        </div>
      </a>
    </div>
  `;
}

/* Main
############################################################################ */

document.addEventListener("DOMContentLoaded", async (event) => {
  initMap();
  poisGeoJSON = geoData;
  getColors();
  // addMapData();

  await loadData();
});