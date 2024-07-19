const fs = require('fs');
class Data {
    constructor(students, courses) 
     {
        this.students = students;
        this.courses = courses;
     }
}
let dataCollection = null;
function initialize() {
    return new Promise((resolve,reject)=>{
        fs.readFile('./data/students.json', 'utf8', (err, studentDataFromFile) => {
            if (err) {
                reject("unable to read students.json");
                return;
            }

            let studentData = JSON.parse(studentDataFromFile);

            fs.readFile('./data/courses.json', 'utf8', (err, courseDataFromFile) => {
                if (err) {
                    reject("unable to read courses.json");
                    return;
                }

                let courseData = JSON.parse(courseDataFromFile);

                dataCollection = new Data(studentData, courseData);
                resolve();
            }
                       );
        }
                   );
    }
                      );
}

function getAllStudents() {
    return new Promise((resolve, reject) =>
        {
        if (dataCollection.students.length > 0) {
            resolve(dataCollection.students);
        } else {
            reject("no results returned");
        }
    }
                      );
}

function getTAs() {
    return new Promise((resolve, reject) => {
        let TAs = dataCollection.students.filter(student => student.TA === true);
        if (TAs.length > 0) 
        {
            resolve(TAs);
        } else {
            reject("no results returned");
        }
    }
                      );
}
function getCourses() {
    return new Promise((resolve, reject) => {
        if (dataCollection.courses.length > 0) {
            resolve(dataCollection.courses);
        } else {
            reject("no results returned");
        }
    }
                      );
}

function getStudentById(id) {
    return new Promise((resolve, reject) => {
        const student = dataCollection.students.find(student => student.studentId === id);
        if (!student) {
            reject("no results returned");
        } else {
            resolve(student);
        }
    });
}

function getCourseById(id) {
    return new Promise((resolve, reject) => {
        const course = dataCollection.courses.find(course => course.courseId === id);
        if (!course) {
            reject("no results returned");
        } else {
            resolve(course);
        }
    });
}
function getStudentsByCourse(course) {
    return new Promise((resolve, reject) => {
        const studentsByCourse = dataCollection.students.filter(student => student.course === course);
        if (studentsByCourse.length === 0) {
            reject("no results returned");
        } else {
            resolve(studentsByCourse);
        }
    });
}


function addStudent(studentData) {
    return new Promise((resolve, reject) => {
        if (!studentData.TA) {
            studentData.TA = false;
        } else {
            studentData.TA = true;
        }

        studentData.studentNum = dataCollection.students.length + 1;
        dataCollection.students.push(studentData);

        resolve();
    });
}

function getStudentByNum(num) {
    return new Promise((resolve, reject) => {
        const student = dataCollection.students.find(student => student.studentNum === num);
        if (!student) {
            reject("no results returned");
        } else {
            resolve(student);
        }
    });
}

module.exports = { initialize,addStudent, getAllStudents, getTAs, getCourses, getStudentById, getCourseById, getStudentsByCourse, getStudentByNum };
