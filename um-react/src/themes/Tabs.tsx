import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, cssVar } from '@chakra-ui/react';

const $fg = cssVar('tabs-color');
const $bg = cssVar('tabs-bg');

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys);

const variantLineInvert = definePartsStyle((props) => {
  const { colorScheme: c, orientation } = props;
  const isVertical = orientation === 'vertical';
  const borderProp = isVertical ? 'borderEnd' : 'borderTop';
  const marginProp = isVertical ? 'marginEnd' : 'marginTop';

  return {
    tablist: {
      [borderProp]: '2px solid',
      borderColor: 'inherit',
    },
    tabpanels: {
      flex: 1,
      minH: 0,
    },
    tabpanel: {
      padding: 0,
    },
    tab: {
      [borderProp]: '2px solid',
      borderColor: 'transparent',
      [marginProp]: '-2px',
      justifyContent: 'flex-end',
      _selected: {
        [$fg.variable]: `colors.${c}.600`,
        _dark: {
          [$fg.variable]: `colors.${c}.300`,
        },
        borderColor: 'currentColor',
      },
      _active: {
        [$bg.variable]: 'colors.gray.200',
        _dark: {
          [$bg.variable]: 'colors.whiteAlpha.300',
        },
      },
      _disabled: {
        _active: { bg: 'none' },
      },
      color: $fg.reference,
      bg: $bg.reference,
    },
    root: {
      display: 'flex',
      flexDir: isVertical ? 'row' : 'column',
      gap: 8,
      minH: 0,
    },
  };
});

export const tabsTheme = defineMultiStyleConfig({
  baseStyle: {
    tablist: {
      userSelect: 'none',
    },
    tabpanel: {
      minHeight: 0,
      overflow: 'auto',
      maxHeight: '100%',
    },
  },
  variants: {
    'line-i': variantLineInvert,
  },
});
