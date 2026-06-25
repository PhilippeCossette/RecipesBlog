import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'

import { Input, InputErrorToolTip } from './input'

type Props = {
  form: any
  name: string
  label: string
  type: string
  placeholder: string
}

export default function TextInput({
  form,
  name,
  label,
  type,
  placeholder,
}: Props) {
  return (
    <FieldGroup>
      <form.Field
        name={name}
        children={(field: any) => {
          const isInvalid =
            field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field>
              <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

              <InputErrorToolTip
                type={type}
                id={field.name}
                className="bg-background"
                placeholder={placeholder}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                isInvalid={isInvalid}
                error={field.state.meta.errors[0]?.message}
              />
            </Field>
          )
        }}
      />
    </FieldGroup>
  )
}
