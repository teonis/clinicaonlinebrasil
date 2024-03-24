// No lado do cliente
var form = document.querySelector('.login100-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  var name = document.querySelector('input[name="name"]').value;
  var email = document.querySelector('input[name="email"]').value;
  var password = document.querySelector('input[name="pass"]').value;

  var data = {
    name: name,
    email: email,
    password: password
  };

  fetch('/cadastro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    if (data.success) {
      console.log('Cadastro realizado com sucesso!');
    } else {
      console.log('Erro no cadastro: ' + data.message);
    }
  })
  .catch(function(error) {
    console.log('Erro na solicitação: ', error);
  });
});
// No lado do servidor (usando Express.js e bcrypt para criptografar a senha)
var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var app = express();

app.use(bodyParser.json());

app.post('/cadastro', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  // Validação dos dados de entrada
  if (!name || !email || !password) {
    return res.json({ success: false, message: 'Por favor, preencha todos os campos.' });
  }

  // Criptografa a senha antes de armazená-la
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      return res.json({ success: false, message: 'Erro ao criptografar a senha.' });
    }

    // Aqui DEVE adicionar o código para armazenar o usuário no banco de dados
    // Por exemplo: db.saveUser(name, email, hash)

    res.json({ success: true });
  });
});

app.listen(3000, function() {
  console.log('Servidor rodando na porta 3000');
});
