const globals = require('../globals');
const fetch= require('node-fetch');

const geocode = async (address) => {
    const geoUrl = `${globals.mapboxUrl}${encodeURIComponent(address)}.json?access_token=${globals.mapboxKey}&limit=1`
    const response = await fetch(geoUrl);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json();
    if (data.features.length === 0) {
        throw new Error('unable to find location')
    }

    return {
        latitude: data.features[0].center[1],
        longitude: data.features[0].center[0],
        location: data.features[0].place_name
    }
}
module.exports = geocode;