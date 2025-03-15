import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white text-purple-700 shadow-lg my-10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
          
          {/* Brand Name & Description */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">Expense Tracker</h2>
            <p className="text-purple-500 mt-2">
              Your smart way to manage expenses and track spending efficiently.
            </p>
          </div>

          {/* Important Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="/" className="hover:text-purple-500">Home</a></li>
              <li><a href="/about" className="hover:text-purple-500">About</a></li>
              <li><a href="/contact" className="hover:text-purple-500">Contact</a></li>
              <li><a href="/privacy-policy" className="hover:text-purple-500">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-purple-500">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Media & Address */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex justify-center md:justify-end space-x-4 mt-2">
              <a href="#" className="text-purple-700 hover:text-purple-500 text-2xl"><FaFacebook /></a>
              <a href="#" className="text-purple-700 hover:text-purple-500 text-2xl"><FaTwitter /></a>
              <a href="#" className="text-purple-700 hover:text-purple-500 text-2xl"><FaInstagram /></a>
              <a href="#" className="text-purple-700 hover:text-purple-500 text-2xl"><FaLinkedin /></a>
            </div>
            <p className="text-purple-500 mt-4">123 Finance St, Budget City, IN 45678</p>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="border-t border-purple-300 text-center py-4 text-purple-500 text-sm">
          &copy; {new Date().getFullYear()} Expense Tracker. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
