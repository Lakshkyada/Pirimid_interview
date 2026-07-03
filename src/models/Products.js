import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        Ref:'User'
    },
    price:{
        type: Number,
        requied:true
    },
    type:{
        type:String,

    },
    fromLocation:{
         type:String
    },
  toLocation: {
         type:String
    },
  validFrom: {
         type:String
    },
  validTo: {
         type:String
    },
  price: {
         type:Number
    },
  currency: {
         type:String
    },
  transitDays: {
         type:Number
    },


}, {
    timestamps: true
});

export default mongoose.model('Product', productSchema);