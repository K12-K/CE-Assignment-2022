const { default: mongoose } = require("mongoose")
const moment = require("moment")

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 100,
        required: true
    },
    description: {
        type: String,
        maxlength: 1000,
        required: true
    },
    skillset: {
        type: Array,
        required: true
    },
    noofmembers: {
        type: String,
        enum: {
            values: [ '1', '2', '3', '4', '5', '5+' ],
            message: 'Error: validating data, No of Members {VALUE} is Invalid'
        },
        required: true
    },
    isactive: {
        type: String,
        enum: {
            values: [ 'Yes', 'No' ],
            message: 'Error: validating data, isActive {VALUE} is Invalid'
        },
        required: true
    },
    createddate: {
        type: String,
        default: moment(Date.now()).format('DD-MM-YYYY hh:mm A')
    }
})

const ProjectModel = new mongoose.model("Project", projectSchema)

module.exports = { ProjectModel }