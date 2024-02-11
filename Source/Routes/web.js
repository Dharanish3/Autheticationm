import express from 'express'
const router = express.Router()
import EmployeeController from '../Controller/employeeController.js'
import Auth from '../Auth/authenticate.js'
import shortUrlController from '../Controller/shortUrlController.js'

// router.get('/user', Auth.authenticate, Auth.adminAuth, EmployeeController.getUser)
router.get('/user', EmployeeController.getUser)
router.get('/user/:name', EmployeeController.getUserById)


// Employee Controller
router.post('/create', EmployeeController.createUser)
router.post('/login', EmployeeController.login)
router.post('/forgot-password', EmployeeController.resetPassword);


// ShortUrl Api
router.get('/shortUrl' , shortUrlController.getUrl)
router.post('/shortUrl' , shortUrlController.createUrl)
router.get('/shortUrl/:short' , shortUrlController.shortUrlId)


export default router