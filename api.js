const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const api = express();
const port = 3000;

api.use(express.json());

const usuarios = [];

api.post('/usuarios', (req, res) => {
  const { cpf, nome, data_nascimento } = req.body;

  const novoUsuario = {
    cpf: parseInt(cpf),
    nome,
    data_nascimento: new Date(data_nascimento),
  };

  usuarios.push(novoUsuario);

  res.status(201).json({ message: 'Usuário criado com sucesso!' });
});

api.get('/usuarios/:cpf', (req, res) => {
  const cpfParam = parseInt(req.params.cpf);

  const usuario = usuarios.find(u => u.cpf === cpfParam);

  if (!usuario) {
    res.status(404).json({ error: 'Usuário não encontrado' });
  } else {
    res.json(usuario);
  }
});

api.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

api.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
