import { View } from 'react-native';
import { Progress } from '@/components/ui';

function ProgressDemo() {
  return (
    <View className="border-border bg-card gap-3 rounded-xl border p-4">
      <Progress value={30} />
      <Progress value={65} />
      <Progress value={100} />
    </View>
  );
}

export { ProgressDemo };
