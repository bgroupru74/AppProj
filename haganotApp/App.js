import React from 'react';
import { StyleSheet, Text, View, I18nManager } from 'react-native';

import Navigation from './components/Index';



export default class App extends React.Component {

	render() {
		return (
			<Navigation />

		);
	}
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},

});
