import type { MenuAction, NativeActionEvent } from '@react-native-menu/menu';
import { MenuView } from '@react-native-menu/menu';
import * as React from 'react';

type MenuItem = {
  key: string;
  title: string;
  subtitle?: string;
  destructive?: boolean;
  disabled?: boolean;
  image?: string;
};

type MenuProps = {
  items: MenuItem[];
  onPress: (key: string) => void;
  children: React.ReactNode;
};

function Menu({ items, onPress, children }: MenuProps) {
  const actions: MenuAction[] = items.map(item => ({
    id: item.key,
    title: item.title,
    subtitle: item.subtitle,
    attributes: {
      destructive: item.destructive,
      disabled: item.disabled,
    },
    image: item.image,
  }));

  return (
    <MenuView
      onPressAction={({ nativeEvent }: NativeActionEvent) => onPress(nativeEvent.event)}
      actions={actions}
    >
      {children}
    </MenuView>
  );
}

export type { MenuItem, MenuProps };
export { Menu };
