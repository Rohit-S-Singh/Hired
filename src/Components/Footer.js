import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 pt-12 pb-6 px-6 md:px-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Logo & Description */}
                <div>
                    <h1 className="text-2xl font-bold text-white mb-4">Hiredd</h1>
                    <p className="text-sm text-gray-400">
                        Building modern solutions for real-world problems. Let’s grow together.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition">Home</a></li>
                        <li><Link to="/about" className="hover:text-white transition">About</Link></li>
                        <li><a href="#" className="hover:text-white transition">Services</a></li>
                        <li><a href="#" className="hover:text-white transition">Blog</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Resources</h2>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                        <li><a href="#" className="hover:text-white transition">FAQs</a></li>
                    </ul>
                </div>

                {/* Social & Newsletter */}
                <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Connect With Us</h2>
                    <div className="flex space-x-3 mb-4">
                        <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition">
                            <FaTwitter />
                        </a>
                        <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition">
                            <FaLinkedinIn />
                        </a>
                        <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition">
                            <FaInstagram />
                        </a>
                    </div>
                    <p className="text-sm text-gray-400">Stay updated with our latest news.</p>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Hiredd. All rights reserved.<br/>
                <span className="text-gray-400">Founder & CEO: Rohit Shekhar Singh</span>
            </div>
        </footer>
    );
};

export default Footer;
