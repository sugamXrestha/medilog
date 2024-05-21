import React, { useEffect, useState } from 'react';
import API from '../../API'
import ProfileComponent from '../ProfileComponent';




function DoctorComponent() {

    let token = localStorage.getItem("token") ?? "";
    const[doctorList, setDoctorList] = useState([[]]);
    const [active, setActive] = useState("all");
    const [filteredDoctorList, setFilteredDoctorList] = useState([]);
    const [isViewProfile, setIsViewProfile] = useState(false);
    const [expandedProfile, setExpandedProfile] = useState()

    const handleActiveTab = (active) =>{
        setActive(active);
        if (active === "all") {
            setFilteredDoctorList(doctorList);
          } else {
            setFilteredDoctorList(doctorList.filter(doctor => doctor.category === active));
          }
    }

    const getUser = () => {
        API.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
              const doctors = response.data.filter(user => user.role === "doctor");
            //   const doctors = response.data.user.filter(user => user.userId && user.userId.length > 0 && user.userId.role === "doctor");
              setDoctorList(doctors);
              setFilteredDoctorList(doctors);
          })
          .catch((error) => {
            console.log(error.message);
          });
      };

      const handleViewProfile = (id) =>{
        setIsViewProfile(true);
        setExpandedProfile(id)
      }

      const handleBack = () => {
        setIsViewProfile(false);
        setExpandedProfile(null);
      };

      useEffect(() =>{
        getUser();
      }, [])


  return (
    <>
        {!isViewProfile && <div className="container">
        <div className="recordsMenu">
          <span>Doctors</span>
          <ul>
            <li className={(active === 'all' ? "active": "")} onClick={() => handleActiveTab('all')}>All</li>
            <li className={(active === 'Cardiology' ? "active": "")} onClick={() => handleActiveTab('Cardiology')}>Cardiology</li>
            <li className={(active === 'Sergery' ? "active": "")} onClick={() => handleActiveTab('Sergery')}>Sergery</li>
            <li className={(active === 'Orthopedics' ? "active": "")} onClick={() => handleActiveTab('Orthopedics')}>Orthopedics</li>
            <li className={(active === 'Dermotology' ? "active": "")} onClick={() => handleActiveTab('Dermotology')}>Dermotology</li>
            <li className={(active === 'Dentist' ? "active": "")} onClick={() => handleActiveTab('Dentist')}>Dentist</li>
            <li className={(active === 'Gynocology' ? "active": "")} onClick={() => handleActiveTab('Gynocology')}>Gynocology</li>
          </ul>

        </div>
            <div className="itemLists doctorList">
                {filteredDoctorList && filteredDoctorList.map((doctorItem, index) => {
                    // const userCode = doctorItem.userId && doctorItem.userId.length > 0 ? doctorItem.userId[0].userCode : '';
                    // const image = doctorItem.userId && doctorItem.userId.length > 0 ? doctorItem.userId[0].image : '';
                    
                    // const userCode = doctorItem.userId?.userCode;
                    // const image = doctorItem.userId?.image;
                    return (
                        <div key={index} className="item doctor">
                            <div className='itemBody doctorBody'>
                                <div className="doctorProfile">
                                    <div className="doctorImage">
                                        <img src={doctorItem.image} alt="" />
                                    </div>
                                    <p className="doctorId">DID {doctorItem.userCode}</p>
                                </div>
                                <div className="doctorInfo">
                                    <p className="doctorName">{doctorItem.name}</p>
                                    <p className="doctorField">{doctorItem.category}</p>
                                    <p className="hospital">Family Care Hospital</p>
                                    <p className="address">{doctorItem.tempDistrict}</p>
                                    <p className="email">{doctorItem.email}</p>
                                </div>
                            </div>
                            <div className="itemFooter doctorDetail">
                                <p className="detail" onClick={() => handleViewProfile(doctorItem._id)}>View Profile</p>
                                <p className="call">Make a call</p>
                            </div>
                        </div>
                    );
                })}
                
                
                 
                
            </div>
        </div>}
        { isViewProfile &&
                <ProfileComponent id={expandedProfile} onback={handleBack} />}
    </>
  )
}

export default DoctorComponent