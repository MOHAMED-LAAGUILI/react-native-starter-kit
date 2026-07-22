import { Shield } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';
import { Button, Icon, Input } from '@/components/ui';
import { showToast } from '@/components/ui/toaster';
import { useAuthStore } from '@/store';
import { editProfileSchema } from '@/validation';

type EditProfileFormProps = {
  onCancel?: () => void;
};

export function EditProfileForm({ onCancel }: EditProfileFormProps) {
  const user = useAuthStore(s => s.user);
  const updateProfile = useAuthStore(s => s.updateProfile);

  const [name, setName] = React.useState(user?.name ?? '');
  const [email, setEmail] = React.useState(user?.email ?? '');
  const [role, setRole] = React.useState(user?.role ?? '');

  const handleSave = () => {
    const result = editProfileSchema.safeParse({
      email: email.trim(),
      name: name.trim(),
      role: role.trim(),
    });

    if (!result.success) {
      const message = result.error.issues.map(i => i.message).join('\n');
      showToast({ title: 'Validation Error', message, variant: 'error' });
      return;
    }

    const { ...data } = result.data;

    updateProfile(data);
    showToast({ title: 'Profile Updated', message: 'Your profile has been updated successfully', variant: 'success' });
    onCancel?.();
  };

  return (
    <View className="gap-4">
      <Input
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        type="username"
      />
      <Input
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        type="email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        label="Role"
        placeholder="Enter your role"
        value={role}
        onChangeText={setRole}
        leftIcon={<Icon as={Shield} className="size-[18px] text-muted-foreground" />}
        autoCapitalize="none"
      />

      <View className="flex-row gap-3">
        <Button
          variant="primary"
          title="Save Changes"
          onPress={handleSave}
          className="flex-1"
        />
      </View>
    </View>
  );
}
