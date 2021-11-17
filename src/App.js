
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './common/Header';
import Home from './home';
import MovieInfo from './movieInfo';
import { AppProvider } from './AppProvider';
import './styles/style.scss';

const APP_BASE_URL = '/';

function App() {
  return (
    <AppProvider>
      <BrowserRouter basename={APP_BASE_URL}>

        <Header/>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/movie/:movieId" element={<MovieInfo />} />
        </Routes>

      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
