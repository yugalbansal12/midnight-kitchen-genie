
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Home, Search, Book } from 'lucide-react';
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Recipe Finder', path: '/recipe-finder', icon: <Search className="w-5 h-5" /> },
    { name: 'Recipe Library', path: '/recipe-library', icon: <Book className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-recipe-dark border-b border-gray-800 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <ChefHat className="h-8 w-8 text-recipe-primary" />
          <span className="text-xl font-bold text-white">MidnightChef</span>
        </Link>
        
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "flex items-center space-x-1 text-sm font-medium transition-colors",
                location.pathname === link.path 
                  ? "text-recipe-primary" 
                  : "text-gray-300 hover:text-white"
              )}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-recipe-darker rounded-md overflow-hidden">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "flex items-center space-x-2 px-4 py-3 hover:bg-recipe-dark",
                location.pathname === link.path 
                  ? "text-recipe-primary" 
                  : "text-gray-300"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
