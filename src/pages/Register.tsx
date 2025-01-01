import React, { useState } from 'react';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import { AuthCard } from '../components/auth/AuthCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Link } from '../components/ui/Link';
import { useRegister } from '../hooks/useRegister';
import type { RegisterData } from '../types/auth';

export function Register() {
  const { register, isLoading, errors } = useRegister();
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AuthCard 
      title="Create an account"
      subtitle="Join us today and get started"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Full name"
          type="text"
          name="name"
          placeholder="John Doe"
          required
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          icon={<User className="w-5 h-5 text-gray-400" />}
        />
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
        <Input
          label="Confirm Password"
          type="password"
          name="passwordConfirm"
          placeholder="••••••••"
          required
          value={formData.passwordConfirm}
          onChange={handleChange}
          error={errors.passwordConfirm}
          icon={<Lock className="w-5 h-5 text-gray-400" />}
        />

        <Button type="submit" isLoading={isLoading}>
          <UserPlus className="w-5 h-5 mr-2" />
          Create Account
        </Button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login">
            Sign in
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}