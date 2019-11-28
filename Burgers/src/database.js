const mongoose = require('mongoose');
const _local ='mongodb://localhost/burgers-db';
const _remoto = 'mongodb://bqg:1234@34.230.33.186:27017/burgers-db?authSource=admin';

mongoose.connect(_local,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
}).then(db=> console.log('DB is connected!')).catch(err=>console.log(err));
