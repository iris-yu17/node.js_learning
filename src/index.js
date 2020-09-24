const express = require('express');

const app = express();

// 設定樣版引擎
app.set('view engine', 'ejs');

// top-level middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// 位置改/aaa/bbb bs會跑掉
app.get('/', (req, res) => {

    // send html
    // res.send('<h2>Hola </h2>');

    // 樣板用render
    res.render('home', { name: 'Iris' });

});


// 路由要有斜線
app.get('/json-sales', (req, res) => {
    // require會把他轉為array(因json是array格式)
    const sales = require(__dirname + '/../data/sales');

    // test: require會把它轉為array
    // res.send(sales.constructor.name)

    // require json 檔
    // res.json(sales);

    // template不用斜線
    res.render('json-sales', { sales })
});

// parctice
app.get('/json-sales2', (req, res) => {
    // require會把他轉為array(因json是array格式)
    const sales = require(__dirname + '/../data/sales');

    res.render('abc/def/json-sales2', { sales })
});

// practice: 取得queryString資料
app.get('/try-qs', (req, res) => {
    res.json(req.query);
});


// 取得post資料
// 因為是post，開localhost會找不到網頁，用postman
const parser = express.urlencoded({ extended: false });
app.post('/try-post', parser, (req, res) => {
    res.json(req.body);
});


// try-post-form 同個路由但方法不同
app.get('/try-post-form', (req, res) => {
    res.render('try-post-form');
});

app.post('/try-post-form', (req, res) => {
    res.json(req.body);
});


app.use(express.static(__dirname + '/../public'));

app.use((req, res) => {
    res
        .type('text/plain')
        .status(404)
        .send('找不到網頁');
});

app.listen(3000, () => {
    console.log('伺服器已啟動...');
})