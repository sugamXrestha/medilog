import React, { useState, useEffect } from 'react'
import API from '../../API';
import { Link } from 'react-router-dom';

function AddPrescriptionComponent() {

  const token = localStorage.getItem("token") ?? "";
  const [users, setUsers] = useState([]);

  const getUser = () => {
    API.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
        // console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() =>{
    getUser();
  }, [])
  return (
    <>
        <div className="tableContainer">
        <table className="table">
          <thead>
            <tr>
              <th>S.N</th>
              <th>UserCode</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map((user, index) => {
                {if(user.role == 'patient'){
                    return (
                      <tr key={index}>
                        <td>{++index}</td>
                        <td>{user.userCode}</td>
                        <td>{user.name}</td>
                        <td>{user.phone}</td>
                        
                        <td>
                          <Link to={`${user._id}`} className="btn btn-primary me-2">Add</Link>
                          <button className='btn btn-danger' onClick={() => confirmDelete(user._id)}>Delete</button>
                        </td>
                      </tr>
                    );
                }}
              })}
          </tbody>
        </table>

      </div>
    </>
  )
}

export default AddPrescriptionComponent