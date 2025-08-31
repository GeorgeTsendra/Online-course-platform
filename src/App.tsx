import { useRef } from "react";
import { AppStore, makeStore } from "./redux/store";
import { Provider } from "react-redux";
import Login from "./pages/login/Login";
import Courses from "./pages/courses/Courses";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import ToastListener from "./components/ToastListener/ToastListener";
import Register from "./pages/register/Register";

function App() {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected block */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Courses />} />
            <Route path="/courses" element={<Courses />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastListener />
    </Provider>
  );
}

export default App;
