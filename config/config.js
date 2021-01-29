module.exports = {
    port: process.env.PORT || 3000,
    mongoDB: process.env.MONGODB || 'mongodb+srv://Oleh:VPZacE7KbDB2gcK8@cluster0.gqeez.mongodb.net/DB2?retryWrites=true&w=majority',
    secret_key: process.env.JWT || 'OutUp'
};