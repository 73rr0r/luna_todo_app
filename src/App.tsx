import {StyleSheet, StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
    TamaguiProvider,
    useTheme,
    Stack,
    H4,
    Select,
    SelectProps,
    YStack,
    Label,
    Switch,
    XStack,
    SizeTokens,
    Adapt,
    Sheet,
    Separator,
    getFontSize,
} from 'tamagui';
import {SolitoImageProvider} from 'solito/image';
import {
    initialWindowMetrics,
    SafeAreaProvider,
    SafeAreaView,
} from 'react-native-safe-area-context';
import {
    DefaultTheme,
    NavigationContainer,
    DarkTheme,
} from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerToggleButton,
    DrawerNavigationOptions,
    DrawerHeaderProps,
} from '@react-navigation/drawer';
import {Home} from './features/Home';
import config from '../tamagui';
import {UserDetailScreen} from './features/DetailScreen';
import {useState} from 'react';
import {ChevronDown, ChevronUp, Check} from '@tamagui/lucide-icons';
import {useRootTheme, useThemeSetting} from "@tamagui/next-theme";

const Drawer = createDrawerNavigator();
const themes = [
    {name: 'dark'},
    {name: 'light'},
];

export function SwitchWithLabel(props: {
    placeholder: string;
    size: SizeTokens;
    onChange: any;
}) {
    const id = `switch-${props.size.toString().slice(1)}`
    return (
        <XStack width={200} alignItems="center" space="$1">
            <Label
                paddingRight="$0"
                minWidth={90}
                justifyContent="flex-end"
                size={props.size}
                htmlFor={id}
            >
                Dark mode {props.placeholder}
            </Label>
            <Separator minHeight={20} vertical/>
            <Switch id={id} size={props.size} onCheckedChange={props.onChange()}>
                <Switch.Thumb animation="quick"/>
            </Switch>
        </XStack>
    )
}

const Header = ({route}: DrawerHeaderProps) => {
    const theme = useTheme()
    // const {current, toggle} = useThemeSetting();
    // const [currentTheme, setTheme] = useRootTheme();

    return (
        <SafeAreaView style={styles.headerContainer}>
            <DrawerToggleButton tintColor={theme.color?.val}/>
            <Stack ai="center" jc={'space-between'} fd={'row'} f={1}>
                <H4 fontFamily={'$silkscreen'} pr={'$7'}>
                    {route.name.toUpperCase()}
                </H4>
                {/*<SwitchWithLabel placeholder={currentTheme} size={'$2'} onChange={setTheme}/>*/}
            </Stack>
        </SafeAreaView>
    );
};

const screenOptions: DrawerNavigationOptions = {
    header: props => <Header {...props} />,
};

const TopTabNavigator = () => {
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

const linking = {
    prefixes: ['73rr0r.github.io/luna_todo_app', 'localhost'],
    config: {
        screens: {
            home: '',
            'user-detail': 'user/:id',
        },
    },
};

const InnerApp = () => {
    const colorScheme = useColorScheme() || 'dark';
    const isDarkMode = colorScheme === 'dark';
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
                    <TopTabNavigator/>
                </NavigationContainer>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
};

const App = () => {
    const theme = useColorScheme() || 'dark';
    return (
        <SolitoImageProvider nextJsURL="http://localhost:3000/">
            <TamaguiProvider config={config} disableInjectCSS defaultTheme={theme}>
                <InnerApp/>
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
