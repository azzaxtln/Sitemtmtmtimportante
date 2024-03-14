const express = require('express');
const fetch = require('node-fetch');
const winston = require('winston');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/notify', (req, res) => {
    const botToken = '6899131659:AAFsdGzI1A39a3JVP09ZHBEUk20ZjQB-L84'; 
    
    
    const chatId = '6023968992'; 
    
    
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: 'Alguém clicou no botão!',
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Notificação enviada com sucesso:', data);
        res.send('Notificação enviada com sucesso!');
    })
    .catch(error => {
        console.error('Erro ao enviar notificação:', error);
        res.status(500).send('Erro ao enviar notificação!');
    });
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
