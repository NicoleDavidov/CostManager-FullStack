import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import * as PropTypes from 'prop-types';

class CategoryPieChart extends React.Component {
  render() {
    let { entries } = this.props;
    console.log('Entries in CategoryPieChart:', entries);

    // Define colors for each category
    const colors = ['#7cdfdf', '#ff47a6', '#F9B7D4', '#cb85cd', '#E3B79B'];

    // Process data to sum up values by category
    const data = entries.reduce((acc, entry) => {
      const existingCategory = acc.find(
        (item) => item.category === entry.category
      );
      if (existingCategory) {
        existingCategory.value += entry.amount;
      } else {
        acc.push({ category: entry.category, value: entry.amount });
      }
      return acc;
    }, []);

    return (
      <Box sx={{
        width: '100%',
        maxWidth: { xs: '100%', md: '500px' },
        margin: { xs: '10px auto', md: '20px auto' },
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography variant="h5" component="h2" sx={{ 
          margin: { xs: '10px', md: '20px' },
          textAlign: 'center'
        }}>
          Expenses by Category
        </Typography>

        {/* Pie chart component */}
        <Box sx={{ 
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <PieChart
            series={[
              {
                data: data.map((item, index) => ({
                  id: item.category,
                  value: item.value,
                  label: item.category,
                  color: colors[index % colors.length]
                })),
                labelPosition: 'outside',
                innerRadius: 0,
                labelLine: true,
                outerRadius: { xs: 100, sm: 120, md: 140 }
              }
            ]}
            height={{ xs: 300, sm: 350, md: 385 }}
            width={{ xs: 350, sm: 450, md: 500 }}
            sx={{
              '& .MuiChartsAxis-label': {
                fontSize: { xs: '12px', md: '14px' }
              }
            }}
          />
        </Box>
      </Box>
    );
  }
}

// Wrapper component to use hooks
const ResponsiveCategoryPieChart = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return <CategoryPieChart {...props} isMobile={isMobile} />;
};

// Define prop types for the component
CategoryPieChart.propTypes = {
  entries: PropTypes.array.isRequired
};

ResponsiveCategoryPieChart.propTypes = {
  entries: PropTypes.array.isRequired
};

export default ResponsiveCategoryPieChart;