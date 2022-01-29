import { Box, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export function Loading() {
  return (
    <Box 
      styleSheet={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Image
        styleSheet={{
          maxHeight: '18rem',
          filter: 'grayscale(.2)',
          animation: 'spinner 3s infinite linear'
        }}
        src={appConfig.loader}
      />
    </Box>
  )
}