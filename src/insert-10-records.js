const db = require(__dirname + '/db_connect2');


const sql = "INSERT INTO `admins`(`account`, `password`, `nickname`) VALUES (?, ?, ?)";


db.query(sql, [1,1,1])
    .then(([r])=>{
        return db.query(sql, [2,2,2])
    })
    .then(([r])=>{
        return db.query(sql, [3,3,3])
    })

console.log('ok');
