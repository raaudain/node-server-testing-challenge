const db = require("../data/db-config");

function find(){
    return db("students").select("id", "username");
}

function findById(id){
    return db("users").where({id}).first();
}

function addStudent(student){
    return db("students")
        .insert(student, "id")
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}

function findStudent(student){
    return db("students").where(student);
}

module.exports = {find, addStudent, findById, findStudent}