import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from '../API'

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


    const logout = () =>{
        localStorage.removeItem('token');
        window.location.href = "/";
      }

    const [profileInfo, setProfileInfo] = useState('none');
    useEffect(() => {
        const handleModel = () => {
            const newDisplay = profileInfo === 'block' ? 'none' : 'block';
            setProfileInfo(newDisplay);
        };

        const handleOutsideClick = (event) => {
            const profileModel = document.getElementById('profileInfoModel');
            const headerProfile = document.querySelector('.headerProfile');
            
            if (!profileModel.contains(event.target) && !headerProfile.contains(event.target)) {
                setProfileInfo('none');
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        document.getElementById('profileInfoModel').style.display = profileInfo;

        document.querySelector('.headerProfile').addEventListener('click', handleModel);
    
        return () => {
          // Cleanup function
          document.querySelector('.headerProfile').removeEventListener('click', handleModel);
        };
    }, [profileInfo]);

    let token = localStorage.getItem("token") ?? "";
    const[userProfile, setUserProfile] = useState({});

    const getProfile = () =>{
    API.get("/user/profile",{
        headers:{
        Authorization: `Bearer ${token}`
        }
    }).then((response)=>{
        setUserProfile(response.data);
    }).catch(error =>{
        console.log(error);
    })
    }

    useEffect(() => {
    getProfile(); 
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
                    <div className="headerProfile">
                        <img src="../icons/user.svg" alt="" />
                    </div>
                </div>
            </div>
        </header>

        <div className="profileBackground" id="profileInfoModel">
            <div className="userProfile">
                <div className="profile">
                    <img src="../icons/user.svg" alt="" />
                </div>
                <p className="userName">{userProfile.userCode}</p>
            </div>
            <div className="changeProfile">
                <Link to="#">Change your profile</Link>
            </div>
            <Link to="/patient/user-detail" className="editDetails">
                {/* <div className="editDetails"> */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25px" height="25px"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                    <p>Edit Details</p>
                {/* </div> */}
            </Link>
            <div className="help">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25px" height="25px"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                <p>Help and Support</p>
            </div>
            <div className="logout">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25px" height="25px"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
              <p className="loginBtn" onClick={logout}>Logout</p>
            </div>
        </div>
    </>
  );
}

export default Header;
