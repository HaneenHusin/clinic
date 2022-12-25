
import type { NextPage } from 'next'
import { ReactElement } from 'react';
import { useRecoilState } from 'recoil';
import { myDirectionState } from '../Atoms/localAtoms';
import Layout from '../src/components/layout';
import SignIn from './sign_in'
import Welcome from './welcome';
import { NextPageWithLayout } from './_app';


const Home: NextPageWithLayout = (props) => {
  const [dirState,setDirState] = useRecoilState(myDirectionState);
     setDirState(props.dir)
  return (

  <Welcome />
  //  <SignIn />
  // <StepsDemo />
  )
}
Home.getLayout = function getLayout(page: ReactElement) {
  return (
      <Layout>
          {page}
      </Layout>
  )
}

export default Home