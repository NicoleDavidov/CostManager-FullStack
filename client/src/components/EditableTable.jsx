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
  Paper,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

const EditableTable = ({ data, columns, onDelete, onUpdate }) => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  // Mobile Card View
  if (isMobile) {
    return (
      <Box sx={{ width: '100%' }}>
        {paginatedData.map((row) => (
          <Card key={row.id} sx={{ mb: 2, p: 1 }}>
            <CardContent sx={{ p: 2 }}>
              {editId === row.id ? (
                // Edit Mode
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {columns.map((col) => (
                    <Box key={col.field}>
                      <Typography variant="caption" color="textSecondary">
                        {col.headerName}:
                      </Typography>
                      {col.type === 'select' ? (
                        <select
                          name={col.field}
                          value={editData[col.field]}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '8px',
                            marginTop: '4px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
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
                            marginTop: '4px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
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
                // View Mode
                <Box>
                  {columns.map((col) => (
                    <Box key={col.field} sx={{ mb: 1 }}>
                      <Typography variant="caption" color="textSecondary">
                        {col.headerName}:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {row[col.field]}
                      </Typography>
                    </Box>
                  ))}
                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Button
                      onClick={() => handleEditClick(row)}
                      variant="outlined"
                      color="secondary"
                      size="small"
                      fullWidth
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => onDelete(row.id)}
                      variant="contained"
                      color="error"
                      size="small"
                      fullWidth
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
        
        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
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
  }

  // Desktop Table View
  return (
    <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
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