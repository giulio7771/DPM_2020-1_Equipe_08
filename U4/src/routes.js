import { createStackNavigator } from 'react-navigation';

import Adventure from './pages/Adventure';
import Point from './pages/Point';
import Main from './pages/Main';
import Camera from './pages/Camera';

export default createStackNavigator ({
  Main,
  Adventure,
  Point,
  Camera,
});