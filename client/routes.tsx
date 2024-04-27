import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import EmployeeLogin from './components/Employee/EmployeeLogin.tsx'
import JobsList from './components/Manager/JobsList.tsx'
import Schedule from './components/Employee/Schedule.tsx'
import WelcomePage from './components/WelcomePage.tsx'
import JobDetail from './components/Manager/JobDetail.tsx'
import AddJob from './components/Manager/AddJob.tsx'
import { ManagerComplete } from './components/Manager/ManagerComplete.tsx'
import SubmitJob from './components/Employee/SubmitJob.tsx'
import NotificationPage from './components/NotificationPage.tsx'
import EmployeeProf from './components/Employee/EmployeeProf.tsx'
import ManagerProf from './components/Manager/MangerProf.tsx'
import Login from './components/Login.tsx' // Import the Login component

export default createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="/login" element={<Login />} />
    <Route path="/jobs/employeeLogin" element={<EmployeeLogin />} />
    <Route index path="/" element={<WelcomePage />} />
    <Route path="/jobs/manager" element={<JobsList />} />
    <Route path="/jobs/manager/:id" element={<JobDetail />} />
    <Route path="/manager/add" element={<AddJob />} />
    <Route path="/jobs/manager/complete" element={<ManagerComplete />} />
    <Route path="/jobs/employee/:id" element={<Schedule />} />
    <Route path="/jobs/employee/:employeeId/:jobId" element={<SubmitJob />} />
    <Route path="/notifications" element={<NotificationPage />} />
    <Route path="/jobs/employee/:id/profile" element={<EmployeeProf />} />
    <Route path="/jobs/manager/:id/profile" element={<ManagerProf />} />
  </Route>,
)
