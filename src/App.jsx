import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SplashScreen from "./SplashScreen";
import LandingPage from "./LandingPage";
import PhoneAuth from "./PhoneAuth";
import { api } from "./api";
import { loginWithGoogle, checkUserInBackends, createUserInBackend, logoutUser } from "./authService";

const DEMO_USERS = {
  "tenant@roomsetu.com": { password: "123456", role: "tenant", name: "Arjun Mehta", avatar: "AM", city: "Pune" },
  "owner@roomsetu.com": { password: "123456", role: "owner", name: "Priya Sharma", avatar: "PS", city: "Mumbai" },
  "agent@roomsetu.com": { password: "123456", role: "agent", name: "Ravi Kumar", avatar: "RK", city: "Nashik" },
  "admin@roomsetu.com": { password: "123456", role: "admin", name: "Admin User", avatar: "AU", city: "Delhi" },
};

const MOCK_LISTINGS = [
  { id: 1, title: "Cozy 2BHK near Hinjewadi IT Park", location: "Hinjewadi, Pune", rent: 8500, type: "Flat", furnished: "Furnished", gender: "Any", smoking: false, pets: true, verified: "Field Verified", scamRisk: "Low", compatibility: 92, image: "🏢", rooms: 2, bathrooms: 1, amenities: ["WiFi", "AC", "Gym", "Parking"], owner: "Priya Sharma", available: "Immediate", deposit: 25500, description: "Spacious flat with great ventilation and modern kitchen." },
  { id: 2, title: "Single Room in PG Near Kothrud", location: "Kothrud, Pune", rent: 5500, type: "Room", furnished: "Semi-Furnished", gender: "Boys", smoking: false, pets: false, verified: "Basic Verified", scamRisk: "Low", compatibility: 78, image: "🏠", rooms: 1, bathrooms: 1, amenities: ["WiFi", "Laundry", "Meals"], owner: "Suresh Patil", available: "Immediate", deposit: 11000, description: "Clean single room with attached bathroom." },
  { id: 3, title: "Luxury Studio in Baner", location: "Baner, Pune", rent: 15000, type: "Flat", furnished: "Furnished", gender: "Any", smoking: false, pets: true, verified: "Video Verified", scamRisk: "Low", compatibility: 85, image: "🏙", rooms: 1, bathrooms: 1, amenities: ["WiFi", "AC", "Power Backup", "Security", "Swimming Pool"], owner: "Anjali Desai", available: "Dec 1", deposit: 45000, description: "Premium studio with rooftop pool access." },
  { id: 4, title: "3BHK Villa in Wagholi", location: "Wagholi, Pune", rent: 22000, type: "Villa", furnished: "Unfurnished", gender: "Family", smoking: false, pets: true, verified: "Field Verified", scamRisk: "Low", compatibility: 65, image: "🏡", rooms: 3, bathrooms: 2, amenities: ["Parking", "Garden", "Power Backup"], owner: "Ramesh Kulkarni", available: "Jan 1", deposit: 66000, description: "Spacious villa in gated community." },
  { id: 5, title: "Shared Room near Hadapsar", location: "Hadapsar, Pune", rent: 3800, type: "Room", furnished: "Semi-Furnished", gender: "Girls", smoking: false, pets: false, verified: "Basic Verified", scamRisk: "Medium", compatibility: 70, image: "🏠", rooms: 1, bathrooms: 1, amenities: ["WiFi", "Meals"], owner: "Sunita More", available: "Immediate", deposit: 7600, description: "Safe locality, near market." },
  { id: 6, title: "Rural Homestay in Igatpuri", location: "Igatpuri, Nashik", rent: 4500, type: "Room", furnished: "Furnished", gender: "Any", smoking: true, pets: true, verified: "Rural Verified", scamRisk: "Low", compatibility: 55, image: "🌾", rooms: 2, bathrooms: 1, amenities: ["Farm Access", "Parking", "Home-cooked Food"], owner: "Govind Bhoite", available: "Immediate", deposit: 9000, description: "Peaceful rural setting near hills.", rural: true },
];

const MOCK_ROOMMATES = [
  { id: 1, name: "Sneha Joshi", age: 24, profession: "Software Engineer", city: "Pune", compatibility: 94, sleep: "Night Owl", cleanliness: 8, food: "Veg", guests: "Sometimes", workType: "WFO", budget: "8000-12000", avatar: "SJ", verified: true },
  { id: 2, name: "Karan Tiwari", age: 26, profession: "MBA Student", city: "Pune", compatibility: 87, sleep: "Early Bird", cleanliness: 7, food: "Non-Veg", guests: "Rarely", workType: "Student", budget: "5000-8000", avatar: "KT", verified: true },
  { id: 3, name: "Meera Nair", age: 23, profession: "Graphic Designer", city: "Pune", compatibility: 81, sleep: "Night Owl", cleanliness: 9, food: "Veg", guests: "Often", workType: "WFH", budget: "7000-10000", avatar: "MN", verified: false },
  { id: 4, name: "Rohit Sharma", age: 28, profession: "Data Analyst", city: "Pune", compatibility: 76, sleep: "Early Bird", cleanliness: 6, food: "Non-Veg", guests: "Rarely", workType: "WFO", budget: "9000-13000", avatar: "RS", verified: true },
];

const MOCK_CHATS = [
  { id: 1, user: "Sneha Joshi", avatar: "SJ", lastMessage: "Hi! I saw your profile. Are you still looking for a roommate?", time: "2m ago", unread: 2 },
  { id: 2, user: "Priya Sharma (Owner)", avatar: "PS", lastMessage: "The flat is available from December 1st.", time: "1h ago", unread: 0 },
  { id: 3, user: "Karan Tiwari", avatar: "KT", lastMessage: "Let's schedule a visit this weekend?", time: "3h ago", unread: 1 },
];

