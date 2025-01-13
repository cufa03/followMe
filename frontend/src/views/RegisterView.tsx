import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { RegisterForm } from '../types';
import ErrorMessage from '../components/ErrorMessage';
import api from '../config/axios';
export default function RegisterView() {
  const initialValue: RegisterForm = {
    name: '',
    email: '',
    handle: '',
    password: '',
    password_confirmation: '',
  };
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValue });

  const password = watch('password');

  const handleRegister = async (formData: RegisterForm) => {
    try {
      const { data } = await api.post(`/auth/register`, formData);
      toast.success(data);
      reset();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.log('Error: ', error.response.data.error);
      }
    }
  };
  return (
    <>
      <h1 className='text-4xl text-white font-bold'>Create Account</h1>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className='bg-white px-5 py-14 rounded-lg space-y-10 mt-10'
      >
        <div className='grid grid-cols-1 space-y-3'>
          <label htmlFor='name' className='text-2xl text-slate-500'>
            Nombre
          </label>
          <input
            id='name'
            type='text'
            placeholder='Name'
            className='bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400'
            {...register('name', {
              required: 'Complete your name',
            })}
          />

          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className='grid grid-cols-1 space-y-3'>
          <label htmlFor='email' className='text-2xl text-slate-500'>
            E-mail
          </label>
          <input
            id='email'
            type='email'
            placeholder='Register email'
            className='bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400'
            {...register('email', {
              required: 'Complete your email',
              pattern: {
                value: /\S+@\S+\.\S/,
                message: 'Email format not valid',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className='grid grid-cols-1 space-y-3'>
          <label htmlFor='handle' className='text-2xl text-slate-500'>
            Username
          </label>
          <input
            id='handle'
            type='text'
            placeholder='User name: withoutspaces'
            className='bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400'
            {...register('handle', {
              required: 'Complete your handle',
            })}
          />
          {errors.handle && (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          )}
        </div>
        <div className='grid grid-cols-1 space-y-3'>
          <label htmlFor='password' className='text-2xl text-slate-500'>
            Password
          </label>
          <input
            id='password'
            type='password'
            placeholder='Password'
            className='bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400'
            {...register('password', {
              required: 'Complete your password',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className='grid grid-cols-1 space-y-3'>
          <label
            htmlFor='password_confirmation'
            className='text-2xl text-slate-500'
          >
            Confirm Password
          </label>
          <input
            id='password_confirmation'
            type='password'
            placeholder='Repeat password'
            className='bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400'
            {...register('password_confirmation', {
              required: 'Passwords do not match',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type='submit'
          className='bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer'
          value='Crear Cuenta'
        />
      </form>
      <nav className='mt-10'>
        <Link
          to={'/auth/login'}
          className='text-center text-white text-lg block'
        >
          Do you have account? Login
        </Link>
      </nav>
    </>
  );
}
