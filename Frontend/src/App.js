import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import { useState } from "react";
import RefrshHeandler from "./Pages/RefrshHeandler";


function App() {
  const [isAuthenticated, setisAuthenticated] = useState();
  const PrivateRoute = ({element}) =>{
return isAuthenticated ? element :<Navigate to="/login"/>

  }
  return (
   <div className="App">
    <RefrshHeandler setIsAuthencated={setisAuthenticated}/>
  <Routes>
<Route path="/" element={<Navigate to="/Login"/>} />
<Route path="/Login" element={<Login/>} />
<Route path="/Home" element={<PrivateRoute element={<Home/>} />} />
<Route path="/Singup" element={ <Signup/>} />
  </Routes>
   </div>
  );
}

export default App;
