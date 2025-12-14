import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loader from './components/Loader';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
// const ClientDashboard = lazy(() => import('./pages/ClientDashboard'));
// const ContractorDashboard = lazy(() => import('./pages/ContractorDashboard'));
// const TaskDetails = lazy(() => import('./pages/TaskDetails'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* default */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* dashboards */}
          {/* <Route path="/client" element={<ClientDashboard />} />
          <Route path="/contractor" element={<ContractorDashboard />} /> */}

          {/* task */}
          {/* <Route path="/tasks/:id" element={<TaskDetails />} /> */}

          {/* fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
