const {Router}=require('express');
const {handleUserRegister, handleUserLogin, handleUserLogout, checker}=require('../controller/user');
const { userAuthorization } = require('../middleware/userAuthorization');

const route=Router()

route.post('/api/auth/register',handleUserRegister)

route.post('/api/auth/login',handleUserLogin)

route.post('/api/auth/logout',userAuthorization,handleUserLogout)

route.get('/api/auth/check',userAuthorization,checker)

module.exports=route
