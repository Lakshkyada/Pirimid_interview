import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        Ref:'User'

    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        Ref:'User'

    },
    status:{
        type: String,
        enum:['pending','accept','reject'],
        default: 'pending' 
    }
}, {
    timestamps: true
});

export default mongoose.model('Connection', connectionSchema);