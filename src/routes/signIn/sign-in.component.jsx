import { useEffect } from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  auth,
} from "../../utils/firebase/firebase.utils";
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sing-up-form.component";
import Button from "../../components/button/button.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const createdUser = await createUserDocumentFromAuth(user);
    console.log("createdUser : ", createdUser);
  };

  return (
    <div>
      <h1>This is from Sign-In</h1>
      <Button onClick={logGoogleUser}>Sign-in with Google</Button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
