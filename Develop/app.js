const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

//empty array to push new employees to after filling out their info
const employees = [];

// gets role of employee that are used for each employee // the base of the questions
function employeeT() {
    return inquirer.prompt([{
        type: "list",
        choices: ["Manager", "Intern", "Engineer"],
        name: "newEmployeeRole",
        message: "What role is your team member?"
    },
    {
        type: "input",
        name: "name",
        message: "What is this team member's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is this team member's ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is this team member's Email?"
    },
    ])
}
// How many times to run the loop // ask if you want to add another employee after be
function moreEmployees() {
    return inquirer.prompt([{
        type: "list",
        choices: ["Yes", "No"],
        name: "makeNewEmployee",
        message: "Would you like to add another team member?"
    }])
}
// adding specific requirements for manager "office number"
function roleManager() {
    return inquirer.prompt([{
        type: "input",
        name: "officeNumber",
        message: "What is this Manager's office number?"
    }])
}
// adding specific requirments for engineer "github"
function roleEngineer() {
    return inquirer.prompt([{
        type: "input",
        name: "github",
        message: "What is this Engineer's GitHub Username"
    }])
}
//adding specific requirments for intern "school"
function roleIntern() {
    return inquirer.prompt([{
        type: "input",
        name: "school",
        message: "What school was/is this Intern enrolled at?"
    }])
}
//creating the employees
async function createEmployee() {
    try {
        const newEmp = await employeeT()
        if (newEmp.newEmployeeRole === "Engineer") {
            const newEmpEngineer = await roleEngineer()
            let newEngineer = new Engineer(newEmp.name, newEmp.id, newEmp.email, newEmpEngineer.github)
            employees.push(newEngineer)
            console.log("Added Engineer");

        } else if (newEmp.newEmployeeRole === "Intern") {
            const newEmpIntern = await roleIntern()
            let newIntern = new Intern(newEmp.name, newEmp.id, newEmp.email, newEmpIntern.school)
            employees.push(newIntern)
            console.log("Added Intern");

        } else if (newEmp.newEmployeeRole === "Manager") {
            const newEmpManager = await roleManager()
            let newManager = new Manager(newEmp.name, newEmp.id, newEmp.email, newEmpManager.officeNumber)
            employees.push(newManager)
            console.log("Added Manager");
        }
        addNew = await moreEmployees()
        if (addNew.makeNewEmployee === "Yes") {
            createEmployee()
        } else {
            if (!OUTPUT_DIR) {
                fs.mkdirSync(OUTPUT_DIR)
            } else {
                const writeTo = function (inputHTML) {
                    fs.writeFile(outputPath, inputHTML, () => {
                        console.log("Complete")
                    })
                }
                const html = render(employees)
                writeTo(html)
            }
        }
    } catch (error) {
        console.log(error)
    }
}
createEmployee()