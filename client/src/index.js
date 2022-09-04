import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { mode } from "@chakra-ui/theme-tools"


const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = extendTheme({
  components: {
    Radio: { // can be Radio
      baseStyle: {
        container: {
          touchAction: 'none',
        },
      },
    },
  },
  styles: {
    global: (props) => ({
      "html, body": {
        background: mode("#bbdefb", "#1D1C54")(props),  //mode(light mode color, dark mode color)
      },
    }),
  },
});

root.render(
  <ChakraProvider theme={extendTheme(theme)}>
    <App />
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
