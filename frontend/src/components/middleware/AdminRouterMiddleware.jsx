import React, { useEffect, useState } from "react";
import {Outlet} from 'react-router-dom'
import { Link } from "react-router-dom";
import Header from "../Header";

function AdminRouterMiddleware() {


    const [activeLink, setActiveLink] = useState("home" || localStorage.getItem('activeLink')); // State to manage active link

  // Function to handle link click and set activeLink state
  const handleLinkClick = (link) => {
    setActiveLink(link);
    localStorage.setItem('activeLink', link); 
  };
  return (
    <>
        {/* <header>
            <div className="logoSection">
            {isSmallScreen ? 
            (
            <>
            <div className="menuToggle" id="nav-btn">
            <span className="line-1"></span>
              <span className="line-2"></span>
              <span className="line-3"></span>
            </div>
            <img src="../../icons/logo2.png" alt="" width="45px"/>
            </>
            )
             : <img src="../../icons/logo1.png" width="75%" alt="" />}
            </div>
            <div className="searchSetting">
                <div className="searchBar">
                    <img src="../../icons/search.png" alt="" />
                    <input type="text" className="form-control" placeholder="Search" />
                </div>
                <div className="setting">
                    <img src="../../icons/setting.png" alt="" />
                    <div className="profile">
                        <img src="../../doctors/IMG_1001.png" alt="" />
                    </div>
                </div>
            </div>
        </header> */}
        <Header />
        <aside>
        
        <div className="menu adminMenu">
          <ul className="nav flex-column">
              <li className={"nav-item " + (activeLink === "home" ? "active" : "")}>
                <Link className="nav-link" to="/admin" onClick={() => handleLinkClick("home")}>
                  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="20px" height="20px">    <path d="M 25 1.0507812 C 24.7825 1.0507812 24.565859 1.1197656 24.380859 1.2597656 L 1.3808594 19.210938 C 0.95085938 19.550938 0.8709375 20.179141 1.2109375 20.619141 C 1.5509375 21.049141 2.1791406 21.129062 2.6191406 20.789062 L 4 19.710938 L 4 46 C 4 46.55 4.45 47 5 47 L 19 47 L 19 29 L 31 29 L 31 47 L 45 47 C 45.55 47 46 46.55 46 46 L 46 19.710938 L 47.380859 20.789062 C 47.570859 20.929063 47.78 21 48 21 C 48.3 21 48.589063 20.869141 48.789062 20.619141 C 49.129063 20.179141 49.049141 19.550938 48.619141 19.210938 L 25.619141 1.2597656 C 25.434141 1.1197656 25.2175 1.0507812 25 1.0507812 z M 35 5 L 35 6.0507812 L 41 10.730469 L 41 5 L 35 5 z"/></svg>
                  <span>
                    Home
                  </span>
                </Link>
              </li>
              <li className={"nav-item " + (activeLink === "user" ? "active" : "")}>
                <Link className="nav-link" to="/admin/add-user" onClick={() => handleLinkClick("user")}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="20" height="20"><path d="M483.2 9.6L524 64h92c13.3 0 24 10.7 24 24s-10.7 24-24 24H512c-7.6 0-14.7-3.6-19.2-9.6L468.7 70.3l-47 99.9c-3.7 7.8-11.3 13.1-19.9 13.7s-16.9-3.4-21.7-10.6L339.2 112H216c-13.3 0-24-10.7-24-24s10.7-24 24-24H352c8 0 15.5 4 20 10.7l24.4 36.6 45.9-97.5C445.9 6.2 453.2 1 461.6 .1s16.6 2.7 21.6 9.5zM320 160h12.7l20.7 31.1c11.2 16.8 30.6 26.3 50.7 24.8s37.9-13.7 46.5-32L461.9 160H544c53 0 96 43 96 96V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V448H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V96C0 78.3 14.3 64 32 64s32 14.3 32 32V352H288V192c0-17.7 14.3-32 32-32zm-144 0a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" fill='#000'/>
                  </svg>
                  <span>
                    Add User
                  </span>
                </Link>
              </li>
              <li className={"nav-item " + (activeLink === "show-schedule" ? "active" : "")}>
                <Link className="nav-link" to="/admin/show-schedule" onClick={() => handleLinkClick("show-schedule")}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20px" height="20px"><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"/></svg>
                  <span>
                    Schedule
                  </span>
                </Link>
              </li>
              {/* <li className={"nav-item " + (activeLink === "doctors" ? "active" : "")}>
                <Link className="nav-link" to="/admin/add-doctors" onClick={() => handleLinkClick("doctors")}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  width="20" height="20" fill='000000'><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>
                  <span>
                    Add Doctors
                  </span>
                </Link>
              </li> */}
              <li className={"nav-item " + (activeLink === "notifications" ? "active" : "")}>
                <Link className="nav-link" to="/admin/notifications" onClick={() => handleLinkClick("notifications")}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  width="20" height="20"><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>           
                  <span>
                    Notifications
                  </span>
                </Link>
              </li>
          </ul>
        </div>
      </aside>

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default AdminRouterMiddleware