import type { PublicPost as Post } from '@/api/types';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { Image, Text } from '@/components/ui';

function PostHero({ post }: { post: Post }) {
  return (
    <View>
      <View className="h-87.5">
        <Image
          source={{ uri: post.imageUrl }}
          className="absolute size-full"
          contentFit="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.4)']}
          className="absolute size-full"
        />
        <View className="absolute inset-x-0 bottom-0 gap-2 p-6 pb-8">
          <View className="mb-1 self-start rounded-lg bg-black/30 px-3 py-1.5">
            <Text variant="caption" className="text-white/90">
              {`Post #${post.id} — User #${post.userId}`}
            </Text>
          </View>
          <View className="rounded-lg bg-black/40 px-4 py-2">
            <Text variant="h2" className="text-white">
              {post.title}
            </Text>
          </View>
        </View>
      </View>
      <View className="gap-4 p-6">

        <Text variant="body" className="leading-6">
          {post.body}
        </Text>
      </View>
    </View>
  );
}

export { PostHero };
