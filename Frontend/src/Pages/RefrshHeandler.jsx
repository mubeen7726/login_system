import React, { useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const RefrshHeandler = ({setIsAuthencated}) => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('jwtToken')){
            setIsAuthencated(true);
            if(location.pathname === '/' || 
                location.pathname === '/login'||
                location.pathname === '/signup' 
            ){
                navigate('/home',{replace:false});
            }
        }
    },[location,navigate,setIsAuthencated]);
  return (
    null
  )
}

export default RefrshHeandler
