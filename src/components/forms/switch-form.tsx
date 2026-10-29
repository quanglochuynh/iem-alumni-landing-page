import type * as SwitchPrimitive from '@radix-ui/react-switch';
import type { FieldValues } from 'react-hook-form';
import BaseForm, {
  type IControlledFormProps,
} from '@/components/forms/base-form';
import { Switch } from '@/components/ui/switch';

type SwitchFormProps<TFieldValues extends FieldValues> =
  IControlledFormProps<TFieldValues> &
    React.ComponentProps<typeof SwitchPrimitive.Root>;

export function SwitchForm<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  description,
}: SwitchFormProps<TFieldValues>) {
  return (
    <BaseForm
      control={control}
      name={name}
      label={label}
      description={description}
      render={(field) => (
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
          {...field}
        />
      )}
    />
  );
}
