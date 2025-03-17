import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import signright from "../assets/signup-processed.jpg"
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const{url,setToken}=useContext(StoreContext);
  const navigate=useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/auth/register`, { name, email, password });
      localStorage.setItem("token", response.data.token);
      setToken(localStorage.getItem("token"));
      navigate("/");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message)
      console.error("Signup Error:", error.response?.data || error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100 p-4">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        
        {/* Left Side Image */}
        <div className="hidden md:flex items-center justify-center w-1/2 bg-purple-500">
          <img src={signright} alt="Signup" className="w-3/4 h-auto" />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center text-purple-700">Sign Up</h2>
          <form onSubmit={handleSignup} className="mt-6">
            
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 mt-6 rounded-lg hover:bg-purple-700 transition duration-300 cursor-pointer"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-bold">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

