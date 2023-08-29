import { Icon, Kbd } from '@chakra-ui/react';
import { BsShift } from 'react-icons/bs';

export function ShiftKey() {
  return (
    <ruby>
      <Kbd>
        <Icon as={BsShift} />
      </Kbd>
      <rp> (</rp>
      <rt>shift</rt>
      <rp>)</rp>
    </ruby>
  );
}
