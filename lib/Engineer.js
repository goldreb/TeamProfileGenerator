//creating engineer class

//importing employee class
const Employee = require('./Employee');

class Engineer extends Employee{
    constructor (name, email, id, role, gitHub) {
        //pass original parameter of employee to super function
        super(name, email, id, role)
        this.gitHub = gitHub;
    }

    getGitHub(){
        return this.gitHub;
    }
}
//exporting 
module.exports = Engineer;
