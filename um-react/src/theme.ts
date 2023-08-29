import { extendTheme } from '@chakra-ui/react';
import { tabsTheme } from './themes/Tabs';

export const theme = extendTheme({
  fonts: {
    body: [
      '-system-ui,-apple-system,BlinkMacSystemFont',
      'Source Han Sans CN,Noto Sans CJK SC',
      'Segoe UI,Helvetica,Arial,sans-serif',
      'Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
    ].join(','),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'normal',
      },
      defaultProps: {
        colorScheme: 'teal',
      },
    },
    Tabs: tabsTheme,
    Link: {
      baseStyle: {
        color: 'blue.600',
      },
    },
  },
  styles: {
    global: {
      '#root': {
        minHeight: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      },
    },
  },
  sizes: {
    footer: {
      container: '5rem',
      content: '4rem',
    },
  },
});
