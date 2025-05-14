import { useEffect, useState } from 'react';
import { fetchJobs, fetchJob, deleteJob } from '../api/jobs';
import { Accordion, AccordionSummary, AccordionDetails, Typography, CircularProgress, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import JobDetails from './JobDetails';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    const fetchJobsData = async () => {
      try {
        const res = await fetchJobs();
        setJobs(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobsData();
  }, []);

  const handleJobClick = (jobId) => {
    setSelectedJobId(prevId => (prevId === jobId ? null : jobId));
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <CircularProgress />
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <>
      {jobs.map(job => (
        <Accordion key={job.id} expanded={selectedJobId === job.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => handleJobClick(job.id)}>
            <Typography>
              Job #{job.target_domains} - {job.status}
            </Typography>
            <DeleteIcon onClick={(e) => {
                e.stopPropagation();
                prompt("Do you want to delete the job? (yes/no)") == 'yes' ? handleDeleteJob(job.id) : null;
              }}/>
          </AccordionSummary>
          <AccordionDetails>
            {job.status === 'completed' ? (
              <JobDetails jobId={job.id} />
            ) : (
              <CircularProgress />
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
