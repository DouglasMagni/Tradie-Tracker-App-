import { Employee, Employees } from '../../models/employees'
import { Jobs } from '../../models/jobs'
import connection from './connection'

const db = connection

// // Show All employees jobs
// export async function getEmployeeJobs(id: number) {
//   return await db('jobs').select().where('employee_id', id).first()
// }

// // Add review and hours after job (After manager has created job)
// export async function updateEmployeesJob(id: number, data: Jobs) {
//   return await db('jobs').where('employee_id', id).update(data)
// }

//manager can see all the employees that the manager created
//it's a join table, looking at manager_id in the jobs table, and the employee id in the employee table.
// export async function getAllEmpByManagerId(managerId: number) {
//   console.log('managerId:', managerId)
//   return await db('employees')
//     .select()
//     .whereExists(function () {
//       this.select('*')
//         .from('jobs')
//         .whereRaw('jobs.employee_id = employees.id')
//         .andWhere('jobs.manager_id', managerId)
//     })
// }

export async function getAllEmployees() {
  return await db('employees').select()
}
//manager can see the employee details
export async function getEmpByManagerId(managerId: number, employeeId: number) {
  console.log('managerId:', managerId)
  return await db('employees')
    .select()
    .whereExists(function () {
      this.select('*')
        .from('jobs')
        .whereRaw('jobs.employee_id = employees.id')
        .andWhere('jobs.manager_id', managerId)
        .andWhere('jobs.employee_id', employeeId)
    })
}

// Employee can edit Profile
// export async function updateEmpByManagerId(managerId: number, data: Employees) {
//   return await db('employees')
//     .select()
//     .join('jobs', 'employees.id', 'jobs.employee_id')
//     .where('jobs.manager_id', managerId)
//     .update(data)
// }
export async function updateEmpByManagerId(
  managerId: number,
  employeeId: number,
  data: Employees,
) {
  console.log('manager:', managerId, 'employee:', employeeId, 'data:', data)
  return await db('employees')
    .where('id', employeeId) // Filter based on employee ID only
    .update(data)
}
//manager can add employee
export async function addEmpByManagerId(
  managerId: number,
  employeeId: number,
  employeeData: Employees,
) {
  console.log(
    'new employee',
    managerId,
    'employee ID:',
    employeeId,
    'data:',
    employeeData,
  )

  return await db('employees').insert({
    ...employeeData,
  })
}

export async function deleteEmpByManagerId(
  managerId: number,
  employeeId: number,
) {
  console.log('manager:', managerId, 'employee:', employeeId)
  return await db('employees')
    .where('id', employeeId) // Filter based on employee ID only
    .delete()
}
