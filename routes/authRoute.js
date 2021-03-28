const express     = require('express'),
      router      = express.Router()


// Register get route
router.get('/register', (req, res) => {
   res.render('auth/register')
})

// Login route
router.get('/login', (req, res) => {
   res.render('auth/login')
})


module.exports = router;