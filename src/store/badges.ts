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
    id: 'مبتدئ',
    icon: '🧠',
    name: 'مبتدئ القبول العالمي',
    message: 'بداية رائعة! لقد أنهيت الدرس الأول وتجاوزت أول اختبار لك!',
    earned: false
  },
  explorer: {
    id: 'explorer',
    icon: '🥉',
    name: 'مستكشف القبول العالمي',
    message: 'رائع! لقد أنهيت مستوى المبتدئين!',
    earned: false
  },
  advanced_explorer: {
    id: 'advanced_explorer',
    icon: '🥈',
    name: 'مستكشف متقدم للقبول العالمي',
    message: "أصبحت أقوى! لقد أتممت مستوى المتوسطين!",
    earned: false
  },
  expert: {
    id: 'expert',
    icon: '🥇',
    name: 'خبير القبول العالمي',
    message: 'أنت محترف! لقد أنهيت جميع دروس المستوى المتقدم!',
    earned: false
  },
  champion: {
    id: 'champion',
    icon: '🏆',
    name: 'بطل القبول العالمي',
    message: "رائع! لقد أصبحت بطلًا معتمدًا في القبول العالمي!",
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