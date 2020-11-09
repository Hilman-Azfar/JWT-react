import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/global.css';
import { ThemeProvider } from 'styled-components';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { theme } from './styles/theme';
import { ProvideAuth } from './context/auth';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <ProvideAuth>
          <Router>
            <App />
          </Router>
        </ProvideAuth>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
