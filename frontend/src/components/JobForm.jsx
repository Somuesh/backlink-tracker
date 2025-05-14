
import { useState } from 'react';
import { Button, TextField, Box, Alert, AlertTitle } from '@mui/material';
import { createJob } from '../api/jobs';

export default function JobForm() {
  const [urls, setUrls] = useState('');
  const [targets, setTargets] = useState('');
  const [rate, setRate] = useState(1);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createJob({
        urls,
        target_domains: targets,
        rate_limit: rate
      });
      setUrls('');
      setTargets('');
      setSuccess('Job created successfully!');
      setError(null);
    } catch (error) {
      setError('Failed to create job: ' + error.message);
      setSuccess(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          <AlertTitle>Success</AlertTitle>
          {success}
        </Alert>
      )}
      <TextField 
        fullWidth 
        label="Start URLs (comma separated)" 
        value={urls} 
        onChange={(e) => setUrls(e.target.value)} 
        sx={{ mb: 2 }} 
        disabled={isSubmitting}
      />
      <TextField 
        fullWidth 
        label="Target Domains (comma separated)" 
        value={targets} 
        onChange={(e) => setTargets(e.target.value)} 
        sx={{ mb: 2 }} 
        disabled={isSubmitting}
      />
      <TextField 
        fullWidth 
        label="Rate Limit (seconds)" 
        type="number" 
        value={rate} 
        onChange={(e) => setRate(e.target.value)} 
        sx={{ mb: 2 }} 
        disabled={isSubmitting}
      />
      <Button 
        type="submit" 
        variant="contained" 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating...' : 'Create Crawl Job'}
      </Button>
    </Box>
    </>
  );
}