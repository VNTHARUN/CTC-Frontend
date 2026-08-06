import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';
import { authService } from '../../../services/authService';
import { toast } from 'react-hot-toast';

const forgotSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotFormData) => {
    setLoading(true);
    try {
      await authService.forgotPassword(data.email);
      toast.success('Password reset instructions sent to your email');
      setSent(true);
    } catch {
      toast.error('Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-gray-100 font-heading">Reset Password</h2>
        <p className="text-xs text-gray-400 mt-1 font-sans">
          Enter your registered email address to receive reset instructions
        </p>
      </div>

      {sent ? (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-[#48c78e] text-xs rounded-xl flex flex-col gap-3">
          <p>We've sent password recovery instructions to your email inbox.</p>
          <Link to="/login" className="text-white underline font-semibold">
            Return to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@domain.com"
            leftIcon={<i className="fa-solid fa-envelope text-xs"></i>}
            error={errors.email?.message}
            {...register('email')}
          />

          <Button type="submit" variant="primary" size="lg" isLoading={loading} className="w-full mt-2">
            Send Reset Link
          </Button>
        </form>
      )}

      <div className="text-center pt-2">
        <Link to="/login" className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
          <i className="fa-solid fa-arrow-left text-xs"></i>
          <span>Back to Login</span>
        </Link>
      </div>
    </div>
  );
};
