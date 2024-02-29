import { createRoot } from 'react-dom/client';
import Main from './components/Main';

const el = document.getElementById('root');

if (el) {
    const root = createRoot(el);
    root.render(<Main />);
} else {
    const root = createRoot(document.body);
    root.render(<Main />);
}