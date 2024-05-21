import React, {useState, useEffect} from 'react'
import API from '../API';
import { Link } from 'react-router-dom';

function ProfileComponent({id, onback}) {

    const token = localStorage.getItem("token") ?? "";
    const [userProfile, setUserProfile] = useState({});
    const [user, setUser] = useState({});

    const getProfile = () =>{
        API.get("/user/profile",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            // console.log(response.data)
            setUserProfile(response.data);
        }).catch(error =>{
            console.log(error);
        })
      }

    const getUserDetail = async (profileId) => { 
        if (!profileId) return;
        await API.get(`/user-detail/${profileId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
        }).then(response =>{
            // console.log(response.data[0])

        setUser(response.data[0])
        }).catch(error =>{
        console.log(error);
        })
    }

    useEffect(() =>{
        getProfile();
    }, [])
    useEffect(() => {
        if (userProfile && userProfile._id) {
          getUserDetail(userProfile._id);
        }
      }, [userProfile]);

  return (
    // console.log(user)
    <>
        <div className="container">
            <p onClick={onback} className='btn btn-secondary'>Back</p>
            <div className="cover"></div>
            <div className="mainContainer">
                    <div className="profileContainer">
                        <div className="profileHeader">
                            <div className="profileImage">
                                <img src={user.userId?.image} alt="" />
                            </div>
                            <p className="name">{userProfile.name}</p>
                            <p className='field'>{userProfile.category}</p>
                        </div>
                        <div className="profileInfo">
                            <p className="dob">{user.dobAD}</p>
                            <p className="phone">{userProfile.phone}</p>
                            <p className="email">{user.email}</p>
                        </div>
                    </div>
                    <div className="infoContainer">
                        <div className="infoHeader">
                            <ul>
                                <li className='active'>Personal Detail</li>
                                
                            </ul>
                        </div>

                        <div className="infoData">
                            <div className="item fullname">
                                <p>Full Name</p>
                                <p>{userProfile.name}</p>
                            </div>
                            <div className="item userCode">
                                <p>User Code</p>
                                <p>{userProfile.userCode}</p>
                            </div>
                            <div className="item gender">
                                <p>Gender</p>
                                <p>{user.gender}</p>
                            </div>
                            <div className="item occupation">
                                <p>Occupation</p>
                                <p>{user.occupation}</p>
                            </div>
                            <div className="item province">
                                <p>Province</p>
                                <p>{user.tempCity?.district?.state?.name}</p>
                            </div>
                            <div className="item district">
                                <p>District</p>
                                <p>{user.tempCity?.district?.name}</p>
                            </div>
                            <div className="item Municipality">
                                <p>Municipality</p>
                                <p>{user.tempCity?.name}</p>
                            </div>
                            
                        </div>
                    </div>

            </div>
            </div>

    </>
  )
}

export default ProfileComponent