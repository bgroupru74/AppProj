import React, { Component } from 'react';
import { Alert, TextInput, View, StyleSheet,Text,ImageBackground,TouchableHighlight} from 'react-native';
import { AsyncStorage } from "react-native";
import { Input, Button } from 'react-native-elements';

const students='students';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      myCityName:'',
      cities: {},
      student:{}
    };
  }
  
  storeData=  async (student) => {
    try {
     AsyncStorage.setItem(students, JSON.stringify(student));
      console.log(student.Name)
    } catch (error) {
      console.log('לא נשמר')
      // Error saving data
    }
  }

  storeCity=  async (city) => {
    
    try {
      
     AsyncStorage.setItem('MyCity', JSON.stringify(city));
    //  AsyncStorage.setItem('City', JSON.stringify(myCityName));
      
    } catch (error) {
      console.log('לא נשמר')
      // Error saving data
    }
  }

  async componentDidMount() {
    const citiesData = await fetch('https://proj.ruppin.ac.il/bgroup74/prod/api/cities').then(res => res.json())
    const cities = citiesData.reduce((list, curr) => {
      list[curr.Id] = curr.Name;
      return list;
    }, {});;
   
    this.setState({ cities });
  
  }


  onLogin() {
    // let id=this.state.username
    // let password=this.state.password
    let id = "203913900";
    let password = "1234";
    let isLogged = false;
    fetch("https://proj.ruppin.ac.il/bgroup74/prod/api/students?id=" + id + "&password=" + password)
    .then((response) => response.json())
        .then((student) => {
          // console.log(student)
          if (student == null) {
            isLogged = false;
          }
          else
          {
             isLogged = true;
             this.storeData(student)
             this.storeCity(this.state.cities[student.MyCity])
                     console.log(student)
          }
          this.setState({
            student:student
          },()=>{
            if (!isLogged) {
              alert(
                "Wrong password or username!"
              )
            }
            else{
             //alert(this.state.username +" "+ this.state.password)
             this.props.navigation.navigate('Profile');
             
            }
          })
        })
    
        .catch((error) => {
          console.error(error);
        });

          
        
  }

  

  render() {
    return (
     
      <ImageBackground resizeMode="stretch" style={{flex:1}} source={{uri: 'data:image/jpeg;base64,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'}}>

      <View style={styles.container}>
      <View style={styles.body}>
      <Text>מערכת מידע להתמחויות</Text>
      <Text style={styles.Text}>שבץ-אח</Text>
     
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'שם משתמש'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'סיסמה'}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button
          title={'התחבר'}
          buttonStyle={{borderRadius:20, paddingLeft:20, paddingRight:20,borderWidth:2, borderColor:'#191970'}}
          onPress={this.onLogin.bind(this)}
          
        />
      </View>
      </View>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  
  },

  body:{
    borderWidth: 2,
    backgroundColor: '#ecf0f4',
    padding:10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 280,

  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 20,
  },


  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
},

Text: {
  fontSize:20,
  marginBottom:10,
  
 },
 

});