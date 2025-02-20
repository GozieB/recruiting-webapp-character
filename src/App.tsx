import { Provider } from 'react-redux'

import WelcomePage from './components/WelcomePage';
import { store } from './store'

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <WelcomePage/>
    </Provider>

  );
}

export default App;
