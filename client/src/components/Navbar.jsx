import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Home, Search, LayoutDashboard, LogOut, LogIn, UserCircle } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 shadow-lg transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/30 group-hover:bg-indigo-500 transition-colors">
              <Shield className="text-white" size={24} />
            </div>
            <span className="font-bold text-xl text-white tracking-tight hidden sm:block">
              GatePass<span className="text-indigo-400">Pro</span>
            </span>
          </Link>

          {/* Links Section */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/" className={`flex items-center gap-1.5 font-semibold text-sm transition-colors ${isActive('/') ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}>
              <Home size={18} /> <span className="hidden sm:inline">New Pass</span>
            </Link>
            
            <Link to="/status" className={`flex items-center gap-1.5 font-semibold text-sm transition-colors ${isActive('/status') ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}>
              <Search size={18} /> <span className="hidden md:inline">Track Status</span>
            </Link>

            <div className="h-6 w-px bg-slate-700 mx-1 sm:mx-2"></div> 

            {user ? (
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Dashboard Link */}
                <Link 
                  to={user.role === 'host' ? '/host-dashboard' : user.role === 'guard' ? '/guard-dashboard' : '/admin-dashboard'} 
                  className={`flex items-center gap-1.5 font-semibold text-sm transition-colors ${isActive(`/${user.role}-dashboard`) ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}
                >
                  <LayoutDashboard size={18} /> <span className="hidden sm:inline">Dashboard</span>
                </Link>
                
                {/* User Name Badge (Hidden on very small screens) */}
                <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs font-medium text-slate-300">
                  <UserCircle size={14} className="text-indigo-400" />
                  {user.name.split(' ')[0]} {/* Sirf First Name dikhayega */}
                </div>

                {/* Logout Button */}
                <button onClick={handleLogout} className="flex items-center gap-1.5 font-semibold text-sm text-red-400 hover:text-red-300 hover:bg-red-900/40 transition-colors bg-red-900/20 px-3 py-1.5 rounded-lg border border-red-900/50">
                  <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              // Login Button for Guests
              <Link to="/login" className="flex items-center gap-1.5 font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition-all shadow-lg shadow-indigo-500/20">
                <LogIn size={18} /> Staff Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;