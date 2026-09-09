import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateUserProfile } from '../redux/profileSlice';
import { Input } from '../../../shared/components/ui/Input';
import { Button } from '../../../shared/components/ui/Button';
import { toast } from 'react-hot-toast';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional().or(z.literal('')),
  college: z.string().optional().or(z.literal('')),
  targetRole: z.string().optional().or(z.literal('')),
  githubUrl: z.string().url('Invalid GitHub URL').or(z.literal('')).optional(),
  linkedinUrl: z.string().url('Invalid LinkedIn URL').or(z.literal('')).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const ProfileSettings: React.FC = () => {
  const dispatch = useAppDispatch();

  // Get logged-in user from auth state — this is populated on login
  const authUser = useAppSelector((state) => state.auth.user);
  // Get any additional profile fields that may have been updated
  const profile = useAppSelector((state) => state.profile.profile);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      college: '',
      targetRole: '',
      githubUrl: '',
      linkedinUrl: '',
    },
  });

  // Seed the form with logged-in user's real data once auth state is available
  useEffect(() => {
    if (authUser) {
      reset({
        fullName: `${authUser.firstName} ${authUser.lastName}`.trim(),
        email: authUser.email,
        phone: profile.phone || '',
        college: profile.college || '',
        targetRole: profile.targetRole || '',
        githubUrl: profile.githubUrl || '',
        linkedinUrl: profile.linkedinUrl || '',
      });
    }
  }, [
    authUser,
    profile.college,
    profile.githubUrl,
    profile.linkedinUrl,
    profile.phone,
    profile.targetRole,
    reset,
  ]);

  const onSubmit = async (data: ProfileFormData) => {
    await dispatch(updateUserProfile(data));
    toast.success('Profile details updated successfully!');
  };

  // Display name and avatar initials derived from logged-in user
  const displayName = authUser
    ? `${authUser.firstName} ${authUser.lastName}`.trim()
    : profile.fullName;

  const displayEmail = authUser?.email ?? profile.email;

  // Generate avatar initials as fallback when no avatarUrl
  const initials = authUser
    ? `${authUser.firstName?.[0] ?? ''}${authUser.lastName?.[0] ?? ''}`.toUpperCase()
    : 'U';

  return (
    <div className="w-full flex flex-col items-center pb-16">
      <section className="relative mx-auto mt-16 max-w-7xl px-6 text-center md:px-8 flex flex-col items-center">
        <h1 className="animate-fade-in -translate-y-4 text-balance whitespace-nowrap bg-linear-to-br from-white from-30% to-white/40 bg-clip-text py-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-none tracking-tighter text-transparent opacity-100 font-heading">
          User Profile
        </h1>
        <p className="animate-fade-in mb-6 -translate-y-4 text-balance text-lg tracking-tight text-gray-400 opacity-100 md:text-xl font-sans">
          Manage your personal information, target company preferences, and portfolio links
        </p>
        <div className="flex justify-center mb-8">
          <div className="shrink-0 bg-white/10 h-0.5 rounded-lg w-60 bg-linear-to-r from-purple-600 via-violet-500 to-pink-600"></div>
        </div>
      </section>

      <div className="w-full max-w-3xl px-4 mt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 bg-[#202225] hover:bg-[#202225] border border-white/10 rounded-lg flex flex-col gap-5 shadow-md transition-all"
        >
          {/* Profile header — shows real logged-in user data */}
          <div className="flex items-center gap-4 pb-4 border-b border-white/10">
            {profile.avatarUrl && !authUser ? (
              <img
                src={profile.avatarUrl}
                alt={displayName}
                className="w-16 h-16 rounded-full border-2 border-[#627eff]/60 object-cover shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-full border-2 border-[#A3E635]/60 bg-[#A3E635]/20 flex items-center justify-center shadow-sm shrink-0">
                <span className="text-xl font-bold text-[#A3E635]">{initials}</span>
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-white font-heading tracking-tight">{displayName}</h3>
              <p className="text-xs font-mono text-gray-400 mt-0.5">{displayEmail}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              leftIcon={<i className="fa-solid fa-user text-xs"></i>}
              error={errors.fullName?.message}
              {...register('fullName')}
            />

            <Input
              label="Email Address"
              type="email"
              leftIcon={<i className="fa-solid fa-envelope text-xs"></i>}
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Phone Number"
              leftIcon={<i className="fa-solid fa-phone text-xs"></i>}
              error={errors.phone?.message}
              {...register('phone')}
            />

            <Input
              label="College / Institute"
              leftIcon={<i className="fa-solid fa-graduation-cap text-xs"></i>}
              error={errors.college?.message}
              {...register('college')}
            />

            <Input
              label="GitHub Profile URL"
              leftIcon={<i className="fa-brands fa-github text-xs"></i>}
              error={errors.githubUrl?.message}
              {...register('githubUrl')}
            />

            <Input
              label="LinkedIn Profile URL"
              leftIcon={<i className="fa-brands fa-linkedin text-xs"></i>}
              error={errors.linkedinUrl?.message}
              {...register('linkedinUrl')}
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <Button type="submit" variant="primary" size="md" isLoading={isSubmitting} leftIcon={<i className="fa-solid fa-floppy-disk text-xs"></i>}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
