import { cn } from '@/lib/utils';
import * as React from 'react';
import { TextInput, View, type TextInputProps, type ViewStyle } from 'react-native';
import { Text } from './Text';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  className,
  ...props
}: InputProps) {
  const [focused, setFocused] = React.useState(false);

  return (
    <View className={cn('gap-1', containerStyle)}>
      {label && (
        <Text variant="label" className="text-muted-foreground mb-0.5">
          {label}
        </Text>
      )}
      <View
        className={cn(
          'flex-row items-center rounded-md border h-11',
          'bg-secondary',
          focused ? 'border-ring' : 'border-border',
          error && 'border-destructive',
        )}
      >
        {leftIcon && <View className="pl-3">{leftIcon}</View>}
        <TextInput
          className={cn(
            'flex-1 text-base text-foreground px-3 h-full',
            leftIcon && 'pl-1',
            rightIcon && 'pr-1',
            className,
          )}
          placeholderTextColor="#9CA3AF"
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {rightIcon && <View className="pr-3">{rightIcon}</View>}
      </View>
      {error && (
        <Text variant="caption" className="text-destructive mt-0.5">
          {error}
        </Text>
      )}
    </View>
  );
}

export { Input };
export type { InputProps };
