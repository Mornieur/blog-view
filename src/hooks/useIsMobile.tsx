import { useMediaQuery, useTheme } from '@mui/material';

export const useIsBreakpointDown = (
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint));
};

export const useIsMobile = () => useIsBreakpointDown('md');
export const useIsTablet = () => useIsBreakpointDown('lg');
