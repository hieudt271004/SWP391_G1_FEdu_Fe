import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LoginPage } from "./login/LoginPage";
import { RegisterPage } from "./register/RegisterPage";
import { ForgotPassword } from "./forgot/ForgotPassword";
import { ForgotSuccess } from "./forgot/ForgotSuccess";
import { GoogleAuthPage } from "./google/GoogleAuthPage";
import { TermsPage } from "./terms/TermsPage";
import { PrivacyPage } from "./privacy/PrivacyPage";
import { ResetPasswordPage } from "./reset/ResetPasswordPage";
import { ResetSuccessPage } from "./reset/ResetSuccessPage";
import { Screen, RegisterFormData, defaultRegisterForm } from "./types";
export function AuthPage() {
  const location = useLocation();

  const initialScreen: Screen =
    location.pathname === "/reset-password" ? "reset-password" : "login";

  const [screen, setScreen] = useState<Screen>(initialScreen);
  const [prevScreen, setPrevScreen] = useState<Screen>("login");
  const [resetEmail, setResetEmail] = useState<string>("");
  const [registerForm, setRegisterForm] = useState<RegisterFormData>(defaultRegisterForm);

  useEffect(() => {
    if (location.pathname === "/reset-password") {
      setScreen("reset-password");
    }
  }, [location.pathname]);

  const handleChangeScreen = (newScreen: Screen) => {
    setPrevScreen(screen);
    setScreen(newScreen);
  };

  if (screen === "login") return <LoginPage onChangeScreen={handleChangeScreen} />;
  if (screen === "register")       return <RegisterPage 
                                          onChangeScreen={handleChangeScreen} 
                                          form={registerForm}
                                          setForm={setRegisterForm}
                                        />;
  if (screen === "forgot") return <ForgotPassword onChangeScreen={handleChangeScreen} onSaveEmail={setResetEmail} />;
  if (screen === "forgot-success") return <ForgotSuccess onChangeScreen={handleChangeScreen} userEmail={resetEmail} />;
  if (screen === "google") return <GoogleAuthPage prevScreen={prevScreen} onChangeScreen={handleChangeScreen} />;
  if (screen === "terms") return <TermsPage prevScreen={prevScreen} onChangeScreen={handleChangeScreen} />;
  if (screen === "privacy") return <PrivacyPage prevScreen={prevScreen} onChangeScreen={handleChangeScreen} />;
  if (screen === "reset-password") return <ResetPasswordPage onChangeScreen={handleChangeScreen} />;
  if (screen === "reset-success") return <ResetSuccessPage onChangeScreen={handleChangeScreen} />;

  return null;
}