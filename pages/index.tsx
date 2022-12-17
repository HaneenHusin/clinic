import type { NextPage } from 'next'
import Welcome from "./welcome";
import SignIn from "./sign_in";
import StepsDemo from "./steps";
import {getCookie} from "../src/services/cookies_file";
import ArticleAdmin from './admin/article_admin';
import { ReactElement } from 'react';
import Layout from '../src/components/layout';
import { LoadingProgressProvider } from '../src/components/LoadingProgressContext ';
import { NextPageWithLayout } from './_app';
import MainAdmin from './admin/main_admin';

const Home: NextPage = () => {
  return (

  //  <Welcome />
   <SignIn />
  // <StepsDemo />
  )
}

export default Home
