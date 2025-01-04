import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import JobCard from '../components/jobs/JobCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { jobService } from '../services/jobService';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await jobService.getJobs();
      setJobs(data);
    } catch (error) {
      setError('Impossible de charger les offres d\'emploi. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Offres d'emploi</h1>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Filter className="h-5 w-5" />
          <span>Filtres</span>
        </button>
      </div>

      {loading && (
        <LoadingSpinner 
          message="Chargement des offres d'emploi..." 
          size="large"
        />
      )}

      {error && (
        <ErrorMessage 
          message={error}
          onRetry={fetchJobs}
          variant="full"
        />
      )}

      {!loading && !error && (
        <>
          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Aucune offre d'emploi trouvée</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
