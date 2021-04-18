const sampEmpArr = ['John', 'Smith', 'clerk', '$10/hr']

//* returns object w/ following keys: firstName, familyName, title, payPerHour, timeInEvents, timeOutEvents

//* Loads Array elements into corresponding Object properties. Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.
function createEmployeeRecord(fourElementArray) {
    const empRecord = {
        firstName: fourElementArray[0],
        familyName: fourElementArray[1],
        title: fourElementArray[2],
        payPerHour: fourElementArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return empRecord
}

const sampEmpRec = createEmployeeRecord(sampEmpArr)

//* Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
function createEmployeeRecords(arrayOfEmpArrays) {
    const collection = []
    arrayOfEmpArrays.forEach(arr => {
        collection.push(createEmployeeRecord(arr))
    })
    return collection
}

//* timeStamp format: 'YYYY-MM-DD HHMM'
//* Add an Object with keys to the timeInEvents Array on the record Object:
    //* type: Set to "TimeIn"
    //* hour: Derived from the argument
    //* date: Derived from the argument
function createTimeInEvent(timeStamp) {
    const timeInArr = timeStamp.split(' ')
    const timeInObj = {
        type: 'TimeIn',
        hour: parseInt(timeInArr[1]),
        date: timeInArr[0]
    }
    this.timeInEvents.push(timeInObj)
    return this
}

//* timeStamp format: 'YYYY-MM-DD HHMM'
//* Add an Object with keys to the timeOutEvents Array on the record Object:
    //* type: Set to "TimeOut"
    //* hour: Derived from the argument
    //* date: Derived from the argument
function createTimeOutEvent(timeStamp) {
    const timeInArr = timeStamp.split(' ')
    const timeOutObj = {
        type: 'TimeOut',
        hour: parseInt(timeInArr[1]),
        date: timeInArr[0]
    }
    this.timeOutEvents.push(timeOutObj)
    return this
}

//* timeStamp format: 'YYYY-MM-DD'
//* Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
function hoursWorkedOnDate(timeStamp) {
    const timeInObj = this.timeInEvents.find(n => n.date === timeStamp)
    const timeOutObj = this.timeOutEvents.find(n => n.date === timeStamp)
    return (timeOutObj.hour - timeInObj.hour)/100
}

//* timeStamp format: 'YYYY-MM-DD'
//* Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number.
function wagesEarnedOnDate(timeStamp) {
    let payOwed = hoursWorkedOnDate.call(this, timeStamp)
    return payOwed * this.payPerHour
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

//* Test the firstName field for a match with the firstName argument
function findEmployeeByFirstName(ArrOfEmpObj, firstName) {
    return ArrOfEmpObj.find(emp => firstName === emp.firstName)
}

//* Given an array of multiple employee objects, aggregate all the dates' wages and add them together
function calculatePayroll(ArrOfEmpObj) {
    let totalWages = 0
    ArrOfEmpObj.forEach(emp => {
        totalWages = totalWages + allWagesFor.call(emp)
    })
    return totalWages
}