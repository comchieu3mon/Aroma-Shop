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


app.use('/', require('./routes/indexRouter'));
app.use('/products', require('./routes/productRouter'));

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