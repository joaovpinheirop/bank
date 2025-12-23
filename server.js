const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('public'));
app.use(express.json());

// Rota para buscar os saldos atualizados
app.get('/api/jogadores', (req, res) => {
    const dados = JSON.parse(fs.readFileSync('./dados.json', 'utf-8'));
    res.json(dados);
});

// Rota para você (Admin) descontar o dinheiro
app.post('/api/lance', (req, res) => {
    const { nome, valor, item } = req.body;
    let jogadores = JSON.parse(fs.readFileSync('./dados.json', 'utf-8'));

    const index = jogadores.findIndex(j => j.nome.toLowerCase() === nome.toLowerCase());

    if (index !== -1 && jogadores[index].saldo >= valor) {
        jogadores[index].saldo -= valor;
        jogadores[index].compras.push(item);
        fs.writeFileSync('./dados.json', JSON.stringify(jogadores, null, 2));
        res.json({ sucesso: true });
    } else {
        res.status(400).json({ erro: "Saldo insuficiente ou nome não encontrado" });
    }
});
const path = require('path');
// Rota para redirecionar o usuário para a página de perfil
app.get('/admin/:nome', (req, res) => {
    // Enviamos o arquivo HTML que está na pasta public
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});
    // Rota para redirecionar o usuário para a página de perfil
app.get('/bank/:nome', (req, res) => {
    // Enviamos o arquivo HTML que está na pasta public
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Escuta na rede local (Porta 3000)
app.listen(3000, '0.0.0.0', () => {
    console.log("-----------------------------------------");
    console.log("🎅 SERVIDOR DE NATAL RODANDO!");
    console.log("Peça para os convidados acessarem pelo seu IP.");
    console.log("-----------------------------------------");
});