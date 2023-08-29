import {
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tabs,
  Text,
} from '@chakra-ui/react';

import { FileInput } from '~/components/FileInput';

export interface ImportSecretModalProps {
  clientName?: React.ReactNode;
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
}

export function ImportSecretModal({ clientName, children, show, onClose, onImport }: ImportSecretModalProps) {
  const handleFileReceived = (files: File[]) => onImport(files[0]);

  return (
    <Modal isOpen={show} onClose={onClose} closeOnOverlayClick={false} scrollBehavior="inside" size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>从文件导入密钥</ModalHeader>
        <ModalCloseButton />
        <Flex as={ModalBody} gap={2} flexDir="column" flex={1}>
          <Center>
            <FileInput onReceiveFiles={handleFileReceived}>拖放或点我选择含有密钥的数据库文件</FileInput>
          </Center>

          <Text mt={2}>选择你的{clientName && <>「{clientName}」</>}客户端平台以查看对应说明：</Text>
          <Flex as={Tabs} variant="enclosed" flexDir="column" flex={1} minH={0}>
            {children}
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
}
