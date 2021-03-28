const express     = require('express'),
      router      = express.Router({mergeParams: true})

// Require models
const Campground = require('../models/Campground'),
      Comment     = require('../models/Comment')

// New
router.get('/new', (req, res) => {
   Campground.findById(req.params.id)
      .then(camp => {
         res.render('comment/new', {camp})
      })
      .catch(err => console.log(err))
})

// Create
router.post('/', (req, res) => {
   Campground.findById(req.params.id)
      .then(camp => {
         const {content} = req.body

         Comment.create({content})
            .then(comment => {
               camp.comments.push(comment)
               camp.save()
               res.redirect(`/${req.params.id}`)
            })
            .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
})

// Edit
router.get('/:commentId/edit', (req, res) => {
   Campground.findById(req.params.id)
      .then(camp => {
         Comment.findById(req.params.commentId)
            .then(comment => res.render('comment/edit', {camp, comment}))
            .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
})

// Update
router.put('/:commentId', (req, res) => {
   Campground.findById(req.params.id)
      .then(camp => {
         const {content} = req.body
         Comment.findByIdAndUpdate(req.params.commentId, {content})
            .then(comment => res.redirect(`/${req.params.id}`))
            .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
})

// Delete
router.delete('/:commentId', (req, res) => {
   Campground.findById(req.params.id)
      .then(camp => {
         Comment.findByIdAndDelete(req.params.commentId)
            .then(comment => res.redirect(`/${req.params.id}`))
            .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
})

module.exports = router