const db = require("../data/config")

function find() {
    return db("schemes")
        
}

function findById(schemeId){
    return db("schemes").where("id", schemeId)
}

function findSteps(id) {
    return db("steps as st")
        .innerJoin("schemes as sc", "sc.id", "st.scheme_id")
        .where("st.scheme_id", id)
        .select("st.id", "sc.scheme_name", "st.step_number", "st.instructions")
        .orderBy("st.step_number")
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