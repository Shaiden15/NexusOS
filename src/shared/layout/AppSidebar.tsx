import { NavLink } from 'react-router-dom'
import { PRIMARY_NAV } from '@constants/navigation'
import { useAppStore } from '@app/store'

export const AppSidebar = () => {
  const user = useAppStore((state) => state.user)

  return (
    <aside className="sidebar">
      <div>
        <h2 style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.85rem' }}>NexusOS</h2>
        <p style={{ opacity: 0.7 }}>Control center</p>
      </div>
      <nav className="sidebar__nav">
        {PRIMARY_NAV.map((item) => {
          // Hide Settings link from non-admin users
          if (item.path === '/settings' && user?.role !== 'admin') {
            return null
          }
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              end
            >
              {item.label}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
