import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./store/AppContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Explore from "./pages/Explore";
import Compare from "./pages/Compare";
import Dashboard from "./pages/Dashboard";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result/:id" element={<Result />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
