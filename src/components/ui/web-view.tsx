import * as React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { cn } from '@/utils/utils';

type WebViewProps = {
  uri: string;
  className?: string;
  style?: object;
};

function WebViewWrapper({ uri, className, style }: WebViewProps) {
  return (
    <View className={cn('h-48 overflow-hidden rounded-xl', className)} style={style}>
      <WebView
        source={{ uri }}
        style={{ flex: 1 }}
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
}

export type { WebViewProps };
export { WebViewWrapper };
