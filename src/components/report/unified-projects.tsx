import type { LayoutChangeEvent } from 'react-native';
import type { barDataItem } from 'react-native-gifted-charts';
import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme-color';
import { ProjectsAllocationList } from './projects-allocation-list';
import { ProjectsChart } from './projects-chart';
import { ReportSection } from './report-section';

type Project = {
  project: string;
  hours: number;
  color: string;
};

type UnifiedProjectsProps = {
  data: Project[];
  totalHours: number;
};

export function UnifiedProjects({
  data,
  totalHours,
}: UnifiedProjectsProps) {
  const [barChartWidth, setBarChartWidth] = useState(0);
  const { isDark, background } = useThemeColors();

  const axisColor = isDark ? '#404040' : '#e5e5e5';
  const mutedColor = isDark ? '#a3a3a3' : '#737373';
  const textColor = isDark ? '#ffffff' : '#171717';

  const { giftedBarData, maxValue, stepValue } = useMemo(() => {
    const hours = data.map(project => project.hours);
    const maxHours = Math.max(...hours, 1);
    const stepValue = Math.max(Math.ceil(maxHours / 4), 1);

    return {
      giftedBarData: data.map(
        project =>
          ({
            value: project.hours,
            label: '',
            frontColor: project.color,
            labelWidth: 0,
            barWidth: 24,
          }) satisfies barDataItem,
      ),
      maxValue: stepValue * 4,
      stepValue,
    };
  }, [data]);

  const handleLayout = ({
    nativeEvent: { layout },
  }: LayoutChangeEvent) => {
    const width = Math.floor(layout.width);

    setBarChartWidth(current => (current === width ? current : width));
  };

  return (
    <ReportSection
      title="Projects Overview"
      subtitle="Allocation & Top Projects"
      bodyClassName="p-4"
    >
      <View className="gap-1">
        <ProjectsChart
          width={barChartWidth}
          onLayout={handleLayout}
          data={giftedBarData}
          maxValue={maxValue}
          stepValue={stepValue}
          axisColor={axisColor}
          mutedColor={mutedColor}
          textColor={textColor}
          background={background}
        />

        <ProjectsAllocationList
          data={data}
          totalHours={totalHours}
        />
      </View>
    </ReportSection>
  );
}
