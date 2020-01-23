const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); //modulo do node q cria o servidor, usado pelo express para o app ouvir as requisições
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app); //servidor http fora do express

setupWebsocket(server);

mongoose.connect("mongodb+srv://omnistack:omnistack@cluster0-y74ck.mongodb.net/week10?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);

//req -> dados que são requisitados pelo cliente (frontend)

//TIPOS DE PARAMETROS EXPRESS

//QUERY PARAMS: ficam visiveis na requisição (filtros, ordenação, paginação...)
//ROUTE PARAMS: usados em PUT E DELETE (fica na rota), request.params (identificar um recurso na alteração ou remoção)
//BODY: request.body (dados para a criação ou alteração de registros)