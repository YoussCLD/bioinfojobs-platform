import React from 'react';
import { MapPin, Building, Clock, Star, ExternalLink } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between">
        {/* Informations principales */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
              <div className="flex items-center mt-2 text-gray-600">
                <Building className="h-4 w-4 mr-2" />
                <span className="mr-4">{job.company}</span>
                <MapPin className="h-4 w-4 mr-2" />
                <span>{job.location}</span>
              </div>
            </div>
            {/* Score de pertinence */}
            <div className="flex flex-col items-end">
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                Score: {Math.round(job.relevanceScore * 100)}%
              </div>
              <div className="mt-2">
                <button className="text-gray-400 hover:text-yellow-500">
                  <Star className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Compétences requises */}
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Informations supplémentaires */}
          <div className="mt-4 flex items-center gap-4 text-gray-600 text-sm">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {job.type}
            </div>
            {job.salary && (
              <div className="font-medium text-green-600">
                {job.salary}
              </div>
            )}
            {job.experience && (
              <div>
                {job.experience} d'expérience
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-between border-t pt-4">
        <div className="text-sm text-gray-500">
          Publié {job.postedAt || 'récemment'}
        </div>
        <div className="space-x-3">
          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
            Voir plus de détails
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
            Postuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
