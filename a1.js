// console.log("Hello World");
/*********************************************************************************
*  WEB700 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Helly Patel Student ID: 160760237 Date: 2024/05/23
*
********************************************************************************/
// array stored in a variable as global variable 
const serverVerbs =["GET", "GET", "GET", "POST", "GET", "POST"];
const serverPaths = ["/","/about","/contact","/login","/panel","/logout"];
const stdName = "Helly"; 
const stdEmail = "hrpatel58@myseneca.ca"
const serverRsponse = [
    "Welcome to WEB700 Assignment 1", 
    `This course name is WEB700. This assignment was prepared by ${stdName}`, 
    `${stdEmail}\n${stdName}`, 
    "Hello, User Logged In", 
    "Main Panel",
    "Logout Complete. Goodbye"
];


function httpRequest(httpVerb, path){
    for (let i=0; i < serverPaths.length; i++){
        if (serverVerbs[i] === httpVerb && serverPaths[i] === path) {
            return `200: ${serverRsponse[i]}`;
        }
    }
    return `404: Unable to process ${httpVerb} request for ${path}`;
}





console.log(httpRequest("GET","/"));
console.log(httpRequest("GET","/about"));
console.log(httpRequest("GET","/contact"));
console.log(httpRequest("POST","/login"));
console.log(httpRequest("GET","/panel"));
console.log(httpRequest("POST","/logout"));
console.log(httpRequest("PUT","/"));



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



function automateTests() {
    const testVerbs = ["GET", "POST"];
    const testPaths = ["/", "/about", "/contact", "/login", "/panel", "/logout", "/randomPath1", "/randomPath2"];

    function randomRequest() {
        const randVerb = testVerbs[getRandomInt(testVerbs.length)];
        const randPath = testPaths[getRandomInt(testPaths.length)];
        console.log(httpRequest(randVerb, randPath));
    }

    setInterval(randomRequest, 1000);
}


automateTests();

