import { useState, useEffect, useCallback } from 'react';
import useTheme from '@mui/material/styles/useTheme';
import { Breakpoints } from '../theme';

export interface IWindow {
  width: number;
  screen: Breakpoints;
}

export const useWindowSize = () => {
  const theme = useTheme();

  const convertWidthToBreakpoints = useCallback(
    (width: number): Breakpoints => {
      if (width < theme.breakpoints.values.tablet) return Breakpoints.mobile;
      if (width < theme.breakpoints.values.laptop) return Breakpoints.tablet;
      if (width < theme.breakpoints.values.desktop) return Breakpoints.laptop;
      if (width < theme.breakpoints.values.largeDesktop) return Breakpoints.desktop;
      return Breakpoints.largeDesktop;
    },
    [
      theme.breakpoints.values.tablet,
      theme.breakpoints.values.laptop,
      theme.breakpoints.values.desktop,
      theme.breakpoints.values.largeDesktop,
    ]
  );

  const [windowSize, setWindowSize] = useState<IWindow>({
    width: window.innerWidth,
    screen: convertWidthToBreakpoints(window.innerWidth),
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth !== windowSize.width) {
        setWindowSize({
          width: window.innerWidth,
          screen: convertWidthToBreakpoints(window.innerWidth),
        });
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width, windowSize.screen, convertWidthToBreakpoints]);

  return windowSize;
};
