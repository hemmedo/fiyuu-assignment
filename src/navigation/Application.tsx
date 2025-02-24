import type {RootStackParamList} from '@/navigation/types';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useTheme} from '@/theme';
import {Paths} from '@/navigation/paths';
import {Example, Startup} from '@/screens';
import DeletedItems from '@/screens/DeletedItems/DeletedItems';

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
  const {navigationTheme, variant} = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator key={variant} screenOptions={{headerShown: true}}>
          <Stack.Screen component={Startup} name={Paths.Startup} />
          <Stack.Screen
            component={Example}
            name={Paths.Example}
            options={{
              headerBackTitleVisible: false,
              title: 'Swipe & Delete List',
            }}
          />
          <Stack.Screen
            component={DeletedItems}
            name={Paths.DeletedItems}
            options={{
              headerBackTitleVisible: false,
              title: 'Deleted Items',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
