import { CustomShow } from '@/components/custom-show';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  required?: boolean;
  description?: string;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, labelClassName, defaultValue, required, label, description, type, errorMessage, ...props }, ref) => {
    console.log('re-render');
    return (
      <>
        <div className='space-y-1'>
          <CustomShow when={!!label}>
            <Label
              className={cn('text-base', labelClassName, {
                'cursor-not-allowed opacity-50': props.disabled
              })}
            >
              {label}
              <CustomShow when={required}>
                <span className='text-red-500'>*</span>
              </CustomShow>
            </Label>
          </CustomShow>
        </div>
        <div>
          <div>
            <input
              type={type}
              className={cn(
                'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                className
              )}
              defaultValue={defaultValue}
              ref={ref}
              {...props}
            />
          </div>
          <CustomShow when={!!description}>
            <p className='text-[0.8rem] text-muted-foreground'>{description}</p>
          </CustomShow>
          <p className='text-xs font-medium text-destructive'>{errorMessage}</p>
        </div>
      </>
    );
  }
);
Input.displayName = 'Input';

export { Input };
