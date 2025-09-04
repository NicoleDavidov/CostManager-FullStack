import PropTypes from 'prop-types';
import EditableTable from './EditableTable.jsx';
import { Box, Typography } from '@mui/material';
import { categories } from '../utils/consts.js';

const ExpensesTable = ({ entries, onDelete, onUpdate }) => {
  // Define the columns for the editable table
  const columns = [
    {
      field: 'category',
      headerName: 'Category',
      editable: true,
      type: 'select',
      options: categories
    },
    { field: 'amount', headerName: 'Amount', editable: true, type: 'number' },
    {
      field: 'description',
      headerName: 'Description',
      editable: true,
      type: 'text'
    },
    { field: 'date', headerName: 'Date', editable: true, type: 'date' }
  ];

  // Sort the entries by date in descending order (most recent first)
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <Box sx={{ 
      padding: { xs: 1, md: 2 },
      margin: { xs: 1, md: 2 },
      textAlign: 'center',
      width: '100%'
    }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Expenses List
      </Typography>

      {/* EditableTable component displays the expenses in a table format */}
      <EditableTable
        columns={columns}
        data={sortedEntries}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </Box>
  );
};

// PropTypes validate the props passed to the CostList component
ExpensesTable.propTypes = {
  entries: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default ExpensesTable;