import express from 'express'
import * as db from '../db/employees'
import cors from 'cors'

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend domain
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization',
}

const router = express.Router()
router.use(cors(corsOptions))

router.get('/', async (req, res) => {
  try {
    const data = await db.getAllEmployees()
    res.json(data)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

//manager can see the employee details
router.get('/:managerId/:employeeId', async (req, res) => {
  const managerId = Number(req.params.managerId)
  const employeeId = Number(req.params.employeeId)
  try {
    const data = await db.getEmpByManagerId(managerId, employeeId)
    res.json(data)
  } catch (e) {
    console.log(e)
  }
})
//manager can update employee's profile when clicking to update
router.patch('/:managerId/:employeeId', async (req, res) => {
  try {
    const data = req.body
    const managerId = Number(req.params.managerId)
    const employeeId = Number(req.params.employeeId) // Retrieve the correct employee ID
    await db.updateEmpByManagerId(managerId, employeeId, data)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})
//manager can delete employee profile
router.delete('/:managerId/:employeeId', async (req, res) => {
  try {
    const managerId = Number(req.params.managerId)
    const employeeId = Number(req.params.employeeId)
    await db.deleteEmpByManagerId(managerId, employeeId)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

//manager can add employees
router.post('/:managerId/:employeeId', async (req, res) => {
  try {
    const managerId = Number(req.params.managerId)
    const employeeId = Number(req.params.employeeId)
    const employeeData = req.body // Assuming the request body contains the employee data
    await db.addEmpByManagerId(managerId, employeeId, employeeData) // Pass employeeData to the function
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

// router.get('/profile/:id', async (req, res) => {
//   try {
//     const id = Number(req.params.id)
//   managerId: number, employeeId: number, employeeId: EmployeesployeeId: number, employeeId: Employeesdb.getEmployeesDetails(id)
//     res.json(data)
//     res.sendStatus(204)
//   } catch (error) {
//     console.error(error)
//     res.sendStatus(500)
//   }
// })

// router.patch('/profile/:id', async (req, res) => {
//   try {
//     const id = Number(req.params.id)
//     await db.updateEmployeesDetails(id, req.body)
//     res.sendStatus(204)
//   } catch (error) {
//     console.error(error)
//     res.sendStatus(500)
//   }
// })

export default router
