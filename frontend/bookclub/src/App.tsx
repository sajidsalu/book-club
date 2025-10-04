import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Authors from "./pages/Authors";
import Books from "./pages/Books";
import Layout from "./components/Layout";
import AuthorDetails from "./pages/AuthorDetails";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/authors" replace />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/authors/:id/books" element={<AuthorDetails />} />
          <Route path="/books" element={<Books />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
