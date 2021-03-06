import { Store } from 'lacer'

// TODO: Do the light theme
export const lightTheme = {
  theme: 'light',
  backgrounds: {
    200: '#0f1014',
    300: '#13151a',
    400: '#17191f',
    500: '#1b1d24',
    600: '1d1e24',
    700: '#23252C',
    800: '#2A2C33',
    900: '#2E3038',
    primary: '#3498DB',
    contrast: '#fff',
    separator: '#ffffff26', // 15% opacity
  },
  typography: {
    primary: '#e1e1e1',
    secondary: '#878787',
    tertiary: '#515151',
    quaternary: '#313131',
    accent: '#67cbff',
    onBackground: {
      primary: '#fff',
      contrast: '#2d2d2d',
    },
  },
  general: {
    red: '#E06C75',
    green: '#98C379',
    yellow: '#E5C07B',
    blue: '#61AFEF',
    purple: '#C678DD',
    cyan: '#56B6C2',
  },
}

export const darkTheme = {
  theme: 'dark',
  backgrounds: {
    200: '#0f1014',
    300: '#13151a',
    400: '#17191f',
    500: '#1b1d24',
    600: '1d1e24',
    700: '#23252C',
    800: '#2A2C33',
    900: '#2E3038',
    primary: '#3498DB',
    contrast: '#fff',
    separator: '#ffffff26', // 15% opacity
  },
  typography: {
    primary: '#e1e1e1',
    secondary: '#878787',
    tertiary: '#515151',
    quaternary: '#313131',
    accent: '#67cbff',
    onBackground: {
      primary: '#fff',
      contrast: '#2d2d2d',
    },
  },
  general: {
    red: '#E06C75',
    green: '#98C379',
    yellow: '#E5C07B',
    blue: '#61AFEF',
    purple: '#C678DD',
    cyan: '#56B6C2',
  },
}

export async function setTheme(theme) {
  if (!['light', 'dark', 'system'].includes(theme)) throw new Error('Invalid theme provided')

  if (theme === 'system') localStorage.removeItem('theme')
  else localStorage.setItem('theme', theme)

  return updateColorStore()
}

// Checks local storage for manually set theme
// and then uses system theme if not set
export function getTheme() {
  return localStorage.getItem('theme') ??
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')).matches
    ? 'dark'
    : 'light'
}

export function getColorTheme(theme) {
  return theme === 'dark' ? darkTheme : lightTheme
}

export const ColorStore = new Store(getColorTheme(getTheme()))

function updateColorStore() {
  const theme = getTheme()
  ColorStore.set((state) => {
    const newTheme = getColorTheme(theme)
    for (const key in newTheme) state[key] = newTheme[key]
  })
}

document.addEventListener('visibilitychange', updateColorStore)

const colors = { ...ColorStore.get() }

ColorStore.subscribe(() => {
  const newColors = ColorStore.get()

  for (const key of Object.keys(newColors)) colors[key] = newColors[key]
})

export default colors
