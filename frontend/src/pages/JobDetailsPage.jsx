import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JobDetails from '../components/jobs/JobDetails';

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Remplacer par un appel API réel
    setJob({
      id: id,
      title: 'Bioinformaticien Senior',
      company: 'BioTech Labs',
      location: 'Paris, France',
      type: 'CDI',
      skills: ['Python', 'R', 'NGS', 'Linux', 'SQL'],
      salary: '45-55k€',
      relevanceScore: 0.92,
      description: 'Nous recherchons un bioinformaticien expérimenté pour rejoindre notre équipe...',
      responsibilities: [
        'Développer des pipelines d\'analyse NGS',
        'Participer aux projets de recherche',
        'Collaborer avec les équipes de biologistes'
      ],
      experience: '3-5 ans',
      education: 'Master ou PhD en Bioinformatique',
      postedAt: '2024-01-01'
    });
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <JobDetails job={job} />
    </div>
  );
};

export default JobDetailsPage;
