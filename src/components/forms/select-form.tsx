import type { ReactNode } from 'react';
import type { FieldValues } from 'react-hook-form';
import BaseForm, {
  type IControlledFormProps,
} from '@/components/forms/base-form';
import {
  NativeSelect,
  NativeSelectOption,
  type NativeSelectProps,
} from '@/components/ui/native-select';
import { Spinner } from '@/components/ui/spinner';
import { getKey } from '@/lib';

type ISelectFormProps<TFieldValues extends FieldValues> =
  IControlledFormProps<TFieldValues> &
    NativeSelectProps & {
      options: { label: ReactNode; value: string }[];
      placeholder?: string;
      loading?: boolean;
      initValue?: string;
      optional?: boolean;
      className?: string;
      containerClassName?: string;
    };

export function SelectForm<TFieldValues extends FieldValues>(
  props: ISelectFormProps<TFieldValues>,
) {
  const {
    control,
    label,
    description,
    name,
    options,
    placeholder,
    loading,
    containerClassName,
    ...rest
  } = props;

  return (
    <BaseForm
      control={control}
      name={name}
      label={label}
      description={description}
      className={containerClassName}
      render={(field) => (
        <NativeSelect
          name={name}
          onChange={field.onChange}
          value={field.value}
          {...rest}
        >
          {loading && <Spinner />}
          {placeholder && (
            <NativeSelectOption value="">{placeholder}</NativeSelectOption>
          )}
          {options?.map((option) => (
            <NativeSelectOption
              key={getKey('select-option', option.value)}
              value={option.value}
            >
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      )}
    />
  );
}
