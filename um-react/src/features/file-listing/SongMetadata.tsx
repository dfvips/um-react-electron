import { Box, Text } from '@chakra-ui/react';
import type { AudioMetadata } from './fileListingSlice';

export interface SongMetadataProps {
  metadata: AudioMetadata;
}

export function SongMetadata({ metadata }: SongMetadataProps) {
  return (
    <Box>
      <Text>
        专辑: <span data-testid="audio-meta-album-name">{metadata.album}</span>
      </Text>
      <Text>
        艺术家: <span data-testid="audio-meta-song-artist">{metadata.artist}</span>
      </Text>
      <Text>
        专辑艺术家: <span data-testid="audio-meta-album-artist">{metadata.albumArtist}</span>
      </Text>
    </Box>
  );
}
