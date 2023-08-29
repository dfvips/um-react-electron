import { Grid, chakra } from '@chakra-ui/react';

export const FileRowResponsiveGrid = chakra(Grid, {
  baseStyle: {
    gridTemplateAreas: {
      base: `
        "cover"
        "title"
        "meta"
        "action"
      `,
      md: `
        "cover title action"
        "cover meta  action"
      `,
    },
    gridTemplateRows: {
      base: 'repeat(auto-fill)',
      md: 'min-content 1fr',
    },
    gridTemplateColumns: {
      base: '1fr',
      md: '160px 1fr',
    },
    gap: 3,
  },
});
