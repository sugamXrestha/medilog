import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import API from '../../API';

const addPatientSchema = yup.object().shape({
  userCode: yup.string().required(),
  phone: yup.string().required(),
  password: yup.string().required(),
  role: yup.string().required(),
});

function AddPatientComponent() {
  const token = localStorage.getItem("token") ?? "";
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(addPatientSchema),
  });

  const [addUser, setAddUser] = useState('none');
  useEffect(() => {
    const handleModel = (display) => {
      setAddUser(display);
    };

    document.getElementById('addUserModel').style.display = addUser;

    return () => {
      // Cleanup function
      document.removeEventListener('click', handleModel);
    };
  }, [addUser]);
  

  const onSubmit = (data) => {
    API.post('/user', data, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }).then((res)=>{
      console.log(res);
      Swal.fire({
          position: "top-center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500
      });
      reset();
  }).catch((error)=>{
      console.log(error);
  });
  };

  

  return (
    <>
      <div className="heading">
        <p className='title'>User List</p>
        <p className="addPatient" onClick={() => setAddUser('flex')}>Add User</p>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>S.N</th>
            <th>UserCode</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
      </table>

      <div className="addBackground" id='addUserModel' style={{display: addUser}}>
        <div className="addContainer">
          <span className='close' onClick={() => setAddUser('none')}>
            <img src="../icons/cross.png" alt="" />
          </span>
          <p className='heading'>Add Patients</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-2">
              <label>User Code</label>
              <input type="text" {...register("userCode")} className="form-control" placeholder='User Code' />
              {errors.userCode && <span className='text-danger'>{errors.userCode.message}</span>}
            </div>
            <div className="form-group mb-2">
              <label>Phone no</label>
              <input type="text" {...register("phone")} className="form-control" placeholder='Phone' />
              {errors.phone && <span className='text-danger'>{errors.phone.message}</span>}
            </div>
            <div className="form-group mb-2">
              <label>Password</label>
              <input type="password" {...register("password")} className="form-control" placeholder='Password' />
              {errors.password && <span className='text-danger'>{errors.password.message}</span>}
            </div>
            <div className="form-group mb-2">
                <label> Role:
                    <a className='text-danger'>
                        {errors.role?.message && <span>{errors.role?.message}</span>}
                    </a>
                </label>
                <select name='role'  {...register("role")} className="form-control">
                    <option value=''>Select Role </option>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div className="form-group mb-2">
              <button className="btn btn-primary" type='submit'>Add User</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddPatientComponent;
