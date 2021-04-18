import { useEffect, ComponentType } from 'react'
import { Provider } from 'react-redux'
import { AppInitialProps } from 'next/app'
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import store from '../src/store'
import "../src/global.css";

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: ComponentType<AppInitialProps>
  pageProps: AppInitialProps
}) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);
  return (
    <Provider store={store}>
      <AnimatePresence exitBeforeEnter>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </AnimatePresence>
    </Provider>
  );
}

export default MyApp
