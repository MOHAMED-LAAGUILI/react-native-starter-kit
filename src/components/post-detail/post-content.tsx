import type { PublicPost as Post } from '@/api/types';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { Text } from '@/components/ui';

function PostHero({ post }: { post: Post }) {
  return (
    <View className="h-[500px]">
      <Image
        source={{ uri: post.imageUrl }}
        className="absolute size-full"
        contentFit="cover"
        blurRadius={15}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.85)']}
        className="absolute size-full"
      />
      <View className="absolute inset-x-0 bottom-0 gap-4 p-6 pb-8">
        <Image
          source={{ uri: post.imageUrl }}
          className="h-48 w-full rounded-xl"
          contentFit="cover"
        />
        <View className="gap-1">
          <Text variant="caption" className="text-white/70">
            {`Post #${post.id} — User #${post.userId}`}
          </Text>
          <Text variant="h2" className="text-white">
            {post.title}
          </Text>
        </View>
        <Text variant="body" className="leading-6 text-white/80">
          {post.body}
        </Text>
      </View>
    </View>
  );
}

export { PostHero };
