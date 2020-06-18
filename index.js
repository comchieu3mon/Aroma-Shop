let express = require('express');
let app = express();

// Set Public Static Folder
app.use(express.static(__dirname + '/public'));

// User view Engine
let expressHbs = require('express-handlebars');
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Define your root here
app.get('/', function (req, res) {
    res.render('index');
});

// app.get('/:page', function (req, res) {
//     let banners = {
//         blog: 'Our Blog',
//         cart: 'Shopping Cart',
//         checkout: 'Checkout',
//         confirmation: 'Confirmation',
//         contact: 'Contact',
//         login: 'Login',
//         register: 'Register',
//         order: 'Order',
//         category: 'Category'
//     }
//     let page = req.params.page;
//     res.render(page, { banner: banners[page] });
// });

// app.get('/single-product', function (req, res) {
//     res.render('single-product', { banner: 'Product' });
// });

app.get('/sync', function(req, res) {
    let models = require('./models');
    models.sequelize.sync()
    .then(()=>{
        res.send('database sync finished');
    });
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log(`Server is running at ${app.get('port')}`);
});