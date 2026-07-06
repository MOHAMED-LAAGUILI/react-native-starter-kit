import { Image, Pressable, View } from "react-native";
import { Text } from "@/components/ui/Text";

type PostCardProps = {
  id: number;
  title: string;
  body: string;
  imageUrl: string;
  onPress: () => void;
};

export function PostCard({ id, title, body, imageUrl, onPress }: PostCardProps) {
  return (
    <Pressable
      className="bg-card rounded-xl border border-border active:opacity-80 overflow-hidden"
      onPress={onPress}
    >
      <Image
        source={{ uri: imageUrl }}
        className="w-full h-40"
        resizeMode="cover"
      />
      <View className="p-4">
        <Text
          variant="label"
          className="text-muted-foreground mb-1"
        >
          Post #{id}
        </Text>
        <Text
          variant="body"
          className="font-semibold mb-1"
        >
          {title}
        </Text>
        <Text
          variant="bodySmall"
          className="text-muted-foreground"
          numberOfLines={2}
        >
          {body}
        </Text>
      </View>
    </Pressable>
  );
}
