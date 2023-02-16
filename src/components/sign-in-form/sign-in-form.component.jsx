import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetUser = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await signInAuthUserWithEmailAndPassword(email,password);
        resetUser();
    } catch (error) {
      if(error.code === 'auth/wrong-password'){
        alert('incorrect password for email');
      }else if(error.code === 'auth/user-not-found'){
        alert('no user associated with this email');
      }else{
        console.log('error encounted : ', error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sing In</Button>
          <Button buttonType="google" onClick={signInWithGoogleUser}>
            Sign-in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
