import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requied:true,

    },
    email:{
        type: String,
        requied:true
    }

}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);