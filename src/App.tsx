import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage } from "./pages/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/reset-password" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;