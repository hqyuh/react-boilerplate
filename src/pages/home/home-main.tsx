import { InputField } from '@/components/forms/controlled/input';
import { Metadata } from '@/components/metadata/metadata';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import type { TInfoFormValues } from '@/schemas/input.schema';
import { InfoFormSchema } from '@/schemas/input.schema';
import authService from '@/services/auth.service';
import { fetchUsers } from '@/worker/data';
import { useWorker } from '@/worker/useWorker';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

type TFormInputs = {
  username: string;
};

const HomeMain = () => {
  const form = useForm<TInfoFormValues>({
    resolver: zodResolver(InfoFormSchema),
    defaultValues: {
      username: ''
    },
    reValidateMode: 'onChange'
  });

  const { users, callWorker } = useWorker();
  console.log('🐔 =>  users:', users);

  useEffect(() => {
    (async () => {
      await Promise.all([authService.login1(), authService.login1(), authService.login1()]);
    })();
  }, []);

  const onSubmit: SubmitHandler<TFormInputs> = (data: TFormInputs) => console.log(data);

  const handleW = async () => {
    const res = await fetchUsers();
    console.log('🐔 =>  res:', res);
  };

  return (
    <>
      <Metadata title='Home main' />
      <Form {...form}>
        <div className='p-6'>
          <form className='w-80 space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
            <InputField control={form.control} name='username' label='He' description='Des' />
            <Button type='submit'>Submit</Button>
          </form>
        </div>
      </Form>

      <div className='flex w-80 justify-between'>
        <Button type='button' onClick={() => callWorker({ name: 'h' })}>
          Call with Worker
        </Button>
        <Button type='button' onClick={handleW}>
          Call without Worker
        </Button>
      </div>
    </>
  );
};

export default HomeMain;
