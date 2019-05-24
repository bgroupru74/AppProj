import { DrawerNavigator, createAppContainer, createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { Container, Header, Content, Button, Text,Icon, Form, Item, Picker, Right } from 'native-base';
import { Alert, TextInput, View, StyleSheet,ImagAppRegistry,ImageBackground, ScrollView} from 'react-native';



//Auth screen (only if the player isn't signed in)
const AuthNavigator = createStackNavigator(
	{
		Login: {
			getScreen: () => require('./LoginScreen').default,
		}
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	}


)

//user profile 
const ProfileNavigator = createStackNavigator(
	{
		Profile: {
			getScreen: () => require('./HomeScreen').default,
		},
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	}
)

const DetailsNavigator = createStackNavigator(
	{
		myDetails: {
			getScreen: () => require('./myDetails').default,
		},
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	}
	// {
	// 	navigationOptions: {
			
	// 		headerRight: (
	// 			<Button 
	// 			onPress={()=>this.props.navigation.navigate('Profile')}
	// 			style={{backgroundColor:"transparent"}}>
	// 			<Icon   name="home"  />
	// 		  </Button>
	// 		  ),
	// 	}

	// }
	
)

const UpdateDetailsNavigator = createStackNavigator(
	{
		upDetails: {
			getScreen: () => require('./UpdateDetails').default,
		},
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	}
)

const RequestNavigator = createStackNavigator(
	{
		Request: {
			getScreen: () => require('./Request').default,
		},
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	}
)



const CalendarNavigator = createStackNavigator(
	{
		Calendar: {
			getScreen: () => require('./CalendarScreen').default,
		},
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	}
)

const SchedulingNavigator = createStackNavigator(
	{
		Scheduling: {
			getScreen: () => require('./Scheduling').default,
		},
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	}
)


const TestNavigator = createStackNavigator(
	{
		Tests: {
			getScreen: () => require('./tests').default,
		},
	},
	{
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false,
		}
	}
)


const AppNavigator = createSwitchNavigator(
	{

		Auth: AuthNavigator,
		Profile: ProfileNavigator,
		// Menu: MenuNavigator,
		Tests: TestNavigator,
		myDetails: DetailsNavigator,
		Calendar: CalendarNavigator,
		Request: RequestNavigator,
		Scheduling: SchedulingNavigator,
		upDetails: UpdateDetailsNavigator,


	}, {
		initialRouteName: 'Auth',
	}
)



//warp with app container
const AppContainer = createAppContainer(AppNavigator);
class Navigation extends Component {
	render() {
		return <AppContainer />;

	}
}


export default Navigation;