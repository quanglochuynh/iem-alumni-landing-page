import type * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import type { FieldValues } from 'react-hook-form';
import BaseForm, {
  type IControlledFormProps,
} from '@/components/forms/base-form';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from '@/components/ui/field';

type CheckboxFormProps<TFieldValues extends FieldValues> =
  IControlledFormProps<TFieldValues> & CheckboxPrimitive.CheckboxProps;

export default function CheckboxForm<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
  ...inputProps
}: CheckboxFormProps<TFieldValues>) {
  return (
    <BaseForm
      control={control}
      name={name}
      render={({ onChange, value, ...fields }) => (
        <Field orientation="horizontal">
          <Checkbox
            {...fields}
            id={name}
            {...inputProps}
            checked={value}
            onCheckedChange={onChange}
          />
          <FieldContent>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            {description && <FieldDescription>{description}</FieldDescription>}
          </FieldContent>
        </Field>
      )}
    />
  );
}
