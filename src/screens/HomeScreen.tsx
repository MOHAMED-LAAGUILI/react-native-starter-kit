import { Eye, EyeOff, Home, Lock, Mail, Phone, Search } from "lucide-react-native";
import * as React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";

function SectionTitle({ children }: { children: string }) {
  return (
    <View className="mb-3 mt-6 first:mt-0">
      <Text variant="h3">{children}</Text>
      <View className="h-px bg-border mt-2" />
    </View>
  );
}

function HomeScreen() {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [formValue, setFormValue] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="p-6 gap-2 pb-32"
    >
      <Text
        variant="h2"
        className="mb-2"
      >
        Component Demo
      </Text>
      <Text
        variant="body"
        className="text-muted-foreground mb-2"
      >
        All UI, form, and typography components with available variants.
      </Text>

      <SectionTitle>Typography</SectionTitle>
      <View className="gap-1 bg-card p-4 rounded-xl border border-border">
        <Text variant="h1">Heading h1</Text>
        <Text variant="h2">Heading h2</Text>
        <Text variant="h3">Heading h3</Text>
        <Text variant="h4">Heading h4</Text>
        <Text variant="bodyLarge">Body Large text</Text>
        <Text variant="body">Body - the quick brown fox jumps over the lazy dog.</Text>
        <Text variant="bodySmall">Body Small text</Text>
        <Text variant="caption">Caption text</Text>
        <Text variant="label">Label text</Text>
      </View>

      <SectionTitle>UI Components</SectionTitle>

      <Text
        variant="label"
        className="text-muted-foreground mb-1"
      >
        Button variants
      </Text>
      <View className="flex-row flex-wrap gap-2 mb-4">
        <Button
          title="Primary"
          variant="primary"
          size="sm"
        />
        <Button
          title="Secondary"
          variant="secondary"
          size="sm"
        />
        <Button
          title="Outline"
          variant="outline"
          size="sm"
        />
        <Button
          title="Ghost"
          variant="ghost"
          size="sm"
        />
        <Button
          title="Destructive"
          variant="destructive"
          size="sm"
        />
      </View>

      <Text
        variant="label"
        className="text-muted-foreground mb-1"
      >
        Button sizes
      </Text>
      <View className="flex-row items-center gap-2 mb-4">
        <Button
          title="Small"
          size="sm"
        />
        <Button
          title="Medium"
          size="md"
        />
        <Button
          title="Large"
          size="lg"
        />
      </View>

      <Text
        variant="label"
        className="text-muted-foreground mb-1"
      >
        Button states
      </Text>
      <View className="flex-row flex-wrap gap-2 mb-4">
        <Button
          title="Loading"
          loading
        />
        <Button
          title="Disabled"
          disabled
        />
        <Button
          title="With Icon"
          variant="outline"
          leftIcon={
            <Home
              size={16}
              className="text-foreground"
            />
          }
        />
      </View>

      <Text
        variant="label"
        className="text-muted-foreground mb-1"
      >
        Input variants
      </Text>
      <View className="gap-3 mb-4">
        <Input
          label="Default"
          placeholder="Type something..."
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Input
          label="Search"
          placeholder="Search..."
          leftIcon={
            <Search
              size={16}
              className="text-muted-foreground"
            />
          }
        />
        <Input
          label="Email"
          placeholder="you@example.com"
          leftIcon={
            <Mail
              size={16}
              className="text-muted-foreground"
            />
          }
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Password"
          placeholder="Enter password"
          leftIcon={
            <Lock
              size={16}
              className="text-muted-foreground"
            />
          }
          secureTextEntry={!showPassword}
          rightIcon={
            <Pressable
              onPress={() => setShowPassword(p => !p)}
              hitSlop={8}
            >
              {showPassword ? (
                <EyeOff
                  size={16}
                  className="text-muted-foreground"
                />
              ) : (
                <Eye
                  size={16}
                  className="text-muted-foreground"
                />
              )}
            </Pressable>
          }
        />
        <Input
          label="Phone"
          placeholder="+1 (555) 000-0000"
          leftIcon={
            <Phone
              size={16}
              className="text-muted-foreground"
            />
          }
          keyboardType="phone-pad"
        />
        <Input
          label="With error"
          placeholder="Email"
          value={email}
          onChangeText={t => {
            setEmail(t);
            setEmailError("");
          }}
          error={emailError}
          keyboardType="email-address"
        />
        {!emailError && (
          <Button
            title="Show error"
            variant="ghost"
            size="sm"
            onPress={() => setEmailError("Invalid email address")}
          />
        )}
      </View>

      <SectionTitle>Form Components</SectionTitle>
      <View className="gap-3 bg-card p-4 rounded-xl border border-border">
        <FormField
          name="email"
          label="Email"
          placeholder="you@example.com"
          value={formValue}
          onChangeText={setFormValue}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormField
          name="password"
          label="Password"
          placeholder="Enter password"
          secureTextEntry
        />
      </View>
    </ScrollView>
  );
}

export { HomeScreen };
