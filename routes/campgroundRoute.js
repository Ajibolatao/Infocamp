const express     = require('express'),
      router      = express.Router();

// Require models
const Campground = require('../models/Campground'),
      Comment     = require('../models/Comment')


// Index
router.get('/', (req, res) => {
   Campground.find({})
      .then(camps => {
         res.render('campground/index', {camps})
      })
      .catch(err => console.log(err)) 
})

// New
router.get('/new', (req, res) => {
   res.render('campground/new')
})


// Show
router.get('/:id', (req, res) => {
   Campground.findById(req.params.id)
      .populate('comments')
      .exec()
      .then(camp => {
         res.render('campground/show', {camp})
      })
      .catch(err => console.log(err))
   
})

// Create
router.post('/', (req, res) => {
   const { title, img, desc} = req.body;
   
   Campground.create({ title, img, desc})
      .then(camp => res.redirect('/'))
      .catch(err => console.log(err))
})

// Edit
router.get('/:id/edit', (req, res) => {
   Campground.findById(req.params.id)
      .then(camp => res.render('campground/edit', {camp}))
      .catch(err => console.log(err))
})

// Update
router.put('/:id', (req, res) => {
   const { title, img, desc} = req.body;
   
   Campground.findByIdAndUpdate(req.params.id, {title, img, desc})
      .then(camp => {
         res.redirect(`/${camp.id}`)
      })
      .catch(err => console.log(err))
})

// Delete
router.delete('/:id', (req, res) => {
   Campground.findByIdAndDelete(req.params.id)
      .then(camp => res.redirect('/'))
      .catch(err => console.log(err))
})

module.exports = router;