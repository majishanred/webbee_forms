import './App.css';
import Card from './components/Card/Card.tsx';
import { FormsProvider } from './providers/FormsProvider.tsx';

function App() {
  return (
    <FormsProvider>
      <Card />
    </FormsProvider>
  );
}

export default App;
