import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Aside() {

  const [activeLink, setActiveLink] = useState("home"); // State to manage active link

  // Function to handle link click and set activeLink state
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <aside>
        
        <div className="menu">
          <ul className="nav flex-column">
              <li className={"nav-item " + (activeLink === "home" ? "active" : "")}>
                <Link className="nav-link" to="/" onClick={() => handleLinkClick("home")}>
                    <img src="../../icons/home.png" alt="" />
                    <span>
                      Home
                    </span>
                </Link>
              </li>
              <li className={"nav-item " + (activeLink === "schedule" ? "active" : "")}>
                <Link className="nav-link" to="/schedule" onClick={() => handleLinkClick("schedule")}>
                    <img src="../../icons/schedule.png" alt="" />
                    <span>
                      Schedule
                    </span>
                </Link>
              </li>
              <li className={"nav-item " + (activeLink === "hospitals" ? "active" : "")}>
                <Link className="nav-link" to="/hospitals" onClick={() => handleLinkClick("hospitals")}>
                    <img src="../../icons/hospital.png" alt="" />
                    <span>
                      Hospitals
                    </span>
                </Link>
              </li>
              <li className={"nav-item " + (activeLink === "doctors" ? "active" : "")}>
                <Link className="nav-link" to="/doctors" onClick={() => handleLinkClick("doctors")}>
                    <img src="../../icons/doctor.png" alt="" />
                    <span>
                      Doctors
                    </span>
                </Link>
              </li>
              <li className={"nav-item " + (activeLink === "notifications" ? "active" : "")}>
                <Link className="nav-link" to="/notifications" onClick={() => handleLinkClick("notifications")}>
                    <img src="../../icons/notification.png" alt="" />
                    <span>
                      Notifications
                    </span>
                </Link>
              </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Aside;
