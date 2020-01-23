const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseString');
const {  findConnections, sendMessage   } = require('../websocket');

//CONTROLLER FUNCTIONS -> INDEX, SHOW, STORE, UPDATE, DESTROY

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response)  { //endereço localhost
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });

            //Filtrar as conexões que estão a no máximo 
            //10km de distancia e q o novo dev tenha pelo menos uma das tecnologias filtradas
            
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )
            
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
        return response.json(dev);
    }
}