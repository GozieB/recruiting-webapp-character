import { Provider } from 'react-redux'

import GamePage from './components/WelcomePage';
import { store } from './store'

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <GamePage/>
    </Provider>

  );
}

export default App;
