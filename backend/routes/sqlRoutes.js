
const sql = require("mssql")
const router = require("express").Router()

router.get("/all", (req,res) =>{
    req.app.locals.db.query(`select * from Entry_Account inner join Credit_Info on Entry_Account.Entry_id=Credit_Info.Entry_id inner join Debit_Info on Credit_Info.Entry_id = Debit_Info.Entry_id`, function(err, recordset) {
        if (err) {
          console.error(err)
          res.status(500).send('SERVER ERROR')
          return
        }
        res.status(200).json(recordset.recordset)
      })
  })

  module.exports = router
