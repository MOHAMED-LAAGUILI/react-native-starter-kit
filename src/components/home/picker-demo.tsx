import * as React from 'react';
import { Picker } from '@/components/ui/picker';

const FRUITS: { label: string; value: string }[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Dragonfruit', value: 'dragonfruit' },
  { label: 'Elderberry', value: 'elderberry' },
];

const CITIES: { label: string; value: string }[] = [
  { label: 'New York', value: 'nyc' },
  { label: 'London', value: 'london' },
  { label: 'Tokyo', value: 'tokyo' },
  { label: 'Paris', value: 'paris' },
  { label: 'Sydney', value: 'sydney' },
];

const AGES: { label: string; value: number }[] = [
  { label: '18-24', value: 1 },
  { label: '25-34', value: 2 },
  { label: '35-44', value: 3 },
  { label: '45-54', value: 4 },
  { label: '55+', value: 5 },
];

function PickerDemo() {
  const [fruit, setFruit] = React.useState('apple');
  const [city, setCity] = React.useState('london');
  const [age, setAge] = React.useState(2);

  return (
    <>
      <Picker
        label="Favorite Fruit"
        items={FRUITS}
        selectedValue={fruit}
        onValueChange={v => setFruit(v)}
      />
      <Picker
        label="Select City"
        items={CITIES}
        selectedValue={city}
        onValueChange={v => setCity(v)}
        mode="dropdown"
      />
      <Picker
        label="Age Range"
        items={AGES}
        selectedValue={age}
        onValueChange={v => setAge(v)}
      />
    </>
  );
}

export { PickerDemo };
