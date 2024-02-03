import express from 'express'
const router = express.Router()
import EmployeeController from '../Controller/employeeController.js'
import Auth from '../Auth/authenticate.js'

// router.get('/user', Auth.authenticate, Auth.adminAuth, EmployeeController.getUser)
router.get('/user', EmployeeController.getUser)
router.get('/user/:name', EmployeeController.getUserById)



router.post('/create', EmployeeController.createUser)
router.post('/login', EmployeeController.login)


export default router