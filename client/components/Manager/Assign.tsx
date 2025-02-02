import { useState, useEffect } from 'react'
import { useEmployees } from '../../../client/hooks/useEmployees'
import { useJobById } from '../../hooks/useJobs'

interface Employee {
  id: number
  name: string
}

interface Id {
  id: number
}

function Assign({ id }: Id) {
  const { data, isLoading, isError, error } = useJobById(id)
  const [employeesData, setEmployeesData] = useState<Employee[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await useEmployees()
        setEmployeesData(employees)
      } catch (error) {
        console.error('Error fetching employees:', error)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (isError) {
    return <p>Error: {error?.message}</p>
  }
  // console.log(employeesData)
  if (data) {
    return (
      <>
        {/* Dropdown to select employee */}
        <select
          value={selectedEmployee ?? data.employee_id}
          onChange={(e) => setSelectedEmployee(parseInt(e.target.value))}
        >
          {employeesData.map((employee: Employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
        {/* Button to assign selected employee */}
        {/* <button onClick={() => handleAssignEmployee(data.id, selectedEmployee)}>
          Assign Employee
        </button> */}
      </>
    )
  }
}

export default Assign
