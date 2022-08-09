var dbConfig = require("./dbconfig");
const sql = require("mssql");

async function getData(){
    try{
        let pool = await sql.connect(dbConfig);
        console.log("🚀 ~ file: dbOperation.js ~ line 7 ~ getData ~ pool", pool)
        let data = await pool.request().query("select * from Entry_Account");
        return data.recordset;
    }
    catch(error){
        console.log(error)
    }
}
module.exports ={ 
    getData: getData
}