import { useFocusEffect } from 'expo-router/react-navigation';
import { useCallback, useRef } from 'react';

export function useRefreshOnFocus(refetch: () => void): void {
  const firstRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (firstRef.current) {
        firstRef.current = false;
        return;
      }
      refetch();
    }, [refetch]),
  );
}
