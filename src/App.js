import './App.css';
import Home from './components/Home/Home.tsx';
import { createTheme, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Launch from './components/Launch/Launch.tsx';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Bai Jamjuree',
      "sans-serif"
    ].join(",")
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/SpaceX" element={<Home />}/>
          <Route path="/launch/:id" element={<Launch />}/>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
