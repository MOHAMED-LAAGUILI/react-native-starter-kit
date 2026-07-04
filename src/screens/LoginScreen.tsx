import { useForm } from "@tanstack/react-form";
import * as React from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { useLogin } from "@/api/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
import { useAuthStore } from "@/store";
import { loginSchema } from "@/validation";

function LoginScreen() {
  const loginMutation = useLogin();

  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      await loginMutation.mutateAsync(value);
    },
    validators: { onSubmit: loginSchema },
  });

  const formError = loginMutation.error ? (loginMutation.error as Error).message : undefined;

  return (
    <KeyboardAvoidingView className="flex-1 bg-background">
      <ScrollView
        contentContainerClassName="flex-grow justify-center px-6"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center mb-8 gap-2">
          <Text variant="h1">Welcome</Text>
          <Text
            variant="body"
            className="text-muted-foreground"
          >
            Sign in to your account
          </Text>
        </View>

        <View className="gap-4 mb-6">
          <form.Field name="email">
            {field => (
              <Input
                label="Email"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={field.state.value}
                onChangeText={v => field.handleChange(v)}
                onBlur={() => field.handleBlur()}
                error={String(field.state.meta.errors?.[0] ?? "") || undefined}
              />
            )}
          </form.Field>

          <form.Field name="password">
            {field => (
              <Input
                label="Password"
                placeholder="Enter your password"
                secureTextEntry
                value={field.state.value}
                onChangeText={v => field.handleChange(v)}
                onBlur={() => field.handleBlur()}
                error={String(field.state.meta.errors?.[0] ?? "") || undefined}
              />
            )}
          </form.Field>

          {formError && (
            <Text
              variant="caption"
              className="text-destructive"
            >
              {formError}
            </Text>
          )}

          <form.Subscribe selector={s => s.isSubmitting}>
            {isSubmitting => (
              <Button
                title="Sign In"
                loading={isSubmitting}
                onPress={() => form.handleSubmit()}
                size="lg"
                className="mt-2"
              />
            )}
          </form.Subscribe>
        </View>

        <Button
          title="Skip Login (Demo Mode)"
          variant="ghost"
          onPress={() => {
            useAuthStore.getState().login(
              {
                createdAt: new Date().toISOString(),
                email: "demo@example.com",
                id: "1",
                name: "Demo User",
              },
              { accessToken: "demo-token", refreshToken: "demo-refresh" }
            );
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export { LoginScreen };
