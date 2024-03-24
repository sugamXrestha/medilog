import React, { useEffect, useState } from "react";
import "../../scss/login.scss";

function LoginComponent() {
    const [activeRole, setActiveRole] = useState('patient');

    const handleRoleClick = (role) =>{
        setActiveRole(role);
    }

  return (
    <>
        <div className="background">
            <div className="row mainComponent">
                <div className="col-md-6">
                    <div className="backgroundImage">
                        <img src="../poster.png" alt="" />
                    </div>
                    <div className="info">
                        <div className="logo">
                            <img src="../icons/logo1.png" alt="" />
                        </div>
                        <p className="slogon">
                        Connecting You to Your Health History 
                        </p>
                        <p className="description">It establishes a link between an individual and their comprehensive health records, enabling seamless access to past medical information, treatments, diagnoses, and other relevant data.</p>
                    </div>
                </div>
                <div className="col-md-6 loginSide">
                    <h2>Login</h2>
                    <p>Select your role</p>
                    <div className="role">
                        <div className={"roleItem patient " + (activeRole === 'patient' ? "active": "")} onClick={() => handleRoleClick('patient')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="40" height="40"><path d="M483.2 9.6L524 64h92c13.3 0 24 10.7 24 24s-10.7 24-24 24H512c-7.6 0-14.7-3.6-19.2-9.6L468.7 70.3l-47 99.9c-3.7 7.8-11.3 13.1-19.9 13.7s-16.9-3.4-21.7-10.6L339.2 112H216c-13.3 0-24-10.7-24-24s10.7-24 24-24H352c8 0 15.5 4 20 10.7l24.4 36.6 45.9-97.5C445.9 6.2 453.2 1 461.6 .1s16.6 2.7 21.6 9.5zM320 160h12.7l20.7 31.1c11.2 16.8 30.6 26.3 50.7 24.8s37.9-13.7 46.5-32L461.9 160H544c53 0 96 43 96 96V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V448H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V96C0 78.3 14.3 64 32 64s32 14.3 32 32V352H288V192c0-17.7 14.3-32 32-32zm-144 0a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" fill='#747676'/>
                        </svg>
                        <p className='titlePatient'>Patient</p>
                        </div>
                        <div className={"roleItem doctor " + (activeRole === 'doctor' ? "active": "")} onClick={() => handleRoleClick('doctor')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  width="40" height="40" fill='747676'><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" fill='#747676'/></svg>
                            <p className="titleDoctor">Doctor</p>
                        </div>
                        <div className={"roleItem admin " + (activeRole === 'admin' ? "active": "")} onClick={() => handleRoleClick('admin')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="40" height="40"><path d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z" fill='#747676'/></svg>
                            <p className="titleAdmin">Admin</p>
                        </div>
                    </div>
                    <form action="">
                        <div className="form-group">
                            <input type="text" className='form-control' placeholder='Usercode/Username' name="" id="" />
                        </div>
                        <div className="form-group">
                            <input type="password" className='form-control' placeholder='Password' name="" id="" />
                        </div>
                        <div className="btn">Login</div>
                    </form>
                    <p className="forgotPassword">Forgot your password?</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default LoginComponent