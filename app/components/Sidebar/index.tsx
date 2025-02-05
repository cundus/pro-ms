import {
  Menu,
  MenuItem,
  Sidebar as ReactProSidebar,
  SubMenu,
} from 'react-pro-sidebar'
import { Icon } from '@iconify-icon/react'
import { Link } from '@remix-run/react'

const Sidebar = () => {
  return (
    <ReactProSidebar
      backgroundColor="#0F4C75"
      rootStyles={{
        color: '#fff',
      }}
      style={{ height: '100vh' }}
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active }) => {
            if (level === 0 || level === 1) {
              return {
                color: active ? 'white' : undefined,
                '&:hover': {
                  backgroundColor: '#003D4D',
                  color: 'white',
                },
              }
            }
          },
          subMenuContent: {
            backgroundColor: '#0F4C75',
          },
        }}
      >
        <MenuItem component={<Link to="/dashboard" />}>Dashboard</MenuItem>
        <SubMenu
          title="Admin"
          label="Admin"
          icon={<Icon icon="lucide:layout-dashboard" width="24" height="24" />}
        >
          <MenuItem>Admin</MenuItem>
          <MenuItem>Users</MenuItem>
        </SubMenu>
      </Menu>
    </ReactProSidebar>
  )
}

export default Sidebar
