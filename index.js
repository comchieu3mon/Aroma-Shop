let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public'));

let expressHbs = require('express-handlebars');
let helper = require('./controllers/helper');
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers: {
        createStarList: helper.creatStarList,
        createStar: helper.createStar
    }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

let cookieParse = require('cookie-parser');
app.use(cookieParse());

let session = require('express-session');
app.use(session({
    cookie: { httpOnly: true, maxAge: null },
    secret: 's3cr3t',
    resave: false,
    saveUninitialized: false
}));

let Cart = require('./controllers/cartController');
app.use(function(req, res, next) {
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    req.session.cart = cart;
    res.locals.totalQuantity = cart.totalQuantity;
    if (req.session.user) {
        res.locals.fullname = req.session.user.fullname;
        res.locals.isLoggedIn = true;
    } else {
        res.locals.username = '';
        res.locals.isLoggedIn = false;
    }
    next();
});

app.use('/', require('./routes/indexRouter'));
app.use('/products', require('./routes/productRouter'));
app.use('/cart', require('./routes/cartRouter'));
app.use('/comments', require('./routes/commentRouter'));
app.use('/reviews', require('./routes/reviewsRouter'));
app.use('/users', require('./routes/userRouter'));

app.get('/:page', function (req, res) {
    let banners = {
        blog: 'Our Blog',
        cart: 'Shopping Cart',
        checkout: 'Checkout',
        confirmation: 'Confirmation',
        contact: 'Contact',
        login: 'Login',
        register: 'Register',
        order: 'Order',
        category: 'Category'
    }
    let page = req.params.page;
    res.render(page, { banner: banners[page] });
});


// app.get('/sync', function(req, res) {
//     let models = require('./models');
//     models.sequelize.sync()
//     .then(()=>{
//         res.send('database sync finished');
//     });
// });


app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log(`Server is running at ${app.get('port')}`);
});