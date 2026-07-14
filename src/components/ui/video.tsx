import * as React from 'react';
import { Platform, View } from 'react-native';
import Video from 'react-native-video';
import { cn } from '@/utils/utils';

type VideoPlayerProps = {
  uri: string;
  className?: string;
  paused?: boolean;
  controls?: boolean;
  resizeMode?: 'contain' | 'cover' | 'stretch';
};

function VideoPlayer({ uri, className, paused, controls = true, resizeMode = 'contain' }: VideoPlayerProps) {
  if (Platform.OS === 'web') {
    return (
      <View className={cn('h-48 overflow-hidden rounded-xl bg-black', className)}>
        <video
          src={uri}
          controls={controls}
          autoPlay={!paused}
          style={{ width: '100%', height: '100%', objectFit: resizeMode as 'contain' | 'cover' | 'fill' }}
        />
      </View>
    );
  }

  return (
    <View className={cn('h-48 overflow-hidden rounded-xl bg-black', className)}>
      <Video
        source={{ uri }}
        style={{ flex: 1 }}
        paused={paused}
        controls={controls}
        resizeMode={resizeMode}
      />
    </View>
  );
}

export type { VideoPlayerProps };
export { VideoPlayer };
