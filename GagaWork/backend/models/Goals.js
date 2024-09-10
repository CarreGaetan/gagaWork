const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    }
});

const GoalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tasks: {
        today: [TaskSchema],
        week: [TaskSchema],
        month: [TaskSchema],
    }
})

const Goal = mongoose.model('Goal', GoalSchema)

module.exports = Goal