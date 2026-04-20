import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Briefcase, UserPlus, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    // Explicitly added bg-slate-900 and text-white to force dark theme
    <div className="min-h-[calc(100vh-64px)] bg-slate-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Glowing Orb (Fixed blur for all browsers) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-3xl rounded-full pointer-events-none"></div>

      {/* Hero Section */}
      <div className="text-center max-w-3xl mb-16 relative z-10 mt-8">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-500/50 hover:scale-105 transition-transform duration-300">
            <Shield className="text-white w-12 h-12" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Smart Security & <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Gate Pass System
          </span>
        </h1>
        
        <p className="text-lg text-slate-400 mb-8 px-4 font-medium max-w-2xl mx-auto">
          A seamless, digital-first approach to manage visitors, hosts, and facility security. Choose your portal below to get started.
        </p>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full px-4 relative z-10 pb-12">
        
        {/* Visitor Card */}
        <Link to="/register-visitor" className="group bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:bg-slate-800/80 hover:border-indigo-500 shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-2">
          <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
            <UserPlus size={32} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Visitor</h2>
          <p className="text-slate-400 text-sm mb-6 flex-1">Register for a new gate pass and track your approval status.</p>
          <span className="flex items-center gap-2 text-indigo-400 font-semibold group-hover:gap-3 transition-all">
            Get Pass <ArrowRight size={18} />
          </span>
        </Link>

        {/* Host Card */}
        <Link to="/host-dashboard" className="group bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:bg-slate-800/80 hover:border-emerald-500 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-2">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
            <Users size={32} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Host</h2>
          <p className="text-slate-400 text-sm mb-6 flex-1">Manage your appointments, approve, or reject visitor requests.</p>
          <span className="flex items-center gap-2 text-emerald-400 font-semibold group-hover:gap-3 transition-all">
            Host Login <ArrowRight size={18} />
          </span>
        </Link>

        {/* Guard Card */}
        <Link to="/guard-dashboard" className="group bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:bg-slate-800/80 hover:border-orange-500 shadow-lg hover:shadow-orange-500/20 transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-2">
          <div className="w-16 h-16 bg-orange-500/10 text-orange-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all duration-300">
            <Shield size={32} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Security</h2>
          <p className="text-slate-400 text-sm mb-6 flex-1">Scan visitor QR codes to grant access at the entry gate.</p>
          <span className="flex items-center gap-2 text-orange-400 font-semibold group-hover:gap-3 transition-all">
            Guard Login <ArrowRight size={18} />
          </span>
        </Link>

        {/* Admin Card */}
        <Link to="/admin-dashboard" className="group bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:bg-slate-800/80 hover:border-purple-500 shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-2">
          <div className="w-16 h-16 bg-purple-500/10 text-purple-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
            <Briefcase size={32} />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Admin</h2>
          <p className="text-slate-400 text-sm mb-6 flex-1">Oversee the entire system, manage staff, and view reports.</p>
          <span className="flex items-center gap-2 text-purple-400 font-semibold group-hover:gap-3 transition-all">
            Admin Login <ArrowRight size={18} />
          </span>
        </Link>

      </div>
    </div>
  );
};

export default LandingPage;