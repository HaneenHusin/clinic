import type { NextPage } from 'next'
import router from 'next/router';
import { useRecoilState } from 'recoil';
import { myDirectionState } from '../Atoms/localAtoms';
import SignIn from './sign_in'


const Home: NextPage = (props) => {
  const [dirState,setDirState] = useRecoilState(myDirectionState);
     setDirState(props.dir)
  return (

  //  <Welcome />
   <SignIn />
  // <StepsDemo />
  )
}


export default Home

