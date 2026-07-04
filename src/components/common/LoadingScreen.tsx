import * as React from "react";
import { ActivityIndicator, View } from "react-native";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store";

function LoadingScreen() {
  const themeMode = useThemeStore(s => s.mode);

  return (
    <View
      className={`flex-1 items-center justify-center gap-4 ${themeMode === "dark" ? "bg-black" : "bg-white"}`}
    >
      <ActivityIndicator
        size="large"
        className={`text-${themeMode === "dark" ? "white" : "black"}`}
      />
    </View>
  );
}

export { LoadingScreen };
