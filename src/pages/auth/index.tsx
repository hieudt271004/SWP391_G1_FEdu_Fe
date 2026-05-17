import { useState } from "react";
import { Screen } from "./types";
import { LoginPage } from "./login/LoginPage";
import { RegisterPage } from "./register/RegisterPage";
import { ForgotPassword } from "./forgot/ForgotPassword";
import { ForgotSuccess } from "./forgot/ForgotSuccess";

export function AuthPage() {
  const [screen, setScreen] = useState<Screen>("login");

  const handleChangeScreen = (newScreen: Screen) => {
    setScreen(newScreen);
  };

  if (screen === "login") return <LoginPage onChangeScreen={handleChangeScreen} />;
  if (screen === "register") return <RegisterPage onChangeScreen={handleChangeScreen} />;
  if (screen === "forgot") return <ForgotPassword onChangeScreen={handleChangeScreen} />;
  return <ForgotSuccess onChangeScreen={handleChangeScreen} />;
}