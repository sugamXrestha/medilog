import React, { useEffect, useState } from "react";

function Header() {
    
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    
    useEffect(() => {
    const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 1000);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize on component mount to set initial state
    handleResize();

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
    }, []);

  return (
    <>
        <header>
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
        </header>
    </>
  );
}

export default Header;
