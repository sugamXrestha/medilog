import React, { useEffect , useState } from "react";
import { Outlet } from "react-router-dom";
import API from "../../API";
import Aside from "../Aside";
import Header from "../Header";

function PatientComponentMiddleware() {

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let token = localStorage.getItem("token") ?? "";

  const checkToken = async()=>{
    API.get("/token-verify", {
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then(response =>{
      console.log(response.data);
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

  return (
    <>
      {isLoading ? (
        <h1>Loading... </h1>
      )
      : <div>
        {isLogin ? (
          <>
            <Aside />
            <Header />

            <div>
                <Outlet />
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

export default PatientComponentMiddleware