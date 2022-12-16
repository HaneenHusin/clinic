import type { NextPage } from 'next'
import Welcome from "./welcome";
import SignIn from "./sign_in";
import StepsDemo from "./steps";
import {getCookie} from "../src/services/cookies_file";
import { MainAdmin} from "./admin/main_admin";
import ArticleAdmin from './admin/article_admin';
import { ReactElement } from 'react';
import Layout from '../src/components/layout';
import { LoadingProgressProvider } from '../src/components/LoadingProgressContext ';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    //  <ArticleAdmin />
 <Welcome /> 
   // <SignIn />
  // <StepsDemo />
    // <MainAdmin />
  // <SignIn />
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
      <Layout>
          <LoadingProgressProvider>
        {page}
          </LoadingProgressProvider> 
      </Layout>
  )
}



export default Home

