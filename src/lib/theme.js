export const defaultTheme = {
  primaryColor: '#2F7D77',
  secondaryColor: '#006D77',
  accentColor: '#2DD4BF',
  buttonColor: '#2F7D77',
  selectedColor: '#0D9488',
  announcementColor: '#ECFEFF',
  backgroundColor: '#F6F5F2',
  cardColor: '#FFFFFF',
  textColor: '#0F172A',
  mutedTextColor: '#475569'
};

export function applyTheme(settings = {}) {
  const theme = { ...defaultTheme, ...(settings.theme || {}) };
  const root = document.documentElement;

  root.style.setProperty('--color-primary', theme.primaryColor);
  root.style.setProperty('--color-secondary', theme.secondaryColor);
  root.style.setProperty('--color-accent', theme.accentColor);
  root.style.setProperty('--color-button', theme.buttonColor);
  root.style.setProperty('--color-selected', theme.selectedColor);
  root.style.setProperty('--color-announcement', theme.announcementColor);
  root.style.setProperty('--color-bg', theme.backgroundColor);
  root.style.setProperty('--color-card', theme.cardColor);
  root.style.setProperty('--color-text', theme.textColor);
  root.style.setProperty('--color-muted', theme.mutedTextColor);
}
