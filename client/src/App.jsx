import { useState, useEffect } from 'react';
import AddCostForm from './components/AddCostForm.jsx';
import ExpensesTable from './components/ExpensesTable.jsx';
import CategoryPieChart from './components/CategoryPieChart.jsx';
import MonthlyReport from './components/MonthlyReport.jsx';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import IncomeTable from './components/IncomeTable.jsx';
import AddIncomeForm from './components/AddIncomeForm.jsx';
import NetIncomeReport from './components/NetIncomeReport.jsx';
import { ThemeProvider, useTheme as useCustomTheme } from './components/ThemeProvider.jsx';
import {
  fetchAllCosts,
  fetchAllIncomes,
  addNewCost,
  addNewIncome,
  deleteCost,
  deleteIncome,
  updateCost,
  updateIncome
} from './utils/fetchEntries.js';
import FilterControls from './components/FilterControls.jsx';
import './styles/styles.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [filteredIncomes, setFilteredIncomes] = useState([]);
  const [filterYear, setFilterYear] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [isReportOpen, setIsReportOpen] = useState(false);
  const { theme, toggleTheme } = useCustomTheme();
  
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  // Load all costs and incomes on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const costs = await fetchAllCosts();
        const allIncomes = await fetchAllIncomes();
        setEntries(costs);
        setFilteredEntries(costs);
        setIncomes(allIncomes);
        setFilteredIncomes(allIncomes);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  // Reapply filtering whenever entries, incomes, or filter values change
  useEffect(() => {
    handleFilter();
  }, [entries, incomes, filterYear, filterMonth, filterCategory]);

  const handleFilter = () => {
    let filteredCosts = entries;
    let filteredIncomes = incomes;

    if (filterYear) {
      filteredCosts = filteredCosts.filter(
        (entry) => new Date(entry.date).getFullYear() === parseInt(filterYear)
      );
      filteredIncomes = filteredIncomes.filter(
        (income) => new Date(income.date).getFullYear() === parseInt(filterYear)
      );
    }

    if (filterMonth) {
      filteredCosts = filteredCosts.filter(
        (entry) => new Date(entry.date).getMonth() + 1 === parseInt(filterMonth)
      );
      filteredIncomes = filteredIncomes.filter(
        (income) =>
          new Date(income.date).getMonth() + 1 === parseInt(filterMonth)
      );
    }

    if (filterCategory) {
      filteredCosts = filteredCosts.filter(
        (entry) => entry.category === filterCategory
      );
    }

    setFilteredEntries(filteredCosts);
    setFilteredIncomes(filteredIncomes);
  };

  const handleAddCost = async (cost) => {
    try {
      await addNewCost(cost);
      const updatedCosts = await fetchAllCosts();
      setEntries(updatedCosts);
    } catch (error) {
      console.error('Error adding cost:', error);
    }
  };

  const handleAddIncome = async (income) => {
    try {
      await addNewIncome(income);
      const updatedIncomes = await fetchAllIncomes();
      setIncomes(updatedIncomes);
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  const handleDeleteCost = async (id) => {
    try {
      await deleteCost(id);
      const updatedCosts = await fetchAllCosts();
      setEntries(updatedCosts);
    } catch (error) {
      console.error('Error deleting cost:', error);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await deleteIncome(id);
      const updatedIncomes = await fetchAllIncomes();
      setIncomes(updatedIncomes);
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };

  const handleUpdateCost = async (updatedCost) => {
    try {
      await updateCost(updatedCost.id, { ...updatedCost });
      const updatedCosts = await fetchAllCosts();
      setEntries([...updatedCosts]);
      setFilteredEntries(
        updatedCosts.filter(
          (entry) =>
            (!filterYear ||
              new Date(entry.date).getFullYear() === parseInt(filterYear)) &&
            (!filterMonth ||
              new Date(entry.date).getMonth() + 1 === parseInt(filterMonth)) &&
            (!filterCategory || entry.category === filterCategory)
        )
      );
    } catch (error) {
      console.error('Error updating cost:', error);
    }
  };

  const handleUpdateIncome = async (updatedIncome) => {
    try {
      await updateIncome(updatedIncome.id, { ...updatedIncome });
      const updatedIncomes = await fetchAllIncomes();
      setIncomes([...updatedIncomes]);
      setFilteredIncomes(
        updatedIncomes.filter(
          (income) =>
            (!filterYear ||
              new Date(income.date).getFullYear() === parseInt(filterYear)) &&
            (!filterMonth ||
              new Date(income.date).getMonth() + 1 === parseInt(filterMonth))
        )
      );
    } catch (error) {
      console.error('Error updating income:', error);
    }
  };

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        padding: { xs: 1, md: 2 },
        backgroundColor: 'background.default',
        minHeight: '100vh'
      }}
    >
      {/* Theme Toggle Button */}
      <IconButton
        onClick={toggleTheme}
        sx={{
          position: 'fixed',
          top: { xs: 8, md: 16 },
          right: { xs: 8, md: 16 },
          zIndex: 1000,
          backgroundColor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          fontSize: { xs: '0.8rem', md: '1rem' }
        }}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </IconButton>

      {/* Application Header */}
      <AppBar 
        position="static" 
        sx={{ 
          borderRadius: 1,
          mb: 2
        }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            color="inherit"
            sx={{ textAlign: 'center' }}
          >
            Cost Manager App
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ 
        backgroundColor: 'background.paper',
        borderRadius: 2,
        p: { xs: 1, md: 2 },
        boxShadow: 1
      }}>
        
        {/* Form Components */}
        <AddCostForm onAddCost={handleAddCost} />
        <AddIncomeForm onAddIncome={handleAddIncome} />

        {/* Filter Controls */}
        <FilterControls
          filterYear={filterYear}
          setFilterYear={setFilterYear}
          filterMonth={filterMonth}
          setFilterMonth={setFilterMonth}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />

        {/* Tables */}
        <Box sx={{ mt: 3 }}>
          <IncomeTable
            incomes={filteredIncomes}
            onDelete={handleDeleteIncome}
            onUpdate={handleUpdateIncome}
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <ExpensesTable
            entries={filteredEntries}
            onDelete={handleDeleteCost}
            onUpdate={handleUpdateCost}
          />
        </Box>

        {/* Charts and Reports */}
        <Box sx={{ mt: 3 }}>
          <CategoryPieChart entries={filteredEntries} />
        </Box>

        {/* Report Button */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 3 
        }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsReportOpen(true)}
            size={isMobile ? "small" : "medium"}
            sx={{ 
              minWidth: { xs: '200px', md: '250px' },
              py: { xs: 1, md: 1.5 }
            }}
          >
            Open Monthly Report
          </Button>
        </Box>

        {/* Net Income Report */}
        <Box sx={{ mt: 3 }}>
          <NetIncomeReport entries={entries} incomes={incomes} />
        </Box>

        {/* Monthly Report Modal */}
        <Dialog
          open={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          fullWidth
          maxWidth="md"
          fullScreen={isMobile}
        >
          <DialogTitle>Monthly Report</DialogTitle>
          <DialogContent>
            <MonthlyReport entries={entries} />
          </DialogContent>
        </Dialog>
      </Box>
    </Container>
  );
}

export default function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}