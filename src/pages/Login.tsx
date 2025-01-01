import React, { useState } from 'react';
import { LogIn, Mail, Lock } from 'lucide-react';
import { AuthCard } from '../components/auth/AuthCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Link } from '../components/ui/Link';
import { useLogin } from '../hooks/useLogin';
import type { LoginData } from '../types/auth';

export function Login() {
  const { login, isLoading, errors } = useLogin();
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
      <AuthCard
          title="Welcome back"
          subtitle="Sign in to your account to continue"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
              label="Email address"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={<Mail className="w-5 h-5 text-gray-400" />}
          />
          <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={<Lock className="w-5 h-5 text-gray-400" />}
          />

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link to="/reset-password">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" isLoading={isLoading}>
            <LogIn className="w-5 h-5 mr-2" />
            Sign in
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/register">
              Sign up
            </Link>
          </p>
        </form>
      </AuthCard>
  );
}