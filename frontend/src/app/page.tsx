

import IsAuth from "../providers/is.auth";
import LoginForm from "./components/login.form";




export default function Home() {


  return (
    <IsAuth>
      <main className="bg-login">
        
        <LoginForm></LoginForm>
      </main>
    </IsAuth>
  );
}
