import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {

    const token = localStorage.getItem("token");

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={
                        <Navigate
                            to={token ? "/feed" : "/login"}
                            replace
                        />
                    }
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/feed"
                        element={<Feed />}
                    />

                    <Route
                        path="/profile"
                        element={
                            <>
                                <Navbar />
                                <Profile />
                            </>
                        }
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;