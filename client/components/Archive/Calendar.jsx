import React, { Component } from "react"
import { view } from "react-easy-state"
import store from "./../store"

const today = new Date()
const monthIndex = today.getMonth()
const dayIndex = today.getDate()
const year = today.getFullYear()

const dateStr = (date) => {
  let months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ]
  let day = date.getDate()
  let monthIndex = date.getMonth() 
  let year = date.getFullYear()
  return `${year}${months[monthIndex]}${day}`
}

const buildCalendar = function() {
  let calendar = {}
  calendar[year] = Array(12)
  for (let i = 0; i < calendar[year].length; i++) {
    let array = calendar[year]
    if (i === 1) {
      array[i] = Array(28)
      array[i].fill(null)
    }
    if (i % 2 === 0) {
      array[i] = Array(30)
      array[i].fill(null)
    } else if (i % 2 !== 0) {
      array[i] = Array(31)
      array[i].fill(null)
    }
  }
  return calendar
}

class Month extends Component {
  constructor(props) {
    super(props)
    this.calendar = buildCalendar()
    this.state = {
      currentDisplayMonth: monthIndex
    }
  }
  render() {
    let months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ]
    let thisMonth = this.calendar[year][this.state.currentDisplayMonth]
    return (
      <div style={{
        "display": store.vis.archive
      }}  >
        <h1>{months[monthIndex]}</h1>
        <div className="container">
          <br />
          {thisMonth.map(
            (day, index) => {
              let dateStr = `${year}${months[monthIndex]}${index+1}`
              let checkmark = false
              if (store.archive[dateStr]) {
                checkmark = true
              }
              return (
                <div key={index} onClick={() => {}}>
                  <span>{dateStr}</span>
                  <span style={
                    {display: checkmark ? "" : "none"}
                    }>✔️</span>
                </div>
              )
            }
          )}
        </div>
      </div>
    )
  }
}

export default view(Month)
