import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

const JobFilters = ({ onApplyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    jobType: [],
    location: '',
    experienceLevel: '',
    skills: []
  });

  const jobTypes = ['CDI', 'CDD', 'Stage', 'Freelance'];
  const experienceLevels = ['Junior', 'Intermédiaire', 'Senior', 'Expert'];
  const commonSkills = ['Python', 'R', 'NGS', 'Machine Learning', 'SQL', 'Linux'];

  const handleFilterChange = (category, value) => {
    if (category === 'jobType') {
      setFilters(prev => ({
        ...prev,
        jobType: prev.jobType.includes(value)
          ? prev.jobType.filter(type => type !== value)
          : [...prev.jobType, value]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [category]: value
      }));
    }
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setFilters({
      jobType: [],
      location: '',
      experienceLevel: '',
      skills: []
    });
    onApplyFilters(null);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        <Filter className="h-5 w-5" />
        <span>Filtres</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Filtres</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Type de contrat */}
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Type de contrat</h4>
            <div className="flex flex-wrap gap-2">
              {jobTypes.map(type => (
                <button
                  key={type}
                  onClick={() => handleFilterChange('jobType', type)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.jobType.includes(type)
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Localisation */}
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Localisation</h4>
            <input
              type="text"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              placeholder="Ville ou pays"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Niveau d'expérience */}
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Niveau d'expérience</h4>
            <select
              value={filters.experienceLevel}
              onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Tous</option>
              {experienceLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          {/* Compétences */}
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Compétences</h4>
            <div className="flex flex-wrap gap-2">
              {commonSkills.map(skill => (
                <button
                  key={skill}
                  onClick={() => handleFilterChange('skills', skill)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.skills.includes(skill)
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={clearFilters}
              className="text-gray-600 hover:text-gray-800"
            >
              Réinitialiser
            </button>
            <button
              onClick={applyFilters}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Appliquer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilters;
