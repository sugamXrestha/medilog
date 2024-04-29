import React from 'react'
import {Routes, Route} from 'react-router-dom';
import HomeComponent from './components/patient/HomeComponent';
import DoctorComponent from './components/patient/DoctorComponent';
import ScheduleComponent from './components/patient/ScheduleComponent';
import HospitalsComponent from './components/patient/HospitalsComponent';
import NotificationsComponent from './components/patient/NotificationsComponent';
import LoginComponent from './components/auth/LoginComponent';
import PatientComponentMiddleware from './components/middleware/PatientComponentMiddleware';
import AdminRouterMiddleware from './components/middleware/AdminRouterMiddleware';
import Dashboard from './components/admin/Dashboard';
import AddUserComponent from './components/admin/AddUserComponent';
// import AddDoctorComponent from './components/admin/AddDoctorComponent';
import ShowScheduleComponent from './components/admin/ShowScheduleComponent';
import UserKYCComponent from './components/UserKYCComponent';

function RouterComponent() {
  return (
    <>
        <Routes>
            <Route path="/" element={<LoginComponent />}></Route>
            <Route path='/user-detail' element={<UserKYCComponent />}></Route>
            <Route path='/patient' element={<PatientComponentMiddleware />}>
              <Route path="/patient" element={<HomeComponent />}></Route>
              <Route path="schedule" element={<ScheduleComponent />}></Route>
              <Route path="hospitals" element={<HospitalsComponent />}></Route>
              <Route path="doctors" element={<DoctorComponent />}></Route>
              <Route path="notifications" element={<NotificationsComponent />}></Route>
            </Route>
            <Route path='/admin' element={<AdminRouterMiddleware />}>
              <Route path='/admin' element={<Dashboard />}></Route>
              <Route path='add-user' element={<AddUserComponent />}></Route>
              {/* <Route path='add-doctors' element={<AddDoctorComponent/>}></Route> */}
              <Route path='show-schedule' element={<ShowScheduleComponent />}></Route>
            </Route>
        </Routes>
    </>
  )
}

export default RouterComponent