import User from '../models/user.js'
import Product from '../models/Products.js'
import Connection from '../models/connection.js'

export const createrate = async (req , res, next) =>{
     try{
        const {id} = req.headers;
        const {
  type,
  fromLocation,
  toLocation,
  validFrom,
  validTo,
  price,
  currency,
  transitDays
} = req.body
   if(!type || (type!=='sell' && type!=='buy')){
        return res.status(400).json({ "error": "VALIDATION_ERROR", "message": "type must be either BUY or SELL" }
)
   }
   if(price<=0){
    
        return res.status(400).json({ "error": "VALIDATION_ERROR", "message": "price must be greater than 0" })}
   if(transitDays<=0){
    
        return res.status(400).json( { "error": "VALIDATION_ERROR", "message": "transitDays must be greater than 0" }
)}
    const c= new Product({ id,type,
  fromLocation,
  toLocation,
  validFrom,
  validTo,
  price,
  currency,
  transitDays})
  await c.save();
  return res.status(201).json({ "success": true, "message": "Rate created successfully" }
)
     } catch(err){
        next(err)
     } 
}
export const searchRate = async (req , res, next) =>{
     try{
        const {id}=req.headers;
        const {fromLocation,toLocation} = req.body;
        const products = await Product.find({fromLocation,toLocation});
        if(!fromLocation || !toLocation){
            res.status(400).json({ "error": "VALIDATION_ERROR", "message": "fromLocation and toLocation are both required" }
)
        }
        return res.status(200).json({
            products
        })
     } catch(err){
        next(err)
     }
}