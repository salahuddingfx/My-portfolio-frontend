"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Settings {
  bio: string;
  aboutTitle: string;
  aboutText: string;
  experienceYears: string;
  projectsCompleted: string;
  cvUrl: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    facebook: string;
  };
}

interface SettingsContextType {
  settings: Settings | null;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: null,
  loading: true,
});

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/admin/settings`);
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
