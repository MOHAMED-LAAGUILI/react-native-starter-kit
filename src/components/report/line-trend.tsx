import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Chart, Spinner } from '@/components/ui';
import { ChartLegend } from '@/components/ui/chart';
import { ReportSection } from './report-section';

type LineTrendProps = {
  data: any[];
};

export function LineTrend({
  data,
}: LineTrendProps) {
  const [chartWidth, setChartWidth] = React.useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(setIsLoading, 100, false);
    return () => clearTimeout(timer);
  }, [data]);

  const chartData = data.map((project: any) => ({
    value: project.hours,
    label: project.project,
    color: project.color,
  }));

  return (
    <ReportSection
      title="Trend Analysis"
      subtitle="Line chart"
      bodyClassName="p-4"
    >
      <View className="gap-4">
        {isLoading
          ? (
              <View className="h-[200px] items-center justify-center">
                <Spinner size="lg" />
              </View>
            )
          : (
              <Chart
                variant="line"
                data={chartData}
                width={chartWidth}
                height={200}
                onLayout={e => setChartWidth(e.nativeEvent.layout.width)}
                hideLabels
              />
            )}
        <ChartLegend data={chartData} />
      </View>
    </ReportSection>
  );
}
