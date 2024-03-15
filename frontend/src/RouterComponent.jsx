import React from 'react'
import {Routes, Route} from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import DoctorComponent from './components/DoctorComponent';
import ScheduleComponent from './components/ScheduleComponent';
import HospitalsComponent from './components/HospitalsComponent';
import NotificationsComponent from './components/NotificationsComponent';

function RouterComponent() {
  return (
    <>
        <Routes>
            <Route path="/" element={<HomeComponent />}></Route>
            <Route path="/schedule" element={<ScheduleComponent />}></Route>
            <Route path="/hospitals" element={<HospitalsComponent />}></Route>
            <Route path="/doctors" element={<DoctorComponent />}></Route>
            <Route path="/notifications" element={<NotificationsComponent />}></Route>
        </Routes>
    </>
  )
}

export default RouterComponent