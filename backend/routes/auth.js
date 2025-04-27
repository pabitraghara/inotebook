const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT_SECRET = 'Pabitraisagoodb$oy';
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// Route:1 Create a User using POST '/api/auth/createuser'. no login required Dosen't require Auth
router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    //if there are errors returns bad requested and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() })
    }
    try {
        //Check whether the user with this email exists alredy
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, errors: 'Sorry a user with the email alredy exists' })
        }
        success = false;
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        //create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken });

        // res.json({user});

        //catch error
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }



})


// Route:2 Authenticate a User using POST '/api/auth/login'. no login required Dosen't require Auth
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password Cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'Plaese try to login with cortrect credentials' })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        success = false;
        if (!passwordCompare) {
            return res.status(404).json({success, error: 'Plaese try to login with correct credentials' })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }


})

// Route:3 Get loggedin user  Details: POST '/api/auth/getuser'. no login required Dosen't require Auth
router.post('/getuser',fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})


module.exports = router