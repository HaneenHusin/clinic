import type { NextPage } from 'next'
import Welcome from "./welcome";
import SignIn from "./sign_in";
import StepsDemo from "./steps";
import {getCookie} from "../src/services/lang_cookies";
import { MainAdmin} from "./admin/main_admin";

const Home: NextPage = () => {
  return (

<Welcome />
   // <SignIn />
  // <StepsDemo />
    // <MainAdmin />
  )
}

export default Home
