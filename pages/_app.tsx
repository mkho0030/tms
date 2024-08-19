import { CssBaseline } from "@mui/material";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import { Providers } from "../logics/providers";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import Layout from "./layout";

// Typing to integrate layouts with pages
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

//Component for the default layout
const mainLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || mainLayout;

  return (
    <Providers>
      <CssBaseline />
      {getLayout(<Component {...pageProps} />)}
    </Providers>
  );
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppInitialProps> => {
  const ctx = await App.getInitialProps(context);

  return { ...ctx };
};
