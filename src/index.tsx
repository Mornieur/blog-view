import { GlobalStyles } from '@mui/material';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <GlobalStyles
      styles={{
        margin: 0,
        padding: 0,
        backgroundColor: '#ececec',
      }}
    />
    <AppRouter />
  </>
);
