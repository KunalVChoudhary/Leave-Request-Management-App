const {Router}=require('express');
const {
    handleUserLeaveRequestList, 
    handleUserPostLeaveRequest, 
    handleUserWithdrawLeaveRequest, 
    handleAdminApproveLeaveRequest,
    handleAdminRejectLeaveRequest,
    handleUserLeaveList
}=require('../controller/leaveRequest');
const { adminAuthorization } = require('../middleware/adminAuthorization');
const { userAuthorization } = require('../middleware/userAuthorization');

const route=Router()

route.get('/api/leave',userAuthorization,adminAuthorization,handleUserLeaveRequestList)

route.post('/api/leave',userAuthorization,handleUserPostLeaveRequest)

route.delete('/api/leave/:id',userAuthorization,handleUserWithdrawLeaveRequest)

route.patch('/api/leave/:id/approve',userAuthorization,adminAuthorization,handleAdminApproveLeaveRequest)

route.patch('/api/leave/:id/reject',userAuthorization,adminAuthorization,handleAdminRejectLeaveRequest)

route.get('/api/leave/my', userAuthorization, handleUserLeaveList)

module.exports=route
