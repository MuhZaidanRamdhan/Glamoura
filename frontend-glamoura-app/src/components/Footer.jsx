import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaPinterest, FaPaperPlane } from 'react-icons/fa';
import pay1 from '../assets/images/icons/icon-pay-01.png';
import pay2 from '../assets/images/icons/icon-pay-02.png';
import pay3 from '../assets/images/icons/icon-pay-03.png';
import pay4 from '../assets/images/icons/icon-pay-04.png';
import pay5 from '../assets/images/icons/icon-pay-05.png';

const Footer = () => {
  const [email, setEmail] = useState('');

  const paymentIcons = [
    `${pay1}`,
    `${pay2}`, 
    `${pay3}`,
    `${pay4}`,
    `${pay5}`,
  ];

  const footerLinks = {
    Categories: ['Women', 'Men', 'Shoes', 'Watches'],
    Help: ['Track Order', 'Returns', 'Shipping', 'FAQs']
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with email: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <img src="../../src/assets/images/glamoura.png" alt="glamoura" className='h-30 w-20 mb-4' />
        <div className="grid md:grid-cols-4 gap-8">
          {/* Categories */}
          <div>
            <h4 className="text-xl font-bold mb-6">Categories</h4>
            <ul className="space-y-3">
              {footerLinks.Categories.map(category => (
                <li key={category}>
                  <a 
                    href={`/category/${category.toLowerCase()}`} 
                    className="hover:text-blue-400 transition-colors"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xl font-bold mb-6">Help</h4>
            <ul className="space-y-3">
              {footerLinks.Help.map(help => (
                <li key={help}>
                  <a 
                    href={`/help/${help.toLowerCase().replace(' ', '-')}`} 
                    className="hover:text-blue-400 transition-colors"
                  >
                    {help}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-6">GET IN TOUCH</h4>
            <p className="text-gray-300 mb-6">
              Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879
            </p>
            
            <div className="flex space-x-4">
                {[FaFacebook, FaInstagram, FaPinterest].map((Icon, index) => (
                    <a 
                    key={index} 
                    href="#" 
                    className="text-white hover:text-blue-400 transition-colors"
                    >
                    <Icon size={24} />
                    </a>
                ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-bold mb-6">Newsletter</h4>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-transparent border-b border-gray-600 text-white focus:outline-none focus:border-blue-400"
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md flex items-center transition-colors"
                >
                Subscribe <FaPaperPlane className="ml-2" size={16} />
                </button>
            </form>
          </div>
        </div>

        {/* Payment & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <div className="flex justify-center space-x-4 mb-6">
            {paymentIcons.map((icon, index) => (
              <img 
                key={index} 
                src={icon} 
                alt={`Payment Icon ${index + 1}`} 
                className="h-8 grayscale hover:grayscale-0 transition-all"
              />
            ))}
          </div>
          
          <p className="text-gray-400">
            © {new Date().getFullYear()} All rights reserved | Created with Group 1
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;