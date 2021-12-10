const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecastWithGeo = require('./utils/forecastWithGeo');
 
const app = express();

const port = process.env.PORT || 3000;

//definte paths for express config
const publicDirectioryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location

app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);


//setup static directory to serve
app.use(express.static(publicDirectioryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Robot'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Robot'
    });
})
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'this is the help page message',
        title: 'help',
        name: 'robot'
    });
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }
    forecastWithGeo(req.query.address).then(result => {
        if (result.error) {
            return res.send({ error: result.error });
        }
        else {
            return res.send({
                forecast: result.data.text,
                location: result.data.location,
                address: req.query.address,
            })
        }
    }
    )
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.send('Help article not found')
})

app.get('*', (req, res) => {
    res.send('my 404 page')
})

app.listen(port, () => {
    console.log('server is up on port '+port);
});