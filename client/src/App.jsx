import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import WatchPage from "./components/WatchPage";
import ChannelPage from "./pages/ChannelPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/watch/:videoId" element={<WatchPage />} />
      <Route path="/channel/:username" element={<ChannelPage />} />
      </Routes>
  );
}

export default App;
