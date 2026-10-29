import type { ReactNode } from 'react';
import {
  type Control,
  Controller,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
  useController,
} from 'react-hook-form';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { cn } from '@/lib';

export interface IControlledFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  label?: string;
  description?: string | ReactNode;
  name: TName;
  optional?: boolean;
  className?: string;
  disabled?: boolean;
}

export interface IBaseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends IControlledFormProps<TFieldValues, TName> {
  render: (field: ControllerRenderProps<TFieldValues, TName>) => ReactNode;
}

const BaseForm = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  props: IBaseFormProps<TFieldValues, TName>,
) => {
  const { control, label, description, name, optional, className, disabled } =
    props;
  const controller = useController<TFieldValues, TName>({ name, control });

  const error = controller.fieldState.error?.message;

  return (
    <Controller<TFieldValues, TName>
      control={control}
      name={name}
      render={({ field }) => (
        <Field className={className} data-form-name={name}>
          {label && (
            <FieldLabel className="flex items-center">
              <span
                className={cn(
                  'mb-1 font-medium text-sm',
                  error ? 'text-red-500' : 'text-zinc-700 dark:text-zinc-300',
                )}
              >
                {label}
              </span>
              {optional ? (
                <span className="font-light text-gray-400 text-xs">
                  &nbsp;( Không bắt buộc )
                </span>
              ) : (
                <span className="font-light text-red-500 text-xs">&nbsp;*</span>
              )}
            </FieldLabel>
          )}
          {props.render({ ...field, disabled: field.disabled || disabled })}
          {description && (
            <FieldDescription
              data-component="form-description"
              className="mt-1 text-xs text-zinc-400"
            >
              {description}
            </FieldDescription>
          )}
          {error && (
            <FieldError
              data-component="form-error"
              className="mt-2 truncate text-red-500 text-xs"
            >
              {error}
            </FieldError>
          )}
        </Field>
      )}
    />
  );
};

export default BaseForm;
