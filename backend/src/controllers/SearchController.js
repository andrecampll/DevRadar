const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseString');


module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray, //filtro de tecnologia, operador logico do mongodb
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({ devs });
    }
}