import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

type TFormInputs = {
  TextField: string;
  MyCheckbox: boolean;
};

const HomeMain = () => {
  const { handleSubmit, control } = useForm<TFormInputs>({
    defaultValues: {
      MyCheckbox: false,
      TextField: ''
    }
  });

  const onSubmit: SubmitHandler<TFormInputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          <Controller
            name='MyCheckbox'
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              console.log('re-render checkbox');

              return <input type='checkbox' checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />;
            }}
          />
          My Checkbox
        </label>
      </div>
      <div>
        <label>
          Text Field:
          <Controller
            name='TextField'
            control={control}
            render={({ field }) => {
              console.log('re-render text');
              console.log('field => ', field.value);

              return <input type='text' {...field} value={field.value} />;
            }}
          />
        </label>
      </div>
      <input type='submit' />
    </form>
  );
};

export default HomeMain;
