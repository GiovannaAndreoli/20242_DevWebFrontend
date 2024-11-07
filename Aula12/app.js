const express = require('express');
const professoresRouter = require('./routes/professor');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use('/professores', professoresRouter);

mongoose.connect('mongodb+srv://gibsandreoliga:SmfZPoWQkZvvnsXD@cluster0.eec16.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
app.listen(3000, () => {
console.log('Conectado ao mongoDB');
console.log('Servidor iniciado na porta 3000');
})
})
.catch((err) => {
console.log(err);
});