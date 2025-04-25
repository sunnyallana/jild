import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-12 pb-6 border-t border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <Link to="/" className="text-2xl font-bold text-primary">
                Jild
              </Link>
            </div>
            <p className="text-neutral-600 mb-4">
              Your personal AI-powered skincare assistant for achieving healthy, radiant skin.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-500 hover:text-primary transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary transition-colors duration-300">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-600 hover:text-primary transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/ai-recommendations" className="text-neutral-600 hover:text-primary transition-colors duration-300">
                  AI Recommendations
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-neutral-600 hover:text-primary transition-colors duration-300">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-600 hover:text-primary transition-colors duration-300">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-neutral-600 hover:text-primary transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-600 hover:text-primary transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-neutral-600 hover:text-primary transition-colors duration-300">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-neutral-600 hover:text-primary transition-colors duration-300">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-neutral-600 mb-4">
              Subscribe to get special offers, free giveaways, and skincare tips.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="input-field rounded-r-none"
              />
              <button className="bg-primary text-white px-4 rounded-r-lg hover:bg-primary-light transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-600 text-sm">
            &copy; {new Date().getFullYear()} Jild. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-neutral-600 hover:text-primary text-sm transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-neutral-600 hover:text-primary text-sm transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-neutral-600 hover:text-primary text-sm transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;