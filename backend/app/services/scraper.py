import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime
import logging
from typing import List, Dict
from ..config import settings

class BioInfoJobScraper:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.sources = {
            'indeed': 'https://www.indeed.com/jobs?q=bioinformatics',
            'linkedin': 'https://www.linkedin.com/jobs/bioinformatics-jobs',
            'nature': 'https://www.nature.com/naturecareers/jobs/bioinformatics',
            'biostars': 'https://www.biostars.org/jobs/'
        }
        
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }

    async def scrape_all_sources(self) -> List[Dict]:
        """Scrape tous les sites sources"""
        all_jobs = []
        
        for source, url in self.sources.items():
            try:
                jobs = await self.scrape_source(source, url)
                all_jobs.extend(jobs)
                self.logger.info(f"Scraped {len(jobs)} jobs from {source}")
            except Exception as e:
                self.logger.error(f"Error scraping {source}: {str(e)}")
        
        return all_jobs

    async def scrape_source(self, source: str, url: str) -> List[Dict]:
        """Scrape un site source spécifique"""
        try:
            response = requests.get(url, headers=self.headers)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            if source == 'indeed':
                return self._parse_indeed(soup)
            elif source == 'linkedin':
                return self._parse_linkedin(soup)
            # Ajouter d'autres parsers ici
            
        except Exception as e:
            self.logger.error(f"Error in {source} scraping: {str(e)}")
            return []

    def _parse_indeed(self, soup: BeautifulSoup) -> List[Dict]:
        """Parse les offres d'Indeed"""
        jobs = []
        job_cards = soup.find_all('div', class_='job_seen_beacon')
        
        for card in job_cards:
            try:
                job = {
                    'title': card.find('h2', class_='jobTitle').text.strip(),
                    'company': card.find('span', class_='companyName').text.strip(),
                    'location': card.find('div', class_='companyLocation').text.strip(),
                    'description': card.find('div', class_='job-snippet').text.strip(),
                    'url': 'https://indeed.com' + card.find('a')['href'],
                    'source': 'indeed',
                    'scraped_at': datetime.utcnow().isoformat()
                }
                jobs.append(job)
            except Exception as e:
                self.logger.error(f"Error parsing Indeed job card: {str(e)}")
        
        return jobs

    def extract_skills(self, description: str) -> List[str]:
        """Extrait les compétences de la description"""
        skills = []
        # Liste des compétences en bioinformatique courantes
        common_skills = [
            'python', 'r', 'bash', 'perl', 'java',
            'sql', 'linux', 'ngs', 'rna-seq', 'dna-seq',
            'blast', 'bioconductor', 'galaxy', 'snakemake'
        ]
        
        description_lower = description.lower()
        for skill in common_skills:
            if skill in description_lower:
                skills.append(skill)
        
        return skills

    def clean_data(self, jobs: List[Dict]) -> pd.DataFrame:
        """Nettoie et standardise les données"""
        df = pd.DataFrame(jobs)
        
        # Suppression des doublons
        df = df.drop_duplicates(subset=['url'])
        
        # Extraction des skills
        df['skills'] = df['description'].apply(self.extract_skills)
        
        return df
