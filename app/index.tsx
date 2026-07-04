import { Redirect } from "expo-router";
import { useAuthStore } from "@/store";

export default function Index() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  return <Redirect href={isAuthenticated ? "/(app)/(tabs)" : "/(auth)/login"} />;
}
