const {Schema,model} = require('mongoose')

const leaveRequestSchema= new Schema({
    employee:{
        type:Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    startDate: {
        type:Date,
        required: true
    },
    endDate: {
        type:Date,
        required: true
    },
    reason:{
        type:String
    },
    status: {
        type: String,
        enum: ["pending" , "approved" , "rejected"],
        default: "pending",
        required: true
    },
},{
    timestamps:true
})

const LeaveRequest=model('leaveRequest',leaveRequestSchema)

module.exports=LeaveRequest