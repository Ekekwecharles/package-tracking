import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Track from "./pages/Track";
// import { movePackage } from "./utils/movePackage";
import Update from "./pages/Update";

const App: React.FC = () => {
  // setInterval(() => {
  //   movePackage("TRKA38UNIB8"); // Replace with real tracking codes
  // }, 1000); // Moves every 10 minutes

  // setInterval(() => {
  //   movePackage("TRACKING_CODE_HERE");
  // }, 600000);

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/track" element={<Track />} />
        <Route path="/update" element={<Update />} />
      </Routes>
    </Router>
  );
};

export default App;
