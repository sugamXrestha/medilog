import React from 'react'

function AddPatientComponent() {
  return (
    <>
    <div className="heading">
        <p className='title'>Patients List</p>
        <p className="addPatient">Add Patients</p>
    </div>
    <table className="table">
        <thead>
            <tr>
                <th>S.N</th>
                <th>Patient Id</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
            </tr>
        </thead>
    </table>
    </>
  )
}

export default AddPatientComponent