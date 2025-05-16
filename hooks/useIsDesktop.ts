import { useWindowDimensions } from 'react-native';

export const DESKTOP_BREAKPOINT = 768;

export function useIsDesktop() {
  const { width } = useWindowDimensions();
  return width >= DESKTOP_BREAKPOINT;
} 