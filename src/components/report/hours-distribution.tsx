import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { Chart, Spinner } from '@/components/ui';
import { ReportSection } from './report-section';

type HoursDistributionProps = {
  data: any[];
  totalHours: number;
};

function getProjectPercent(hours: number, totalHours: number) {
  return totalHours === 0 ? 0 : (hours / totalHours) * 100;
}

export function HoursDistribution({
  data,
  totalHours,
}: HoursDistributionProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(setIsLoading, 100, false);
    return () => clearTimeout(timer);
  }, [data]);

  const chartData = data.map((project: any) => {
    const percent = Math.round(getProjectPercent(project.hours, totalHours));

    return {
      value: project.hours,
      label: project.project,
      color: project.color,
      // Slice labels overlap the donut's center summary on narrow native screens.
      text: Platform.OS === 'web' ? `${percent}%` : undefined,
      tooltipText: `${project.project}: ${project.hours} h`,
    };
  });

  return (
    <ReportSection
      title="Hours Distribution"
      subtitle="Donut chart"
      bodyClassName="p-5"
    >
      {isLoading
        ? (
            <View className="h-[200px] items-center justify-center">
              <Spinner size="lg" />
            </View>
          )
        : (
            <Chart
              variant="pie"
              data={chartData}
              donut
              radius={92}
              innerRadius={62}
              showTooltip
              centerLabel={`${totalHours}h`}
              centerSubtitle="Total"
            />
          )}
    </ReportSection>
  );
}
