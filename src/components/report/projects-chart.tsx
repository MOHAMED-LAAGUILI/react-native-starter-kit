import type { LayoutChangeEvent } from 'react-native';
import type { barDataItem } from 'react-native-gifted-charts';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

type ProjectsChartProps = {
  width: number;
  onLayout: (event: LayoutChangeEvent) => void;
  data: barDataItem[];
  maxValue: number;
  stepValue: number;
  axisColor: string;
  mutedColor: string;
  textColor: string;
  background: string;
};

export function ProjectsChart({
  width,
  onLayout,
  data,
  maxValue,
  stepValue,
  axisColor,
  mutedColor,
  textColor,
  background,
}: ProjectsChartProps) {
  return (
    <View
      className="w-full overflow-hidden rounded-xl"
      onLayout={onLayout}
    >
      {width > 0 && (
        <BarChart
          data={data}
          width={width}
          adjustToWidth
          height={200}
          barBorderTopLeftRadius={6}
          barBorderTopRightRadius={6}
          initialSpacing={12}
          spacing={12}
          hideRules={false}
          rulesColor={axisColor}
          yAxisTextStyle={{
            color: mutedColor,
            fontSize: 11,
            fontWeight: '500',
          }}
          xAxisLabelTextStyle={{
            color: mutedColor,
            fontSize: 11,
            fontWeight: '500',
            textAlign: 'center',
          }}
          xAxisColor={axisColor}
          yAxisColor={axisColor}
          noOfSections={4}
          maxValue={maxValue}
          stepValue={stepValue}
          yAxisLabelSuffix="h"
          disableScroll
          isAnimated
          animationDuration={800}
          yAxisThickness={1}
          xAxisThickness={1}
          rulesThickness={1}
          backgroundColor={background}
          topLabelContainerStyle={{
            height: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          topLabelTextStyle={{
            color: textColor,
            fontSize: 12,
            fontWeight: '600',
          }}
        />
      )}
    </View>
  );
}
