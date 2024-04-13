// import React, {useEffect, useState} from 'react'

// function AddDoctorComponent() {

//   const [addUser, setAddUser] = useState('none')

//   useEffect(() => {
//     const handleModel = (display) => {
//       setAddUser(display);
//     };

//     document.getElementById('addUserModel').style.display = addUser;

//     return () => {
//       // Cleanup function
//       document.removeEventListener('click', handleModel);
//     };
//   }, [addUser]);

//   return (
//     <>
//     <div className="heading">
//         <p className='title'>Doctor List</p>
//         <p className="addDoctor" onClick={() => setAddUser('flex')}>Add Doctor</p>
//     </div>
//     <table className="table">
//         <thead>
//             <tr>
//                 <th>S.N</th>
//                 <th>Doctor Id</th>
//                 <th>Name</th>
//                 <th>Phone</th>
//                 <th>Action</th>
//             </tr>
//         </thead>
//     </table>


//     <div className="addBackground" id='addUserModel' style={{display: addUser}}>
//       <div className="addContainer">
//         <span className='close'  onClick={() => setAddUser('none')}>
//           <img src="../icons/cross.png" alt="" />
//         </span>
//         <p className='heading'>Add Doctor</p>
//         <form action="">
//           <div className="form-group mb-2">
//             <label htmlFor="">Phone no</label>
//             <input type="text" name="" id="" className="form-control" placeholder='Phone' />
//           </div>
//           <div className="form-group mb-2">
//             <label htmlFor="">User Id</label>
//             <input type="text" name="" id="" className="form-control" placeholder='User Id' />
//           </div>
//           <div className="form-group mb-2">
//             <label htmlFor="">Password</label>
//             <input type="password" name="" id="" className="form-control" placeholder='Password' />
//           </div>
//           <div className="btn btn-primary">Add</div>
//         </form>
//       </div>
//     </div>
//     </>
//   )
// }

// export default AddDoctorComponent