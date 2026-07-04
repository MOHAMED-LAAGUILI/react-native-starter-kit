import * as React from "react";
import { ScrollView, View } from "react-native";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";

function SearchScreen() {
  const [query, setQuery] = React.useState("");

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 gap-4">
        <Text variant="h2">Search</Text>
        <Input
          placeholder="Search..."
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
        />
        <Text
          variant="body"
          className="text-muted-foreground"
        >
          {query ? `Searching for "${query}"...` : "Start typing to search"}
        </Text>
      </View>
    </ScrollView>
  );
}

export { SearchScreen };
