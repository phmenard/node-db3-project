const db = require("../data/config")

function find() {
    return db("schemes")
        
}

function findById(schemeId){
    return db("schemes").where("id", schemeId)
}

function findSteps(id) {

}

function add(schemeData) {

}

function remove(id) {

}

module.exports = {
    find,
    findById,
    findSteps,
    add,
    remove,
}