import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouterLayout } from "../layouts/RouterLayout";
import HomeView from "../pages/home/HomeView";
import LoginView from "../pages/auth/login/Login";
import DesigView from "../pages/designer/DesignerView";
import ProtectedRoute from "../security/ProtectedRoute";
import DesignerSubView from "../pages/designer/DesignerSubView";
import DesignerInfoView from "../pages/designer/DesignerInfoView";

export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RouterLayout/>}>
                    <Route path="/" element={<HomeView/>} />
                    <Route path="/login" element={<LoginView/>} />
                    <Route path="/designs" element={<ProtectedRoute component={DesigView} />} />
                    <Route path="/design/:id" element={<ProtectedRoute component={DesignerSubView} />} />
                    <Route path="/design/info/:id" element={<ProtectedRoute component={DesignerInfoView} />} />
                </Route>
            </Routes>
        </Router>
    );
};