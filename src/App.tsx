import { ApplicationFrame } from './components/ApplicationFrame';
import { BookmarksContainer } from './components/BookmarksContainer';
import { Header } from './components/Header';

function App() {
  return (
    <ApplicationFrame header={<Header />}>
      <BookmarksContainer />
    </ApplicationFrame>
  );
}

export default App;
