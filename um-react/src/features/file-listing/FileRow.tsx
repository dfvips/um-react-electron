import { useRef } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Collapse,
  GridItem,
  Link,
  VStack,
  Wrap,
  WrapItem,
  useDisclosure,
} from '@chakra-ui/react';
import { FileRowResponsiveGrid } from './FileRowResponsiveGrid';
import { DecryptedAudioFile, deleteFile, ProcessState } from './fileListingSlice';
import { useAppDispatch } from '~/hooks';
import { AnimationDefinition } from 'framer-motion';
import { AlbumImage } from './AlbumImage';
import { SongMetadata } from './SongMetadata';
import { FileError } from './FileError';

interface FileRowProps {
  id: string;
  file: DecryptedAudioFile;
}

export function FileRow({ id, file }: FileRowProps) {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const dispatch = useAppDispatch();
  const isDecrypted = file.state === ProcessState.COMPLETE;
  const metadata = file.metadata;

  const nameWithoutExt = file.fileName.replace(/\.[a-z\d]{3,6}$/, '');
  const decryptedName = nameWithoutExt + '.' + file.ext;

  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const togglePlay = () => {
    const player = audioPlayerRef.current;
    if (!player) {
      return;
    }

    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  };

  const onCollapseAnimationComplete = (definition: AnimationDefinition) => {
    if (definition === 'exit') {
      dispatch(deleteFile({ id }));
    }
  };

  return (
    <Collapse
      in={isOpen}
      animateOpacity
      unmountOnExit
      startingHeight={0}
      onAnimationComplete={onCollapseAnimationComplete}
      style={{ width: '100%', padding: '0.25rem' }}
    >
      <Card w="full" data-testid="file-row">
        <CardBody>
          <FileRowResponsiveGrid>
            <GridItem area="cover">
              <AlbumImage name={metadata?.album} url={metadata?.cover} />
            </GridItem>
            <GridItem area="title">
              <Box w="full" as="h4" fontWeight="semibold" mt="1" textAlign={{ base: 'center', md: 'left' }}>
                <span data-testid="audio-meta-song-name">{metadata?.name ?? nameWithoutExt}</span>
              </Box>
            </GridItem>
            <GridItem area="meta">
              {isDecrypted && metadata && <SongMetadata metadata={metadata} />}
              {file.state === ProcessState.ERROR && <FileError error={file.errorMessage} code={file.errorCode} />}
            </GridItem>
            <GridItem area="action" alignSelf="center">
              <VStack>
                {file.decrypted && <audio controls autoPlay={false} src={file.decrypted} ref={audioPlayerRef} />}

                <Wrap>
                  {isDecrypted && (
                    <>
                      <WrapItem>
                        <Button type="button" onClick={togglePlay}>
                          播放/暂停
                        </Button>
                      </WrapItem>
                      <WrapItem>
                        {file.decrypted && (
                          <Link isExternal href={file.decrypted} download={decryptedName}>
                            <Button as="span">下载</Button>
                          </Link>
                        )}
                      </WrapItem>
                    </>
                  )}
                  <WrapItem>
                    <Button type="button" onClick={onClose}>
                      删除
                    </Button>
                  </WrapItem>
                </Wrap>
              </VStack>
            </GridItem>
          </FileRowResponsiveGrid>
        </CardBody>
      </Card>
    </Collapse>
  );
}
