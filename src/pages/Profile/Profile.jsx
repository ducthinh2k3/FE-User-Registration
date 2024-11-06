import React, { useEffect } from 'react'
import { Footer } from '../../../components/Footer/Footer'
import { Header } from '../../../components/Header/Header'
import "./styles.scss"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveUserLogin, saveUserLogout } from '../../redux/action'
import { fetchDataFromAPI } from '../../ultis/api'
import { getUserInfo } from '../../redux/selector'

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUserInfo)
  const jwt = localStorage.getItem("jwt")

  useEffect(() => {
    dispatchUserInfo();
    console.log("render")
  }, [])


  const dispatchUserInfo = async () => {
    if(jwt === null){
      navigate("/login")
    }
    else if(jwt != null){
      try {
        const userInfo = await fetchDataFromAPI("/profile", jwt);
        console.log(userInfo);
        dispatch(saveUserLogin({
            email: userInfo.data.email,
            token: jwt
        }))
      } catch (error) {
        console.log(error);
        dispatch(saveUserLogout());
      }
    }
  };

  return (
    user &&
    <>
    <Header/>
    <div className="home">
        <h2>Profile's {user.email}</h2>
    </div>
    <Footer/>
    </>
  )
}
