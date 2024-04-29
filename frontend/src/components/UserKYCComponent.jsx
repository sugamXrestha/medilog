import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2'
import API from '../API';

const addUserDetailSchema = yup.object().shape({
  // userCode: yup.number().required(),
  // phone: yup.string().required(),
  fullName: yup.string().required('Full name is required'),
  dobAD: yup.date().required('Date of birth is required'),
  gender: yup.string().required('Gender is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  marital: yup.string().required('Marital status is required'),
  occupation: yup.string().required('Occupation is required'),
  fatherName: yup.string().required('Father name is required'),
  motherName: yup.string().required('Mother name is required'),
  husbandWifeName: yup.string(),
  sonDaughterName: yup.string(),
  perProvince: yup.string().required('Province is required'),
  perDistrict: yup.string().required('District is required'),
  perMunicipality: yup.string().required('Municipality is required'),
  perWard: yup.number().required('Ward No is required').positive().integer(),
  perTole: yup.string().required('Tole is required'),
  tempProvince: yup.string().required('Province is required'),
  tempDistrict: yup.string().required('District is required'),
  tempMunicipality: yup.string().required('Municipality is required'),
  tempWard: yup.number().required('Ward No is required').positive().integer(),
  tempTole: yup.string().required('Tole is required'),
})

function UserDetailComponent() {

  const token = localStorage.getItem("token") ?? "";
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(addUserDetailSchema),
  });

  const [activeForm, setActiveForm] = useState('personal');

    const handleFormClick = (activeform) =>{
        setActiveForm(activeform);
      }

    const [userDetail, setUserDetail] = useState([]);
    // const [user, setUser] = React.useState([]);

  //   const getUser = () => { 
  //     API.get("/user", {
  //         headers: {
  //             Authorization: `Bearer ${token}`
  //         }
  //     }).then(response => {
  //         setUser(response.data);
  //         // setLoading(false);
  //     }).catch(error => {
  //         console.log(error)
  //     });
  // }

    const addUserDetailSubmit = (data) =>{
      API.post('/user-detail',data, {
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

    // useEffect(()=>{
    //   getUser();
    // }, []);

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
        <form action="" onSubmit={handleSubmit(addUserDetailSubmit)}>

          <div className="personalDetailsComponent" id="personalDetailsComponent" style={{ display: activeForm === 'personal' ? 'block' : 'none' }}>
            <p className="title">Personal Details</p>

            {/* <input type="number" name="userCode" hidden value={user.userCode} {...register("userCode")}/>
            <input type="number" name="phone" hidden value={user.phone} {...register("phone")}/> */}

            <div className="form-group">
              <label>Full name: </label>
              <input type="text" {...register("fullName")} className='form-control' name='fullName' />
            </div>
            <div className="form-group">
              <label>DOB in AD:  </label>
              <input type="date" {...register("dobAD")} className='form-control' name='dobAD' />
            </div>
            {/* <div className="form-group">
              <label>DOB in BS:  </label>
              <input type="date" className='form-control' name='dobBS' />
            </div> */}
            <div className="form-group mb-2">
                <label> Gender:</label>
                <select name='gender' {...register("gender")} className="form-control">
                    <option value='undefined'> -- Select Gender -- </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            {/* <div className="form-group">
              <label>Phone:  </label>
              <input type="text" className='form-control' name='phone' />
            </div> */}
            <div className="form-group">
              <label>Email:  </label>
              <input type="email" {...register("email")} className='form-control' name='email' />
            </div>
            <div className="form-group mb-2">
                <label> Marital Status:</label>
                <select name='marital' {...register("marital")} className="form-control">
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                </select>
            </div>
            <div className="form-group">
              <label>Occupation: </label>
              <input type="text" {...register("occupation")} className='form-control' name='occupation' />
            </div>
            <div className="button-group" style={{ float: 'right' }}>
              <button type="button" className="btn btnColor"  onClick={() => handleFormClick('family')}>Next</button>
            </div>
          </div>

          <div className="familyDetailsComponent" id="familyDetailsComponent" style={{ display: activeForm === 'family' ? 'block' : 'none' }}>
            <p className="title">Family Information</p>
            <div className="form-group">
              <label>Father name: </label>
              <input type="text" {...register("fatherName")} className='form-control' name='fatherName' />
            </div>
            <div className="form-group">
              <label>Mother name: </label>
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
            <div className="form-group">
              <label>Province</label>
              <select name="perProvince" {...register("perProvince")} className='form-control'>
                <option value="undefined"> -- Select Province -- </option>
                <option value="province1">Province 1</option>
                <option value="province2">province 2</option>
                <option value="province3">province 3</option>
                <option value="province4">province 4</option>
                <option value="province5">province 5</option>
                <option value="province6">province 6</option>
                <option value="province7">province 7</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>District</label>
              <select name="perDistrict" {...register("perDistrict")} className='form-control'>
                <option value="undefined"> -- Select District --</option>
                <option value="chitwan">Chitwan</option>
                <option value="kathmandu">Kathmandu</option>
              </select>
            </div>
            <div className="form-group">
              <label>Municipality</label>
              <select name="perMunicipality" {...register("perMunicipality")} className='form-control'>
                <option value="undefined"> -- Select Municipality --</option>
                <option value="chitwan">Chitwan</option>
                <option value="kathmandu">Kathmandu</option>
              </select>
            </div>
            <div className="form-group">
              <label>Ward No: </label>
              <input type="number" {...register("perWard")} name="perWard" className='form-control' />
            </div>
            <div className="form-group">
              <label>Tole: </label>
              <input type="text" {...register("perTole")} name='perTole' className='form-control'/>
            </div>
            <p>Temporary Address</p>
            <div className="form-group">
              <label>Province</label>
              <select name="tempProvince" {...register("tempProvince")} className='form-control'>
                <option value="undefined"> -- Select Province -- </option>
                <option value="province1">Province 1</option>
                <option value="province2">province 2</option>
                <option value="province3">province 3</option>
                <option value="province4">province 4</option>
                <option value="province5">province 5</option>
                <option value="province6">province 6</option>
                <option value="province7">province 7</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>District</label>
              <select name="tempDistrict" {...register("tempDistrict")} className='form-control'>
                <option value="undefined"> -- Select District --</option>
                <option value="chitwan">Chitwan</option>
                <option value="kathmandu">Kathmandu</option>
              </select>
            </div>
            <div className="form-group">
              <label>Municipality</label>
              <select name="tempMunicipality" {...register("tempMunicipality")} className='form-control'>
                <option value="undefined"> -- Select Municipality --</option>
                <option value="chitwan">Chitwan</option>
                <option value="kathmandu">Kathmandu</option>
              </select>
            </div>
            <div className="form-group">
              <label>Ward No: </label>
              <input type="number" {...register("tempWard")} name="tempWard" className='form-control' />
            </div>
            <div className="form-group">
              <label>Tole: </label>
              <input type="text" {...register("tempTole")} name='tempTole' className='form-control'/>
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