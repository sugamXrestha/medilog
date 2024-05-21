import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from '../API'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

function Header() {

    let token = localStorage.getItem("token") ?? "";
    const { register, setError, handleSubmit, reset, formState: { errors } } = useForm();
    
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isData, setIsData] = useState(false);
    const[userProfile, setUserProfile] = useState({});
    const [profileInfo, setProfileInfo] = useState('none');
    const [changePicture, setChangePicture] = useState('none');
    const [criteria, setCriteria] = useState("");

    
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
        localStorage.removeItem('userId');
        localStorage.removeItem('activeLink');
        window.location.href = "/";
      }

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
        document.querySelector('.changePicture').addEventListener('click', handleModel);
        document.querySelector('.editDetails').addEventListener('click', handleModel);
        document.querySelector('.userProfile').addEventListener('click', handleModel);
    
        return () => {
          // Cleanup function
          document.querySelector('.headerProfile').removeEventListener('click', handleModel);
        };
    }, [profileInfo]);

    useEffect(() => {
        const handleInsertModel = () => {
            const newDisplay = changePicture === 'flex' ? 'none' : 'flex';
            setChangePicture(newDisplay);
        };

        const handleOutsideClick = (event) => {
            const insertModel = document.getElementById('insertProfileModel');
            const changePicture = document.querySelector('.changePicture');
            
            if (!insertModel.contains(event.target) && !changePicture.contains(event.target)) {
                setChangePicture('none');
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        document.getElementById('insertProfileModel').style.display = changePicture;

        document.querySelector('.changePicture').addEventListener('click', handleInsertModel);
        document.querySelector('.insertOverlay').addEventListener('click', handleInsertModel);
    
        return () => {
          // Cleanup function
          document.querySelector('.changePicture').removeEventListener('click', handleInsertModel);
        };
    }, [changePicture]);


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

    

    const updateProfile = (data, criteria) => {
        let formData = new FormData();
          formData.append('image',data.image[0]);
          console.log(criteria)
          if(criteria){
            API.put(`/user/${criteria}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                console.log(response)
                setCriteria("");
                getProfile(); 
                reset();
                setTimeout(() => {
                    setChangePicture('none');
                    Swal.fire({
                        position: "top",
                        width: 200,
                        text: "Profile updated",
                        showConfirmButton: false,
                        timer: 1500,
                        
                    });
                    
                }, 2000);
               
            }).catch(error => {
                console.log(error)
            });
    
          }else{
              API.post("/user", data, {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              }).then(response => {
                  console.log(response);
                  reset();
                  getProfile(); 
              }).catch(error => {
                  console.log(error)
              });
            }
     }

     const getUserDetail = async(id) =>{
        try{
          await API.get(`/user-detail/${id}`, {
            headers : {
              Authorization : `Bearer ${token}`,
            }
          }).then(response =>{
            if(response.data != ''){
                setIsData(true);
            }

            setCriteria(response.data._id);
          })
        }catch(error){
          console.log(error);
        }
      }

      

    useEffect(() => {
    getProfile(); 
    }, []);

    useEffect(() => {
        if (userProfile && userProfile._id) {
          getUserDetail(userProfile._id);
        }
      }, [userProfile]);
    

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
                        <img src={userProfile.image} alt="" />
                    </div>
                </div>
            </div>
        </header>

        <div className="profileBackground" id="profileInfoModel">
            
            <Link to="about" className="userProfile">
            {/* <div className="userProfile"> */}
                <div className="profile">
                    <img src={userProfile.image} alt="" />
                </div>
                <p className="userName">{userProfile.name}</p>
            {/* </div> */}

            </Link>
            <div className="changePicture">
                <p>Change your profile</p>
            </div>
            <Link to="user-detail" className="editDetails">
                {/* <div className="editDetails"> */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25px" height="25px"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                    {isData ?
                    <p>Edit Details</p> : <p>Insert Details</p>
                    }
                    {/* <p>Edit Details</p> */}
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

        <div className="insertProfileBackground" id="insertProfileModel">
            <div className="insertOverlay"></div>
            <div className="insertContent">
                <div className="changeProfile">
                    <p>Change your picture</p>
                    <form onSubmit={handleSubmit(data => updateProfile(data, userProfile._id))}>
                        <label htmlFor="updateProfile" className="btn btn-primary">Choose image</label>
                        
                        <input type="file" name="image" id="updateProfile" {...register("image")} style={{display: 'none'}} />
                        <button type="submit" className="updateBtn ms-5">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
  );
}

export default Header;
