import type { NextPage } from 'next'
import Welcome from "./welcome";
import SignIn from "./sign_in";
import StepsDemo from "./quize";
import {getCookie} from "../src/services/cookies_file";
import ArticleAdmin from './admin/article';
import { ReactElement } from 'react';
import Layout from '../src/components/layout';
import { LoadingProgressProvider } from '../src/components/LoadingProgressContext ';
import { NextPageWithLayout } from './_app';

const Home: NextPage = () => {
  return (

  //  <Welcome />
   <SignIn />
  // <StepsDemo />
  )
}

export default Home
