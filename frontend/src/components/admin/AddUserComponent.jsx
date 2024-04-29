import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2'
import API from '../../API';

const addPatientSchema = yup.object().shape({
  userCode: yup.number().required(),
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
  const [users, setUsers] = useState([]);
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
  

  const addUserSubmit = (data) => {
    API.post('/user', data,{
      headers: {
          Authorization: `Bearer ${token}`
      }
  }).then((res)=>{
      Swal.fire({
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500
      });
      getUser();
      reset();
  }).catch((error)=>{
      console.log(error);
  });
  };

  const getUser = () => {
    API.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const deleteUser = async (id) => {
    try {
      await API.delete(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        title: "Deleted!",
        text: "Your data has been deleted.",
        icon: "success",
      });

      getUser();
    } catch (error) {
      console.log(error.message);
    }
  };

  const confirmDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteUser(id);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  

  return (
    <>
      <div className="heading">
        <p className='title'>User List</p>
        <p className="addPatient" onClick={() => setAddUser('flex')}>Add User</p>
      </div>

<div className="tableContainer">
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

          <tbody>
            {users &&
              users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{++index}</td>
                    <td>{user.userCode}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td></td>
                    
                    <td>
                      <button className='btn btn-primary me-2'>Edit</button>
                      <button className='btn btn-danger' onClick={() => confirmDelete(user._id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

</div>

      

      <div className="addBackground" id='addUserModel' style={{display: addUser}}>
        <div className="addContainer">
          <span className='close' onClick={() => setAddUser('none')}>
            <img src="../icons/cross.png" alt="" />
          </span>
          <p className='heading'>Add User</p>

          <form onSubmit={handleSubmit(addUserSubmit)}>
            <div className="form-group mb-2">
              <label>User Code</label>
              <input type="number" {...register("userCode")} className="form-control" placeholder='User Code' />
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
