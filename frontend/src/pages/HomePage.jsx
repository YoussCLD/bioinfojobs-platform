import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JobDetails from '../components/jobs/JobDetails';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { jobService } from '../services/jobService';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJob = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await jobService.getJobById(id);
      setJob(data);
    } catch (error) {
      setError('Impossible de charger les détails de l\'offre');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (loading) {
    return <LoadingSpinner message="Chargement des détails de l'offre..." />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error}
        onRetry={fetchJob}
        variant="full"
      />
    );
  }

  return (
    <div>
      <JobDetails 
        job={job} 
        onClose={() => navigate('/')} 
      />
    </div>
  );
};

export default JobDetailsPage;
