import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import LoginForm from "./pages/LoginForm"
import NotFound from "./pages/NotFound"
import SignUpForm from "./pages/SignUpForm"

function App() {
  return (
    <Router> {/* Agrega el componente Router */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
