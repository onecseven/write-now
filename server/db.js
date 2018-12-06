//@ts-nocheck
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
// const en = require("./../config")
// mongoose.connect(
//   `mongodb://${en.mongo_user}:${en.mongo_pw}@ds125831.mlab.com:25831/write-now`
// )
mongoose.connect(`mongodb://localhost/users`)
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function() {
  console.log("Connected to DB")
})

//setting up
const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  calendar: [
    { date: String, document: String, title: String }
  ],
  joined_on: String
})
/**gin
 * @constructor \{{{Model}}\} {{User}}
 * @param {string} name
 * @param {string} password
 */
const User = mongoose.model("User", userSchema)

/**
 * @func {{addUser}}{{DB}} adds user to db
 * @param {string} email
 * @param {string} password
 * @param {function} cb
 * @return {void}
 */

const addUser = (email, password, cb) => {
  bcrypt.hash(password, 10, (err, hashed) => {
    console.log("hashing")
    if (err) return cb(err)
    else {
      let temp = new User({
        name: email,
        password: hashed,
        joined_on: new Date().toString()
      })
      temp.save((err, doc) => {
        console.log("saving")
        if (err) cb(err)
        else {
          // console.trace(`User ${doc.name} registered`)
          // console.trace(doc._id)
          cb(null, doc.id)
        }
      })
    }
  })
}
/**
 * logs in
 * @param {String} email
 * @param {String} password
 * @param {function} cb
 * @returns {void} the callback will receive User._id
 */
const logIn = (email, password, cb) => {
  User.findOne({ name: email }, (err, result) => {
    if (err || !result) cb(new Error("user not found"))
    else {
      let hash = result.password
      let { _id } = result
      bcrypt.compare(password, hash, (err, result) => {
        if (err) cb(err)
        else {
          if (result) {
            cb(null, _id)
          }
        }
      })
    }
  })
}

/**
 * @func {{calendarUpdate}}{{}}
 * @param {string} _id
 * @param {calendar} content
 * @param {*} cb
 */

const calendarUpdate = (userDoc, cb) => {
  let {title, doc, _id } = userDoc
  let obj = {
    date: new Date().toDateString(),
    document: doc,
    title
  }
  User.findByIdAndUpdate(
    _id,
    { $push: { calendar: obj } },
    { safe: true, upsert: true },
    (err, res) => {
      if (err) cb(err)
      else {
        cb(null, res)
      }
    }
  )
}

/**
 * gets all the calendar documents
 * @param {string} _id
 * @param {function} cb
 */
const getUserById = (_id, cb) => {
  User.findById(_id, (err, user) => {
    if (err || !user) cb(new Error("error db"))
    else {
      console.log(user)
      cb(null, user)
    }
  })
}
/**
 * @func {{allUsers}}{{DB}}
 * @param \{{{Function}}\} {{Callback}} {{None}}
 * @returns \{{{void}}\} {{nothing}}{{}}
 */

const allUsers = cb => {
  User.find((err, res) => {
    if (err) {
      cb(err)
    } else {
      cb(null, res)
    }
  })
}

module.exports = {
  allUsers,
  addUser,
  logIn,
  calendarUpdate,
  getUserById
}
