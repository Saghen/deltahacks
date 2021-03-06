import { Store } from 'lacer'

export interface IColors {
  theme: 'light' | 'dark'
  backgrounds: {
    200: String
    300: String
    400: String
    500: String
    600: String
    700: String
    800: String
    900: String
    primary: String
    contrast: String
    separator: String // 15% opacity
  }
  typography: {
    primary: String
    secondary: String
    tertiary: String
    quaternary: String
    accent: String
    onBackground: {
      primary: String
      contrast: String
    }
  },
  general: {
    red: String,
    green: String
    yellow: String
    blue: String
    purple: String
    cyan: String
  }
}

declare const colors: IColors

export default colors

export function getTheme(): 'light' | 'dark'
export function setTheme(theme: 'light' | 'dark' | 'system'): Promise<void>
export function getColorTheme(theme: 'light' | 'dark'): Promise<IColors>

export const lightTheme: IColors
export const darkTheme: IColors
export const ColorStore: Store
