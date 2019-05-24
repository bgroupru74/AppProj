import React, { Component } from 'react';
import { Container, Header, Content, Button, Text,Icon, Right } from 'native-base';
import { Alert, TextInput, View, StyleSheet,Image, ImageBackground} from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
//import Navigation from './components/Index';
import {AsyncStorage} from 'react-native';


const students='students'



class myDetails extends Component {
  constructor(props){
    super(props);

    this.state = {
     
        stData:[],
        MyCityName:''
      };
     
}
componentWillMount=async () => {
  const stud = await AsyncStorage.getItem('students').then(data => JSON.parse(data));
  const stData = await fetch("https://proj.ruppin.ac.il/bgroup74/prod/api/students?id=" + stud.ID + "&password=" + stud.Password).then(res =>
  res.json()
);
const citiesData = await fetch('https://proj.ruppin.ac.il/bgroup74/prod/api/cities').then(res => res.json())

  // const MyCityName = await AsyncStorage.getItem('MyCity');
      this.setState({ stData ,MyCityName:citiesData[stData.MyCity-1].Name});
    

}
onUpdate(){
    this.props.navigation.navigate('upDetails')
}

getDetails(){
  if(this.state.stData.Name!=undefined){
  return(
    <View>
  <Text style={styles.text}>{`שם פרטי:  ${this.state.stData.Name}`}</Text>
          <Text style={styles.text}>{`שם משפחה:  ${this.state.stData.FamilyName}`}</Text>
          <Text style={styles.text}>{`מס' טלפון :  ${this.state.stData.phone}`}</Text>
          <Text style={styles.text}>{`אימייל:  ${this.state.stData.Email}`}</Text>
          <Text style={styles.text}>{`עיר:  ${this.state.MyCityName}`}</Text>
          </View>
  )
  }
}

    render() {
      // city=this.props.navigation.getParam(myCityName,'sss')
      // console.log(city)
        return(
          <ImageBackground resizeMode="stretch" style={{flex:1}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRSiQdwZSS0uEQuQ50M6qOht-4zaI8tfGI7B_iudyPaYCoA5wB'}}>
          <Header style={{backgroundColor:"transparent", marginTop:20}}>
          {/* <View style={{textAlign:"Right"}}>  */}
    <Button  style={styles.btn}
    
            onPress={()=>this.props.navigation.navigate('Profile')}
            style={{backgroundColor:"transparent"}}>
            <Icon   name="home"  style={styles.icon} />
          </Button>
          {/* </View> */}
          </Header>
      <Container style={styles.container} >

    
          <View style={styles.body}>
          <Text style={styles.paragraph}>הפרטים שלי</Text>

      <Text/>
          {this.getDetails()}

        <Text/>
        <AwesomeButtonRick type="primary"  onPress={this.onUpdate.bind(this)}>*       עדכן        *</AwesomeButtonRick>
        <Text/>
       
       </View>

        {/* <Button
          title={'עדכן פרטים'}
          style={styles.btn}
          onPress={this.onUpdate.bind(this)}
        /> */}
       </Container>
       </ImageBackground>
        )
   
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
   // justifyContent: 'center'
  },

  paragraph: {
    fontSize:22,
    textAlign: 'center',
    color:"#4D5F66",
    fontWeight: 'bold',
    marginBottom:20,
    paddingTop:20,
  },

  icon:{
      color:"#4D5F66",
      fontSize:35,
      // alignItems: 'center',
      // justifyContent:'center'
      

  },

  text:{
    marginBottom:15,
    fontWeight: 'bold',
    fontSize:15,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 20,
    textAlign: 'center',

  },
  body:{
    marginTop:30,
    borderColor:'#B3C3CA',
    borderWidth: 2,
    backgroundColor: '#ecf0f4',
    padding:20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 280,
    // height:350,

  },

  btn:{
    width: 200,
    //alignItems: 'center',
    borderRadius:20,
    //  paddingLeft:20, 
    //  paddingRight:20,
     borderWidth:2,
      borderColor:'#191970',
      textAlign: 'right',

  },
  header:{
    flexDirection:'row',
    justifyContent: 'flex-end'

  }
});

export default myDetails;