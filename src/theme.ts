import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    shadows: {
      formSectionShadow: string;
    };
  }

  interface PaletteOptions {
    shadows: {
      formSectionShadow: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
      dark: '#1E88E5',
    },
    action: {
      disabledBackground: '#0000001F',
      selected: '#00000014',
    },
    error: {
      main: '#D32F2F',
    },
    text: {
      primary: '#000000DE',
      secondary: '#00000099',
    },
    shadows: {
      formSectionShadow: '0 3px 1px -2px #00000033, 0 2px 2px 0 #00000024, 0 1px 5px 0 #0000001f',
    },
  },
});
