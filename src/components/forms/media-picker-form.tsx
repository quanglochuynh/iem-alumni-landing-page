import type { FieldValues } from 'react-hook-form';
import BaseForm, {
  type IControlledFormProps,
} from '@/components/forms/base-form';
import MediaPicker, {
  type MediaPickerProps,
} from '@/components/media-picker/media-picker';

interface Props<TFieldValues extends FieldValues>
  extends IControlledFormProps<TFieldValues> {
  pickerProps?: Partial<MediaPickerProps>;
}

export default function MediaPickerForm<TFieldValues extends FieldValues>({
  name,
  description,
  label,
  control,
  pickerProps,
}: Props<TFieldValues>) {
  return (
    <BaseForm
      control={control}
      name={name}
      description={description}
      label={label}
      render={(fields) => {
        return (
          <MediaPicker
            {...pickerProps}
            images={fields.value || []}
            onImagesChange={fields.onChange}
            disabled={fields.disabled}
            name={fields.name}
            ref={fields.ref}
          />
        );
      }}
    />
  );
}
