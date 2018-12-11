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
const {
  addUser,
  allUsers,
  logIn,
  calendarUpdate,
  getUserById,
  deleteCalendarItem
} = db

passport.use(new LocalStrategy({ usernameField: "email" }, logIn))

passport.serializeUser((user, done) => {
  console.log(
    "Inside serializeUser callback. User id is save to the session file store here"
  )
  done(null, user)
})

passport.deserializeUser((id, done) => {
  console.log("Inside deserializeUser callback", id)
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
    store: new FileStore({ secret: "keyboard cat" }),
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

app.post("/user", (req, res) => {
  const { email, password } = req.body
  addUser(email, password, (err, id) => {
    if (err) console.error(err)
    res.send(200)
  })
})
app.get("/user", (req, res) => {
  allUsers((err, id) => {
    if (err) console.error(err)
    res.send(id)
  })
})

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(JSON.stringify(req.user))
})

app.get("/calendar", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(JSON.stringify(req.user.calendar))
  } else {
    res.sendStatus(404)
  }
})

app.post("/calendar", (req, res) => {
  if (!req.isAuthenticated()) return res.sendStatus(403)
  let { doc, title } = req.body
  calendarUpdate(
    {
      title,
      _id: req.user._id,
      doc
    },
    (err, result) => {
      if (err || !result) console.error("error updating calendar", err)
      else {
        console.log("Update succesful")
        res.send(200)
      }
    }
  )
})

app.post("/delete", (req, res) => {
  if (!req.isAuthenticated()) return res.sendStatus(403)
  let { index } = req.body
  deleteCalendarItem(req.user._id, index, (err, result) => {
    if (err || !result) {
      console.error("error updating calendar", err)
      res.send(400)
    } else {
      console.log("delete")
      res.send(200)
    }
  })
})

exports.app = app
