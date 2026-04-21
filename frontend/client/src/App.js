// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Truck, ArrowRight, Lock, Phone, User, ShieldCheck } from 'lucide-react';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLogin, setIsLogin] = useState(true);

  // --- SPLASH SCREEN LOGIC ---
  useEffect(() => {
    // Wait for 3 seconds, then hide splash screen
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 1. THE SPLASH SCREEN COMPONENT */}
      {showSplash && <SplashScreen />}

      {/* 2. THE MAIN LOGIN APP (Hidden until splash is done) */}
      <div className={`min-h-screen flex items-center justify-center bg-[#f3f4f6] font-sans p-4 transition-opacity duration-1000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        
        <div className="bg-white w-full max-w-[420px] rounded-[35px] shadow-xl p-10 relative overflow-hidden">
          
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="mx-auto w-20 h-20 bg-[#1e3a8a] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20 mb-4">
              <Truck className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-bold text-[#1e3a8a] tracking-tight">MRS</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
              Riswana Transports & Enterprises
            </p>
          </div>

          <h2 className="text-xl font-semibold text-slate-800 text-center mb-8">
              {isLogin ? 'Sign In' : 'Create Account'}
          </h2>

          {isLogin ? (
              <LoginForm onSwitch={() => setIsLogin(false)} />
          ) : (
              <SignupForm onSwitch={() => setIsLogin(true)} />
          )}

        </div>
      </div>
    </>
  );
}

// --- SPLASH SCREEN DESIGN (Matches your uploaded image) ---
const SplashScreen = () => (
  <div className="fixed inset-0 bg-[#f3f4f6] z-50 flex flex-col items-center justify-center animate-fade-out">
    
    {/* Animated Logo Container */}
    <div className="flex flex-col items-center animate-pulse">
      {/* Grey Icon Style from your image */}
      <div className="w-24 h-24 flex items-center justify-center mb-4">
        <Truck className="w-16 h-16 text-slate-400" strokeWidth={1.5} />
      </div>
      
      {/* Text Style */}
      <h1 className="text-5xl font-bold text-slate-400 tracking-tighter mb-2">MRS</h1>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">
        Riswana Transports & Enterprises
      </p>
    </div>

    {/* The Loading Line at the bottom */}
    <div className="absolute bottom-20 w-16 h-1.5 bg-slate-300 rounded-full overflow-hidden">
        <div className="h-full bg-[#1e3a8a] animate-loading-bar"></div>
    </div>
  </div>
);

// --- REUSABLE COMPONENTS (Same as before) ---
const InputGroup = ({ label, icon: Icon, children, ...props }) => (
  <div className="mb-5">
    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-slate-400 group-focus-within:text-[#1e3a8a] transition-colors" />
      </div>
      <input
        {...props}
        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all duration-200"
      />
      {children}
    </div>
  </div>
);

const PrimaryButton = ({ children, onClick, loading }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="w-full mt-4 bg-[#1e3a8a] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 hover:bg-[#172554] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
  >
    {loading ? 'Processing...' : children}
    {!loading && <ArrowRight className="w-5 h-5" />}
  </button>
);

// --- LOGIN FORM ---
function LoginForm({ onSwitch }) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/login', { mobile, password });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Login Failed');
    }
    setLoading(false);
  };

  return (
    <div className="animate-fade-in">
      <InputGroup label="Mobile Number" icon={Phone} type="text" placeholder="" value={mobile} onChange={(e) => setMobile(e.target.value)} />
      <InputGroup label="Password" icon={Lock} type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
      <PrimaryButton onClick={handleLogin} loading={loading}>LOGIN</PrimaryButton>
      <div className="mt-8 text-center">
        <p className="text-slate-500 text-sm font-medium">
          Don't have an account? <button onClick={onSwitch} className="text-[#1e3a8a] font-bold border-b-2 border-[#1e3a8a]/20 hover:border-[#1e3a8a] pb-0.5 ml-1">Create one</button>
        </p>
      </div>
    </div>
  );
}

// --- SIGNUP FORM ---
function SignupForm({ onSwitch }) {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!mobile) return alert("Please enter mobile number");
    try {
      const res = await axios.post('http://localhost:5000/api/send-otp', { mobile });
      alert(res.data.message);
    } catch (err) {
      alert("Error sending OTP");
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/signup', { fullName, mobile, otp, password });
      alert(res.data.message);
      onSwitch();
    } catch (err) {
      alert(err.response?.data?.message || 'Signup Failed');
    }
    setLoading(false);
  };

  return (
    <div className="animate-fade-in">
      <InputGroup label="Full Name" icon={User} type="text" placeholder="Enter your name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <div className="mb-5">
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Mobile Number</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-[#1e3a8a]" />
          </div>
          <input type="text" placeholder="" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full pl-11 pr-24 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]" />
          <button onClick={sendOtp} className="absolute right-2 top-2 bottom-2 px-3 bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-[#1e3a8a]">Send OTP</button>
        </div>
      </div>
      <InputGroup label="Verification Code" icon={ShieldCheck} type="text" placeholder="Enter 4-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <InputGroup label="Set Password" icon={Lock} type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
      <PrimaryButton onClick={handleSignup} loading={loading}>CREATE ACCOUNT</PrimaryButton>
      <div className="mt-8 text-center">
        <p className="text-slate-500 text-sm font-medium">
          Already have an account? <button onClick={onSwitch} className="text-[#1e3a8a] font-bold border-b-2 border-[#1e3a8a]/20 hover:border-[#1e3a8a] pb-0.5 ml-1">Sign In</button>
        </p>
      </div>
    </div>
  );
}

export default App;