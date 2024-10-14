import { InputField } from '@/components/forms/controlled/input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import type { TInfoFormValues } from '@/schemas/input.schema';
import { InfoFormSchema } from '@/schemas/input.schema';
import { zodResolver } from '@hookform/resolvers/zod';
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

  const onSubmit: SubmitHandler<TFormInputs> = (data: TFormInputs) => console.log(data);

  return (
    <>
      <Form {...form}>
        <div className='p-6'>
          <form className='w-80 space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
            <InputField control={form.control} name='username' label='He' description='Des' />
            <Button type='submit'>Submit</Button>
          </form>
        </div>
      </Form>
    </>
  );
};

export default HomeMain;
