import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Typography, Stack, Drawer, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { fetchAllFields } from '../../services/apiService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Sidebar = ({ endpoint }) => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const getFields = async () => {
      try {
        const data = await fetchAllFields(endpoint);
        console.log('Fetched data:', data); // Log the fetched data
        if (data && Array.isArray(data)) {
          setFields(data[0]?.fields || []); // Adjust to match data structure
        } else {
          throw new Error('Data is not an array');
        }
      } catch (err) {
        console.error('Error fetching fields:', err);
        setError(err.message || 'Error loading fields');
      } finally {
        setLoading(false);
      }
    };

    getFields();
  }, [endpoint]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const handleButtonClick = (path) => {
    navigate(path); // Use navigate to change route
  };

  const sidebarContent = (
    <Box
      sx={{
        width: 250,
        padding: 2,
        backgroundColor: '#f4f4f4',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <IconButton onClick={toggleDrawer(false)} sx={{ alignSelf: 'flex-end' }}>
        <ChevronLeftIcon />
      </IconButton>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Error loading fields: {error}</Typography>
      ) : (
        <Stack spacing={2} mt={2}>
          {fields.length > 0 ? (
            fields.map((field, index) => (
              <Button
                key={index}
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleButtonClick(field.path)} // Use path from the field
                style={{ textTransform: 'none' }} // Optional: Keeps text in its original case
              >
                {field.label}
              </Button>
            ))
          ) : (
            <Typography>No buttons available</Typography>
          )}
        </Stack>
      )}
    </Box>
  );

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        edge="start"
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {sidebarContent}
      </Drawer>
    </div>
  );
};

export default Sidebar;
