class Users{
    constructor() {
        this.persons = [];
    }

    addPerson(id, name, sala) {
        let person = {id, name, sala}

        this.persons.push(person);

        return this.persons;
    }

    getPerson(id) {
        let person = this.persons.filter(peronItem => peronItem.id === id)[0];

        return person;
    }

    getPersons() {
        return this.persons;
    }

    getPersonsByRoom(sala) {
        let personInSala = this.persons.filter(personItem => personItem.sala === sala);

        return personInSala;
    }

    removePerson(id) {
        let removedPerson = this.getPerson(id);
        
        this.persons = this.persons.filter(personItem => personItem.id !== id);

        return removedPerson;
    }
}

module.exports = {
    Users
}