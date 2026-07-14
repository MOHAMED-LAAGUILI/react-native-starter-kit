import { BarChart3, Box, Zap } from 'lucide-react-native';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

export function ExpoUiScreen() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
        <View className="w-full gap-5 p-6">
          <Text variant="h2">Expo Card</Text>

          <Card
            variant="primary"
            title="Aujourd'hui"
            value="66.00 DH"
            subtitle="2 commandes"
            icon={BarChart3}
          />

          <Card
            variant="stats"
            title="Total des ventes"
            value="66.00 DH"
            subtitle="2 Total des commandes"
            icon={BarChart3}
          />

          <View className="flex-row gap-3">
            <Card
              variant="compact"
              title="Stock"
              value="2"
              icon={Box}
              className="flex-1"
            />
            <Card
              variant="compact"
              title="Stock bas"
              value="1"
              icon={Zap}
              className="flex-1"
            />
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
