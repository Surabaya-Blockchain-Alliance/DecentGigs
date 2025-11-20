import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <button
        aria-label="Toggle Night/Day Mode"
        style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '1rem' }}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? (
          <SunIcon width={24} height={24} color="#fbbf24" />
        ) : (
          <MoonIcon width={24} height={24} color="#6366f1" />
        )}
      </button>
    </motion.div>
  );
}
