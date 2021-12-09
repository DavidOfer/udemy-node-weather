const geocode = require('./geocode');
const forecast = require('./forecast');

const forecastWithGeo = async (address) => {
    try {
        const geoResult = await geocode(address);
        const forecastResult = await forecast(geoResult.latitude, geoResult.longitude);
        console.log(forecastResult);
        return {
            error: undefined, data: {
                text: 'It is ' + forecastResult.current.temperature + ' degrees in '
                    + forecastResult.location.region + '. it feels like ' + forecastResult.current.feelslike + ' degrees.',
                location: forecastResult.location.name +", " + forecastResult.location.region + ", " + forecastResult.location.country
            }

        };
    } catch (error) {
        return { error: error.message, data: undefined }
    }
}
module.exports = forecastWithGeo;