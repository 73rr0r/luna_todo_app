import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Button, H4, Stack, TamaguiProvider, useTheme} from 'tamagui';
import {SolitoImageProvider} from 'solito/image';
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerHeaderProps,
  DrawerNavigationOptions,
  DrawerToggleButton,
} from '@react-navigation/drawer';
import {Home} from './features/Home';
import config from '../tamagui';
import {UserDetailScreen} from './features/DetailScreen';
import {Dispatch, SetStateAction, useState} from 'react';
import {Moon, Sun} from '@tamagui/lucide-icons';

const Drawer = createDrawerNavigator();

interface ThemeProps {
  defaultTheme: string;
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>;
}

const ThemeToggle = ({defaultTheme, setTheme}: ThemeProps) => {
  const isDarkTheme = defaultTheme === 'dark';
  return (
    <Button
      unstyled
      m={'$1'}
      icon={isDarkTheme ? <Moon size={'$2'} /> : <Sun size={'$2'} />}
      onPress={() => setTheme(isDarkTheme ? 'light' : 'dark')}
    />
  );
};

const Header = ({
  route,
  defaultTheme,
  setTheme,
}: DrawerHeaderProps & ThemeProps) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.headerContainer}>
      <DrawerToggleButton tintColor={theme.color?.val} />
      <Stack ai="center" jc={'space-between'} fd={'row'} f={1}>
        <H4 fontFamily={'$silkscreen'} pr={'$7'}>
          {route.name.toUpperCase()}
        </H4>
        <ThemeToggle defaultTheme={defaultTheme} setTheme={setTheme} />
      </Stack>
    </SafeAreaView>
  );
};

const TopTabNavigator = ({defaultTheme, setTheme}: ThemeProps) => {
  const screenOptions: DrawerNavigationOptions = {
    header: props => (
      <Header {...props} defaultTheme={defaultTheme} setTheme={setTheme} />
    ),
  };
  return (
    <Drawer.Navigator initialRouteName="home" screenOptions={screenOptions}>
      <Drawer.Screen
        component={Home}
        key={'home'}
        name={'home'}
        options={{title: 'Home'}}
      />
      <Drawer.Screen
        name="user-detail"
        component={UserDetailScreen}
        options={{
          title: 'User',
        }}
      />
    </Drawer.Navigator>
  );
};

const InnerApp = ({defaultTheme, setTheme}: ThemeProps) => {
  const linking = {
    prefixes: ['73rr0r.github.io/luna_todo_app', 'localhost'],
    config: {
      screens: {
        home: '',
        'user-detail': 'user/:id',
      },
    },
  };
  const isDarkMode = defaultTheme === 'dark';
  const theme = useTheme();

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar
          backgroundColor={theme.borderColor?.val}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <NavigationContainer
          theme={isDarkMode ? DarkTheme : DefaultTheme}
          linking={linking}>
          <TopTabNavigator defaultTheme={defaultTheme} setTheme={setTheme} />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const App = () => {
  const [theme, setTheme] = useState(useColorScheme() || 'dark');
  return (
    <SolitoImageProvider nextJsURL="http://localhost:3000/">
      <TamaguiProvider config={config} disableInjectCSS defaultTheme={theme}>
        <InnerApp defaultTheme={theme} setTheme={setTheme} />
      </TamaguiProvider>
    </SolitoImageProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeName: {
    flex: 1,
    textAlign: 'right',
    marginRight: 15,
  },
});

export default App;
