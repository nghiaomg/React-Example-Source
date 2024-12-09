import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Avatar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  Switch,
  FormControlLabel,
  Typography
} from '@mui/material';
import { FiUpload, FiX } from 'react-icons/fi';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name should be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  role: Yup.string()
    .required('Role is required'),
  password: Yup.string()
    .when('isEditing', {
      is: false,
      then: () => Yup.string()
        .required('Password is required')
        .min(6, 'Password should be at least 6 characters'),
      otherwise: () => Yup.string()
    }),
  confirmPassword: Yup.string()
    .when('password', {
      is: val => val && val.length > 0,
      then: () => Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
    })
});

const UserCreateForm = ({ open, onClose, initialData = null }) => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  
  const formik = useFormik({
    initialValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      role: initialData?.role || '',
      status: initialData?.status === 'Active' || true,
      password: '',
      confirmPassword: '',
      avatar: null,
      isEditing: !!initialData
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log('Form values:', values);
      onClose();
    },
  });

  useEffect(() => {
    if (initialData?.avatar) {
      setAvatarPreview(initialData.avatar);
    }
  }, [initialData]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue('avatar', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    formik.setFieldValue('avatar', null);
    setAvatarPreview(null);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {initialData ? 'Edit User' : 'Create New User'}
        <IconButton onClick={onClose} size="small">
          <FiX />
        </IconButton>
      </DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* Avatar Upload */}
            <Grid item xs={12}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1
              }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    src={avatarPreview}
                    sx={{ width: 80, height: 80 }}
                  />
                  <input
                    accept="image/*"
                    type="file"
                    id="avatar-upload"
                    hidden
                    onChange={handleAvatarChange}
                  />
                  <label htmlFor="avatar-upload">
                    <IconButton 
                      component="span"
                      sx={{ 
                        position: 'absolute',
                        bottom: -8,
                        right: -8,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'primary.dark'
                        }
                      }}
                      size="small"
                    >
                      <FiUpload size={14} />
                    </IconButton>
                  </label>
                  {avatarPreview && (
                    <IconButton
                      size="small"
                      onClick={handleRemoveAvatar}
                      sx={{ 
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        backgroundColor: 'error.light',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'error.main'
                        }
                      }}
                    >
                      <FiX size={14} />
                    </IconButton>
                  )}
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Recommended: 200x200px
                </Typography>
              </Box>
            </Grid>

            {/* Name Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Full Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            {/* Email Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            {/* Role Select */}
            <Grid item xs={12}>
              <FormControl 
                fullWidth
                error={formik.touched.role && Boolean(formik.errors.role)}
              >
                <InputLabel>Role</InputLabel>
                <Select
                  id="role"
                  name="role"
                  value={formik.values.role}
                  label="Role"
                  onChange={formik.handleChange}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Editor">Editor</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </Select>
                {formik.touched.role && formik.errors.role && (
                  <FormHelperText>{formik.errors.role}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Password Fields - Only show in create mode or when changing password */}
            {(!initialData || formik.values.changePassword) && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  />
                </Grid>
              </>
            )}

            {/* Status Switch */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.status}
                    onChange={(e) => formik.setFieldValue('status', e.target.checked)}
                    name="status"
                  />
                }
                label="Active Status"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2.5 }}>
          <Button 
            onClick={onClose}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3
            }}
          >
            {initialData ? 'Update User' : 'Create User'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserCreateForm;
