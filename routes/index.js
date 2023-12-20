var express = require('express');
var router = express.Router();
var userModel = require('./users');
var postModel = require('./post');
const passport = require('passport');

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));


const isLoggedIn = (req, res, next) => {  // use it in routes where you want to check first that user is loggedIn or not...
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var err = req.flash("err");
  if(err[0]?.name !== undefined)
    err = err[0]?.name + " : " + err[0]?.message;
  else 
    err = 0;

  res.render('index',  {err : err});
  //res.redirect('/home');
});

router.get('/home', isLoggedIn , (req, res) => {  //used isLoggedIn function...
  res.render('home', {flag : req.flash()});
});


//////////flash messages.....
// router.get('/login', (req, res) => {
//   req.flash("success", "Welcom back");
//   res.redirect('/home');
// });


///////////////////////////////////
//User authentication & authorization

router.post('/register', (req, res) => {
  var userData = new userModel({
    username: req.body.username,
    dp: req.body.dp,
    fullname: req.body.fullname,
    email: req.body.email,
  });
  // console.log(req.body);
  // console.log(userData);
  userModel.register(userData, req.body.password)
  .then((registeredUser) => {
    //console.log(registeredUser);
      passport.authenticate("local")(req, res, () =>{
      res.redirect('/home');
    });
  })
  .catch((err) => {
    //console.log("ssssss" ,err);
    req.flash("err", err);
    res.redirect('/');
  })
});


router.post('/login',(req, res, next) => {
      console.log("login", req.body.username);
      res.cookie("username", req.body.username);
      next();
  },
  passport.authenticate("local", {
  successRedirect: '/home',
  failureRedirect: '/',
  }),
);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if(err) 
      return next(err);
    res.clearCookie("username");
    res.redirect('/');
  });
});





//mongodb question....

router.get('/createpost', isLoggedIn, (req, res) => {
  res.render('createpost');
});

router.post('/submit', async (req, res) => {
  const reqBody =  req.body;
  //console.log("#######################",req.cookies.username );
  const user = await userModel.findOne({username : req.cookies.username});
  //console.log("#######################", user._id, reqBody);

  const post =  await postModel.create({
    image : reqBody.image,
    description : reqBody.description,
    tags: reqBody.tags.split(','),
    createdBy : user._id,
  });
  user.posts.push(post._id);
  await user.save();
  req.flash("success", [post ,"userCrated"]);
  res.redirect('/home');
})

router.post('/findUser', async (req, res) => {
  const regex = new RegExp(`^${req.body.username}$`, 'i');    //i is for both b, B are same..., ^ : start, $ : end
  const user = await userModel.find({username : regex});
  //console.log(user, req.body);
  //res.send(user);
  res.render('response', {response : user});
});

router.post('/deleteUser', async (req, res) => {
  const regex = new RegExp(`${req.body.username}`, 'i');
  const user = await userModel.deleteOne({username : regex});
  //res.send(user);
  res.render('response', {response : user});
});

router.post('/findPostByUser', async (req, res) => {
  const regex = new RegExp(`^${req.body.username}$`, 'i'); 
  const user = await userModel.findOne({username : regex}).populate('posts');
  console.log("###################", req.body.username, user);
  //res.send(user);
  res.render('response', {response : user.posts});
});

module.exports = router;
