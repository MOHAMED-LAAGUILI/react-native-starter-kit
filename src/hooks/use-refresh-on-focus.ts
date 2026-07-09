import { useFocusEffect } from 'expo-router/react-navigation';
import { useRef } from 'react';

export function useRefreshOnFocus(refetch: () => void): void {
  const firstRef = useRef(true);

  useFocusEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return;
    }
    refetch();
  });
}
