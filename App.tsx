import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './scr/routes';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle={'dark-content'} translucent />
      <Routes />
    </>
  );
};


export default App;
