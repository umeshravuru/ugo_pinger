import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pb } from '../lib/pocketbase';
import type { RegisterData, RegisterError } from '../types/auth';
import { validateRegistration } from '../utils/validation';
import { ClientResponseError } from 'pocketbase';
import toast from 'react-hot-toast';

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterError>({});
  const navigate = useNavigate();

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setErrors({});

    // Validate password before making the API call
    const validationErrors = validateRegistration(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {

      // Proceed with registration if email doesn't exist
      await pb.collection('users').create({
        ...data,
        emailVisibility: true,
      });

      await pb.collection('users').requestVerification(data.email);

      // Show success message and redirect
      toast.success(
          'Account created! Please check your email (including spam folder) from ugoconsulting@zohomail.com to verify your account.',
          { duration: 6000 }
      );

      // Redirect to login after successful registration
      navigate('/login');
    } catch (error) {
      if (error instanceof ClientResponseError) {
        if (error.data?.data) {
          setErrors({ email: 'This email is already registered' });
        } else {
          setErrors({ email: 'Registration failed. Please try again.' });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, errors };
}