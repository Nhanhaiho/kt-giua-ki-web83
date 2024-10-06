import mongoose from "mongoose";
const tokenSchema = new moongoose.Schema({
    token: {
        type:String
    },
    created_at: {
        type: Date,
        default:Date.now()
    }
})

export default tokenSchema