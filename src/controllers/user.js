import User from '../models/user.js'
import Product from '../models/Products.js'
import Connection from '../models/connection.js'

export const sendConnection = async (req , res, next) =>{
     try{
         const {current_user_id }= req.headers;
         const {to}=req.body
         console.log(current_user_id);
         console.log(to)
         if(!current_user_id  || !to ) {
             return res.status(400).json({ "error": "VALIDATION_ERROR", "message": "toUserId is required" }
)
         }
         if(current_user_id===to){
            return res.status(400).json({ "error": "VALIDATION_ERROR", "message": "A user cannot connect with themselves" }
)
         }
         const exits = await Connection.findOne({current_user_id ,to});
         if(exits && exits.status==='accepted'){
             return res.status(409).json({ "error": "ALREADY_CONNECTED", "message": "These users are already connected" }
)
         }
         if(exits){
             return res.status(200).json({
                 message:"req already sent"
             })
         }
         const eu= await User.findOne({_id:current_user_id});
         const eu2= await User.findOne({_id:to});
         if(!eu || !eu2){
             return res.status(404).json( { "error": "USER_NOT_FOUND", "message": "No user found with id u2" })
         }
         const conn = new Connection({from:current_user_id ,to})
         await conn.save();
         return res.status(201).json({
        "id": conn._id,
     "fromUserId": current_user_id,
         "toUserId": to
       }
     )
     } catch(err){
         next(err)
     }
}
export const responceConn = async (req , res, next) =>{
     try{
         const {current_user_id }= req.headers;
         const {to, action}=req.body
         console.log(current_user_id);
         console.log(action)
         if(!to ) {
             return res.status(400).json({ "error": "VALIDATION_ERROR", "message": "connectionId and action are required" }
            )
         }
         if(action!='accept' && action!='reject'){
               return res.status(400).json({ "error": "VALIDATION_ERROR", "message": "action must be either ACCEPT or REJECT" }

)
         }
         if(current_user_id===to){
            return res.status(400).json({ "error": "VALIDATION_ERROR", "message": "A user cannot connect with themselves" }
)
         }
         const exits = await Connection.findOne({to:current_user_id ,from:to});
         if(!exits){
             return res.status(404).json( { "error": "CONNECTION_NOT_FOUND", "message": "No connection request found with id c1" }
)
         }
         if(exits && exits.status!=='pending'){
             return res.status(409).json( { "error": "INVALID_STATUS", "message": "Only pending connection requests can be responded to" }

)
         }
         if(!exits.to.equals(current_user_id)){
             return res.status(403).json({ "error": "NOT_AUTHORIZED", "message": "Only the receiver of the connection request can respond to it" }
)
         }
         const eu= await User.findOne({_id:current_user_id});
         const eu2= await User.findOne({_id:to});
         if(!eu || !eu2){
             return res.status(404).json( { "error": "USER_NOT_FOUND", "message": "No user found with id u2" })
         }
         const conn = await Connection.updateOne({from:to ,to:current_user_id}, { $set: { status: action }})
         const newcoon= await Connection.findOne({from:to ,to:current_user_id})
         return res.status(200).json({
          newcoon}
     )
     } catch(err){
         next(err)
     }
}