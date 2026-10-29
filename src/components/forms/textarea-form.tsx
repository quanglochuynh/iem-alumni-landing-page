import type { FieldValues } from 'react-hook-form';
import BaseForm, {
  type IControlledFormProps,
} from '@/components/forms/base-form';
import { Textarea } from '@/components/ui/textarea';

type TextareaFormProps<TFieldValues extends FieldValues> =
  IControlledFormProps<TFieldValues> & React.ComponentProps<'textarea'>;

export default function TextareaForm<TFieldValues extends FieldValues>({
  control,
  name,
  description,
  placeholder,
  disabled,
  optional,
  label,
  ...textareaProps
}: TextareaFormProps<TFieldValues>) {
  return (
    <BaseForm
      control={control}
      name={name}
      label={label}
      description={description}
      optional={optional}
      render={(field) => (
        <Textarea
          {...textareaProps}
          {...field}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
    />
  );
}
