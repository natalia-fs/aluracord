import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { useState, useEffect } from 'react';
import appConfig from '../config.json';

export default function ChatPage() {

  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  
  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      id: (new Date()).getTime(),
      de: 'natalia-fs',
      horario: (new Date().toLocaleString()),
      texto: novaMensagem,
    }
    setMensagens([mensagem, ...mensagens,]);
    setMensagem('');
  }
  
  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(${appConfig.theme.backgroundDesktop})`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals['opacity'],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals['opacity-2'],
            flexDirection: 'column',
            borderRadius: '4px',
            padding: '12px',
          }}
        >

          <MessageList mensagens={mensagens} />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                setMensagem(event.target.value)
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  if(mensagem.trim() !== '') handleNovaMensagem(mensagem)
                  else setMensagem('');
                }
              }}

              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              disabled={!mensagem}
              onClick={() => {
                if(mensagem.trim() !== '') handleNovaMensagem(mensagem)
                else setMensagem('');
              }}
              iconName="paperPlane"
              rounded="none"
              buttonColors={{
                contrastColor: `${appConfig.theme.colors.primary[500]}`,
                mainColor: `${appConfig.theme.colors.neutrals[800]}`,
                mainColorLight: `${appConfig.theme.colors.neutrals[600]}`,
                mainColorStrong: `${appConfig.theme.colors.neutrals[900]}`
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading5'>
          Chat
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href="/"
        />
      </Box>
    </>
  )
}

function MessageList(props) {
  // console.log('MessageList', props);
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: '16px',
      }}
    >
      {
        props.mensagens.map((mensagem) => {
          return (
            <Text
              key={mensagem.id}
              tag="li"
              styleSheet={{
                borderRadius: '5px',
                padding: '6px',
                marginBottom: '4px',
                marginRight: '8px',
                hover: {
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                }
              }}
            >
              <Box
                styleSheet={{
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Image
                  styleSheet={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '8px',
                  }}
                  src={`https://github.com/${mensagem.de}.png`}
                />
                <Text tag="strong">
                  <Text
                    tag="a"
                    href={`https://github.com/${mensagem.de}.png`}
                    target='_blank'
                    styleSheet={{
                      color: appConfig.theme.colors.neutrals[200],
                      textDecoration: 'none',
                      hover: {
                        color: appConfig.theme.colors.primary[500],
                      }
                    }}
                  >
                    {mensagem.de}
                  </Text>
                </Text>
                <Text
                  styleSheet={{
                    fontSize: '10px',
                    marginLeft: '8px',
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {mensagem.horario}
                </Text>
              </Box>
              <Text
                styleSheet={{
                  fontSize: '14px',
                }}
              >
                {mensagem.texto}
              </Text>
            </Text>
          )
        })
      }
    </Box>
  )
}