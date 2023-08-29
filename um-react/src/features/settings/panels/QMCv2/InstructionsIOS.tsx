import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import { InstructionsIOSCondition } from './InstructionsIOSCondition';

export function InstructionsIOS() {
  return (
    <>
      <Box>
        <Text>iOS 设备获取应用私有文件比较麻烦，你需要越狱或使用一台 PC 或 Mac 来对 iOS 设备进行完整备份。</Text>
        <Text>因此，建议换用 PC 或 Mac 重新下载音乐文件然后再尝试解密。</Text>
      </Box>
      <Accordion allowToggle mt="2">
        <AccordionItem>
          <Heading as="h3" size="md">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                我的 iOS 设备已经越狱
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4}>
            <InstructionsIOSCondition jailbreak={true} />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <Heading as="h3" size="md">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                我的 iOS 设备没有越狱
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4}>
            <InstructionsIOSCondition jailbreak={false} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
