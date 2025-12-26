import { NavLink, Outlet } from 'react-router-dom';

const menu = [
  { name: 'Dashboard', path: '/contractor/dashboard' },
  { name: 'Profile', path: '/contractor/profile' },
  { name: 'Find Work', path: '/contractor/find-work' },
  { name: 'Tasks', path: '/contractor/tasks' },
  { name: 'Messages', path: '/contractor/messages' },
];

export default function ContractorLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-6 text-xl font-bold text-indigo-600">
          WorkRoute
        </div>

        <nav className="px-4 space-y-1">
          {menu.map((m) => (
            <NavLink
              key={m.path}
              to={m.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-sm ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'hover:bg-gray-100'
                }`
              }
            >
              {m.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
