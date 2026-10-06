require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const {createUser} = require("./controllers/users")
//const cors = require('cors');


const app = express();
//O banco vai ser um MongoDB Atlas - banco foi criado e acessado pelo desktop / precisa conectar;
//Precisa criar o banco no Mongo
const { PORT = 3000, MONGODB_URI = "mongodb://localhost:27017/poketimes" } = process.env;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/poketimes')
    .then(() => console.log("Mongoose Conectado"))
    .catch((err) => console.log("Erro ao conectar: ", err.message))


app.use(express.json());
// app.use(cors());
app.post('/signup', createUser);
app.use((req, res) => {
  res.status(404).json({ message: 'A solicitação não foi encontrada' });
});
//app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});