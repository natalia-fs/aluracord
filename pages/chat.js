import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { useState, useEffect } from 'react';
import appConfig from '../config.json';
import {createClient} from '@supabase/supabase-js';
import Cookies from 'js-cookie';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'
import {Loading} from '../src/components/Loading'

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function escutaMensagensEmTempoReal(addMensagem){
  return supabaseClient.from('mensagens')
  .on('INSERT', (response) => {
    addMensagem(response.new);
  }).subscribe()
}

export default function ChatPage() {
  const username = Cookies.get('arcanecord_username') || 'natalia-fs';
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  
  useEffect(() => {
    supabaseClient
    .from('mensagens')
    .select('*')
    .order('id', {ascending: false})
    .then(({data, error}) => {
      setMensagens(data)
      if(error) console.error(error);
    });

    const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
      setMensagens((valorAtualizado) => {
        return [
          novaMensagem,
          ...valorAtualizado
        ]}
      )
    })

    return () => {
      subscription.unsubscribe();
    }
    
  }, []);
  
  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      // id: (new Date()).getTime(),
      // horario: (new Date().toLocaleString()),
      de: username,
      texto: novaMensagem,
    }
    supabaseClient
      .from('mensagens')
      .insert([
        mensagem
      ])
      .then(({data})=>{
        console.log(data);
      })
    // setMensagens([mensagem, ...mensagens,]);
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
        <Header username={username} />
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
          { mensagens.length == 0
            ? (<Loading />)
            : (<MessageList mensagens={mensagens} username={username} />)
          }

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
                color: appConfig.theme.colors.primary[300],
              }}
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.primary[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <ButtonSendSticker
              onStickerClick={(sticker) => {
                handleNovaMensagem(`:sticker: ${sticker}`)
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
              styleSheet={{
                borderRadius: '50%',
                padding: '0 3px 0 0',
                minWidth: '50px',
                minHeight: '50px',
                fontSize: '20px',
                margin: '0 8px',
                lineHeight: '0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header({username}) {
  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading5'>
          ArcaneCord - Chat
        </Text>
        <Box styleSheet={{display: 'flex', alignItems: 'center'}}>
          <Image
            src={`https://github.com/${username}.png`}
            styleSheet={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              display: 'inline-block',
              marginRight: '8px',
              transition: 'ease .2s',
              hover: {
                width: '36px',
                height: '36px'
              }
            }}
          />
          <Button
            variant='tertiary'
            colorVariant='neutral'
            label='Logout'
            href="/"
          />
        </Box>
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
                display: 'flex', flexDirection: 'column',
                alignItems: mensagem.de == props.username ? 'flex-end' : 'flex-start',
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
                  maxWidth: '80vw'
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
                    href={`https://github.com/${mensagem.de}`}
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
                  {new Date(mensagem.created_at).toLocaleString('pt-BR', {dateStyle: 'short',timeStyle: 'short'})}
                </Text>
              </Box>
              <Text
                styleSheet={{
                  fontSize: '14px',
                  wordBreak: 'break-word'
                }}
              >
                {mensagem.texto.startsWith(':sticker:')
                  ? (<Image styleSheet={{maxWidth: '7rem'}} src={mensagem.texto.replace(':sticker:','')} />)
                  : (mensagem.texto) }
              </Text>
            </Text>
          )
        })
      }
    </Box>
  )
}