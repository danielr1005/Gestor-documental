import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Documents from "./Documents";
import SearchDocuments from "./SearchDocument";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/registro"
        element={<Register />}
      />

    <Route
        path="/home"
        element={<Home />}
      />

      
    <Route
        path="/documentos"
        element={<Documents />}
      />

      <Route
        path="/busqueda"
        element={<SearchDocuments />}
      />

    </Routes>
  );
}

export default App;