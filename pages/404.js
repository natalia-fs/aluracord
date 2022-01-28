import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';

function NotFound() {
  return (
    <>
      <div className="video-container">
        <video
          className="video-content"
          src={`${appConfig.theme.backgrounds[4]}`}
          // src={appConfig.theme.backgrounds[Math.floor(Math.random() * 4)]}
          autoPlay muted loop
        ></video>
        <style jsx>{`
        .video-container{
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: center;
          z-index: -10;
          position: absolute;
          width: 100vw;
          height: 100vh;
        }
        video.video-content{
          position: fixed;
          right: 0;
          bottom: 0;
          min-height: 100%;
        }
      `}</style>
      </div>

      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          // backgroundColor: `{appConfig.theme.colors.neutrals['opacity']}`,
          backgroundImage: {
            xs: `url(${appConfig.theme.backgroundMobile2}), radial-gradient(transparent 20%, ${appConfig.theme.colors.neutrals[900]} 50%)`,
            md: `radial-gradient(transparent 5%, ${appConfig.theme.colors.neutrals[900]} 75%)`
          },
          // backgroundImage: 'url(https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/39487e103630221.5f510ae93e47f.gif)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: {
              xs: 'column',
            },
            width: '100%', maxWidth: '700px',
            border: `1px solid ${appConfig.theme.colors.primary['200']}`,
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 3px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals["opacity"],
          }}
        >
          <Text tag="a" href="/" styleSheet={{display: 'flex', justifyContent: 'center'}}>
            <Image
              tag="a"
              styleSheet={{
                margin: '1rem .5rem 2rem .5rem',
                borderRadius: '5px', padding: '1rem', margin: '16px',
                width: '40%',
                filter: `drop-shadow(1px 1px 11px ${appConfig.theme.colors.primary[200]})`,
                transition: 'ease-in .4s',
                hover: {
                  filter: `drop-shadow(1px 1px 11px ${appConfig.theme.colors.primary[400]})`,
                  transform: 'scale(1.1)'
                }
                }
              }
              src="./arcanecord.png"
            />
          </Text>
          <Text variant='heading3'
            styleSheet={{
              color: appConfig.theme.colors.primary['200'],
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '4px',
              marginRight: '8px',
              transition: 'ease .8s',
              hover: {
                color: appConfig.theme.colors.neutrals[100],
              }
            }}
          >
            404 | Página não encontrada
          </Text>
        </Box>
      </Box>
    </>
  )
}

export default NotFound;