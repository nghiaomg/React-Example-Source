import React, { useState } from 'react';
import MasterLayout from '../components/layouts/MasterLayouts';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Button,
  Avatar,
  Typography,
  Tooltip
} from '@mui/material';
import {
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiUserPlus,
  FiFilter,
  FiMoreVertical
} from 'react-icons/fi';
import UserForm from '../components/form/users/UserForm';

// Mock data
const mockUsers = [
  {
    id: 1,
    avatar: 'https://i.pravatar.cc/150?img=1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-01-20 14:30',
    joinDate: '2023-12-01'
  },
  // ... thêm nhiều users khác
].concat(Array(15).fill(null).map((_, index) => ({
  id: index + 2,
  avatar: `https://i.pravatar.cc/150?img=${index + 2}`,
  name: `User ${index + 2}`,
  email: `user${index + 2}@example.com`,
  role: index % 3 === 0 ? 'Admin' : index % 3 === 1 ? 'Editor' : 'User',
  status: index % 2 === 0 ? 'Active' : 'Inactive',
  lastLogin: '2024-01-20 14:30',
  joinDate: '2023-12-01'
})));

const Users = () => {
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenForm = (user = null) => {
    setSelectedUser(user);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedUser(null);
  };

  const handleSubmitForm = (values) => {
    // Handle form submission
    console.log('Form submitted:', values);
    if (selectedUser) {
      console.log('Updating user:', selectedUser.id);
      // Update user logic
    } else {
      console.log('Creating new user');
      // Create user logic
    }
    handleCloseForm();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return { color: 'success', bg: '#e6f4ea' };
      case 'inactive':
        return { color: 'error', bg: '#fde7e7' };
      default:
        return { color: 'default', bg: '#f5f5f5' };
    }
  };

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return { color: '#1976d2', bg: '#e3f2fd' };
      case 'editor':
        return { color: '#9c27b0', bg: '#f3e5f5' };
      default:
        return { color: '#2e7d32', bg: '#e8f5e9' };
    }
  };

  return (
    <MasterLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3 
        }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Users Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<FiUserPlus />}
            onClick={() => handleOpenForm()}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3
            }}
          >
            Add User
          </Button>
        </Box>

        {/* Search and Filter */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          mb: 3,
          flexWrap: 'wrap'
        }}>
          <TextField
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch />
                </InputAdornment>
              ),
            }}
            sx={{ 
              minWidth: 300,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FiFilter />}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none'
            }}
          >
            Filters
          </Button>
        </Box>

        {/* Users Table */}
        <Paper sx={{ 
          width: '100%', 
          overflow: 'hidden',
          borderRadius: 2,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
        }}>
          <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell>Join Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow hover key={user.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar src={user.avatar} alt={user.name} />
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {user.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          size="small"
                          sx={{ 
                            backgroundColor: getRoleColor(user.role).bg,
                            color: getRoleColor(user.role).color,
                            fontWeight: 500
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.status}
                          size="small"
                          color={getStatusColor(user.status).color}
                          sx={{ 
                            backgroundColor: getStatusColor(user.status).bg,
                            fontWeight: 500
                          }}
                        />
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit">
                          <IconButton 
                            size="small" 
                            sx={{ mr: 1 }}
                            onClick={() => handleOpenForm(user)}
                          >
                            <FiEdit2 size={18} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" sx={{ mr: 1 }}>
                            <FiTrash2 size={18} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="More">
                          <IconButton size="small">
                            <FiMoreVertical size={18} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        {/* User Form Modal */}
        <UserForm
          open={openForm}
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
          initialData={selectedUser}
        />
      </Box>
    </MasterLayout>
  );
};

export default Users;
