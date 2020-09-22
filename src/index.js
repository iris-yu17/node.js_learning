const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h2>Hola </h2>');
});

app.listen(3000, () => {
    console.log('伺服器已啟動...');
})