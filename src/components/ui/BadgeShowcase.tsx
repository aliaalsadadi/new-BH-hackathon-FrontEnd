import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Badge } from '../../store/badges';

interface BadgeShowcaseProps {
  badges: Record<string, Badge>;
}

const BadgeShowcase: React.FC<BadgeShowcaseProps> = ({ badges }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {Object.values(badges).map((badge) => (
        <motion.div
          key={badge.id}
          className={`relative p-6 rounded-lg border ${
            badge.earned
              ? 'border-primary-200 bg-primary-50'
              : 'border-gray-200 bg-gray-50'
          } text-center`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className={`text-4xl mb-3 ${
              badge.earned ? '' : 'opacity-40 grayscale'
            }`}
          >
            {badge.icon}
          </div>
          <h3
            className={`text-lg font-semibold mb-1 ${
              badge.earned ? 'text-gray-900' : 'text-gray-500'
            }`}
          >
            {badge.name}
          </h3>
          {badge.earned ? (
            <p className="text-sm text-primary-600">
              Earned {badge.earnedAt && new Date(badge.earnedAt).toLocaleDateString()}
            </p>
          ) : (
            <div className="flex items-center justify-center text-gray-400">
              <Lock className="w-4 h-4 mr-1" />
              <span className="text-sm">Locked</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default BadgeShowcase;