import { Routes, Route, Navigate } from 'react-router-dom';
import ContractorLayout from '../layouts/ContractorLayout';

import Dashboard from '../pages/contractor/Dashboard';
import Profile from '../pages/contractor/Profile';
import FindWork from '../pages/contractor/FindWork';
import Messages from '../pages/contractor/Messages';
import Tasks from '../pages/Client/Tasks';

export default function ContractorRoutes() {
  return (
    <Routes>
      <Route element={<ContractorLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="find-work" element={<FindWork />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="messages" element={<Messages />} />
      </Route>
    </Routes>
  );
}
