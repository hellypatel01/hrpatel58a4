// Required modules
const express = require('express');
const path = require('path');
const collegeData = require('./modules/collegeData'); 

// Constants
const HTTP_PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.join(__dirname, 'Public')));
// Middleware to serve static files from the 'views' directory
app.use(express.static(path.join(__dirname, 'views')));


// Function to initialize college data
function initialize() {
    return collegeData.initialize('./data')
        .then(() => {
            console.log('Data initialized successfully.');
        })
        .catch((err) => {
            console.error('Failed to initialize data:', err);
            throw err; // Propagate the error further
        });
}

// Routes

// Route to get all students or students by course
app.get('./data/students.json', (req, res) => {
    let course = req.query.course;
    if (course) {
        collegeData.getStudentsByCourse(parseInt(course))
            .then((students) => {
                if (students.length === 0) {
                    res.status(404).json({ message: 'no results' });
                } else {
                    res.json(students);
                }
            })
            .catch((err) => {
                res.status(500).json({ message: err.message });
            });
    } else {
        collegeData.getAllStudents()
            .then((students) => {
                if (students.length === 0) {
                    res.status(404).json({ message: 'no results' });
                } else {
                    res.json(students);
                }
            })
            .catch((err) => {
                res.status(500).json({ message: err.message });
            });
    }
});

// Route to get TAs
app.get('/tas', (req, res) => {
    collegeData.getTAs()
        .then((tas) => {
            if (tas.length === 0) {
                res.status(404).json({ message: 'no results' });
            } else {
                res.json(tas);
            }
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});

// Route to get all courses
app.get('./data/courses.json', (req, res) => {
    collegeData.getCourses()
        .then((courses) => {
            if (courses.length === 0) {
                res.status(404).json({ message: 'no results' });
            } else {
                res.json(courses);
            }
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});

// Route to get a single student by student number
app.get('./modules/student/:num', (req, res) => {
    let studentNum = req.params.num;
    collegeData.getStudentByNum(parseInt(studentNum))
        .then((student) => {
            if (!student) {
                res.status(404).json({ message: 'no results' });
            } else {
                res.json(student);
            }
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});

// Route to serve home.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/student/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'addstudent.html'));
});
// Route to serve about.html
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Route to serve htmlDemo.html
app.get('/htmlDemo', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'htmlDemo.html'));
});


app.post('/students/add', (req, res) => {
    console.log(req.body); // Log the form data for debugging
    collegeData.addStudent(req.body)
        .then(() => {
            res.redirect('/students');
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Unable to add student");
        });
});


// 404 route handler
app.use((req, res) => {
    res.status(404).send('Page Not THERE, Are you sure of the path?');
});

// Start server after initializing data
initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`Server is running and listening on port ${HTTP_PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to start server:', err);
    });