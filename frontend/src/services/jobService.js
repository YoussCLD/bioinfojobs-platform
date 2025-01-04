import api from './api';

export const jobService = {
  // Récupérer toutes les offres avec filtres optionnels
  async getJobs(params = {}) {
    try {
      const { data } = await api.get('/jobs/', { params });
      return data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  // Récupérer une offre spécifique
  async getJobById(id) {
    try {
      const { data } = await api.get(`/jobs/${id}`);
      return data;
    } catch (error) {
      console.error(`Error fetching job ${id}:`, error);
      throw error;
    }
  },

  // Récupérer les recommandations
  async getRecommendations(profileId, limit = 10) {
    try {
      const { data } = await api.get('/jobs/recommendations', {
        params: { profile_id: profileId, limit }
      });
      return data;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  },

  // Rechercher des offres
  async searchJobs(query, filters = {}) {
    try {
      const { data } = await api.get('/jobs/', {
        params: {
          search: query,
          ...filters
        }
      });
      return data;
    } catch (error) {
      console.error('Error searching jobs:', error);
      throw error;
    }
  },

  // Obtenir les statistiques
  async getJobStats() {
    try {
      const { data } = await api.get('/jobs/stats/overview');
      return data;
    } catch (error) {
      console.error('Error fetching job stats:', error);
      throw error;
    }
  },

  // Mettre à jour le scraping
  async refreshJobs() {
    try {
      const { data } = await api.get('/jobs/refresh');
      return data;
    } catch (error) {
      console.error('Error refreshing jobs:', error);
      throw error;
    }
  }
};
