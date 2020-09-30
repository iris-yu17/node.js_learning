const db = require(__dirname + '/db_connect2');


const sql = "INSERT INTO `admins`(`account`, `password`, `nickname`) VALUES (?, ?, ?)";

console.log(new Date());
(async ()=>{
    for(i=1; i<=1000; i++){
        await db.query(sql, ['b'+i, i, i]);
    }
})();

console.log(new Date());

