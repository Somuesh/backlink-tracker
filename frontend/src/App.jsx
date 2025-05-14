import { Container, Typography } from '@mui/material';
import JobForm from './components/JobForm';
import JobList from './components/JobList';

function App() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Backlink Tracker
      </Typography>
      <JobForm />
      <JobList />
    </Container>
  );
}

export default App;
