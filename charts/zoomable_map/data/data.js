// Iraq Governorates - Combined Data
// This file merges map geometry with governorate statistics
// 
// TO UPDATE DATA:
// - Edit governorate-data.js for statistics, population, voters, GDP, political info
// - Iraq map geometry is in iraq-map.js (do not edit unless updating boundaries)

// Create combined GeoJSON with enriched properties
const iraqGeoJSON = {
  type: 'FeatureCollection',
  features: iraqMapGeoJSON.features.map(feature => {
    const id = feature.properties.id;
    const stats = governorateData[id];
    
    if (stats) {
      return {
        ...feature,
        properties: {
          ...feature.properties,
          ...stats
        }
      };
    }
    
    return feature;
  })
};
