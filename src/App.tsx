import './App.css';
import Card from './components/Card/Card.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme.ts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Card />
        </LocalizationProvider>
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
