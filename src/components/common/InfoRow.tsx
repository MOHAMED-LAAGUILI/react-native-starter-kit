import type { ComponentProps } from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/Text";

type InfoRowProps = {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
};

export function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
  return (
    <View className="flex-row items-center p-4">
      <View className="w-10 h-10 rounded-full bg-muted items-center justify-center mr-3">
        <Icon
          size={20}
          className="text-muted-foreground"
        />
      </View>
      <View className="flex-1">
        <Text
          variant="caption"
          className="text-muted-foreground"
        >
          {label}
        </Text>
        <Text
          variant="body"
          className="mt-0.5"
        >
          {value}
        </Text>
      </View>
    </View>
  );
}
