import { router, usePathname } from "expo-router";
import { DrawerToggleButton } from "expo-router/drawer";
import { ArrowLeft } from "lucide-react-native";
import { View } from "react-native";
import { Button } from "@/components/ui/Button";
import { useThemeColors } from "@/hooks/useThemeColor";

export function DrawerHeaderLeft() {
  const pathname = usePathname();
  const { icon } = useThemeColors();

  if (pathname.includes("/post/")) {
    return (
      <View className="ml-3">
        <Button
          variant="ghost"
          title=""
          leftIcon={
            <ArrowLeft
              size={24}
              color={icon}
            />
          }
          onPress={() => router.back()}
          className="px-0 h-auto"
        />
      </View>
    );
  }

  return (
    <View className="ml-3">
      <DrawerToggleButton tintColor={icon} />
    </View>
  );
}
