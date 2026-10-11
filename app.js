require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Segments, celebrate } = require('celebrate');
const { auth } = require('./middlewares/auth');
const requestLogger = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const routerUsers = require('./routes/users');
const routerTeams = require('./routes/teams');
const errorHandler = require('./middlewares/error');
const { signupSchema, signinSchema } = require('./utils/schemas');

const app = express();
const { PORT = 3000, MONGODB_URI, FRONTEND_URL } = process.env;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.log('Erro ao conectar:', err.message));

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', FRONTEND_URL] }));
app.use(requestLogger);

app.post(
  '/signup',
  celebrate({ [Segments.BODY]: signupSchema }),
  createUser,
);

app.post(
  '/signin',
  celebrate({ [Segments.BODY]: signinSchema }),
  login,
);

app.use('/users', auth, routerUsers);
app.use('/teams', auth, routerTeams);

app.use((req, res) => {
  res.status(404).json({ message: 'A solicitação não foi encontrada' });
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
