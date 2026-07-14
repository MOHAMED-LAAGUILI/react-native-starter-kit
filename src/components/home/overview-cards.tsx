import React from 'react';

import { View } from 'react-native';
import { Text } from '@/components/ui';

type OverviewCardsProps = {
  cards: any[];
};

export function OverviewCards({ cards }: OverviewCardsProps) {
  return (
    <View className="mb-8">
      <Text variant="h4" className="mb-4">Overview</Text>
      <View className="flex-row flex-wrap gap-3">
        {cards.map(card => (
          <View
            key={card.key}
            className="min-w-[160px] flex-1 rounded-xl border border-border bg-card p-4"
          >
            <View className="flex-row items-center gap-2">
              <View
                className="size-2 rounded-full"
                style={{ backgroundColor: card.accentColor }}
              />
              <Text variant="caption" className="text-muted-foreground">
                {card.label}
              </Text>
            </View>
            <Text className="mt-3 text-2xl font-semibold">{card.value}</Text>
            <Text variant="caption" className="mt-1 text-muted-foreground">
              {card.subtitle}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
