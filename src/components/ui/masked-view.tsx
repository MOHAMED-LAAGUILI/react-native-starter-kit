import MaskedView from '@react-native-masked-view/masked-view';
import * as React from 'react';
import { View } from 'react-native';

type MaskedViewProps = {
  mask: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

function MaskedViewWrapper({ mask, children, className }: MaskedViewProps) {
  return (
    <MaskedView
      maskElement={(
        <View className={className}>
          {mask}
        </View>
      )}
    >
      {children}
    </MaskedView>
  );
}

export type { MaskedViewProps };
export { MaskedViewWrapper };
