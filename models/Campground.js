const mongoose = require('mongoose')

const Comment = require('./Comment')

const CampgroundSchema = new mongoose.Schema({
   title: {
      type: String,
      require: true
   },
   desc: {
      type: String,
      require: true
   },
   img: {
      type: String,
      require: true
   },
   comments: [
      {
         type: mongoose.Schema.ObjectId,
         ref: 'Comment'
      }
   ],
   date: {
      type: Date,
      default: Date.now()
   }
})

module.exports = mongoose.model('Campground', CampgroundSchema)