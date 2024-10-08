import React from 'react';
import type { Path, SubmitHandler, UseFormRegister } from 'react-hook-form';
import { useForm } from 'react-hook-form';

type TFormValues = {
  'First Name': string;
  Age: number;
};

type TInputProps = {
  label: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  required: boolean;
};

const Input = ({ label, register, required }: TInputProps) => {
  console.log('re-render input');

  return (
    <>
      <label>{label}</label>
      <input {...register(label, { required })} defaultValue={'hhe'} />
    </>
  );
};

const Select = React.forwardRef<HTMLSelectElement, { label: string } & ReturnType<UseFormRegister<TFormValues>>>(
  ({ onChange, onBlur, name, label }, ref) => {
    console.log('re-render select');

    return (
      <>
        <label>{label}</label>
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur} defaultValue={20}>
          <option value='20'>20</option>
          <option value='30'>30</option>
        </select>
      </>
    );
  }
);

const DashboardPage = () => {
  const { register, handleSubmit } = useForm<TFormValues>();

  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    console.log('🐔 =>  data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label='First Name' register={register} required />
      <Select label='Age' {...register('Age')} />
      <input type='submit' />
    </form>
  );
};

export default DashboardPage;
