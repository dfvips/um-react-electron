import { useDropzone } from 'react-dropzone';
import { Box } from '@chakra-ui/react';

export interface FileInputProps {
  onReceiveFiles: (files: File[]) => void;
  multiple?: boolean;
  children: React.ReactNode;
}

export function FileInput({ children, onReceiveFiles }: FileInputProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    onDropAccepted: onReceiveFiles,
  });

  return (
    <Box
      {...getRootProps()}
      w="100%"
      maxW={480}
      borderWidth="1px"
      borderRadius="lg"
      transitionDuration="0.5s"
      p="6"
      cursor="pointer"
      display="flex"
      flexDir="column"
      alignItems="center"
      _hover={{
        borderColor: 'gray.400',
        bg: 'gray.50',
      }}
      {...(isDragActive && {
        bg: 'blue.50',
        borderColor: 'blue.700',
      })}
    >
      <input {...getInputProps()} />

      {children}
    </Box>
  );
}
