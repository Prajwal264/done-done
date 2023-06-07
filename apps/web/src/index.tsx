import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app.component';
import './styles/index.scss';
import { Toaster } from 'react-hot-toast';

ReactDOM.render(
  <BrowserRouter>
    <App />
    <Toaster position="bottom-right" />
  </BrowserRouter>,
  document.getElementById('root'),
);
