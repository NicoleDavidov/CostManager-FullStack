import PropTypes from 'prop-types';
import { Box, TextField, MenuItem } from '@mui/material';
import { months, categories } from '../utils/consts.js';

const FilterControls = ({
  filterYear,
  setFilterYear,
  filterMonth,
  setFilterMonth,
  filterCategory,
  setFilterCategory
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        alignItems: { xs: 'stretch', md: 'center' },
        justifyContent: 'center',
        padding: 2,
        margin: 1,
        backgroundColor: 'background.default',
        borderRadius: 1,
        flexWrap: 'wrap'
      }}
    >
      {/* Year Filter */}
      <TextField
        type="number"
        label="Year"
        placeholder="Year"
        value={filterYear}
        onChange={(e) => setFilterYear(e.target.value)}
        sx={{ 
          minWidth: { xs: '100%', md: '120px' },
          flex: { md: 1, lg: 0 }
        }}
        size="small"
      />

      {/* Month Filter */}
      <TextField
        select
        label="Month"
        value={filterMonth}
        onChange={(e) => setFilterMonth(e.target.value)}
        sx={{ 
          minWidth: { xs: '100%', md: '140px' },
          flex: { md: 1, lg: 0 }
        }}
        size="small"
      >
        <MenuItem value="">All Months</MenuItem>
        {months.map((month) => (
          <MenuItem key={month.value} value={month.value}>
            {month.label}
          </MenuItem>
        ))}
      </TextField>

      {/* Category Filter */}
      <TextField
        select
        label="Category"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        sx={{ 
          minWidth: { xs: '100%', md: '160px' },
          flex: { md: 1, lg: 0 }
        }}
        size="small"
      >
        <MenuItem value="">All Categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

FilterControls.propTypes = {
  filterYear: PropTypes.string.isRequired,
  setFilterYear: PropTypes.func.isRequired,
  filterMonth: PropTypes.string.isRequired,
  setFilterMonth: PropTypes.func.isRequired,
  filterCategory: PropTypes.string.isRequired,
  setFilterCategory: PropTypes.func.isRequired
};

export default FilterControls;