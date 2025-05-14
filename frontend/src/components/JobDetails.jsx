import { useEffect, useState } from 'react';
import {
  fetchJob
} from '../api/jobs';
import {
  Table, TableHead, TableRow, TableCell,
  TableBody, Button, CircularProgress,
  Pagination, Stack
} from '@mui/material';

const ROWS_PER_PAGE = 15;

export default function JobDetails({ jobId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetchJob(jobId);
        setData(res.data.results);
        setCurrentPage(1); // reset to first page on jobId change
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [jobId]);

  const exportCSV = () => {
    if (data.length === 0) return;
    const headers = "Source URL,Source Title,Target URL,Rel\n";
    const rows = data.map(r =>
      `${r.source_url},"${r.source_title}",${r.target_url},${r.rel_attr}`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job_${jobId}_results.csv`;
    a.click();
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;

  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);
  const paginatedData = data.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Source URL</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Target URL</TableCell>
            <TableCell>Rel</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.source_url}</TableCell>
              <TableCell>{row.source_title}</TableCell>
              <TableCell>{row.target_url}</TableCell>
              <TableCell>{row.rel_attr}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {data.length > ROWS_PER_PAGE && (
        <Stack spacing={2} mt={2} alignItems="center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            color="primary"
          />
        </Stack>
      )}

      <Button
        onClick={exportCSV}
        sx={{ mt: 2 }}
        variant="outlined"
        disabled={data.length === 0}
      >
        Export CSV
      </Button>
    </>
  );
}
