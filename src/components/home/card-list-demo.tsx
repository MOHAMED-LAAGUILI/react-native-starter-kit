import { Activity, DollarSign, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react-native';
import { ScrollView } from 'react-native';
import { Card } from '@/components/ui';

type CardItem = {
  id: number;
  title: string;
  value: string;
  subtitle: string;
  icon: any;
  variant?: 'primary' | 'stats' | 'compact';
};

const cardListData: CardItem[] = [
  {
    id: 1,
    title: 'Revenue',
    value: '$12,450',
    subtitle: '+15% from last month',
    icon: DollarSign,
    variant: 'primary',
  },
  {
    id: 2,
    title: 'Orders',
    value: '1,234',
    subtitle: '23 pending',
    icon: ShoppingCart,
    variant: 'stats',
  },
  {
    id: 3,
    title: 'Products',
    value: '456',
    subtitle: '12 low stock',
    icon: Package,
    variant: 'stats',
  },
  {
    id: 4,
    title: 'Customers',
    value: '892',
    subtitle: '+45 new this week',
    icon: Users,
    variant: 'stats',
  },
  {
    id: 5,
    title: 'Growth',
    value: '+23%',
    subtitle: 'Year over year',
    icon: TrendingUp,
    variant: 'primary',
  },
  {
    id: 6,
    title: 'Activity',
    value: 'High',
    subtitle: 'Last 24 hours',
    icon: Activity,
    variant: 'stats',
  },
];

function CardListDemo() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-3 px-1"
      className="w-full"
    >
      {cardListData.map(item => (
        <Card
          key={item.id}
          variant={item.variant || 'stats'}
          title={item.title}
          value={item.value}
          subtitle={item.subtitle}
          icon={item.icon}
          className="w-48"
        />
      ))}
    </ScrollView>
  );
}

export { CardListDemo };
