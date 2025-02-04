import {
  Menu,
  MenuItem,
  Sidebar as ReactProSidebar,
  SubMenu,
} from 'react-pro-sidebar'

const Sidebar = () => {
  return (
    <ReactProSidebar>
      <Menu>
        <MenuItem>Dashboard</MenuItem>
        <SubMenu title="Users">
          <MenuItem>Admin</MenuItem>
          <MenuItem>Users</MenuItem>
        </SubMenu>
      </Menu>
    </ReactProSidebar>
  )
}

export default Sidebar
