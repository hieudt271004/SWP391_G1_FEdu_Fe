import { useState } from "react";
import { Screen } from "./types";
import { LoginPage } from "./login/LoginPage";
import { RegisterPage } from "./register/RegisterPage";
import { ForgotPassword } from "./forgot/ForgotPassword";
import { ForgotSuccess } from "./forgot/ForgotSuccess";
import { GoogleAuthPage } from "./google/GoogleAuthPage";
import { TermsPage } from "./terms/TermsPage";

export function AuthPage() {
  const [screen, setScreen] = useState<Screen>("login");
  const [prevScreen, setPrevScreen] = useState<Screen>("login");

  const handleChangeScreen = (newScreen: Screen) => {
    setPrevScreen(screen);
    setScreen(newScreen);
  };

  if (screen === "login")          return <LoginPage onChangeScreen={handleChangeScreen} />;
  if (screen === "register")       return <RegisterPage onChangeScreen={handleChangeScreen} />;
  if (screen === "forgot")         return <ForgotPassword onChangeScreen={handleChangeScreen} />;
  if (screen === "forgot-success") return <ForgotSuccess onChangeScreen={handleChangeScreen} />;
  if (screen === "google")         return <GoogleAuthPage prevScreen={prevScreen} onChangeScreen={handleChangeScreen} />;
  if (screen === "terms")          return <TermsPage prevScreen={prevScreen} onChangeScreen={handleChangeScreen} />;

  return null;
}