import {Box, Button, Text, TextField, Image} from '@skynexui/components';
import appConfig from '../config.json';

function GlobalStyle() {
  return (
    <style global jsx>{`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        transition: background-image .4s;
    }
    body {
      font-family: 'Open Sans', sans-serif;
    }
    /* App fit Height */ 
    html, body, #__next {
      min-height: 100vh;
      display: flex;
      flex: 1;
    }
    #__next {
      flex: 1;
    }
    #__next > * {
      flex: 1;
    }
    /* ./App fit Height */
    ::selection {
      color: ${appConfig.theme.colors.neutrals['800']};
      background: ${appConfig.theme.colors.primary['500']};
    }
    input{
      caret-color: ${appConfig.theme.colors.primary['500']};
    }
    `}</style>
  )
}

function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag}{
          color: ${appConfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

// function HomePage() {
//   // JSX
//   return (
//     <div>
//       <GlobalStyle />
//       <Titulo tag="h4">TEstezinho da massa</Titulo>
//       <h2>Discord - Alura</h2>
//     </div>
//   )
// }

// export default HomePage

export default function PaginaInicial() {
  const username = 'natalia-fs';

  return (
    <>
      <GlobalStyle />
      <div className="video-container">
        <video
          className="video-content"
          src={appConfig.theme.backgrounds[Math.floor(Math.random() * 4)]}
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
          /* min-width: 100%;  */
          min-height: 100%;
        }
      `}</style>

      </div>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          // backgroundColor: `{appConfig.theme.colors.neutrals['opacity']}`,
          backgroundImage: {
            xs: `url(${appConfig.theme.backgroundMobile}), radial-gradient(transparent 5%, ${appConfig.theme.colors.neutrals[900]} 75%)`,
            md:`radial-gradient(transparent 5%, ${appConfig.theme.colors.neutrals[900]} 75%)`
          },
          // backgroundImage: 'url(https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/39487e103630221.5f510ae93e47f.gif)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            border: `1px solid ${appConfig.theme.colors.primary['200']}`,
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 3px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals["opacity"],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            <TextField
              autoComplete="off"
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.primary[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}