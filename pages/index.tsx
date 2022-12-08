import type { NextPage } from 'next'
import Welcome from "./welcome";
import SignIn from "./sign_in";
import StepsDemo from "./steps";
import {getCookie} from "./services/lang_cookies";

const Home: NextPage = () => {
  return (

   <Welcome />
   // <SignIn />
  // <StepsDemo />
  )
}

export default Home
