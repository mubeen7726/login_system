import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "./utils";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const url = "https://login-system-api.vercel.app/product";
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('jwtToken')
        }
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('name'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('name');
    handleSuccess("Logout successful!");
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1000);
  };

  return (
    <div className="d-flex flex-col m-0 p-0">
      <h1 className="text-2xl font-bold mb-4">Welcome, {loggedInUser}</h1>
      <button 
        onClick={handleLogout} 
        className="bg-red-500 text-white px-4 py-2 rounded mb-10"
      >
        Logout
      </button>
    <div className="container mx-auto p-4">
      <div className=" gap-4">
        {products.map((product, index) => (
          <div 
            key={index} 
            className="bg-white flex shadow-md rounded-lg p-4"
          >
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-1">Brand: {product.brand}</p>
            <p className="text-gray-700 mb-1">Model: {product.model}</p>
            <p className="text-gray-700 mb-1">Price: ${product.price}</p>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
    </div>
  );
};

export default Home;
