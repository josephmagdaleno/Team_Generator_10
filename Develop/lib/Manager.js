
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, email, id, officenumber) {
        super(name, email, id)
        
        this.officenumber = officenumber;
    }

    getRole() {
        return `Manager`;
    }
    getOfficeNumber() {
        return this.officenumber;
    }


}

module.exports = Manager;