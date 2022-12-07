import type { NextPage } from 'next'
import Welcome from "./src/views/welcome";
import SignIn from "./src/views/sign_in";
import StepsDemo from "./src/views/steps";

const Home: NextPage = () => {
  return (
   <Welcome />
   // <SignIn />
   // <StepsDemo />
  )
}

export default Home
