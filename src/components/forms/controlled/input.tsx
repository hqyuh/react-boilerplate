import { CustomShow } from '@/components/custom-show';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

type Props<T extends FieldValues = FieldValues> = InputProps & {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  labelClassName?: string;
  required?: boolean;
  description?: string;
};

export const InputField = <T extends FieldValues>({
  className,
  labelClassName,
  control,
  label,
  required,
  name,
  description,
  ...props
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        console.log('re-render');
        return (
          <FormItem>
            <div className='space-y-1'>
              <CustomShow when={!!label}>
                <FormLabel
                  className={cn('text-base', labelClassName, {
                    'cursor-not-allowed opacity-50': props.disabled
                  })}
                >
                  {label}
                  <CustomShow when={required}>
                    <span className='text-red-500'>*</span>
                  </CustomShow>
                </FormLabel>
              </CustomShow>
              <div>
                <div>
                  <FormControl>
                    <Input
                      {...props}
                      {...field}
                      className={cn('focus-visible:ring-0', className)}
                      autoComplete='off'
                      value={field.value ?? ''}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      onWheel={(event) => event.currentTarget.blur()}
                    />
                  </FormControl>
                </div>
                <CustomShow when={!!description}>
                  <FormDescription>{description}</FormDescription>
                </CustomShow>
              </div>
              <FormMessage />
            </div>
          </FormItem>
        );
      }}
    />
  );
};
