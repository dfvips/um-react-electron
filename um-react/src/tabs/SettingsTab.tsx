import { Container, Flex, useBreakpointValue } from '@chakra-ui/react';
import { Settings } from '~/features/settings/Settings';

export function SettingsTab() {
  const containerProps = useBreakpointValue({
    base: { p: '0' },
    lg: { p: undefined },
  });

  return (
    <Container as={Flex} maxW="container.lg" {...containerProps}>
      <Settings />
    </Container>
  );
}
