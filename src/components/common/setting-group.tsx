import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Divider } from '@/components/common/divider';

type SettingGroupProps = {
  children: ReactNode[];
  className?: string;
};

function SettingGroup({ children, className }: SettingGroupProps) {
  return (
    <View className={`overflow-hidden rounded-xl border border-border bg-card ${className ?? ''}`}>
      {children.map((child, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={i}>
          {child}
          {i < children.length - 1 && <Divider />}
        </View>
      ))}
    </View>
  );
}

export { SettingGroup };
