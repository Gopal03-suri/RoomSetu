import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createUserProfile } from './authService';

const CompleteProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { uid, email, displayName } = location.state || {};

  const [name, setName] = useState(displayName || '');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !phone || !role) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createUserProfile(uid, { email, name, phone, role });
      
      // Redirect based on role
      navigate('/dashboard', { state: { role } });
    } catch (err) {
      setError('Failed to create profile. Try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!uid || !email) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👤</span>
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">Complete Your Profile</h2>
            <p className="text-slate-300 text-sm">Just a few more details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium block mb-2">Email</label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full bg-white/5 border border-white/20 text-white/50 rounded-xl px-4 py-3 text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium block mb-2">Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium block mb-2">Phone Number *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium block mb-2">I am a *</label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setRole('tenant')}
                  className={`w-full py-3 px-4 rounded-xl transition flex items-center justify-between ${
                    role === 'tenant'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🏠</span>
                    <div className="text-left">
                      <div className="font-bold text-sm">Tenant</div>
                      <div className="text-xs opacity-80">Looking for a room</div>
                    </div>
                  </div>
                  {role === 'tenant' && <span>✓</span>}
                </button>

                <button
                  type="button"
                  onClick={() => setRole('owner')}
                  className={`w-full py-3 px-4 rounded-xl transition flex items-center justify-between ${
                    role === 'owner'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🏘️</span>
                    <div className="text-left">
                      <div className="font-bold text-sm">Owner</div>
                      <div className="text-xs opacity-80">Have property to rent</div>
                    </div>
                  </div>
                  {role === 'owner' && <span>✓</span>}
                </button>

                <button
                  type="button"
                  onClick={() => setRole('agent')}
                  className={`w-full py-3 px-4 rounded-xl transition flex items-center justify-between ${
                    role === 'agent'
                      ? 'bg-amber-600 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🚗</span>
                    <div className="text-left">
                      <div className="font-bold text-sm">Field Agent</div>
                      <div className="text-xs opacity-80">Help list properties</div>
                    </div>
                  </div>
                  {role === 'agent' && <span>✓</span>}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 rounded-xl px-4 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !role}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Profile...' : 'Complete Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
