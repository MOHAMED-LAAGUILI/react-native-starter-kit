import { Picker as DefaultPicker } from '@react-native-picker/picker';
import * as React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/utils/utils';

type PickerItem<T extends string | number> = {
  label: string;
  value: T;
};

type PickerProps<T extends string | number> = {
  label?: string;
  items: PickerItem<T>[];
  selectedValue?: T;
  onValueChange?: (value: T, index: number) => void;
  mode?: 'dialog' | 'dropdown';
  className?: string;
};

function Picker<T extends string | number>({ label, items, selectedValue, onValueChange, mode, className }: PickerProps<T>) {
  return (
    <View className={cn('gap-1', className)}>
      {label && (
        <Text variant="label" className="text-muted-foreground">
          {label}
        </Text>
      )}
      <DefaultPicker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        mode={mode}
        style={{ height: 50 }}
      >
        {items.map(item => (
          <DefaultPicker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </DefaultPicker>
    </View>
  );
}

export type { PickerItem, PickerProps };
export { Picker };
