import type { DateData } from 'react-native-calendars';
import * as React from 'react';
import { Calendar } from 'react-native-calendars';
import { usePrimaryHex } from '@/hooks/use-primary-hex';
import { useThemeColors } from '@/hooks/use-theme-color';

type CalendarViewProps = {
  onDayPress?: (date: DateData) => void;
  markedDates?: Record<string, { marked?: boolean; selected?: boolean; dotColor?: string }>;
};

function CalendarView({ onDayPress, markedDates }: CalendarViewProps) {
  const { text, muted, background } = useThemeColors();
  const primaryHex = usePrimaryHex();

  return (
    <Calendar
      onDayPress={onDayPress}
      markedDates={markedDates}
      theme={{
        backgroundColor: background,
        calendarBackground: background,
        textSectionTitleColor: muted,
        selectedDayBackgroundColor: primaryHex,
        selectedDayTextColor: '#ffffff',
        todayTextColor: primaryHex,
        dayTextColor: text,
        textDisabledColor: muted,
        dotColor: primaryHex,
        arrowColor: primaryHex,
        monthTextColor: text,
        indicatorColor: primaryHex,
        textDayFontWeight: '400',
        textMonthFontWeight: '600',
        textDayHeaderFontWeight: '500',
        textDayFontSize: 15,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 13,
      }}
    />
  );
}

export type { CalendarViewProps };
export { CalendarView };
