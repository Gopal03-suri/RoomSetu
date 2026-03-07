import { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { api } from './api';

// Initialize recaptcha verifier (call once)
let recaptchaVerifier = null;

const initRecaptcha = () => {
  if (!recaptchaVerifier) {
    try {
      recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          console.log('Recaptcha verified:', response);
        },
        'expired-callback': () => {
          console.log('Recaptcha expired');
          recaptchaVerifier = null;
        }
      });
      console.log('Recaptcha verifier initialized');
    } catch (error) {
      console.error('Error initializing recaptcha:', error);
    }
  }
  return recaptchaVerifier;
};

const PhoneAuth = ({ onLogin, onCancel }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState('phone'); // 'phone' | 'otp' | 'role'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [firebaseData, setFirebaseData] = useState(null);

  // Format phone number for Firebase (add + prefix if not present)
  const formatPhoneNumber = (phone) => {
    let formatted = phone.replace(/\s/g, '').replace(/-/g, '');
    if (!formatted.startsWith('+')) {
      // Assume Indian number if no country code
      if (formatted.startsWith('91') && formatted.length > 10) {
        formatted = '+' + formatted;
      } else if (formatted.length === 10) {
        formatted = '+91' + formatted;
      } else {
        formatted = '+' + formatted;
      }
    }
    return formatted;
  };

  // Send OTP to phone number
  const sendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      console.log('Sending OTP to:', formattedPhone);

      const verifier = initRecaptcha();
      
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, verifier);
      console.log('Confirmation result:', confirmation);
      
      setConfirmationResult(confirmation);
      setStep('otp');
      setError('');
    } catch (err) {
      console.error('Send OTP error:', err);
      
      let errorMessage = 'Failed to send OTP. ';
      
      if (err.code === 'auth/invalid-phone-number') {
        errorMessage += 'Please enter a valid phone number.';
      } else if (err.code === 'auth/quota-exceeded') {
        errorMessage += 'SMS quota exceeded. Please try again later.';
      } else if (err.code === 'auth/captcha-check-failed') {
        errorMessage += 'Captcha verification failed. Please try again.';
        recaptchaVerifier = null;
      } else if (err.message) {
        errorMessage += err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP and login/register
  const verifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Verifying OTP...');
      
      const result = await confirmationResult.confirm(verificationCode);
      console.log('User signed in:', result.user);
      
      // Get the ID token
      const idToken = await result.user.getIdToken();
      console.log('Got ID token');
      
      // Get phone number from Firebase user
      const firebasePhoneNumber = result.user.phoneNumber;
      console.log('Phone number:', firebasePhoneNumber);
      
      // Store Firebase data for next step
      setFirebaseData({
        uid: result.user.uid,
        phoneNumber: firebasePhoneNumber,
        idToken: idToken
      });

      // Call backend to verify and check if user exists
      try {
        const response = await api.verifyPhoneLogin(idToken, firebasePhoneNumber);
        console.log('Backend response:', response);
        
        if (response.exists) {
          // User exists - login directly
          onLogin({
            uid: response.user.id,
            phone: response.user.phone_number,
            role: response.user.role,
            name: response.user.first_name ? `${response.user.first_name} ${response.user.last_name}`.trim() : response.user.username,
            city: response.user.city || 'Not specified',
            avatar: response.user.first_name?.[0] || response.user.phone_number?.[-1] || 'U'
          });
        } else {
          // New user - go to role selection
          setStep('role');
        }
      } catch (backendErr) {
        console.error('Backend error:', backendErr);
        // Still allow role selection for new users if backend is not ready
        if (backendErr.error && backendErr.error.includes('exists')) {
          setStep('role');
        } else {
          setError('Authentication failed. Please try again.');
        }
      }
      
    } catch (err) {
      console.error('Verify OTP error:', err);
      
      let errorMessage = 'Invalid verification code. ';
      
      if (err.code === 'auth/invalid-verification-code') {
        errorMessage += 'Please check the code and try again.';
      } else if (err.code === 'auth/code-expired') {
        errorMessage += 'Code expired. Please request a new OTP.';
        setStep('phone');
        setConfirmationResult(null);
        setVerificationCode('');
      } else if (err.message) {
        errorMessage += err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Save role and complete registration
  const saveRoleAndComplete = async () => {
    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await api.saveRole(
        firebaseData.phoneNumber,
        firebaseData.uid,
        selectedRole,
        name,
        city
      );
      
      console.log('Save role response:', response);
      
      // Login with the new user data
      onLogin({
        uid: response.user.id,
        phone: response.user.phone_number,
        role: response.user.role,
        name: name || response.user.first_name || 'User',
        city: city || response.user.city || 'Not specified',
        avatar: name?.[0] || response.user.phone_number?.[-1] || 'U'
      });
      
    } catch (err) {
      console.error('Save role error:', err);
      setError(err.error || 'Failed to save role. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Go back to previous step
  const goBack = () => {
    if (step === 'otp') {
      setStep('phone');
      setVerificationCode('');
      setConfirmationResult(null);
      setError('');
    } else if (step === 'role') {
      setStep('otp');
      setSelectedRole('');
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      {/* Hidden recaptcha container */}
      <div id="recaptcha-container"></div>
      
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h2 className="text-white text-2xl font-bold">
              {step === 'phone' && 'Phone Login'}
              {step === 'otp' && 'Verify OTP'}
              {step === 'role' && 'Select Your Role'}
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              {step === 'phone' && 'Enter your phone number to continue'}
              {step === 'otp' && 'We sent a code to your phone'}
              {step === 'role' && 'Choose how you want to use RoomSetu'}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Phone Number Input */}
          {step === 'phone' && (
            <form onSubmit={sendOTP} className="space-y-4">
              <div>
                <label className="text-slate-300 text-sm font-medium block mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number (e.g. +91 98765 43210)"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl px-4 py-3 text-lg"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading || !phoneNumber}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 'otp' && (
            <form onSubmit={verifyOTP} className="space-y-4">
              <div>
                <label className="text-slate-300 text-sm font-medium block mb-2">Verification Code</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter verification OTP code"
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl px-4 py-3 text-lg text-center tracking-widest"
                  maxLength={6}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading || verificationCode.length < 6}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-60"
              >
                {loading ? 'Verifying...' : 'Verify & Login'}
              </button>
              <button
                type="button"
                onClick={goBack}
                className="w-full text-slate-400 hover:text-white text-sm py-2"
              >
                Change phone number
              </button>
            </form>
          )}

          {/* Step 3: Role Selection */}
          {step === 'role' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('tenant')}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl transition flex items-center gap-3 px-4 ${
                    selectedRole === 'tenant'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <span className="text-2xl">🏠</span>
                  <div className="text-left">
                    <div className="font-bold">Tenant</div>
                    <div className="text-xs opacity-70">Looking for a room</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('owner')}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl transition flex items-center gap-3 px-4 ${
                    selectedRole === 'owner'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <span className="text-2xl">🏘️</span>
                  <div className="text-left">
                    <div className="font-bold">Owner</div>
                    <div className="text-xs opacity-70">Have rooms to rent</div>
                  </div>
                </button>
              </div>

              {/* Optional fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name (optional)"
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City (optional)"
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <button
                onClick={saveRoleAndComplete}
                disabled={loading || !selectedRole}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-60"
              >
                {loading ? 'Creating Account...' : 'Continue'}
              </button>
              <button
                type="button"
                onClick={goBack}
                className="w-full text-slate-400 hover:text-white text-sm py-2"
              >
                Back
              </button>
            </div>
          )}

          {/* Cancel button */}
          {onCancel && (
            <button
              onClick={onCancel}
              className="w-full mt-4 text-slate-400 hover:text-white text-sm py-2"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneAuth;

