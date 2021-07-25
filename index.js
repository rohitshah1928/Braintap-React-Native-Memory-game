import { AppRegistry, YellowBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

console.disableYellowBox = true;
console.ignoredYellowBox = ['Remote debugger'];
YellowBox.ignoreWarnings([]);

AppRegistry.registerComponent(appName, () => App);
