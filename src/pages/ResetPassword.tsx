import React, { useState } from 'react';
import { Mail, Lock, KeyRound } from 'lucide-react';
import { AuthCard } from '../components/auth/AuthCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'request' | 'reset'>('request');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add password reset logic here
    setTimeout(() => {
      setIsLoading(false);
      if (step === 'request') setStep('reset');
    }, 1000);
  };

  if (step === 'request') {
    return (
      <AuthCard 
        title="Reset Password"
        subtitle="Enter your email address and we'll send you a reset link"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            required
            icon={<Mail className="w-5 h-5 text-gray-400" />}
          />
          
          <Button type="submit" isLoading={isLoading}>
            <KeyRound className="w-5 h-5 mr-2" />
            Send Reset Link
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Remember your password?{' '}
            <a href="/login" className="text-indigo-600 hover:text-indigo-500">
              Sign in
            </a>
          </p>
        </form>
      </AuthCard>
    );
  }

  return (
    <AuthCard 
      title="Set New Password"
      subtitle="Enter your new password below"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="New Password"
          type="password"
          placeholder="••••••••"
          required
          icon={<Lock className="w-5 h-5 text-gray-400" />}
        />
        <Input
          label="Confirm New Password"
          type="password"
          placeholder="••••••••"
          required
          icon={<Lock className="w-5 h-5 text-gray-400" />}
        />
        
        <Button type="submit" isLoading={isLoading}>
          <KeyRound className="w-5 h-5 mr-2" />
          Reset Password
        </Button>
      </form>
    </AuthCard>
  );
}