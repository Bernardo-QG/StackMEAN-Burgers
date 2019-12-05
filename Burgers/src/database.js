const mongoose = require('mongoose');
const _local ='mongodb://localhost/burgers-db';
const _remoto = 'mongodb://bqg:1234@34.201.52.34:27017/burgers-db?authSource=admin';

mongoose.connect(_remoto,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
}).then(db=> console.log('DB is connected!')).catch(err=>console.log(err));
