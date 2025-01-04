import React, { useState } from 'react';
import { MapPin, Building, Clock, Star, Share2, ArrowLeft, Briefcase, GraduationCap, Heart } from 'lucide-react';

const JobDetails = ({ job, onClose }) => {
  const [isApplying, setIsApplying] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      {/* Header avec bouton retour */}
      <div className="flex items-center mb-6">
        <button 
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 flex items-center"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour aux offres
        </button>
      </div>

      {/* En-tête de l'offre */}
      <div className="border-b pb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <div className="flex items-center mt-3 text-gray-600">
              <Building className="h-5 w-5 mr-2" />
              <span className="mr-4 font-medium">{job.company}</span>
              <MapPin className="h-5 w-5 mr-2" />
              <span>{job.location}</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50">
              <Heart className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-50">
              <Share2 className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Informations clés */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">
            <Clock className="h-4 w-4 inline mr-2" />
            {job.type}
          </div>
          <div className="bg-green-100 px-4 py-2 rounded-full text-sm text-green-700">
            {job.salary}
          </div>
          <div className="bg-blue-100 px-4 py-2 rounded-full text-sm text-blue-700">
            Score: {Math.round(job.relevanceScore * 100)}%
          </div>
        </div>
      </div>

      {/* Corps de l'offre */}
      <div className="grid grid-cols-3 gap-8 mt-8">
        <div className="col-span-2">
          {/* Description */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Description du poste</h2>
            <div className="prose text-gray-600">
              {job.description}
            </div>
          </section>

          {/* Responsabilités */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Responsabilités</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {job.responsibilities?.map((resp, index) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>
          </section>

          {/* Compétences requises */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Compétences requises</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
            <h3 className="text-lg font-semibold mb-4">Aperçu</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">Expérience requise</div>
                <div className="flex items-center mt-1">
                  <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                  {job.experience}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Niveau d'études</div>
                <div className="flex items-center mt-1">
                  <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                  {job.education}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Date de publication</div>
                <div className="mt-1 text-gray-600">
                  {job.postedAt}
                </div>
              </div>
              
              <button 
                onClick={() => setIsApplying(true)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-6"
              >
                Postuler maintenant
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de candidature */}
      {isApplying && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Postuler</h2>
            {/* Formulaire de candidature à implémenter */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Votre message"
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setIsApplying(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
