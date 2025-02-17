import { Input } from '@/components/forms/uncontrolled/input';
import { Metadata } from '@/components/metadata/metadata';
import { Button } from '@/components/ui/button';
import useAppTranslation from '@/hooks/useAppTranslation';
import { useAuthStore } from '@/stores/zustand/auth.store';
import { useRef } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

type TFormValues = {
  firstName: string;
  Age: number;
};

const DashboardPage = () => {
  const { translate } = useAppTranslation();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TFormValues>();

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    await login({ email: 'email', password: 'password' });
    // eslint-disable-next-line no-console
    console.log('🐔 =>  data:', data);
  };

  const thor = useRef<((coords: { x: number; y: number }) => void) | null>(null);
  console.log('🚀 ~ DashboardPage ~ thor:', thor);

  return (
    <>
      <Metadata title='Dashboard' />
      <h2>{translate('name.text')}</h2>
      <div className='p-6'>
        <form className='w-80 space-y-2' onSubmit={handleSubmit(onSubmit)}>
          <Input
            label='hh'
            defaultValue='hh'
            description='des'
            {...register('firstName', { required: 'First name is required' })}
            errorMessage={errors.firstName?.message}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </div>
    </>
  );
};

export default DashboardPage;
