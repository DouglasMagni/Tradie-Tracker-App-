import { useState, useEffect } from 'react'
import { Employee } from '../../models/employees'

export async function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/employees')
        if (response.ok) {
          const employeesData = await response.json()
          setEmployees(employeesData)
        } else {
          throw new Error('Failed to fetch employees')
        }
      } catch (error) {
        console.error('Error fetching employees:', error)
      }
    }

    fetchEmployees()

    // Cleanup function if needed
    return () => {
      // Cleanup logic if needed
    }
  }, [])

  return employees
}
