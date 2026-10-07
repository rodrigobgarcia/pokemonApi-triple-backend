require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const {auth} = require("./middlewares/auth")
const {createUser} = require("./controllers/users")
const routerUsers = require("./routes/users")
//const cors = require('cors');


const app = express();
//O banco vai ser um MongoDB Atlas - banco foi criado e acessado pelo desktop / precisa conectar;
//Precisa criar o banco no Mongo
const { PORT = 3000 } = process.env;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Mongoose Conectado"))
    .catch((err) => console.log("Erro ao conectar: ", err.message))


app.use(express.json());
// app.use(cors());
app.post('/signup', createUser);
app.use("/users", auth, routerUsers );
//app.use(errorHandler);
app.use((req, res) => {
  res.status(404).json({ message: 'A solicitação não foi encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});