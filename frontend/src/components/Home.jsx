import React, { useContext } from "react";

import leftSideImage from '../assets/leftsider-removebg-preview.png'
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext.jsx";
function Home() {
    const navigate=useNavigate();
    const{token}=useContext(StoreContext);
    return (
        <div className="bg-purple-100  min-h-screen flex items-center justify-center px-4 py-8">
            <div className="bg-white shadow-lg rounded-2xl max-w-7xl px-4 flex flex-col md:flex-row items-center">
                {/* Left Content */}
                <div className="md:w-1/2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Keeping track <br /> <span className="text-purple-600">of your income</span>
                    </h1>
                    <p className="text-gray-600 mt-4">
                        Manage your expenses efficiently with our smart budgeting tool.
                        Categorize your spending, track your transactions, and stay in control of your finances.
                    </p>
                    <ul className="mt-4 text-gray-600 space-y-1">
                        <li>✔ Easy expense tracking with one-click entry.</li>
                        <li>✔ Create and manage custom spending categories.</li>
                        <li>✔ Get insights with total spending and category breakdowns.</li>
                    </ul>

                    <button onClick={()=>{token?navigate("/trackExpense"):navigate("/signUp")}} className="mt-6 bg-red-400 text-white px-6 py-2 rounded shadow cursor-pointer">
                        Get Started
                    </button>

                </div>

                {/* Right Image */}
                <div className="md:w-1/2 mt-6 md:mt-0">
                    <img
                        src={leftSideImage}
                        alt="Finance Illustration"
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;

