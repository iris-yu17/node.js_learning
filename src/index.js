const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

// upload位置  (dest stands for destination)
const upload = multer({ dest: __dirname + '/../tmp_uploads' });
const app = express();

// 設定樣版引擎
app.set('view engine', 'ejs');

// top-level middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    res.locals.title = '小新牛排店';
    next();
})

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

    res.locals.title += ' - JSON';

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
// 對 /try-post-form 路由發出 get 要求時的回應：
app.get('/try-post-form', (req, res) => {
    res.render('try-post-form', { email: '', password: '' });
});
// 對 /try-post-form 路由發出 post 要求時的回應：
app.post('/try-post-form', (req, res) => {
    res.render('try-post-form', req.body);
});


// avatar是自訂的name
app.post('/try-upload', upload.single('avatar'), (req, res) => {
    console.log(req.file);

    if (req.file && req.file.originalname) {
        let ext = '';

        switch (req.file.mimetype) {
            case 'image/png':
            case 'image/jpeg':
            case 'image/gif':

                fs.rename(
                    req.file.path,
                    __dirname + '/../public/img/' + req.file.originalname,
                    error => {
                        return res.json({
                            success: true,
                            path: '/img/' + req.file.originalname
                        });
                    });

                break;
            default:
                fs.unlink(req.file.path, error => {
                    return res.json({
                        success: false,
                        msg: '不是圖檔'
                    });
                });

        }
    } else {
        return res.json({
            success: false,
            msg: '沒有上傳檔案'
        });
    }
});

app.get('/try-uuid', (req, res) => {
    res.json({
        uuid1: uuidv4(),
        uuid2: uuidv4(),
    });
});

const upload2 = require(__dirname + '/upload-img-module');
app.post('/try-upload2', upload2.single('avatar'), (req, res) => {
    res.json(req.file);
});


// 不加問號就兩個參數都要寫
app.get('/my-params1/:action?/:id?', (req, res) => {
    res.json(req.params);
});
app.get('/my-params2/*?/*?', (req, res) => {
    res.json(req.params);
});


// 手機號碼
app.get(/^\/09\d{2}\-?\d{3}\-?\d{3}$/, (req, res) => {
    let u = req.url.slice(1);
    u = u.split('?')[0];
    u = u.split('-').join('');
    res.send(u);
});

// admin2
app.use(require(__dirname + '/routes/admin2'));
// admin3
app.use("/base123", require(__dirname + '/routes/admin3'));

// axios
app.get('/yahoo', async (req, res) => {
    const response = await axios.get('https://tw.yahoo.com/');
    res.send(response.data);
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