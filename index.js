// Your code here
let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayedArrays) {
    let employeeRecords = arrayedArrays.map(createEmployeeRecord)
    return employeeRecords
}

function createTimeInEvent(employeeRecord, dateStamp) {
   let dateArray = dateStamp.split(" ")
   let YMD = dateArray[0]
   let time = dateArray[1]
   let hourInt = parseInt(time, 10)
   let timeIn = {
    type : "TimeIn",
    hour : hourInt,
    date : YMD
   }
   employeeRecord.timeInEvents.push(timeIn)
   return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
   let dateArray = dateStamp.split(" ")
   let YMD = dateArray[0]
   let time = dateArray[1]
   let hourInt = parseInt(time, 10)
   let timeOut = {
    type : "TimeOut",
    hour : hourInt,
    date : YMD
   }
   employeeRecord.timeOutEvents.push(timeOut)
   return employeeRecord

}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
