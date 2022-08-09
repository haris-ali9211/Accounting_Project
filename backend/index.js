var entry_Account = require('./Entry_Account')
const dbOperation = require('./dbOperation');

dbOperation.getData().then(result => {
    console.log(result);
})
