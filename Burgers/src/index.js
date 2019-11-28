const express =  require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
// Initializations
const app=express();
require('./database');

// Settings
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set('view engine','.hbs');

// Middlewares
app.use(express.urlencoded({extended:false})); //bloquear el envio de imagenes
app.use(methodOverride('_method'));
app.use(session({
    secret:'bqg',
    resave: true,
    saveUninitialized:true
}));

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/burger'));
app.use(require('./routes/pedidos'));


//Server is listening
app.listen(app.get('port'), () =>{
    console.log('Server on port ', app.get('port'))
});