
import React from 'react';
import { Building2 } from 'lucide-react';

const hostels = [
  'Paari', 'Kaari', 'Oori', 'Adhiyaman', 'Nelson Mandela', 
  'Manoranjitham', 'Mullai', 'Thamarai', 'Malligai', 
  'Sannasi A', 'Sannasi C', 'Pierre Fauchard'
];

interface SidebarProps {
  selectedHostel: string | null;
  onHostelSelect: (hostel: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedHostel, onHostelSelect }) => {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-green-100 dark:border-gray-700 h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Building2 className="text-green-600 dark:text-green-400" size={24} />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Boys Hostels</h2>
        </div>
        
        <div className="space-y-2">
          <button
            onClick={() => onHostelSelect('')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
              selectedHostel === null || selectedHostel === ''
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-l-4 border-green-600 dark:border-green-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900'
            }`}
          >
            All Hostels
          </button>
          
          {hostels.map((hostel) => (
            <button
              key={hostel}
              onClick={() => onHostelSelect(hostel)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                selectedHostel === hostel
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-l-4 border-green-600 dark:border-green-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900'
              }`}
            >
              {hostel}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
