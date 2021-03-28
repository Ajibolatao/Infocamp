const express        = require('express'),
      app            = express(),
      expressLayout  = require('express-ejs-layouts'),
      methodOverride = require('method-override'),
      mongoose       = require('mongoose')

// Require models
const Campground = require('./models/Campground'),
      Comment = require('./models/Comment'),
      User        = require('./models/User')

// Require routes
const authRoute = require('./routes/authRoute')
const campgroundRoute = require('./routes/campgroundRoute')
const commentRoute = require('./routes/commentRoute')


if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config()
}

mongoose.connect(process.env.DATABASE_URL, {
   useUnifiedTopology: true,
   useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false
})

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayout)
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))



// Import routers
app.use('/', authRoute)
app.use('/', campgroundRoute)
app.use('/:id/comment', commentRoute)



const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server at ${port}`))