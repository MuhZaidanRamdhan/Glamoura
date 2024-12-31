import React, { useState } from 'react';
import {
  Home,
  Users,
  LogOut,
  User,
  ShoppingCart,
  Package,
  Tag,
  X,
  Menu,
  CreditCard,
  Receipt,
  HomeIcon,
  ChartBar
} from 'lucide-react';

const Sidebar = ({ isOpen, onToggleSidebar }) => {
  const menuItems = [
    {
      icon: <ChartBar size={24} />, 
      label: 'Dashboard', 
      href: 'dashboard'
    },
    {
      icon: <Users size={24} />, 
      label: 'Users', 
      href: 'users'
    },
    {
      icon: <Package size={24} />, 
      label: 'Products', 
      href: 'products'
    },
    {
      icon: <Tag size={24} />, 
      label: 'Categories', 
      href: 'categories'
    },
    {
      icon: <ShoppingCart size={24} />, 
      label: 'Orders', 
      href: 'orders'
    },
    {
      icon: <Receipt size={24} />, 
      label: 'Payments', 
      href: 'payments'
    },
    {
      icon: <HomeIcon size={24} />, 
      label: 'Payments', 
      href: '/'
    }
  ];

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={onToggleSidebar}
        className="md:hidden fixed top-4 left-4 z-40 bg-gray-900 p-2 rounded-lg text-white hover:bg-gray-800 transition-colors"
        aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
          onClick={onToggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static z-30 top-0 left-0 h-full 
          w-16 md:w-20 bg-gradient-to-b from-gray-900 via-gray-800 to-black
          text-white transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          shadow-2xl overflow-y-auto
        `}
        style={{ paddingTop: '4rem' }}
      >
        {/* Navigation Menu */}
        <nav className="p-4">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li 
                key={index} 
                className="relative group"
              >
                <a
                  href={item.href}
                  className="relative flex items-center justify-center w-12 h-12 mx-auto 
                    rounded-xl hover:rounded-2xl group
                    transition-all duration-300 ease-in-out
                    hover:bg-white hover:text-black hover:scale-110"
                >
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;