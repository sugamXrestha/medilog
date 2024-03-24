import React from 'react'
import {Routes, Route} from 'react-router-dom';
import HomeComponent from './components/patient/HomeComponent';
import DoctorComponent from './components/patient/DoctorComponent';
import ScheduleComponent from './components/patient/ScheduleComponent';
import HospitalsComponent from './components/patient/HospitalsComponent';
import NotificationsComponent from './components/patient/NotificationsComponent';
import LoginComponent from './components/auth/LoginComponent';
import PatientComponentMiddleware from './components/middleware/PatientComponentMiddleware';

function RouterComponent() {
  return (
    <>
        <Routes>
            <Route path="/" element={<LoginComponent />}></Route>
            <Route path='/patient' element={<PatientComponentMiddleware />}>
              <Route path="/patient" element={<HomeComponent />}></Route>
              <Route path="schedule" element={<ScheduleComponent />}></Route>
              <Route path="hospitals" element={<HospitalsComponent />}></Route>
              <Route path="doctors" element={<DoctorComponent />}></Route>
              <Route path="notifications" element={<NotificationsComponent />}></Route>

            </Route>
        </Routes>
    </>
  )
}

export default RouterComponent