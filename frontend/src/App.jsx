// import { useState } from "react";
// import Layout from "./components/Layout";
// import Dashboard from "./components/Dashboard";
// import TaskTable from "./components/taskTable";

// function App() {
//   const [page, setPage] = useState("dashboard");

//   return (
//     <Layout setPage={setPage}>
//       {page === "dashboard" ? <Dashboard /> : <TaskTable />}
//     </Layout>
//   );
// }

// export default App;
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import TaskTable from "./components/taskTable";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<TaskTable />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

