import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  BookOpen, 
  Star,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Accueil', path: '/' },
    { icon: Briefcase, label: 'Offres', path: '/jobs' },
    { icon: BookOpen, label: 'Formations', path: '/learning' },
    { icon: Star, label: 'Favoris', path: '/favorites' },
    { icon: Settings, label: 'Paramètres', path: '/settings' }
  ];

  return (
    <div className="w-64 bg-white shadow-sm h-screen">
      <div className="px-4 py-6">
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-4 py-3"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
