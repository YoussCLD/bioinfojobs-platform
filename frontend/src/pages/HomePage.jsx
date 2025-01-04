import React, { useState, useEffect } from 'react';
import { Filter, MapPin } from 'lucide-react';
import JobCard from '../components/jobs/JobCard';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Appeler l'API pour récupérer les offres
    // Simulation de données pour l'instant
    setJobs([
      {
        id: 1,
        title: 'Bioinformaticien Senior',
        company: 'BioTech Labs',
        location: 'Paris, France',
        type: 'CDI',
        skills: ['Python', 'R', 'NGS'],
        salary: '45-55k€',
        relevanceScore: 0.92
      },
      // ... autres offres
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Filtres */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Offres d'emploi</h1>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Filter className="h-5 w-5" />
          <span>Filtres</span>
        </button>
      </div>

      {/* Liste des offres */}
      <div className="space-y-4">
        {loading ? (
          <div>Chargement...</div>
        ) : (
          jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
