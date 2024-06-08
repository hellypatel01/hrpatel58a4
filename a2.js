/*********************************************************************************
* WEB700 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Helly Rajeshbhai Patel Student ID: 160760237 Date: 05/06/2025
*
********************************************************************************/

const collegeData = require('./modules/collegeData.js');

collegeData.initialize()
    .then(() => {
        // If initialization is successful, proceed to retrieve all students
        return collegeData.getAllStudents();
    })
    .then((students) => {
        // Output the number of students retrieved
        console.log(`Successfully retrieved ${students.length} students`);
        // Proceed to retrieve all courses
        return collegeData.getCourses();
    })
    .then((courses) => {
        // Output the number of courses retrieved
        console.log(`Successfully retrieved ${courses.length} courses`);
         // Proceed to retrieve all TAs
        return collegeData.getTAs();
    })
    .then((TAs) => {
         // Output the number of TAs retrieved
        console.log(`Successfully retrieved ${TAs.length} TAs`);
    })
    .catch((err) => {
        // Handle any errors that occur and output them to the console
        console.log(err);
    });
