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
    input, textarea{
      caret-color: ${appConfig.theme.colors.primary['500']};
    }
    ul.sknui-ul::-webkit-scrollbar{
      width: 10px;
    }
    ul.sknui-ul::-webkit-scrollbar-track{
      background: ${appConfig.theme.colors.neutrals['800']}; 
      border-radius: 4px;
    }
    ul.sknui-ul::-webkit-scrollbar-thumb{
      background: ${appConfig.theme.colors.primary['500']};
      border-radius: 4px; 
    }
    `}</style>
  )
}

export default function App({Component, pageProps}){
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps}/>
    </>
  )
}