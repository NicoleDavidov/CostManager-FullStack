import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Button,
  Box,
  TableContainer,
  Paper
} from '@mui/material';

const EditableTable = ({ data, columns, onDelete, onUpdate }) => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleEditClick = (row) => {
    setEditId(row.id);
    setEditData({ ...row });
  };

  const handleSaveClick = () => {
    onUpdate(editData);
    setEditId(null);
    setEditData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'description' && value.length > 15) {
      alert('Description cannot exceed 15 characters.');
      return;
    }
    setEditData({ ...editData, [name]: value });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: '100%' }}>
      {/* Mobile Cards - Hidden on desktop */}
      <Box sx={{ 
        display: { xs: 'block', md: 'none' },
        width: '100%'
      }}>
        {paginatedData.map((row) => (
          <Paper key={row.id} sx={{ 
            mb: 2, 
            p: 2,
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider'
          }}>
            {editId === row.id ? (
              // Edit Mode Card
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {columns.map((col) => (
                  <Box key={col.field}>
                    <Box sx={{ 
                      fontSize: '0.875rem', 
                      fontWeight: 'bold',
                      color: 'text.secondary',
                      mb: 0.5
                    }}>
                      {col.headerName}:
                    </Box>
                    {col.type === 'select' ? (
                      <select
                        name={col.field}
                        value={editData[col.field]}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '8px',
                          borderRadius: '4px',
                          border: '1px solid #ccc',
                          fontSize: '14px'
                        }}
                      >
                        {col.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={col.type}
                        name={col.field}
                        value={editData[col.field]}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '8px',
                          borderRadius: '4px',
                          border: '1px solid #ccc',
                          fontSize: '14px'
                        }}
                      />
                    )}
                  </Box>
                ))}
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button
                    onClick={handleSaveClick}
                    variant="contained"
                    color="success"
                    size="small"
                    fullWidth
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setEditId(null)}
                    variant="outlined"
                    size="small"
                    fullWidth
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              // View Mode Card
              <Box>
                {columns.map((col) => (
                  <Box key={col.field} sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 0.5,
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <Box sx={{ 
                      fontSize: '0.875rem', 
                      fontWeight: 'bold',
                      color: 'text.secondary'
                    }}>
                      {col.headerName}:
                    </Box>
                    <Box sx={{ 
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      textAlign: 'right'
                    }}>
                      {row[col.field]}
                    </Box>
                  </Box>
                ))}
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button
                    onClick={() => handleEditClick(row)}
                    variant="outlined"
                    color="secondary"
                    size="small"
                    sx={{ flex: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDelete(row.id)}
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ flex: 1 }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        ))}
      </Box>

      {/* Desktop Table - Hidden on mobile */}
      <TableContainer 
        component={Paper} 
        sx={{ 
          width: '100%', 
          overflowX: 'auto',
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Table className="editableTable" stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.field} sx={{ fontWeight: 'bold' }}>
                  {col.headerName}
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} hover>
                {editId === row.id
                  ? columns.map((col) => (
                      <TableCell key={col.field}>
                        {col.type === 'select' ? (
                          <select
                            name={col.field}
                            value={editData[col.field]}
                            onChange={handleChange}
                            style={{
                              width: '100%',
                              padding: '4px',
                              borderRadius: '4px'
                            }}
                          >
                            {col.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={col.type}
                            name={col.field}
                            value={editData[col.field]}
                            onChange={handleChange}
                            style={{
                              width: '100%',
                              padding: '4px',
                              borderRadius: '4px'
                            }}
                          />
                        )}
                      </TableCell>
                    ))
                  : columns.map((col) => (
                      <TableCell key={col.field}>{row[col.field]}</TableCell>
                    ))}
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {editId === row.id ? (
                      <>
                        <Button
                          onClick={handleSaveClick}
                          variant="contained"
                          color="success"
                          size="small"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => setEditId(null)}
                          variant="outlined"
                          size="small"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => handleEditClick(row)}
                        variant="outlined"
                        color="secondary"
                        size="small"
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      onClick={() => onDelete(row.id)}
                      variant="contained"
                      color="error"
                      size="small"
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[]}
                colSpan={columns.length + 1}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Pagination for mobile */}
      <Box sx={{ 
        display: { xs: 'flex', md: 'none' },
        justifyContent: 'center', 
        mt: 2 
      }}>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[]}
        />
      </Box>
    </Box>
  );
};

EditableTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
      editable: PropTypes.bool,
      type: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default EditableTable;