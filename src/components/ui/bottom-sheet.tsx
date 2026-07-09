import BottomSheetLib, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { X } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';
import { cn } from '@/lib/utils';
import { Text } from './text';

const ITEM_HEIGHT = 56;
const HEADER_HEIGHT = 88;
const HANDLE_HEIGHT = 24;
const EXTRA_PADDING = 16;

type BottomSheetOption<T> = {
  label: string;
  value: T;
  leftElement?: React.ReactNode;
};

type BottomSheetProps<T> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseEnd?: () => void;
  title: string;
  options: BottomSheetOption<T>[];
  selectedValue: T;
  onSelect: (value: T) => void;
};

function BottomSheetInner<T>({
  open,
  onOpenChange,
  onCloseEnd,
  title,
  options,
  selectedValue,
  onSelect,
}: BottomSheetProps<T>) {
  const sheetRef = React.useRef<React.ElementRef<typeof BottomSheetLib>>(null);
  const mountedRef = React.useRef(false);
  const { height: screenHeight } = useWindowDimensions();

  React.useEffect(() => {
    mountedRef.current = true;
  }, []);

  const snapPoints = React.useMemo(() => {
    const contentHeight = ITEM_HEIGHT * options.length + HEADER_HEIGHT + HANDLE_HEIGHT + EXTRA_PADDING;
    const snapPercent = Math.max(25, Math.min(55, (contentHeight / screenHeight) * 100));
    return [`${snapPercent}%`, '80%'];
  }, [options.length, screenHeight]);

  return (
    <BottomSheetLib
      ref={sheetRef}
      snapPoints={snapPoints}
      index={open ? 0 : -1}
      enablePanDownToClose
      enableOverDrag
      onChange={(index) => {
        if (index === -1 && mountedRef.current) {
          onOpenChange(false);
          onCloseEnd?.();
        }
      }}
      backgroundComponent={() => <View className="flex-1 rounded-3xl bg-card" />}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      )}
      handleComponent={() => (
        <View className="items-center rounded-t-3xl bg-card pt-3 pb-2">
          <View className="h-1.5 w-10 rounded-full bg-muted-foreground/30" />
        </View>
      )}
    >
      <BottomSheetScrollView
        className="flex-1 bg-card px-4"
        bounces={false}
      >
        <View className="mb-4 flex-row items-center justify-between pt-1">
          <Text
            variant="h4"
            className="flex-1"
          >
            {title}
          </Text>
          <Pressable
            className="rounded-full p-1 active:bg-accent"
            onPress={() => onOpenChange(false)}
          >
            <X
              size={20}
              className="text-muted-foreground"
            />
          </Pressable>
        </View>
        <View className="overflow-hidden rounded-b-xl border-t border-border bg-card">
          {options.map((option, index) => (
            <Pressable
              key={String(option.value)}
              className={cn(
                'flex-row items-center gap-3 p-4',
                index < options.length - 1 && 'border-b border-border',
                selectedValue === option.value && 'bg-primary/20',
              )}
              onPress={() => {
                onSelect(option.value);
                onOpenChange(false);
              }}
            >
              {option.leftElement}
              <Text
                variant="body"
                className="flex-1"
              >
                {option.label}
              </Text>
              {selectedValue === option.value && <View className="size-2.5 rounded-full bg-primary" />}
            </Pressable>
          ))}
        </View>
      </BottomSheetScrollView>
    </BottomSheetLib>
  );
}

const BottomSheet = React.memo(BottomSheetInner) as typeof BottomSheetInner;

export type { BottomSheetOption, BottomSheetProps };
export { BottomSheet };
