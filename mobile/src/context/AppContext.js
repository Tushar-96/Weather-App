import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPreferences, setPreferences } from '../services/userService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load preferences from backend
    (async () => {
      try {
        const prefs = await getPreferences();
        if (prefs) {
          setUnit(prefs.unit || 'metric');
          setTheme(prefs.theme || 'light');
        }
      } catch (e) {}
      setLoading(false);
    })();
  }, []);

  const updatePreferences = async (newPrefs) => {
    if (newPrefs.unit) setUnit(newPrefs.unit);
    if (newPrefs.theme) setTheme(newPrefs.theme);
    await setPreferences({ unit: newPrefs.unit || unit, theme: newPrefs.theme || theme });
  };

  return (
    <AppContext.Provider value={{ unit, setUnit, theme, setTheme, updatePreferences, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext); 