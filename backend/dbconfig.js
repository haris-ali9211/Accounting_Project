const config = {
    server: `HA9211`,
    // port: 1434,
    port: 1433,
    database: 'Accounting',
    options: {
        trustedConnection: true,
        enableArithAbort: true,
        trustServerCertificate: true
    }
}
module.exports = config; 
