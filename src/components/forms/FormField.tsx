import * as React from "react";
import { Input, type InputProps } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";

interface FormFieldProps extends InputProps {
  name: string;
  error?: string;
  touched?: boolean;
}

function FormField({ error, touched, ...props }: FormFieldProps) {
  const showError = touched && error;
  return (
    <Input
      error={showError ? error : undefined}
      {...props}
    />
  );
}

function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <Text
      variant="caption"
      className="text-destructive"
    >
      {message}
    </Text>
  );
}

export type { FormFieldProps };
export { FormError, FormField };
