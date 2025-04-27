import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Badge {
  id: string;
  icon: string;
  name: string;
  message: string;
  earned: boolean;
  earnedAt?: Date;
}

interface BadgeStore {
  badges: Record<string, Badge>;
  earnBadge: (badgeId: string) => void;
  hasBadge: (badgeId: string) => boolean;
}

const initialBadges: Record<string, Badge> = {
  beginner: {
    id: 'beginner',
    icon: '🧠',
    name: 'UA Beginner',
    message: 'Great start! You completed Lesson 1 and passed your first quiz!',
    earned: false
  },
  explorer: {
    id: 'explorer',
    icon: '🥉',
    name: 'UA Explorer',
    message: 'Awesome! You finished the Beginner Level!',
    earned: false
  },
  advanced_explorer: {
    id: 'advanced_explorer',
    icon: '🥈',
    name: 'UA Advanced Explorer',
    message: "You're getting strong! Intermediate Level conquered!",
    earned: false
  },
  expert: {
    id: 'expert',
    icon: '🥇',
    name: 'UA Expert',
    message: 'Master! You completed all advanced lessons!',
    earned: false
  },
  champion: {
    id: 'champion',
    icon: '🏆',
    name: 'UA Champion',
    message: "Incredible! You're a certified UA Champion!",
    earned: false
  }
};

const useBadgeStore = create<BadgeStore>()(
  persist(
    (set, get) => ({
      badges: initialBadges,
      
      earnBadge: (badgeId: string) => {
        const badge = get().badges[badgeId];
        if (badge && !badge.earned) {
          set((state) => ({
            badges: {
              ...state.badges,
              [badgeId]: {
                ...badge,
                earned: true,
                earnedAt: new Date()
              }
            }
          }));
        }
      },
      
      hasBadge: (badgeId: string) => {
        return get().badges[badgeId]?.earned || false;
      }
    }),
    {
      name: 'badge-store'
    }
  )
);

export default useBadgeStore;