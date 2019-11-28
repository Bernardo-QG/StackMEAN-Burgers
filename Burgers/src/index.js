const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// Initializations
const app = express();
require('./database');
//require('./config/passport');

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

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user=req.user;    
    next();
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/alimentos'));
app.use(require('./routes/bebidas'));
app.use(require('./routes/pedidos'));

// Static Files
app.use(express.static(path.join(__dirname,'public')));



// Server is listening
app.listen(app.get('port'), () =>{
    console.log('Server on port ', app.get('port'))
});


