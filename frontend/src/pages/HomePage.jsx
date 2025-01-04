import React, { useState, useEffect } from 'react';
import JobCard from '../components/jobs/JobCard';
import JobSearch from '../components/jobs/JobSearch';
import JobFilters from '../components/jobs/JobFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { jobService } from '../services/jobService';
import { storageService } from '../services/storageService';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState(null);

  // Charger les filtres sauvegardés au démarrage
  useEffect(() => {
    const savedSearch = storageService.getSearch();
    const savedFilters = storageService.getFilters();
    
    setSearchTerm(savedSearch);
    setActiveFilters(savedFilters);
  }, []);

  // Sauvegarder les changements dans le localStorage
  useEffect(() => {
    storageService.saveSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (activeFilters) {
      storageService.saveFilters(activeFilters);
    }
  }, [activeFilters]);

  const fetchJobs = async (search = '', filters = null) => {
    try {
      setLoading(true);
      setError(null);
      const params = {
        search,
        ...filters
      };
      const data = await jobService.getJobs(params);
      setJobs(data);
    } catch (error) {
      setError('Impossible de charger les offres d\'emploi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(searchTerm, activeFilters);
  }, [searchTerm, activeFilters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilters = (filters) => {
    setActiveFilters(filters);
  };

  const handleClearAll = () => {
    storageService.clearAll();
    setSearchTerm('');
    setActiveFilters(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Offres d'emploi</h1>
          <div className="flex items-center space-x-4">
            {(searchTerm || activeFilters) && (
              <button
                onClick={handleClearAll}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Réinitialiser tous les filtres
              </button>
            )}
            <JobFilters 
              onApplyFilters={handleFilters} 
              initialFilters={activeFilters}
            />
          </div>
        </div>
        <JobSearch 
          onSearch={handleSearch} 
          initialValue={searchTerm}
        />
      </div>

      {loading && <LoadingSpinner message="Chargement des offres..." />}
      
      {error && (
        <ErrorMessage 
          message={error}
          onRetry={() => fetchJobs(searchTerm, activeFilters)}
          variant="full"
        />
      )}

      {!loading && !error && (
        <>
          {/* Affichage du nombre de résultats */}
          <div className="text-sm text-gray-600 mb-4">
            {jobs.length} offre{jobs.length !== 1 ? 's' : ''} trouvée{jobs.length !== 1 ? 's' : ''}
            {(searchTerm || activeFilters) && ' avec les filtres actuels'}
          </div>

          <div className="space-y-4">
            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Aucune offre d'emploi trouvée</p>
              </div>
            ) : (
              jobs.map(job => <JobCard key={job.id} job={job} />)
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
