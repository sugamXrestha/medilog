import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import API from '../../API';
import Swal from 'sweetalert2';


const changePasswordSchema = yup.object().shape({
    password: yup.string().required(),
    password_confirm: yup.string().required().oneOf([yup.ref('password')], 'Password confirm must be same as password'),
});

function ChangePasswordComponent() {

    let token = localStorage.getItem("token") ?? "";
    let userId = localStorage.getItem('userId') ?? "";
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { register, setError, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(changePasswordSchema)
    });

    const checkToken = async()=>{
        API.get("/token-verify", {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }).then(response =>{
          if(response.data.status){
            setIsLogin(true);
            setIsLoading(false);
          }else{
            setIsLogin(false);
            setIsLoading(false);
          }
        }).catch(error =>{
          console.log(error.message);
        })
    }

    useEffect(()=>{
    checkToken();
    },[]);

    const changePassword = (data) => {
        const userData = { ...data, stat: 'active' };
         API.put(`/user/${userId}`, userData, {
             headers: {
                 Authorization: `Bearer ${token}`
             }
         }).then((res)=>{
             console.log(res);
                Swal.fire({
                    position: "top",
                    width: 400,
                    text: "Password updated",
                    showConfirmButton: false,
                    timer: 1000,
                    
                });
                window.location.href = '/';
             reset();
         }).catch((error)=>{
             console.log(error);
         });
         
     }
  return (
    <>
        {isLoading ? (
          <h1>Loading... </h1>
        )
        : <div>
            {isLogin ? (
            <>
                <div className="background">
                        <div className="change-password-form">
                            <h2>Change Password</h2>
                            <form onSubmit={handleSubmit(changePassword)}>
                                <div className='form-group'>
                                    <label>New Password:
                                        <a className='text-danger'>
                                            {errors.password?.message && <span>{errors.password?.message}</span>}
                                        </a>
                                    </label>
                                    <input
                                        type="password"
                                        className='form-control'
                                        {...register("password")}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="password_confirm">Confirm Password:
                                        <a className='text-danger'>
                                            {errors.password_confirm?.message && <span>{errors.password_confirm?.message}</span>}
                                        </a>
                                    </label>
                                    <input type="password" name="password_confirm" {...register("password_confirm")} className="form-control" />
                                </div>
                                <button type="submit" className='btn'>Change Password</button>
                            </form>
                        </div>
                </div>
            </>
            ) : (
                (window.location.href = "/")
            )}
        </div>
        }
    </>
  )
}

export default ChangePasswordComponent