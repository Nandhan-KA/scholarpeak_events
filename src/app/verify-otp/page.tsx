'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { authApi } from '@/lib/api/auth';
import axiosInstance from '@/lib/api/axios';

function VerifyOTPComponent() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  
  const userId = searchParams?.get('userId');
  const redirect = searchParams?.get('redirect') || '/';

  // Handle missing userId
  useEffect(() => {
    if (!userId) {
      console.error('No userId provided for OTP verification');
      router.push('/login');
    }
  }, [userId, router]);

  // Handle resend timeout
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (resendTimeout > 0) {
      interval = setInterval(() => {
        setResendTimeout((prev) => prev - 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimeout]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      setError('Missing user information. Please try registering again.');
      return;
    }
    
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP code.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      console.log('Verifying OTP:', { userId, otp });
      const response = await authApi.verifyOTP(userId, otp);
      
      console.log('OTP verification response:', response.data);
      
      if (response.data.success) {
        setSuccess(true);
        
        // If token is received, store it
        if (response.data.token) {
          const token = response.data.token;
          console.log('Saving token after OTP verification:', token.substring(0, 10) + '...');
          
          // Save token to localStorage
          localStorage.setItem('user_token', token);
          
          // Apply token to axios headers for immediate use
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          if (response.data.user) {
            localStorage.setItem('user_info', JSON.stringify(response.data.user));
          }
        }
        
        // Redirect after a short delay
        setTimeout(() => {
          console.log('OTP verification successful, redirecting to:', redirect);
          router.push(redirect);
        }, 1500);
      } else {
        setError(response.data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error: any) {
      console.error('OTP verification error:', error);
      setError(error.response?.data?.message || 'Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!userId || resendTimeout > 0) {
      return;
    }
    
    setResendLoading(true);
    setResendSuccess(false);
    setError('');
    
    try {
      const response = await authApi.resendOTP(userId);
      
      if (response.data.success) {
        setResendSuccess(true);
        setResendTimeout(60); // 60 seconds cooldown
      } else {
        setError(response.data.message || 'Failed to resend OTP. Please try again.');
      }
    } catch (error: any) {
      console.error('Resend OTP error:', error);
      setError(error.response?.data?.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  if (!userId) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-32 h-14 relative mb-6">
            <Image
              src="/splogo.png"
              alt="ScholarPeak Logo"
              className="w-full h-full object-contain"
              width={128}
              height={56}
              priority
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Verify Your Email
          </h1>
          <p className="text-muted-foreground mt-2">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <div className="bg-card border rounded-lg shadow-sm p-6">
          {success ? (
            <div className="text-center py-6">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-green-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Verification Successful</h3>
              <p className="text-gray-500 mb-4">Your email has been verified. Redirecting...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                  {error}
                </div>
              )}
              
              {resendSuccess && (
                <div className="bg-green-50 text-green-700 text-sm p-3 rounded-md">
                  A new verification code has been sent to your email.
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="otp" className="block text-sm font-medium text-foreground">
                  Verification Code
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  autoComplete="one-time-code"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  className="block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-center text-lg tracking-widest"
                  placeholder="123456"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    'Verify'
                  )}
                </button>
              </div>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={resendLoading || resendTimeout > 0}
                  className="text-sm font-medium text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
                >
                  {resendTimeout > 0
                    ? `Resend code in ${resendTimeout}s`
                    : resendLoading
                    ? 'Sending...'
                    : "Didn't receive a code? Resend"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <VerifyOTPComponent />
    </Suspense>
  );
} 