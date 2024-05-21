import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2'
import API from '../../API';

const addUserDetailSchema = yup.object().shape({
  dobAD: yup.date().typeError('Date of birth is required').required('Date of birth is required'),
  gender: yup.string().required('Gender is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  marital: yup.string().required('Marital status is required'),
  occupation: yup.string().required('Occupation is required'),
  fatherName: yup.string().required('Father name is required'),
  motherName: yup.string().required('Mother name is required'),
  husbandWifeName: yup.string(),
  sonDaughterName: yup.string(),
  perCity: yup.string().required('Municipality is required'),
  
  perWard: yup.number().typeError('Ward No is required').required('Ward No is required').positive().integer(),
  perTole: yup.string().required('Tole is required'),
  tempCity: yup.string().required('Municipality is required'),
  tempWard: yup.number().typeError('Ward No is required').required('Ward No is required').positive().integer(),
  tempTole: yup.string().required('Tole is required'),
})

function UserDetailComponent() {

  const token = localStorage.getItem("token") ?? "";
  const[userProfile, setUserProfile] = useState({});
  // const [profileId, setProfileId] = useState(null);
  const [permCity, setPermCity] = useState([]);
  const [tempoCity, setTempoCity] = useState([]);
  const [permDistrict, setPermDistrict] = useState([]);
  const [tempoDistrict, setTempoDistrict] = useState([]);
  const [state, setState] = useState([]);
  const [activeForm, setActiveForm] = useState('personal');

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(addUserDetailSchema),
  });


    const handleFormClick = (activeform) =>{
        setActiveForm(activeform);
      }


  //   const getUserDetail = (profileId) => { 
  //     API.get(`/user-detail/${profileId}`, {
  //         headers: {
  //             Authorization: `Bearer ${token}`
  //         }
  //     }).then(response => {
  //       if(response.data){
  //         reset(response.data)
  //       }else{

  //       }
  //         // setUser(response.data);
  //         // setLoading(false);
  //     }).catch(error => {
  //         console.log(error)
  //     });
  // }

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

  const getDistrictByProvince = (provinceId, setDistrict) => {
    API.get(`/district/${provinceId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setDistrict(response.data);
    }).catch(error => {
      console.log(error);
    });
  };

  const getCityByDistrict = (districtId, setCity) => {
    API.get(`/city/${districtId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setCity(response.data);
    }).catch(error => {
      console.log(error);
    });
  };

  const getState = () => {
    API.get("/state", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setState(response.data);
    }).catch(error => {
      console.log(error);
    });
  };

  const handleProvinceChange = (event, addressType) => {
    const selectedProvinceId = event.target.value;
    if (selectedProvinceId !== "") {
      if (addressType === 'permanent') {
        getDistrictByProvince(selectedProvinceId, setPermDistrict);
      } else {
        getDistrictByProvince(selectedProvinceId, setTempoDistrict);
      }
    } else {
      if (addressType === 'permanent') {
        setPermDistrict([]);
      } else {
        setTempoDistrict([]);
      }
    }
  };

  const handleDistrictChange = (event, addressType) => {
    const selectedDistrictId = event.target.value;
    if (selectedDistrictId !== "") {
      if (addressType === 'permanent') {
        getCityByDistrict(selectedDistrictId, setPermCity);
      } else {
        getCityByDistrict(selectedDistrictId, setTempoCity);
      }
    } else {
      if (addressType === 'permanent') {
        setPermCity([]);
      } else {
        setTempoCity([]);
      }
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const year = date.getFullYear();

  return `${day} ${month} ${year}`;
  };
  

  const addUserDetail = (data) =>{
    const uData = { ...data, userId: userProfile._id, dobAD: formatDate(data.dobAD), }
    uData.dobAD = uData.dobAD.toString()
    API.post('/user-detail',uData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res =>{
      Swal.fire({
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500
    });
    reset();
    }).catch((error)=>{
      console.log(error);
    });
  }

    useEffect(() => {
      getProfile(); 
      // getUserDetail();
      getState();
    }, []);
    // useEffect(() => {
    //   if (userProfile && userProfile._id) {
    //     getUserDetail(userProfile._id);
    //   }
    // }, [userProfile]);

  return (
    <>
        <div className="kycContainer">
          <div className="formSteps">
            <div className={"stepsItem " + (activeForm === 'personal' ? "active": "")} onClick={() => handleFormClick('personal')}>
              <div className="stepsNumber">1</div>
              <p className='stepsTitle'>Personal Details</p>
            </div>
            <span> -------------------  </span>
            <div className={"stepsItem " + (activeForm === 'family' ? "active": "")} onClick={() => handleFormClick('family')}>
              <div className="stepsNumber">2</div>
              <p className='stepsTitle'>Family Details</p>
            </div>
            <span> ------------------- </span>
            <div className={"stepsItem " + (activeForm === 'address' ? "active": "")} onClick={() => handleFormClick('address')}>
              <div className="stepsNumber">3</div>
              <p className='stepsTitle'>Address Details</p>
            </div>
          </div>
          <div className="formContainer">
            <form onSubmit={handleSubmit(addUserDetail)}>
              <div className="personalDetailsComponent" id="personalDetailsComponent" style={{ display: activeForm === 'personal' ? 'block' : 'none' }}>
                <p className="title">Personal Details</p>
                <div className="row">
                  <div className="col form-group">
                    <label>DOB in AD:  </label>
                    <a className='text-danger'>
                      {errors.dobAD?.message && <span>{errors.dobAD?.message}</span>}
                    </a>
                    <input type="date" {...register("dobAD")} className='form-control' name='dobAD' />
                  </div>
                  <div className="col form-group mb-2">
                      <label> Gender:</label>
                      <a className='text-danger'>
                      {errors.gender?.message && <span>{errors.gender?.message}</span>}
                    </a>
                      <select defaultValue="" name='gender' {...register("gender")} className="form-control">
                          <option value='' disabled> -- Select Gender -- </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                      </select>
                  </div>
                </div>
                {/* <div className="form-group">
                  <label>DOB in BS:  </label>
                  <input type="date" className='form-control' name='dobBS' />
                </div> */}
                <div className="form-group">
                  <label>Email:  </label>
                  <a className='text-danger'>
                    {errors.email?.message && <span>{errors.email?.message}</span>}
                  </a>
                  <input type="email" {...register("email")} className='form-control' name='email' />
                </div>
                <div className="form-group mb-2">
                    <label> Marital Status:</label>
                    <a className='text-danger'>
                    {errors.marital?.message && <span>{errors.marital?.message}</span>}
                  </a>
                    <select defaultValue="" name='marital' {...register("marital")} className="form-control">
                        <option value="" disabled> --Select Marital Status--</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                    </select>
                </div>
                <div className="form-group">
                  <label>Occupation: </label>
                  <a className='text-danger'>
                    {errors.occupation?.message && <span>{errors.occupation?.message}</span>}
                  </a>
                  <input type="text" {...register("occupation")} className='form-control' name='occupation' />
                </div>
                <div className="button-group" style={{ float: 'right', paddingBottom: '2rem' }}>
                  <button type="button" className="btn btnColor"  onClick={() => handleFormClick('family')}>Next</button>
                </div>  
              </div>

              <div className="familyDetailsComponent" id="familyDetailsComponent" style={{ display: activeForm === 'family' ? 'block' : 'none' }}>
                <p className="title">Family Information</p>
                <div className="form-group">
                  <label>Father name: </label>
                  <a className='text-danger'>
                    {errors.fatherName?.message && <span>{errors.fatherName?.message}</span>}
                  </a>
                  <input type="text" {...register("fatherName")} className='form-control' name='fatherName' />
                </div>
                <div className="form-group">
                  <label>Mother name: </label>
                  <a className='text-danger'>
                    {errors.motherName?.message && <span>{errors.motherName?.message}</span>}
                  </a>
                  <input type="text" {...register("motherName")} className='form-control' name='motherName' />
                </div>
                {/* <div className="form-group">
                  <label>GrandFather name: </label>
                  <input type="text" className='form-control' name='grandfatherName' />
                </div> */}
                <div className="form-group">
                  <label>Husband/Wife name: </label>
                  <input type="text" {...register("husbandWifeName")} className='form-control' name='husbandWifeName' />
                </div>
                <div className="form-group">
                  <label>Son/Daughter name: </label>
                  <input type="text" {...register("sonDaughterName")} className='form-control' name='sonDaughterName' />
                </div>
                <div className="button-group">
                  <button type="button" className="btn btnColor" onClick={() => handleFormClick('personal')}>Back</button>
                  <button type="button" className="btn btnColor" onClick={() => handleFormClick('address')}>Next</button>
                </div>
              </div>

              <div className="addressDetailsComponent" id="addressDetailsComponent" style={{ display: activeForm === 'address' ? 'block' : 'none' }}>
                <p className="title">Address Details</p>
                <p>Permanent Address</p>
                <a className='text-danger'>
                    {errors.city?.message && <span> {errors.city?.message}</span>}
                </a>
                <div className="row">
                  <div className="col form-group">
                    <label>Province</label>
                    <select defaultValue="" name="perProvince" {...register("perProvince")}  onChange={(e) => handleProvinceChange(e, 'permanent')} className='form-control'>
                      <option value="" disabled> -- Select Province -- </option>
                      {state && state.map((stateList, index) =>{
                        return(
                          <option key={index} value={stateList._id}>{stateList.name}</option>
                        )
                      })}
                    </select>
                  </div>
                  
                  <div className="col form-group">
                    <label>District</label>
                    <select defaultValue="" name="perDistrict" {...register("perDistrict")}  onChange={(e) => handleDistrictChange(e, 'permanent')} className='form-control'>
                      <option value="" disabled> -- Select District --</option>
                      {permDistrict && permDistrict.map((districtList, index) =>{
                        return(
                          <option key={index} value={districtList._id}>{districtList.name}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="col form-group">
                    <label>Municipality</label>
                    
                    <select defaultValue="" name="perMunicipality" {...register("perCity")} className='form-control'>
                      <option value="" disabled> -- Select Municipality --</option>
                      {permCity && permCity.map((cityList, index) =>{
                        return(
                          <option key={index} value={cityList._id}>{cityList.name}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col form-group">
                    <label>Ward No: </label>
                    <a className='text-danger'>
                      {errors.perWard?.message && <span>{errors.perWard?.message}</span>}
                    </a>
                    <input type="number" {...register("perWard")} name="perWard" className='form-control' />
                  </div>
                  <div className="col form-group">
                    <label>Tole: </label>
                    <a className='text-danger'>
                      {errors.perTole?.message && <span>{errors.perTole?.message}</span>}
                    </a>
                    <input type="text" {...register("perTole")} name='perTole' className='form-control'/>
                  </div>
                </div>
                <p>Temporary Address</p>
                <div className="row">
                  <div className="col form-group">
                    <label>Province</label>
                    <a className='text-danger'>
                      {errors.province?.message && <span>{errors.province?.message}</span>}
                    </a>
                    
                    <select defaultValue="" name="perProvince" {...register("tempProvince")}  onChange={(e) => handleProvinceChange(e, 'temporary')} className='form-control'>
                      <option value="" disabled> -- Select Province -- </option>
                      {state && state.map((stateList, index) =>{
                        return(
                          <option key={index} value={stateList._id}>{stateList.name}</option>
                        )
                      })}
                    </select>
                  </div>
                  
                  <div className="col form-group">
                    <label>District</label>
                    <a className='text-danger'>
                      {errors.district?.message && <span>{errors.district?.message}</span>}
                    </a>
                    <select defaultValue="" name="perDistrict" {...register("tempDistrict")}  onChange={(e) => handleDistrictChange(e, 'temporary')} className='form-control'>
                      <option value="" disabled> -- Select District --</option>
                      {tempoDistrict && tempoDistrict.map((districtList, index) =>{
                        return(
                          <option key={index} value={districtList._id}>{districtList.name}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="col form-group">
                    <label>Municipality</label>
                    <a className='text-danger'>
                      {errors.tempCity?.message && <span>{errors.tempCity?.message}</span>}
                    </a>
                    <select defaultValue="" name="perMunicipality" {...register("tempCity")} className='form-control'>
                      <option value="" disabled> -- Select Municipality --</option>
                      {tempoCity && tempoCity.map((cityList, index) =>{
                        return(
                          <option key={index} value={cityList._id}>{cityList.name}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col form-group">
                    <label>Ward No: </label>
                    <a className='text-danger'>
                      {errors.tempWard?.message && <span>{errors.tempWard?.message}</span>}
                    </a>
                    <input type="number" {...register("tempWard")} name="tempWard" className='form-control' />
                  </div>
                  <div className="col form-group">
                    <label>Tole: </label>
                    <a className='text-danger'>
                      {errors.tempTole?.message && <span>{errors.tempTole?.message}</span>}
                    </a>
                    <input type="text" {...register("tempTole")} name='tempTole' className='form-control'/>
                  </div>
                </div>
                <div className="button-group">
                  <button type="button" className="btn btnColor" onClick={() => handleFormClick('family')}>Back</button>
                  {activeForm === 'address' && (
                      <button type="submit" className="btn btnSubmit">Save</button>
                    )}
                </div>

              </div>
            </form>
          </div>
        </div>
    </>
  )
}

export default UserDetailComponent