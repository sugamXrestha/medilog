import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2'
import API from '../../API';



const addHositalDetailSchema = yup.object().shape({
  hospitalName: yup.string().required('Hospital name is required'),
  established: yup.date().required('Established date is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  contact: yup.string().required('contact is required'),
  websiteUrl: yup.string().required('Website Url is required'),
  city: yup.string().required('City is required'),
  ward: yup.number().required('Ward No is required').positive().integer(),
  tole: yup.string().required('Tole is required'),
  
})

function HospitalDetailComponent() {

    const token = localStorage.getItem("token") ?? "";
  const[userProfile, setUserProfile] = useState({});
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [state, setState] = useState([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(addHositalDetailSchema),
  });


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

  const getDistrictByProvince = (provinceId) => {
    // Fetch district data by province ID
    API.get(`/district/${provinceId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setDistrict(response.data);
    }).catch(error => {
      console.log(error);
    });
  }
  const getCityByDistrict = (districtId) => {
    API.get(`/city/${districtId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setCity(response.data);
    }).catch(error => {
      console.log(error);
    });
  }
  const getState = () =>{
    API.get("/state",{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((response)=>{
      // console.log(response.data);
        setState(response.data);
    }).catch(error =>{
        console.log(error);
    })
  }

  const handleProvinceChange = (event) => {
    const selectedProvinceId = event.target.value;
    if (selectedProvinceId !== "undefined") {
      getDistrictByProvince(selectedProvinceId);
    } else {
      setDistrict([]);
    }
  }
  const handleDistrictChange = (event) => {
    const selectedDistrictId = event.target.value;
    if (selectedDistrictId !== "undefined") {
      getCityByDistrict(selectedDistrictId);
    } else {
      setCity([]);
    }
  }
  

    const addHospitalDetail = (data) =>{
      const hData = { ...data, userId: userProfile._id };
      API.post('/hospital-detail',hData, {
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
      getState();
    }, []);


  return (
    <>
            <div className="kycContainer">
              <div className="formContainer">
                <form action="" onSubmit={handleSubmit(addHospitalDetail)}>

                  <div className="personalDetailsComponent" id="personalDetailsComponent">
                    <p className="title">Hospital Details</p>
                    <div className="row">
                      <div className="col form-group">
                        <label>Hospital Name: </label>
                        <input type="text" {...register("hospitalName")} className='form-control' name='hospitalName' />
                      </div>
                      <div className="col form-group">
                        <label>Established Date:  </label>
                        <input type="date" {...register("established")} className='form-control' name='established' />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col form-group">
                        <label>Email:  </label>
                        <input type="email" {...register("email")} className='form-control' name='email' />
                      </div>
                      <div className="col form-group">
                        <label>Contact Number: </label>
                        <input type="text" {...register("contact")} className='form-control' name='contact' />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Website Url: </label>
                      <input type="text" {...register("websiteUrl")} className='form-control' name='websiteUrl' />
                    </div>
                    <p>Address</p>
                    <div className="row">
                      <div className="col form-group">
                        <label>Province</label>
                        { }
                        <select defaultValue="undefined" name="province" {...register("province")} onChange={handleProvinceChange} className='form-control'>
                          <option value="undefined" disabled> -- Select Province -- </option>
                          {state && state.map((stateList, index) =>{
                            return(
                              <option key={index} value={stateList._id}>{stateList.name}</option>
                            )
                          })}
                        </select>
                      </div>
                      
                      <div className="col form-group">
                        <label>District</label>
                        <select defaultValue="undefined" name="district" {...register("district")} onChange={handleDistrictChange} className='form-control'>
                          <option value="undefined" disabled> -- Select District --</option>
                          {district && district.map((districtList, index) =>{
                            return(
                              <option key={index} value={districtList._id}>{districtList.name}</option>
                            )
                          })}
                        </select>
                      </div>
                      <div className="col form-group">
                        <label>Municipality</label>
                        <select defaultValue="undefined" name="municipality" {...register("city")} className='form-control'>
                          <option value="undefined" disabled> -- Select Municipality --</option>
                          {city && city.map((cityList, index) =>{
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
                        <input type="number" {...register("ward")} name="ward" className='form-control' />
                      </div>
                      <div className="col form-group">
                        <label>Tole: </label>
                        <input type="text" {...register("tole")} name='tole' className='form-control'/>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btnSubmit">Save</button>
                </form>
              </div>
            </div>
            
    </>
  )
}

export default HospitalDetailComponent







