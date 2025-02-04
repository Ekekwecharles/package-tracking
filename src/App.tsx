import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Track from "./pages/Track";
import { movePackage } from "./utils/movePackage";

const App: React.FC = () => {
  setInterval(() => {
    movePackage("TRKY7L6LIIW"); // Replace with real tracking codes
  }, 1000); // Moves every 10 minutes

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/track" element={<Track />} />
      </Routes>
    </Router>
  );
};

export default App;
