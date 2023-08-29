import { Icon, Kbd } from '@chakra-ui/react';
import { BsCommand } from 'react-icons/bs';

export function MacCommandKey() {
  return (
    <ruby>
      <Kbd>
        <Icon as={BsCommand} />
      </Kbd>
      <rp> (</rp>
      <rt>command</rt>
      <rp>)</rp>
    </ruby>
  );
}
