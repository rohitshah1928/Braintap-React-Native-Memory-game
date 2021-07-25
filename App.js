import React from 'react';
import { Provider } from 'react-redux';

import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';

import Game from './src/containers/game';


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Game />

        </PersistGate>
      </Provider>
    )
  }
}

export default App;