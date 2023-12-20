import { GlobalStyles } from '@mui/material';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from '../src/router';
import { globalStyles } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <GlobalStyles styles={globalStyles} />
    <AppRouter />
  </>
);
