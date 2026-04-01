const express = require('express');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcryptjs');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', (req, res) => { // REQUISIÇÃO DE LOGIN
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Preencha todos os campos' });
  }

  const sql = 'SELECT * FROM usuarios WHERE email = ? LIMIT 1';

  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro no servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ erro: 'Usuário não encontrado' });
    }

    // ainda NÃO validamos senha aqui
    res.json({
      sucesso: true,
      usuario: {
        id: results[0].id,
        nome: results[0].nome,
        email: results[0].email,
        perfil: results[0].perfil
      }
    });
  });
});

app.post('/castro', (req, res)=>{
  console.log('Rota foi criada');

  res.json ({ mensagem: 'Rota funcionando'});
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});