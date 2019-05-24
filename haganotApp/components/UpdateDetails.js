import React, { Component } from 'react';
import { Container, Header, Content, Button, Text,Icon,Form, Item, Picker } from 'native-base';
import { Alert, TextInput, View, StyleSheet,Image, ImageBackground} from 'react-native';
//import Navigation from './components/Index';
import {AsyncStorage} from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';


const students='students'



class Details extends Component {
  constructor(props){
    super(props);

    this.state = {
        Name: '',
        FamilyName:'',
        Email: '',     
        MyCity:'',
        Phone:'',
        selected2: undefined,
        cities:[],
        stData:[]
      };
     

}
componentWillMount=async () => {
  const stData = await AsyncStorage.getItem('students').then(data => JSON.parse(data));
  const MyCity = await AsyncStorage.getItem('MyCity');
  const cities= await fetch('https://proj.ruppin.ac.il/bgroup74/prod/api/cities').then(res => res.json());
      this.setState({ stData ,cities,MyCity});
this.setState({FamilyName:stData.FamilyName, Name:stData.Name,Phone:stData.phone,Email:stData.Email,selected2:cities[stData.MyCity-1].Id});
 
}

Condition(){

  const Nreg=/^[א-ת]+$/
  if(this.state.Name=='' ){alert('עליך להזין שם'); return (false)}
  
  if(Nreg.test(this.state.Name) === false){alert('יש להזין שם המכיל אותיות בעברית בלבד'); return (false)}
   
  if(this.state.FamilyName==''){alert(  'עליך להזין שם משפחה'); return (false)}
  if(Nreg.test(this.state.FamilyName) === false){alert('יש להזין שם משפחה המכיל אותיות בעברית בלבד'); return (false)}

  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(this.state.Email) === false){
    alert('מייל שגוי');
    return (false)
  }

  const Preg = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;
  if (Preg.test(this.state.Phone) === false){
    alert('יש להכניס מספר טלפון בפורמט: xxx-xxx-xxxx');
    return (false)
  }


  
  return true;
}

onUpClick=stData=>{

  //console.log("good:"+this.state.Email);
  var IsCondition = this.Condition();
  if (!IsCondition) return false;
  
  fetch('https://proj.ruppin.ac.il/bgroup74/test1/tar4/api/StudentUp', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ID:this.state.stData.ID,
      Name:this.state.Name,
      FamilyName:this.state.FamilyName,
      Email:this.state.Email,
      phone:this.state.Phone,
      MyCity:this.state.selected2

    })
    
    
 
    
  })
  console.log(this.state.selected2)
  alert("הפרטים עודכנו בהצלחה")

}




    render() {
      let cityitem=this.state.cities.map((item)=>{
   
        return(
        <Picker.Item label={item.Name} value={item.Id} />

  
      )
  
     })
        return(
            
        <ImageBackground resizeMode="stretch" style={{flex:1}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRSiQdwZSS0uEQuQ50M6qOht-4zaI8tfGI7B_iudyPaYCoA5wB'}}>
               <Header style={{backgroundColor:"transparent", marginTop:20}}>
          {/* <View style={{textAlign:"Right"}}>  */}
          <Button style={styles.btn}
            onPress={()=>this.props.navigation.navigate('myDetails')}
            style={{backgroundColor:"transparent"}}>
            <Icon Ionicons name="arrow-forward" style={styles.iconx} />
            
          </Button>
          
          </Header>
      <View style={styles.container} >
      
          <View style={styles.body}>
      <Text style={styles.paragraph}>עדכון הפרטים שלי</Text>

      
       <View 
       style={{flexDirection:'row',alignItems:'center',justifyContent: 'flex-start',flexWrap:'wrap'}}>
                  <Text  style={{width:100,fontWeight: 'bold'}} orange30 text40>שם פרטי:</Text><Text>  </Text>
                  <TextInput style={{width: 150}} text30 
                            value={this.state.Name}
                            onChangeText={(Name) => this.setState({ Name:Name })}
                            placeholder={this.state.Name}
                            style={styles.input}/>
                  <Text style={{width:100,fontWeight: 'bold', }} orange30 text40>שם משפחה:</Text><Text>  </Text>
                  <TextInput style={{width: 200}} text30 
                            value={this.state.FamilyName}
                            onChangeText={(FamilyName) => this.setState({ FamilyName:FamilyName })}
                            placeholder={this.state.FamilyName} 
                            style={styles.input}/>

                  <Text style={{width:100 ,fontWeight: 'bold',}} orange30 text40>טלפון:</Text>
                  <Text>  </Text>
                  <TextInput style={{width: 200,}} text30 
                    value={this.state.Phone}
                    //required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    onChangeText={(Phone) => this.setState({ Phone:Phone })}
                    placeholder={this.state.Phone} 
                    style={styles.input}
                  
                  />
                  <Text style={{width:100,fontWeight: 'bold'}} orange30 text40>אימייל:</Text><Text>  </Text>
                  <TextInput style={{width: 200}} text30
                  value={this.state.Email}
    
                  onChangeText={(Email) => this.setState({ Email:Email })}
                  placeholder={this.state.Email} 
                  style={styles.input} 
                  />
      <View style={{flexDirection:'row'}}>

<Text style={{width:100,fontWeight: 'bold'}} orange30 text40>עיר מגורים:</Text><Text>  </Text>
               
<View style={styles.input}>
                <Item picker >
                  <Picker  
            
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" /> }
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
                placeholder={this.state.MyCity}
              >
              {cityitem}

              </Picker>
            </Item>
            </View> 
            </View> 
      
        </View>
        <Text/>
        <AwesomeButtonRick type="primary" onPress={this.onUpClick.bind(this)} >*      עדכן     *</AwesomeButtonRick>
       </View>

       </View>
       </ImageBackground>
        )

    }
    onValueChange2(value: string) {
      this.setState({
        selected2: value
      });
    }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
   // justifyContent: 'center'
  },

  paragraph: {
    textAlign: 'center',
  },

  icon:{
      color:"#4D5F66",
      fontSize:32,
      // alignItems: 'center',
      // justifyContent:'center'
      

  },
  paragraph: {
    fontSize:18,
    textAlign: 'center',
    color:"#4D5F66",
    fontWeight: 'bold',
    marginBottom:20,
    paddingTop:20,
  },
  text:{
    marginBottom:15,
    fontWeight: 'bold',
    fontSize:15,
    alignItems: 'center',
      justifyContent:'center'
  },
  
  body:{
    
    marginTop:30,
    borderColor:'#B3C3CA',
    borderWidth: 2,
    backgroundColor: '#ecf0f4',
    padding:15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
     width: 300,
    // height:350,
    
  
  },
  iconx:{
    color:'#4D5F66',
    fontSize:32,     

},
input: {
  borderColor:'#B3C3CA',
  width: 150,
  height: 44,
  padding: 10,
  borderWidth: 2,
  marginBottom: 10,
  borderRadius: 20,
  textAlign:'center',

},

  btn:{
    paddingTop:10,

    width: '100%', 
    height: 50, 
    backgroundColor: '#FF9800', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    

  }
});

export default Details;