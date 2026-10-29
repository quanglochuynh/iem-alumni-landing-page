import type { InputHTMLAttributes } from 'react';
import type { FieldValues } from 'react-hook-form';
import BaseForm, {
  type IControlledFormProps,
} from '@/components/forms/base-form';
import { Input } from '@/components/ui/input';

type InputFormProps<TFieldValues extends FieldValues> = Omit<
  IControlledFormProps<TFieldValues>,
  'label'
> &
  InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    type?: React.HTMLInputTypeAttribute;
  };

export default function InputForm<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  optional,
  ...inputProps
}: InputFormProps<TFieldValues>) {
  return (
    <BaseForm
      control={control}
      name={name}
      label={label}
      description={description}
      render={({ value, onChange, ...fields }) => {
        // native date inputs need a "yyyy-MM-dd" string, not a Date instance
        if (inputProps.type === 'date') {
          const dateCandidate = value as unknown;
          const dateValue =
            dateCandidate instanceof Date &&
            !Number.isNaN(dateCandidate.getTime())
              ? dateCandidate.toISOString().slice(0, 10)
              : (value ?? '');

          return (
            <Input
              {...fields}
              {...inputProps}
              value={dateValue}
              onChange={(e) =>
                onChange(e.target.value ? new Date(e.target.value) : undefined)
              }
            />
          );
        }

        return (
          <Input
            value={value}
            onChange={onChange}
            {...fields}
            {...inputProps}
          />
        );
      }}
      optional={optional}
    />
  );
}
