const express = require("express")
const session = require("express-session")
const FileStore = require("session-file-store")(session)
const bodyParser = require("body-parser")
const uuid = require("uuid/v4")
const app = express()
const server = require("http").createServer(app)
const db = require("./db.js")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const { addUser, allUsers, logIn, calendarUpdate, getUserById } = db

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    console.log("Inside local strategy callback")
    logIn(email, password, (err, result) => {
      console.log(err)
      if (err) done(err)
      else {
        const { _id } = result
        return done(null, _id)
      }
    })
  })
)

passport.serializeUser((user, done) => {
  console.log(
    "Inside serializeUser callback. User id is save to the session file store here"
  )
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  console.log("Inside deserializeUser callback")
  getUserById(id, (err, user) => {
    done(null, user)
  })
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  session({
    genid: req => {
      console.log("Inside the session middleware")
      return uuid() // use UUIDs for session IDs
    },
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
)

app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname + "/../dist"))

const port = 8080

server.listen(port, () => {
  console.log("App is listening to port", port)
})

app.post("/addUser", (req, res) => {
  const { email, password } = req.body
  addUser(email, password, (err, id) => {
    if (err) console.error(err)
    res.send(id)
  })
})

// app.post("/login", (req, res) => {
//   const { email, password } = req.body
//   logIn(email, password, (err, result) => {
//     if (err) console.error(err)
//     else {
//       const { _id } = result
//       res.send(_id)
//     }
//   })
// })

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err || !user) {
      return res.sendStatus(400)
    }
    console.log("Inside passport.authenticate() callback")
    // console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
    // console.log(`req.user: ${JSON.stringify(req.user)}`)
    req.login(user, err => {
      if (err || !user) {
        console.error(err)
        return res.sendStatus(400)
      }
      console.log("Inside req.login() callback")
      // console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      // console.log(`req.user: ${JSON.stringify(req.user)}`)
      return res.sendStatus(200)
    })
  })(req, res, next)
})

app.post("/calendarUpdate", (req, res) => {
  let { content, _id } = req.body
  content = JSON.parse(content)
  calendarUpdate(_id, content, (err, result) => {
    if (err || !result) console.error("error updating calendar", err)
    else {
      console.log("Update succesful")
      res.send(200)
    }
  })
})

exports.app = app
