import { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, MenuItem, Box } from '@mui/material';
import { categories } from '../utils/consts.js';

const AddCostForm = ({ onAddCost }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category || !date) {
      alert('Please fill in all required fields.');
      return;
    }

    const newCost = {
      amount: parseFloat(amount),
      category,
      description,
      date: new Date(date).toISOString().split('T')[0]
    };

    await onAddCost(newCost);

    setAmount('');
    setCategory('');
    setDescription('');
    setDate('');
    setError('');
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 15) {
      setDescription(value);
      setError('');
    } else {
      setError('Description cannot exceed 15 characters.');
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        alignItems: { xs: 'stretch', md: 'center' },
        margin: 2,
        padding: 2,
        border: '2px solid #ebf5f8',
        borderRadius: '12px',
        flexWrap: 'wrap'
      }}
    >
      <h2 style={{ width: '100%', margin: '0 0 16px 0' }}>Add an Expense</h2>
      
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{ 
          minWidth: { xs: '100%', md: '150px' },
          flex: { md: 1 }
        }}
        required
      />
      
      <TextField
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{ 
          minWidth: { xs: '100%', md: '150px' },
          flex: { md: 1 }
        }}
        required
      >
        {categories.map((cat, index) => (
          <MenuItem key={index} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>
      
      <TextField
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
        sx={{ 
          minWidth: { xs: '100%', md: '150px' },
          flex: { md: 1 }
        }}
        error={!!error}
        helperText={error}
      />
      
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        sx={{ 
          minWidth: { xs: '100%', md: '150px' },
          flex: { md: 1 }
        }}
        InputLabelProps={{
          shrink: true
        }}
        required
      />
      
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ 
          minWidth: { xs: '100%', md: '120px' },
          height: '56px',
          marginTop: { xs: 2, md: 0 }
        }}
      >
        Add Cost
      </Button>
    </Box>
  );
};

AddCostForm.propTypes = {
  onAddCost: PropTypes.func.isRequired
};

export default AddCostForm;