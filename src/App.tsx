import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import HomePage from "@/pages/Home";
import AboutPage from "@/pages/About";
import ServicesPage from "@/pages/Services";
import ContactPage from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import AdminLogin from "@/pages/admin/Login";
import AdminLayout from "@/pages/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Messages from "@/pages/admin/Messages";
import AdminServices from "@/pages/admin/Services";
import AdminSettings from "@/pages/admin/Settings";
import ServiceDetail from "@/pages/ServiceDetail";
import { useSettings } from "./hooks/useSettings";
import useContactStore from "./store/ContactStore";
import { useEffect } from "react";

export default function App() {
  const { data, isLoading } = useSettings();
  const setContact = useContactStore((s) => s.setData);

  useEffect(() => {
    if (!isLoading && data) {
      setContact(data);
    }
  }, [isLoading, data]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}
