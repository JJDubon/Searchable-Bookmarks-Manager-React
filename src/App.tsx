import { ApplicationFrame } from './components/ApplicationFrame';
import { Header } from './components/Header';

function App() {
  return (
    <ApplicationFrame header={<Header />}>
      <p>Content</p>
    </ApplicationFrame>
  );
}

export default App;
