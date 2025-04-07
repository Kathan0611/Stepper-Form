import "./App.css";
import Header from "./Components/Header/Header";
import SideBar from "./Components/Sidebar/SideBar";
import { Routes, Route } from "react-router-dom";
import AddGobal from "./Pages/AddGoal";
import NotFound from "./Pages/NotFound/NotFound";
import GoalCard from "./Pages/GoalCard/GoalCard";
import EditGoal from "./Pages/EditCard/EditGoal";

function App() {
  return (
    <div className="app-container">
      {/* Sidebar Section */}
      <SideBar />

      {/* Main Content Section */}
      <div className="main-content">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/goals/add" element={<AddGobal />} />
            <Route path="/goalcard" element={<GoalCard />} />
            <Route path="/goals/edit/:id" element={<EditGoal />} />
            <Route path="*" element={<NotFound />} /> {/* Fallback route */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
