const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const {response,errorResponse} = require("../helper/");
const jwt = require('jsonwebtoken');


//REGISTER
  router.post("/register", async (req, res) => {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      
      const hashedPassword = await bcrypt.hash(
        req.body.password
        , salt);
      //save user and respond
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      // create token
      const token = await jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET);
      let data = await {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token
      }
      response(res, 'success register', data);
    } catch (err) {
      // handle error 
      errorResponse(res, 'error register', err)
    }
  });

//LOGIN
router.post("/login", async (req, res) => {
  try {
    // Check if email and password are provided

    const { email, password } = req.body;
    if (!email || !password) {
      errorResponse(res ,'Email and password are required',null , 404) 
       }
        const user = await User.findOne({ where: { email: req.body.email  } });
    !user &&  errorResponse(res ,'User Not found',null , 404)

    const validPassword = await bcrypt.compare(password, user.password)
    !validPassword && errorResponse(res ,'Password Wrong',null , 500)
      // create token
      const token =  jwt.sign({ userId: user.id }, '!@#123');
        // add token to  user object
      let data = await {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token
      }
    response(res, 'success login', data);
  } catch (err) {
    // handle error 
    errorResponse(res, 'error login', err)
  }
});

module.exports = router;