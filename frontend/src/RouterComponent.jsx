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
import UserDetailComponent from './components/patient/UserDetailComponent';
import ProfileComponent from './components/ProfileComponent';
import AddPrescriptionComponent from './components/admin/AddPrescriptionComponent';
import AddSpecificPrescriptionComponent from './components/admin/AddSpecificPrescriptionComponent';
import ChangePasswordComponent from './components/auth/ChangePasswordComponent';
import HospitalDetailComponent from './components/admin/HospitalDetailComponent';

function RouterComponent() {
  return (
    <>
        <Routes>
            <Route path="/" element={<LoginComponent />}></Route>
            <Route path ="/change-password" element={<ChangePasswordComponent />}></Route>
            <Route path='/patient' element={<PatientComponentMiddleware />}>
              <Route path="/patient" element={<HomeComponent />}></Route>
              <Route path=":id" element={<ProfileComponent />}></Route>
              <Route path="schedule" element={<ScheduleComponent />}></Route>
              <Route path="hospitals" element={<HospitalsComponent />}></Route>
              <Route path="doctors" element={<DoctorComponent />}></Route>
              <Route path="notifications" element={<NotificationsComponent />}></Route>
              <Route path='user-detail' element={<UserDetailComponent />}></Route>
            </Route>
            <Route path='/admin' element={<AdminRouterMiddleware />}>
              <Route path='/admin' element={<Dashboard />}></Route>
              <Route path='add-user' element={<AddUserComponent />}></Route>
              {/* <Route path='add-doctors' element={<AddDoctorComponent/>}></Route> */}
              <Route path='show-schedule' element={<ShowScheduleComponent />}></Route>
              <Route path='add-prescription' element={<AddPrescriptionComponent />}></Route>
              <Route path='add-prescription/:id' element={<AddSpecificPrescriptionComponent />}></Route>
              <Route path='add-hospital_detail' element={<HospitalDetailComponent />}></Route>
            </Route>
        </Routes>
    </>
  )
}

export default RouterComponent