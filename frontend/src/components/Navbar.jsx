import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import logoImage from '../assets/vecteezy_wallet-icon-design_50301040.jpg'
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext.jsx";
import bodyIcon from "../assets/login_body-removebg-preview.png";
import { toast } from "react-toastify";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { url, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    try {
      localStorage.removeItem("token");
      setToken("");
      toast.success("logout done")
    } catch (error) {
      toast.error(`logout error ${error}`)
      console.error("Logout error of ", error)
    }
  }
  return (
    <nav className="bg-purple-100 pt-2 px-4 sticky top-0">
      <div className=" bg-white max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 rounded-2xl">
        <div className="flex justify-between  h-16 items-center">
          {/* Logo */}
          <div className="flex justify-between items-center gap-2">
            <img onClick={() => navigate("/")} className="h-15 w-15 py-2 rounded-4xl cursor-pointer " src={logoImage} alt="" />
            <h5 onClick={() => navigate("/")} className=" font-bold font-sans text-purple-700 text-lg  cursor-pointer ">Finance Tracker</h5>
          </div>
          <ul className=" hidden md:flex md:justify-between md:items-center gap-10  ">
            <li onClick={() => navigate("/")} className="hidden text-lg md:block text-purple-700 hover:text-purple-500 transition duration-300 font-semibold cursor-pointer ">
              Home
            </li>
            <li onClick={() => navigate("/trackExpense")} className="hidden text-lg md:block text-purple-700 hover:text-purple-500 transition duration-300 font-semibold cursor-pointer ">
              Track Expense
            </li>
          </ul>

          {/* Desktop Menu */}
          {token ? <div className="hidden md:flex md:justify-between md:items-center gap-2">
            <img className="h-20 w=20" src={bodyIcon} alt="" />
            <button onClick={() => handleLogOut()} className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300 cursor-pointer">
              Logout
            </button>
          </div> :
            <div className="hidden md:flex md:justify-between md:items-center space-x-6">

              <button onClick={() => navigate("/login")} className="text-purple-700 hover:text-purple-500 transition duration-300  cursor-pointer">
                Login
              </button>
              <button onClick={() => navigate("/signUp")} className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300 cursor-pointer">
                Sign Up
              </button>
            </div>

          }

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-purple-700 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        token ? <div className="md:hidden mt-2 rounded-2xl bg-white shadow-md">
          <ul>
            <li onClick={() => { setIsOpen(!isOpen); navigate("/") }} className="block px-4 py-2 font-medium text-purple-700 hover:bg-purple-100 transition duration-300">
              Home
            </li>
            <li onClick={() => { setIsOpen(!isOpen); navigate("/trackExpense") }} className="block px-4 py-2 font-medium text-purple-700 hover:bg-purple-100 transition duration-300">
              Track Expense
            </li>
            <li onClick={() => { setIsOpen(!isOpen); navigate("/") }} className="block px-4 py-2 font-medium text-purple-700 hover:bg-purple-100 transition duration-300">
              Profile
            </li>
            <li onClick={() => { setIsOpen(!isOpen); handleLogOut(); navigate("/") }} className="block px-4 py-2 font-medium text-purple-700 hover:bg-purple-100 transition duration-300">
              Logout
            </li>
          </ul>

        </div> :
          <div className="md:hidden mt-2 rounded-2xl bg-white shadow-md">
            <ul>
              <li onClick={() => { setIsOpen(!isOpen); navigate("/") }} className="block px-4 py-2 font-medium text-purple-700 hover:bg-purple-100 transition duration-300">
                Home
              </li>
              <li onClick={() => { setIsOpen(!isOpen); navigate("/trackExpense") }} className="block px-4 py-2 font-medium text-purple-700 hover:bg-purple-100 transition duration-300">
                Track Expense
              </li>
              <li onClick={() => { setIsOpen(!isOpen); navigate("/login") }} className="block px-4 py-2 font-medium text-purple-700 hover:bg-purple-100 transition duration-300">
                Login
              </li>
              <li onClick={() => { setIsOpen(!isOpen); navigate("/signUp") }} className="block px-4 py-2 font-medium text-purple-700 hover:bg-purple-100 transition duration-300">
                Sign Up
              </li>
            </ul>

          </div>
      )}
    </nav>
  );
}

export default Navbar;
