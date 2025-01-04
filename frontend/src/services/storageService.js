const STORAGE_KEYS = {
  FILTERS: 'bioinfojobs_filters',
  SEARCH: 'bioinfojobs_search'
};

export const storageService = {
  // Sauvegarde des filtres
  saveFilters(filters) {
    try {
      localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(filters));
    } catch (error) {
      console.error('Error saving filters to localStorage:', error);
    }
  },

  // Récupération des filtres
  getFilters() {
    try {
      const filters = localStorage.getItem(STORAGE_KEYS.FILTERS);
      return filters ? JSON.parse(filters) : null;
    } catch (error) {
      console.error('Error reading filters from localStorage:', error);
      return null;
    }
  },

  // Sauvegarde du terme de recherche
  saveSearch(searchTerm) {
    try {
      localStorage.setItem(STORAGE_KEYS.SEARCH, searchTerm);
    } catch (error) {
      console.error('Error saving search to localStorage:', error);
    }
  },

  // Récupération du terme de recherche
  getSearch() {
    try {
      return localStorage.getItem(STORAGE_KEYS.SEARCH) || '';
    } catch (error) {
      console.error('Error reading search from localStorage:', error);
      return '';
    }
  },

  // Effacement de tous les filtres et recherches
  clearAll() {
    try {
      localStorage.removeItem(STORAGE_KEYS.FILTERS);
      localStorage.removeItem(STORAGE_KEYS.SEARCH);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
};
