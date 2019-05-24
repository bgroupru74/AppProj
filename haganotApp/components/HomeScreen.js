import React, { Component } from 'react';
import { Alert, TextInput, View, StyleSheet,Text,Image,ImageBackground } from 'react-native';
// import HeaderNavigationBar from '../components/navbar';
import {AsyncStorage} from 'react-native';
import { Container, Header, Content, Spinner,Button,Icon } from 'native-base';
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';



const students='students'

class HomeScreen extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            student:[],
            stData:[],
            StudentPic:''
          };
    }
 
 

    componentWillMount=async () => {
      const urlStart='http://proj.ruppin.ac.il/bgroup74/prod/';
      const student = await AsyncStorage.getItem('students').then(data => JSON.parse(data));

      this.setState({ student },()=>{
        console.log(this.state.student.Name)
        this.setState({
          StudentPic:urlStart+this.state.student.Picture.substring(2)
        })
        
      });
  
      }
   

    goToTests=()=>{
      this.props.navigation.navigate('Tests')
    }
    goToScheduling=()=>{
        this.props.navigation.navigate('Scheduling')
      }
    goTomyDetails=()=>{
        this.props.navigation.navigate('myDetails')
      }

    goToCalendar=()=>{
        this.props.navigation.navigate('Calendar')
      }

      goToRequest=()=>{
        this.props.navigation.navigate('Request')
      }
      
     


    render(){
        //this.GetData();
      
        return(
          <ImageBackground resizeMode="stretch" style={{flex:1}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRSiQdwZSS0uEQuQ50M6qOht-4zaI8tfGI7B_iudyPaYCoA5wB'}}>
          <Header style={{backgroundColor:"transparent", marginTop:20}}>
     
          </Header>
            <View style={styles.container} >
            
            {/* <HeaderNavigationBar GetMenu={this.GoToMenu}/> */}
            
            <Text style={styles.text}>
      
            {this.myname()}
            </Text>
 
           
            <Image
          source={{uri: this.state.StudentPic}} style={styles.image}

        />

       
        
        <Text/>
        <AwesomeButtonRick type="primary" onPress={this.goTomyDetails} >*                    הפרטים שלי                    *</AwesomeButtonRick>
        <Text/>
        <AwesomeButtonRick type="secondary" onPress={this.goToCalendar}>*                      הלו"ז שלי                      *</AwesomeButtonRick>
        <Text/>
        <AwesomeButtonRick type="primary" onPress={this.goToTests}>*                    המבחנים שלי                     *</AwesomeButtonRick>
        <Text/>
        <AwesomeButtonRick type="secondary" onPress={this.goToRequest}>*                    שליחת בקשה                    *</AwesomeButtonRick>
        <Text/>
        <AwesomeButtonRick type="primary" onPress={this.goToScheduling} >*                    השיבוצים שלי                    *</AwesomeButtonRick>
        


                
            </View>
            </ImageBackground>

        )
    }
    myname=() => {
      if(this.state.student.Name!=undefined){
        return(
          <Text style={styles.paragraph}>
        {`שלום  ${this.state.student.Name}`}
        </Text>
        )

      }
    }
    
}
const styles = StyleSheet.create({
    container: {
      // backgroundColor: '#A4A5B4',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 50,

    },
    image: {
      flexGrow:1,
      height:150,
      width:150,
      borderRadius:150/2,
      alignItems: 'center',
      justifyContent:'center'
    },
    text:{
      fontSize: 20,
      fontWeight: 'bold',
    },
    paragraph: {
      textAlign: 'center',
      fontWeight: 'bold',
    },
   
  });

export default HomeScreen;