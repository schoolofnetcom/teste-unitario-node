import mongoose from 'mongoose';

let Todo = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Todo', Todo);