const MOCK_MESSAGES = [
  { from: "them", text: "Hi! I saw your profile. Are you still looking for a roommate?", time: "10:02 AM" },
  { from: "me", text: "Yes! Your profile looks great. I noticed we have a 94% compatibility.", time: "10:05 AM" },
  { from: "them", text: "Amazing! I prefer veg food and clean shared spaces. Would that work?", time: "10:06 AM" },
  { from: "me", text: "Absolutely, same here. Are you okay with late-night work from home sometimes?", time: "10:08 AM" },
  { from: "them", text: "Totally fine! I'm a night owl too 😄 Want to check out that Baner listing together?", time: "10:09 AM" },
];

const AGENT_VISITS = [
  { id: 1, village: "Igatpuri", owner: "Govind Bhoite", date: "2024-11-20", status: "Completed", photos: 6 },
  { id: 2, village: "Trimbak", owner: "Nana Patil", date: "2024-11-22", status: "Pending", photos: 0 },
  { id: 3, village: "Sinnar", owner: "Lata Jadhav", date: "2024-11-25", status: "Scheduled", photos: 0 },
];

const Badge = ({ type, children }) => {
  const styles = {
    verified: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    rural: "bg-amber-100 text-amber-700 border border-amber-200",
    scam_low: "bg-green-100 text-green-700 border border-green-200",
    scam_medium: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    scam_high: "bg-red-100 text-red-700 border border-red-200",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${styles[type] || "bg-gray-100 text-gray-600"}`}>
      {children}
    </span>
  );
};

const Avatar = ({ initials, size = "md", color = "blue" }) => {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-lg" };
  const colors = { blue: "from-blue-500 to-blue-700", purple: "from-purple-500 to-purple-700", green: "from-emerald-500 to-emerald-700", orange: "from-orange-500 to-orange-700" };
  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br ${colors[color]} flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
};

const StatCard = ({ label, value, icon, color = "blue", sub }) => {
  const colors = {
    blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-700",
    green: "from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-700",
    purple: "from-purple-50 to-purple-100 border-purple-200 text-purple-700",
    orange: "from-orange-50 to-orange-100 border-orange-200 text-orange-700",
    red: "from-red-50 to-red-100 border-red-200 text-red-700",
  };
  return (
    <div className={`bg-gradient-to-br ${colors[color]} border rounded-2xl p-3 sm:p-5 flex flex-col gap-1`}>
      <span className="text-xl sm:text-2xl">{icon}</span>
      <div className="text-2xl sm:text-3xl font-bold mt-1">{value}</div>
      <div className="text-xs sm:text-sm font-medium opacity-80">{label}</div>
      {sub && <div className="text-xs opacity-60 mt-1">{sub}</div>}
    </div>
  );
};

const CompatibilityRing = ({ score, size = 52 }) => {
  const color = score >= 85 ? "#10b981" : score >= 70 ? "#3b82f6" : "#f59e0b";
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={size/2 - 4} fill="none" stroke="#e5e7eb" strokeWidth="4" />
        <circle cx={size/2} cy={size/2} r={size/2 - 4} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${(score / 100) * (2 * Math.PI * (size/2 - 4))} ${2 * Math.PI * (size/2 - 4)}`} strokeLinecap="round" />
      </svg>
      <span className={`absolute font-bold ${size === 52 ? 'text-xs' : 'text-[10px]'}`} style={{ color }}>{score}%</span>
    </div>
  );
};

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [googleUid, setGoogleUid] = useState(null);
  const [role, setRole] = useState("tenant");
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [pendingGoogleData, setPendingGoogleData] = useState(null);
  const [showPhoneAuth, setShowPhoneAuth] = useState(false);

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError("");
    try {
      if (provider !== 'google') {
        setError('Only Google login is available');
        setLoading(false);
        return;
      }

      console.log('Starting Google sign in...');
      const userData = await loginWithGoogle();
      console.log('Google sign in successful, userData:', userData);
      
      // Immediately show signup form for new users - faster UX
      // Check backends in background
      const displayName = userData.displayName || userData.email?.split('@')[0] || 'User';
      
      setError(`👋 Hi ${displayName}! This email is not registered. Create an account to continue.`);
      setPendingGoogleData(userData);
      setIsSignup(true);
      setLoading(false);
      setEmail(userData.email || '');
      setName(userData.displayName || '');
      setGoogleUid(userData.uid);
      
      // Check backends in background (non-blocking)
      checkUserInBackends(userData).then(backendResponse => {
        if (backendResponse.exists) {
          console.log('User found in backend after initial check:', backendResponse);
          // Clear error and login directly
          setError('');
          setIsSignup(false);
          
          if (backendResponse.source === 'firestore') {
            onLogin({
              uid: userData.uid,
              email: userData.email,
              name: backendResponse.user.name,
              role: backendResponse.user.role,
              avatar: userData.displayName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U',
              city: backendResponse.user.city || 'Not specified'
            });
          } else if (backendResponse.source === 'django') {
            const user = backendResponse.user;
            const avatar = user.first_name?.[0] || user.email?.[0] || 'U';
            const lastInitial = user.last_name?.[0] || user.first_name?.[1] || '';
            onLogin({
              uid: user.uid || user.id,
              email: user.email,
              name: user.first_name && user.last_name 
                ? `${user.first_name} ${user.last_name}` 
                : user.username || user.email,
              role: user.role || 'tenant',
              avatar: (avatar + lastInitial).toUpperCase(),
              city: user.city || 'Not specified'
            });
          }
        }
      }).catch(err => {
        console.log('Background backend check failed:', err);
      });
      
    } catch (err) {
      console.error('Social login error:', err);
      console.error('Error code:', err.code);
      console.error('Error message:', err.message);
      
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Login was cancelled. Please try again.');
      } else if (err.code === 'auth/unavailable') {
        setError('Service temporarily unavailable. Please try again later.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Please check your internet connection.');
      } else if (err.message && err.message.includes('offline')) {
        setError('Network error. Please check your internet connection.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized for OAuth login.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Google login is not enabled. Please contact support.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        setError('Only one popup allowed at a time.');
      } else {
        const errorMessage = err.message || err.toString() || 'Unknown error';
        setError(`Login error: ${errorMessage}. Please try again or create an account.`);
        setIsSignup(true);
      }
    } finally {
      // Loading is set to false after showing signup form
    }
  };

  const demoLogins = [
    { label: "Tenant", email: "tenant@roomsetu.com", color: "bg-blue-600" },
    { label: "Owner", email: "owner@roomsetu.com", color: "bg-emerald-600" },
    { label: "Agent", email: "agent@roomsetu.com", color: "bg-amber-600" },
    { label: "Admin", email: "admin@roomsetu.com", color: "bg-purple-600" },
  ];

  const handleLogin = async (e, demoEmail) => {
    if (e) e.preventDefault();
    const loginEmail = demoEmail || email;
    const loginPass = demoEmail ? "123456" : password;
    setLoading(true);
    setError("");
    
    if (demoEmail) {
      setTimeout(() => {
        const user = DEMO_USERS[loginEmail];
        if (user && user.password === loginPass) {
          onLogin({ ...user, email: loginEmail });
        } else {
          setError("Account not found. Please create an account first.");
        }
        setLoading(false);
      }, 700);
      return;
    }
    
    // Try backend login first
    try {
      const response = await api.login(loginEmail, loginPass);
      console.log('Login successful:', response);
      
      const userData = response.user || response;
      const avatar = userData.first_name?.[0] || userData.email?.[0] || 'U';
      const lastInitial = userData.last_name?.[0] || userData.first_name?.[1] || '';
      
      onLogin({
        uid: userData.uid || userData.id,
        email: userData.email,
        name: userData.first_name && userData.last_name 
          ? `${userData.first_name} ${userData.last_name}` 
          : userData.username || userData.email,
        role: userData.role || 'tenant',
        avatar: (avatar + lastInitial).toUpperCase(),
        city: userData.city || 'Not specified'
      });
    } catch (backendErr) {
      console.log('Backend not available, trying local login:', backendErr);
      
      // Try local login
      const localUsers = JSON.parse(localStorage.getItem('roomsetu_users') || '[]');
      const localUser = localUsers.find(u => u.email === loginEmail);
      
      if (localUser) {
        // For demo users, check password; for local users, just login
        if (demoEmail || localUser.password === loginPass || !localUser.password) {
          const userFirstName = localUser.first_name || '';
          const userLastName = localUser.last_name || '';
          onLogin({
            uid: localUser.uid,
            email: localUser.email,
            name: userFirstName && userLastName 
              ? `${userFirstName} ${userLastName}` 
              : localUser.username || localUser.email,
            role: localUser.role || 'tenant',
            avatar: localUser.avatar || 'U',
            city: localUser.city || 'Not specified'
          });
        } else {
          setError("Invalid email or password. Please try again.");
        }
        setLoading(false);
        return;
      }
      
      // Check demo users for local testing
      const demoUser = DEMO_USERS[loginEmail];
      if (demoUser && demoUser.password === loginPass) {
        onLogin({ ...demoUser, email: loginEmail });
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setGoogleUid(pendingGoogleData.uid);
    setIsSignup(true);
    setEmail(pendingGoogleData.email);
    setName(pendingGoogleData.displayName || '');
    setShowRoleModal(false);
    setError('Please complete your signup below.');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !city) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    setError("");
    setLoadingMessage("Creating your account...");
    
    try {
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      const username = email.split('@')[0];
      
      if (googleUid) {
        // Google Signup - createUserInBackend already handles both Firestore and Django
        // No need to call api.signup separately (that was causing duplicate/redundant calls)
        setLoadingMessage("Setting up your account...");
        await createUserInBackend(pendingGoogleData, role, city);
        
        const avatar = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
        onLogin({
          uid: googleUid,
          email,
          name,
          role,
          avatar,
          city
        });
        return;
      }
      
      // Regular email signup - with timeout to prevent long waits
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
      
      try {
        setLoadingMessage("Connecting to server...");
        console.log('Sending signup request to backend...');
        const response = await api.signup({
          username,
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          role,
          city,
          phone: ''
        });
        clearTimeout(timeoutId);
        
        console.log('Signup successful:', response);
        const avatar = (firstName[0] || '') + (lastName[0] || firstName[1] || '');
        onLogin({ 
          ...response.user, 
          name: name,
          avatar: avatar.toUpperCase()
        });
        return;
      } catch (backendErr) {
        clearTimeout(timeoutId);
        console.log('Backend not available, using local signup:', backendErr);
        
        // Check if user already exists locally
        const existingUsers = JSON.parse(localStorage.getItem('roomsetu_users') || '[]');
        if (existingUsers.find(u => u.email === email)) {
          setError("Email already registered. Please login or use a different email.");
          setLoading(false);
          setLoadingMessage("");
          return;
        }
        
        // Create local user
        setLoadingMessage("Creating local account...");
        const newUser = {
          id: Date.now(),
          uid: `local_${Date.now()}`,
          email,
          username,
          first_name: firstName,
          last_name: lastName,
          role,
          city,
          phone: '',
          password: password,
          avatar: ((firstName[0] || '') + (lastName[0] || firstName[1] || '')).toUpperCase()
        };
        
        // Save to localStorage
        existingUsers.push(newUser);
        localStorage.setItem('roomsetu_users', JSON.stringify(existingUsers));
        
        console.log('Local signup successful:', newUser);
        onLogin({ 
          ...newUser, 
          name: name,
          password: password
        });
      }
    } catch (err) {
      console.error('Signup error:', err);
      
      let errorMsg = "Signup failed. ";
      
      if (err instanceof TypeError) {
        errorMsg += "Cannot connect to backend. Using local account creation.";
      } else if (err.name === 'AbortError') {
        errorMsg = "Request timed out. Please try again.";
      } else if (err.username) {
        errorMsg = err.username[0];
      } else if (err.email) {
        errorMsg = err.email[0];
      } else if (err.detail) {
        errorMsg = err.detail;
      } else if (err.message) {
        errorMsg = err.message;
      } else {
        errorMsg += "Please try again.";
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  if (showPhoneAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <PhoneAuth 
          onLogin={(userData) => {
            console.log('Phone login successful:', userData);
            onLogin(userData);
          }}
          onCancel={() => {
            console.log('Phone auth cancelled');
            setShowPhoneAuth(false);
          }}
        />
      </div>
    );
  }

  return (
    <>
    {showRoleModal && (
      <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
          <h3 className="text-xl font-bold text-slate-800 mb-2">Select Your Role</h3>
          <p className="text-slate-600 text-sm mb-4">Choose how you'll use RoomSetu</p>
          <div className="space-y-2">
            <button onClick={() => handleRoleSelection('tenant')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition">
              🏠 Tenant - Looking for a room
            </button>
            <button onClick={() => handleRoleSelection('owner')} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition">
              🏘️ Owner - Have rooms to rent
            </button>
            <button onClick={() => handleRoleSelection('agent')} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl transition">
              🚗 Field Agent - Help list properties
            </button>
          </div>
          <button onClick={() => { setShowRoleModal(false); setPendingGoogleData(null); }} className="w-full mt-3 text-slate-500 text-sm py-2">
            Cancel
          </button>
        </div>
      </div>
    )}
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8">
          <h2 className="text-white text-lg sm:text-xl font-bold mb-4 sm:mb-6">{isSignup ? "Create Account" : "Welcome back"}</h2>
          <form onSubmit={isSignup ? handleSignup : handleLogin} className="space-y-3 sm:space-y-4">
            {isSignup && (
              <div>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm"
                  placeholder="Full Name" />
              </div>
            )}
            <div>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm"
                placeholder="your@email.com" />
            </div>
            <div className="relative">
              <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm pr-12"
                placeholder="Password" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-2.5 text-slate-400">
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
            {isSignup && (
              <>
                <div>
                  <input type="text" value={city} onChange={e => setCity(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm"
                    placeholder="City" />
                </div>
                <div>
                  <select value={role} onChange={e => setRole(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm">
                    <option value="tenant" className="bg-slate-800">Tenant</option>
                    <option value="owner" className="bg-slate-800">Owner</option>
                    <option value="agent" className="bg-slate-800">Field Agent</option>
                  </select>
                </div>
              </>
            )}
            {error && (
              <div className={`rounded-xl px-4 py-3 text-sm font-medium ${
                error.includes('not registered') 
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                  : 'text-red-400 bg-red-500/10'
              }`}>
                {error}
              </div>
            )}
            <button type="submit" disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 sm:py-3 rounded-xl transition disabled:opacity-60 text-sm sm:text-base">
              {loading ? (loadingMessage || (isSignup ? "Creating..." : "Signing in...")) : (isSignup ? "Sign Up" : "Sign In")}
            </button>
            <button type="button" onClick={() => { setIsSignup(!isSignup); setError(""); }}
              className="w-full text-white/80 hover:text-white text-sm underline">
              {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </button>
          </form>

          <div className="mt-5 sm:mt-6">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-slate-400 text-xs">Or continue with</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>
            <div className="flex gap-3 mb-4">
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                disabled={loading}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition disabled:opacity-60 flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setShowPhoneAuth(true)}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-slate-400 text-xs">Demo Accounts</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {demoLogins.map(d => (
                <button key={d.email} onClick={() => handleLogin(null, d.email)}
                  className={`${d.color} text-white text-xs sm:text-sm font-semibold py-2 sm:py-2.5 rounded-xl`}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

const Sidebar = ({ role, activeSection, setActiveSection, user, onLogout, mobileOpen, setMobileOpen }) => {
  const navItems = {
    tenant: [
      { id: "overview", icon: "📊", label: "Overview" },
      { id: "find-room", icon: "🔍", label: "Find Room" },
      { id: "find-roommate", icon: "👥", label: "Roommate" },
      { id: "cost-split", icon: "💰", label: "Calculator" },
      { id: "chat", icon: "💬", label: "Messages", badge: 3 },
      { id: "checklist", icon: "✅", label: "Checklist" },
    ],
    owner: [
      { id: "overview", icon: "📊", label: "Overview" },
      { id: "listings", icon: "🏘", label: "My Listings" },
      { id: "add-property", icon: "➕", label: "Add Property" },
      { id: "tenants", icon: "👥", label: "Tenants" },
    ],
    agent: [
      { id: "overview", icon: "📊", label: "Overview" },
      { id: "add-listing", icon: "➕", label: "Add Listing" },
      { id: "visits", icon: "🗺", label: "Visit Log" },
    ],
    admin: [
      { id: "overview", icon: "📊", label: "Overview" },
      { id: "users", icon: "👥", label: "Users" },
      { id: "listings-mgmt", icon: "🏘", label: "Listings" },
      { id: "reports", icon: "🚨", label: "Reports" },
      { id: "analytics", icon: "📈", label: "Analytics" },
    ],
  };

  const items = navItems[role] || [];
  const roleColors = { tenant: "blue", owner: "emerald", agent: "amber", admin: "purple" };
  const roleColor = roleColors[role];

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={`fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-sm">🏠</div>
            <span className="font-black text-slate-800 text-lg">RoomSetu</span>
          </div>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden p-1.5 hover:bg-slate-100 rounded-lg text-slate-500">✕</button>
        </div>
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <Avatar initials={user.avatar} size="md" color={roleColor === "blue" ? "blue" : roleColor === "emerald" ? "green" : roleColor === "amber" ? "orange" : "purple"} />
            <div>
              <div className="font-semibold text-slate-800 text-sm">{user.name}</div>
              <div className="text-xs text-slate-500 capitalize">{user.role}</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {items.map(item => (
            <button key={item.id} onClick={() => { setActiveSection(item.id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${activeSection === item.id ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}>
              <span>{item.icon}</span>
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{item.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-100">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50">
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

const MobileNav = ({ role, activeSection, setActiveSection }) => {
  const navItems = {
    tenant: [
      { id: "overview", icon: "📊", label: "Home" },
      { id: "find-room", icon: "🔍", label: "Rooms" },
      { id: "chat", icon: "💬", label: "Chat" },
      { id: "checklist", icon: "✅", label: "Check" },
    ],
    owner: [
      { id: "overview", icon: "📊", label: "Home" },
      { id: "listings", icon: "🏘", label: "Listings" },
      { id: "add-property", icon: "➕", label: "Add" },
      { id: "tenants", icon: "👥", label: "Tenants" },
    ],
    agent: [
      { id: "overview", icon: "📊", label: "Home" },
      { id: "add-listing", icon: "➕", label: "Add" },
      { id: "visits", icon: "🗺", label: "Visits" },
    ],
    admin: [
      { id: "overview", icon: "📊", label: "Home" },
      { id: "users", icon: "👥", label: "Users" },
      { id: "reports", icon: "🚨", label: "Reports" },
      { id: "analytics", icon: "📈", label: "Stats" },
    ],
  };

  const items = navItems[role] || [];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex justify-around items-center z-30 lg:hidden">
      {items.map(item => (
        <button key={item.id} onClick={() => setActiveSection(item.id)}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg ${activeSection === item.id ? "text-blue-600" : "text-slate-400"}`}>
          <span className="text-lg">{item.icon}</span>
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

const ListingCard = ({ listing, onClick }) => (
  <div onClick={() => onClick(listing)} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition cursor-pointer">
    <div className="h-28 sm:h-36 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-4xl sm:text-6xl relative">
      {listing.image}
      <div className="absolute top-2 right-2">
        <Badge type={listing.scamRisk === "Low" ? "scam_low" : "scam_medium"}>🛡</Badge>
      </div>
    </div>
    <div className="p-3 sm:p-4">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-slate-800 text-sm leading-tight line-clamp-2">{listing.title}</h3>
        <CompatibilityRing score={listing.compatibility} size={40} />
      </div>
      <p className="text-slate-500 text-xs mb-3">📍 {listing.location}</p>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg sm:text-xl font-black text-blue-600">₹{listing.rent.toLocaleString()}</span>
          <span className="text-slate-400 text-xs">/mo</span>
        </div>
        <Badge type="verified">{listing.verified}</Badge>
      </div>
    </div>
  </div>
);

const ListingModal = ({ listing, onClose }) => {
  if (!listing) return null;
  const costSplit = { rent: listing.rent / 2, electricity: 600, water: 150, internet: 250, maid: 500, total: listing.rent / 2 + 1500 };
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="h-36 sm:h-48 bg-blue-100 flex items-center justify-center text-5xl sm:text-8xl relative">
          {listing.image}
          <button onClick={onClose} className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center">✕</button>
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">{listing.title}</h2>
              <p className="text-slate-500 text-sm">📍 {listing.location}</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl font-black text-blue-600">₹{listing.rent.toLocaleString()}</div>
              <div className="text-xs text-slate-400">per month</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge type="verified">{listing.verified}</Badge>
            <Badge type={listing.scamRisk === "Low" ? "scam_low" : "scam_medium"}>🛡 {listing.scamRisk} Risk</Badge>
          </div>
          <p className="text-slate-600 text-sm mb-4">{listing.description}</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[["Type", listing.type], ["Furnished", listing.furnished], ["Gender", listing.gender], ["Available", listing.available]].map(([k, v]) => (
              <div key={k} className="bg-slate-50 rounded-xl p-3">
                <div className="text-xs text-slate-400">{k}</div>
                <div className="text-sm font-semibold">{v}</div>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 rounded-2xl p-4 mb-4">
            <h4 className="font-bold text-blue-800 text-sm mb-2">Cost Split (2 people)</h4>
            <div className="flex justify-between text-sm"><span>Rent</span><span className="font-bold">₹{costSplit.total.toLocaleString()}</span></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl">💬 Message</button>
            <button className="px-4 bg-green-600 text-white font-medium py-3 rounded-xl">📱 WhatsApp</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TenantOverview = ({ setActiveSection }) => (
  <div className="space-y-4 sm:space-y-6 pb-20 lg:pb-6">
    <div>
      <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-1">Good morning, Arjun! 👋</h2>
      <p className="text-slate-500 text-sm">You have 3 new matches today.</p>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
      <StatCard label="Saved" value="7" icon="❤️" color="blue" />
      <StatCard label="Matches" value="3" icon="👥" color="green" />
      <StatCard label="Est. Cost" value="₹9,200" icon="💰" color="purple" />
      <StatCard label="Messages" value="3" icon="💬" color="orange" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
        <h3 className="font-bold text-slate-800 mb-4">🔥 Top Matches</h3>
        <div className="space-y-3">
          {MOCK_LISTINGS.slice(0, 3).map(l => (
            <div key={l.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl cursor-pointer" onClick={() => setActiveSection("find-room")}>
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl">{l.image}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-700 text-sm truncate">{l.title}</div>
                <div className="text-xs text-slate-400">📍 {l.location}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600">₹{l.rent.toLocaleString()}</div>
                <Badge type="verified">{l.compatibility}%</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
        <h3 className="font-bold text-slate-800 mb-4">💬 Recent</h3>
        <div className="space-y-3">
          {MOCK_CHATS.map(c => (
            <div key={c.id} className="flex items-center gap-3 cursor-pointer">
              <Avatar initials={c.avatar} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-700 truncate">{c.user}</div>
                <div className="text-xs text-slate-400 truncate">{c.lastMessage}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const FindRoom = () => {
  const [selectedListing, setSelectedListing] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="pb-20 lg:pb-6">
      <div className="flex justify-between items-center mb-4 sm:mb-5">
        <h2 className="text-xl sm:text-2xl font-black text-slate-800">🔍 Find Room</h2>
        <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden bg-white border border-slate-200 px-3 py-2 rounded-xl text-sm">🔽 Filters</button>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4">
            <input className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm" placeholder="Search location..." />
            <div>
              <label className="text-xs text-slate-500 font-medium">Budget</label>
              <div className="flex gap-2 mt-1">
                <input type="number" className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs" placeholder="Min" />
                <input type="number" className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs" placeholder="Max" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-sm text-slate-500 mb-3">{MOCK_LISTINGS.length} listings found</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {MOCK_LISTINGS.map(l => <ListingCard key={l.id} listing={l} onClick={setSelectedListing} />)}
          </div>
        </div>
      </div>
      <ListingModal listing={selectedListing} onClose={() => setSelectedListing(null)} />
    </div>
  );
};

const FindRoommate = ({ setActiveSection, setActiveChatUser }) => {
  const [connectedUsers, setConnectedUsers] = useState([]);
  
  const handleConnect = (roommate) => {
    if (connectedUsers.includes(roommate.id)) {
      setActiveChatUser(roommate);
      setActiveSection('chat');
    } else {
      setConnectedUsers([...connectedUsers, roommate.id]);
      MOCK_CHATS.push({
        id: MOCK_CHATS.length + 1,
        user: roommate.name,
        avatar: roommate.avatar,
        lastMessage: "Connected! Say hi 👋",
        time: "Just now",
        unread: 0
      });
      setActiveChatUser(roommate);
      setActiveSection('chat');
    }
  };
  
  return (
  <div className="pb-20 lg:pb-6">
    <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">👥 Find Roommate</h2>
    <p className="text-slate-500 text-sm mb-4 sm:mb-6">Match based on lifestyle compatibility.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
      {MOCK_ROOMMATES.map(r => (
        <div key={r.id} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center gap-4 mb-4">
            <Avatar initials={r.avatar} size="lg" color="blue" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-800">{r.name}</h3>
                {r.verified && <span className="text-green-500">✓</span>}
              </div>
              <div className="text-slate-500 text-sm">{r.profession} · {r.age} yrs</div>
            </div>
            <CompatibilityRing score={r.compatibility} size={44} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[["🌙", r.sleep], ["🧹", `${r.cleanliness}/10`], ["🍽", r.food], ["👥", r.guests], ["💼", r.workType], ["💰", r.budget]].map(([k, v]) => (
              <div key={k} className="bg-slate-50 rounded-xl p-2 text-center">
                <div className="text-[10px] text-slate-500">{k}</div>
                <div className="text-xs font-semibold truncate">{v}</div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => handleConnect(r)}
            className={`mt-4 w-full text-sm font-bold py-2 rounded-xl transition ${
              connectedUsers.includes(r.id) 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}>
            {connectedUsers.includes(r.id) ? '✓ Connected - Open Chat' : '💬 Connect'}
          </button>
        </div>
      ))}
    </div>
  </div>
);
};

const CostSplit = () => {
  const [inputs, setInputs] = useState({ rent: 16000, people: 2, electricity: 1200, water: 300, internet: 500, maid: 1000 });
  const per = k => Math.round(inputs[k] / inputs.people);
  return (
    <div className="pb-20 lg:pb-6">
      <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-4 sm:mb-5">💰 Cost Split</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-3">
          <h3 className="font-bold text-slate-700">Enter Costs</h3>
          {[["Rent", "rent"], ["People", "people"], ["Electricity", "electricity"], ["Water", "water"], ["Internet", "internet"], ["Maid", "maid"]].map(([label, key]) => (
            <div key={key}>
              <label className="text-xs sm:text-sm text-slate-600 font-medium block mb-1">{label}</label>
              <input type="number" value={inputs[key]} onChange={e => setInputs({ ...inputs, [key]: +e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-sm" />
            </div>
          ))}
        </div>
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-blue-600 text-white rounded-2xl p-4 sm:p-6">
            <h3 className="font-bold mb-4">Per Person</h3>
            <div className="space-y-2">
              {[["Rent", "rent"], ["Electricity", "electricity"], ["Water", "water"], ["Internet", "internet"], ["Maid", "maid"]].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-blue-200 text-sm">{k}</span>
                  <span className="font-bold">₹{per(v).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-blue-500 pt-2 mt-2 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-xl">₹{(per("rent") + per("electricity") + per("water") + per("internet") + per("maid")).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Chat = ({ activeChatUser }) => {
  const [activeChat, setActiveChat] = useState(activeChatUser || MOCK_CHATS[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMsg = { from: "me", text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages([...messages, newMsg]);
    setMessage("");
  };

  return (
    <div className="pb-20 lg:pb-6 h-[calc(100vh-80px)] flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setActiveChat(null)} className="lg:hidden text-slate-500">←</button>
        <Avatar initials={activeChat?.avatar || "U"} size="md" />
        <div>
          <div className="font-semibold text-slate-800">{activeChat?.user || "Select a chat"}</div>
          <div className="text-xs text-slate-500">Online</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 px-1">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] px-4 py-2 rounded-2xl ${m.from === "me" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-800"}`}>
              <p className="text-sm">{m.text}</p>
              <p className={`text-[10px] ${m.from === "me" ? "text-blue-200" : "text-slate-400"}`}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()}
          className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm" placeholder="Type a message..." />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 rounded-xl font-semibold">Send</button>
      </div>
    </div>
  );
};

const Checklist = () => {
  const items = [
    { id: 1, text: "Verify landlord's ownership documents", done: true },
    { id: 2, text: "Check water & electricity meter readings", done: true },
    { id: 3, text: "Inspect bathroom & kitchen fixtures", done: false },
    { id: 4, text: "Test all electrical outlets", done: false },
    { id: 5, text: "Check for pest/rodent signs", done: false },
    { id: 6, text: "Verify gas connection safety certificate", done: false },
    { id: 7, text: "Document existing damages with photos", done: false },
    { id: 8, text: "Discuss maintenance responsibilities", done: false },
  ];
  const [list, setList] = useState(items);
  const toggle = (id) => setList(list.map(i => i.id === id ? { ...i, done: !i.done } : i));
  const progress = Math.round((list.filter(i => i.done).length / list.length) * 100);

  return (
    <div className="pb-20 lg:pb-6">
      <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">✅ Rental Checklist</h2>
      <div className="bg-blue-600 text-white rounded-2xl p-4 mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Progress</span>
          <span className="font-bold text-xl">{progress}%</span>
        </div>
        <div className="h-3 bg-blue-800 rounded-full overflow-hidden">
          <div className="h-full bg-white transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100">
        {list.map(item => (
          <div key={item.id} className="flex items-center gap-4 p-4">
            <button onClick={() => toggle(item.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${item.done ? "bg-green-500 border-green-500 text-white" : "border-slate-300"}`}>
              {item.done && "✓"}
            </button>
            <span className={`text-sm ${item.done ? "text-slate-400 line-through" : "text-slate-700"}`}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const OwnerListings = () => (
  <div className="pb-20 lg:pb-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl sm:text-2xl font-black text-slate-800">🏘 My Listings</h2>
      <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold">+ Add New</button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {MOCK_LISTINGS.slice(0, 2).map(l => (
        <div key={l.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="h-24 bg-slate-100 flex items-center justify-center text-4xl">{l.image}</div>
          <div className="p-4">
            <h3 className="font-semibold text-slate-800">{l.title}</h3>
            <p className="text-slate-500 text-sm">📍 {l.location}</p>
            <div className="flex justify-between items-center mt-3">
              <span className="font-bold text-emerald-600">₹{l.rent.toLocaleString()}/mo</span>
              <Badge type="verified">{l.verified}</Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AddProperty = () => (
  <div className="pb-20 lg:pb-6">
    <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">➕ Add Property</h2>
    <form className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-4">
      <div>
        <label className="text-sm font-medium text-slate-600 block mb-1">Property Title</label>
        <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm" placeholder="e.g., Cozy 2BHK in Hinjewadi" />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-600 block mb-1">Location</label>
        <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm" placeholder="City, Area" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-600 block mb-1">Rent (₹)</label>
          <input type="number" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm" placeholder="10000" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 block mb-1">Property Type</label>
          <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm">
            <option>Flat</option>
            <option>Room</option>
            <option>Villa</option>
            <option>PG</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-600 block mb-1">Description</label>
        <textarea className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm" rows={3} placeholder="Describe your property..." />
      </div>
      <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl">Submit Listing</button>
    </form>
  </div>
);

const OwnerTenants = () => (
  <div className="pb-20 lg:pb-6">
    <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">👥 My Tenants</h2>
    <div className="space-y-3">
      {[{ name: "Arjun Mehta", room: "2BHK-101", rent: "₹8,500", status: "Active" }, { name: "Sneha Joshi", room: "Room-205", rent: "₹5,500", status: "Active" }].map((t, i) => (
        <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4">
          <Avatar initials={t.name.split(" ").map(n => n[0]).join("")} size="md" color="emerald" />
          <div className="flex-1">
            <div className="font-semibold text-slate-800">{t.name}</div>
            <div className="text-xs text-slate-500">{t.room} · {t.rent}/mo</div>
          </div>
          <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">{t.status}</span>
        </div>
      ))}
    </div>
  </div>
);

const AgentAddListing = () => (
  <div className="pb-20 lg:pb-6">
    <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">➕ Add Listing</h2>
    <form className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-4">
      <div>
        <label className="text-sm font-medium text-slate-600 block mb-1">Village/Area Name</label>
        <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm" placeholder="e.g., Igatpuri" />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-600 block mb-1">Owner Name</label>
        <input type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm" placeholder="Owner's full name" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-600 block mb-1">Rent (₹)</label>
          <input type="number" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 block mb-1">Type</label>
          <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm">
            <option>Room</option>
            <option>Flat</option>
            <option>Villa</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-600 block mb-1">Photos Taken</label>
        <input type="number" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm" placeholder="Number of photos" />
      </div>
      <button type="submit" className="w-full bg-amber-600 text-white font-bold py-3 rounded-xl">Submit Listing</button>
    </form>
  </div>
);

const AgentVisits = () => (
  <div className="pb-20 lg:pb-6">
    <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">🗺 Visit Log</h2>
    <div className="space-y-3">
      {AGENT_VISITS.map(v => (
        <div key={v.id} className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-slate-800">{v.owner}</h3>
              <p className="text-sm text-slate-500">📍 {v.village}</p>
            </div>
            <Badge type={v.status === "Completed" ? "verified" : v.status === "Pending" ? "scam_medium" : "scam_low"}>{v.status}</Badge>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">📅 {v.date}</span>
            <span className="text-slate-500">📷 {v.photos} photos</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AdminUsers = () => (
  <div className="pb-20 lg:pb-6">
    <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">👥 Users</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard label="Total Users" value="1,284" icon="👥" color="blue" />
      <StatCard label="Tenants" value="856" icon="🏠" color="green" />
      <StatCard label="Owners" value="312" icon="🏘" color="purple" />
      <StatCard label="Agents" value="116" icon="🚗" color="orange" />
    </div>
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-4 font-semibold text-slate-600">User</th>
              <th className="text-left p-4 font-semibold text-slate-600">Role</th>
              <th className="text-left p-4 font-semibold text-slate-600">Status</th>
              <th className="text-left p-4 font-semibold text-slate-600">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[{ name: "Arjun Mehta", role: "Tenant", status: "Active", joined: "Nov 2024" }, { name: "Priya Sharma", role: "Owner", status: "Active", joined: "Oct 2024" }, { name: "Ravi Kumar", role: "Agent", status: "Pending", joined: "Nov 2024" }].map((u, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="p-4 font-medium">{u.name}</td>
                <td className="p-4"><span className="bg-slate-100 px-2 py-1 rounded text-xs">{u.role}</span></td>
                <td className="p-4"><span className={`text-xs ${u.status === "Active" ? "text-green-600" : "text-yellow-600"}`}>{u.status}</span></td>
                <td className="p-4 text-slate-500">{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const AdminListings = () => (
  <div className="pb-20 lg:pb-6">
    <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">🏘 Listings</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard label="Total Listings" value="347" icon="🏘" color="blue" />
      <StatCard label="Verified" value="289" icon="✓" color="green" />
      <StatCard label="Pending" value="42" icon="⏳" color="orange" />
      <StatCard label="Flagged" value="16" icon="🚩" color="red" />
    </div>
    <div className="space-y-3">
      {MOCK_LISTINGS.map(l => (
        <div key={l.id} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl">{l.image}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800">{l.title}</h3>
            <p className="text-xs text-slate-500">📍 {l.location}</p>
          </div>
          <div className="text-right">
            <div className="font-bold text-blue-600">₹{l.rent.toLocaleString()}</div>
            <Badge type="verified">{l.verified}</Badge>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AdminReports = () => (
  <div className="pb-20 lg:pb-6">
    <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">🚨 Reports</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard label="Total Reports" value="12" icon="🚨" color="red" />
      <StatCard label="Scam Alerts" value="4" icon="⚠️" color="red" />
      <StatCard label="Fake Listings" value="6" icon="🏘" color="orange" />
      <StatCard label="Resolved" value="8" icon="✓" color="green" />
    </div>
    <div className="space-y-3">
      {[{ id: 1, type: "Scam Alert", desc: "Suspicious landlord asking for advance", status: "Investigating" }, { id: 2, type: "Fake Listing", desc: "Duplicate property listing", status: "Pending" }, { id: 3, type: "Harassment", desc: "Inappropriate messages from agent", status: "Resolved" }].map(r => (
        <div key={r.id} className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-slate-800">{r.type}</h3>
              <p className="text-sm text-slate-500">{r.desc}</p>
            </div>
            <Badge type={r.status === "Resolved" ? "verified" : r.status === "Investigating" ? "scam_medium" : "scam_low"}>{r.status}</Badge>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AdminAnalytics = () => (
  <div className="pb-20 lg:pb-6">
    <h2 className="text-xl sm:text-2xl font-black text-slate-800 mb-4">📈 Analytics</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard label="Users Today" value="23" icon="👥" color="blue" sub="+12% vs yesterday" />
      <StatCard label="New Listings" value="18" icon="🏘" color="green" sub="+8% vs yesterday" />
      <StatCard label="Revenue" value="₹42K" icon="💰" color="purple" sub="This month" />
      <StatCard label="Active Chats" value="156" icon="💬" color="orange" sub="+24% vs yesterday" />
    </div>
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h3 className="font-bold text-slate-800 mb-4">Growth Overview</h3>
      <div className="h-48 flex items-end justify-between gap-2">
        {[65, 78, 82, 91, 88, 95, 100].map((h, i) => (
          <div key={i} className="flex-1 bg-blue-100 rounded-t-lg relative" style={{ height: `${h}%` }}>
            <div className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg" style={{ height: `${h}%` }} />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-slate-500">
        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
      </div>
    </div>
  </div>
);

function AppContent() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setActiveSection("overview");
  };

  const handleLogout = () => {
    setUser(null);
    setActiveSection("overview");
  };

  const renderSection = () => {
    if (!user) return <LoginPage onLogin={handleLogin} />;
    
    switch (user.role) {
      case "tenant":
        switch (activeSection) {
          case "overview": return <TenantOverview setActiveSection={setActiveSection} />;
          case "find-room": return <FindRoom />;
          case "find-roommate": return <FindRoommate setActiveSection={setActiveSection} setActiveChatUser={setActiveChatUser} />;
          case "cost-split": return <CostSplit />;
          case "chat": return <Chat activeChatUser={activeChatUser} />;
          case "checklist": return <Checklist />;
          default: return <TenantOverview setActiveSection={setActiveSection} />;
        }
      case "owner":
        switch (activeSection) {
          case "overview": return <TenantOverview setActiveSection={setActiveSection} />;
          case "listings": return <OwnerListings />;
          case "add-property": return <AddProperty />;
          case "tenants": return <OwnerTenants />;
          default: return <TenantOverview setActiveSection={setActiveSection} />;
        }
      case "agent":
        switch (activeSection) {
          case "overview": return <TenantOverview setActiveSection={setActiveSection} />;
          case "add-listing": return <AgentAddListing />;
          case "visits": return <AgentVisits />;
          default: return <TenantOverview setActiveSection={setActiveSection} />;
        }
      case "admin":
        switch (activeSection) {
          case "overview": return <TenantOverview setActiveSection={setActiveSection} />;
          case "users": return <AdminUsers />;
          case "listings-mgmt": return <AdminListings />;
          case "reports": return <AdminReports />;
          case "analytics": return <AdminAnalytics />;
          default: return <TenantOverview setActiveSection={setActiveSection} />;
        }
      default:
        return <TenantOverview setActiveSection={setActiveSection} />;
    }
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar role={user.role} activeSection={activeSection} setActiveSection={setActiveSection} user={user} onLogout={handleLogout} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="flex-1 lg:ml-0 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden mb-4 p-2 bg-white rounded-lg border border-slate-200">
            ☰ Menu
          </button>
          {renderSection()}
        </div>
      </main>
      <MobileNav role={user.role} activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login" element={<AppContent />} />
      <Route path="/app/*" element={<AppContent />} />
    </Routes>
  );
}

export default App;

