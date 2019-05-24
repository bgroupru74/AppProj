import React, { Component } from 'react';
import { Container, Header, Content, Button, Text,Icon, Form, Item, Picker, Right } from 'native-base';
import { Alert, TextInput, View, StyleSheet,ImagAppRegistry,ImageBackground, ScrollView} from 'react-native';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import {AsyncStorage} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { CheckBox } from 'react-native-elements'

const students='students'

class Request extends Component {
  constructor(props){
    super(props);

    this.state = {
        stData:[],
        cities:[],
        hospital:[],
        StudentSameCycle:[],
        date1:"",
        date2:"",
        date3:"",
        date4:"",
        date5:"",
        date6:"",
        selected1: undefined,
        selected2: undefined,
        selected3: undefined,
        Parental_residence:"",
        checked:false,
        reason1:"",
        reason2:"",
        reason3:""
        

      };
}
componentWillMount=async () => {
  const stData = await AsyncStorage.getItem('students').then(data => JSON.parse(data));
  const cities = await fetch('https://proj.ruppin.ac.il/bgroup74/prod/api/cities').then(res => res.json())
  const hospital = await fetch('https://proj.ruppin.ac.il/bgroup74/prod/api/Hospital').then(res => res.json())
  const StudentSameCycle = await fetch(`https://proj.ruppin.ac.il/bgroup74/prod/api/students?cycle=${stData.Cycle}`).then(res =>
      res.json())
  this.setState({ stData,cities,hospital,StudentSameCycle });

 // this.setState({date1:revers(this.state.date1)});
 
}

onValueChange1(value: string) {//שמירת הערך שנבחר בפיקליסט
  this.setState({
    selected1: value,
  });
}

onValueChange2(value: string) {
  this.setState({
    selected2: value,
  });
}

onValueChange3(value: string) {
  this.setState({
    selected3: value,
  });
}

revers(someDate){

  const date=someDate.split('-').reverse()
      .join('-');
      return(date)

}

Condition(){
  if(this.state.date1>this.state.date2){alert('תאריך התחלה גדול מתאריך סיום'); return false}
  if(this.state.date3>this.state.date4){alert('תאריך התחלה גדול מתאריך סיום'); return false}
  if(this.state.date5>this.state.date6){alert('תאריך התחלה גדול מתאריך סיום'); return false}
  if(this.state.selected1==undefined){alert('נא בחר עיר מגורים'); return false}
  if(this.state.selected2==undefined){alert('נא בחר בית חולים מועדף'); return false}
  return true;
}

onSend(){

  var IsCondition = this.Condition();
  if (!IsCondition) return false; 

  fetch('https://proj.ruppin.ac.il/bgroup74/test1/tar4/api/RFspec', {//שליחת הבקשה
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      IDOfStudent:this.state.stData.ID,
      Parental_residence:this.state.selected1,
      Hospital:this.state.selected2,
      Friend:this.state.selected3,
      Car:this.state.checked,
      Special_requests_1:this.state.reason1,
      sDateOfR1f:this.revers(this.state.date1),
      sDateOfr1t:this.revers(this.state.date2),
      Special_requests_2:this.state.reason2,
      sDateOfR2f:this.revers(this.state.date3),
      sDateOfR2t:this.revers(this.state.date4),
      Special_requests_3:this.state.reason3,
      sDateOfR3f:this.revers(this.state.date5),
      sDateOfR3t:this.revers(this.state.date6)
    })
  })
  
  alert("הבקשה נשלחה בהצלחה")
}

    render() {    
      
      let cityitem=this.state.cities.map((item)=>{
      return(
      <Picker.Item label={item.Name} value={item.Id} />
    )
    })
    let hospital=this.state.hospital.map((item)=>{
      return(
        <Picker.Item label={item.nameOfH} value={item.NumOfH} />
      )
    })
    let friends=this.state.StudentSameCycle.map((item)=>{
      return(
        ///console.log(this.state.StudentSameCycle),
        <Picker.Item label={item.Name} value={item.ID} />
      )
    })
        return(
         
         <ImageBackground resizeMode="stretch" style={{flex:1}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRSiQdwZSS0uEQuQ50M6qOht-4zaI8tfGI7B_iudyPaYCoA5wB'}}>
         <Header style={{backgroundColor:"transparent", marginTop:20}}>
          {/* <View style={{textAlign:"Right"}}>  */}
    <Button  style={styles.btn}
    
            onPress={()=>this.props.navigation.navigate('Profile')}
            style={{backgroundColor:"transparent"}}>
            <Icon   name="home"  style={styles.icon} />
          </Button>
          </Header>
 <ScrollView style={{paddingLeft:20, paddingRight:20}} >


 
          <View style={styles.container}>
          
     
        
        
            <View style={styles.body}>
            
                  <Text style={styles.paragraph}>הזנת העדפות להתמחות</Text>

      <View style={{flexDirection:'row',alignItems:'center',justifyContent: 'flex-start',flexWrap:'wrap'}}>
                  <Text style={{width:150}} orange30 text40>עיר מגורי ההורים:</Text>
        <Content>
          <Form>
            <Item picker>
              <Picker style={{width: 150}} text30 
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" /> }
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected1}
                onValueChange={this.onValueChange1.bind(this)} >
              {cityitem}
              </Picker>
            </Item>
          </Form>
        </Content>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent: 'flex-start',flexWrap:'wrap'}}>

                  <Text style={{width:150}} orange30 text40>בית חולים מועדף:</Text>
       <Content>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" /> }
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)} >
              {hospital}
              </Picker>
            </Item>
          </Form>


        </Content>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent: 'flex-start',flexWrap:'wrap'}}>

                  <Text style={{width:150}} orange30 text40>חבר:</Text>
       <Content>
          <Form>
            <Item picker>
              <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" /> }
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected3}
                  onValueChange={this.onValueChange3.bind(this)} >
              {friends}
              </Picker>
            </Item>
          </Form>
        </Content>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent: 'flex-start',flexWrap:'wrap'}}>

                  <CheckBox title="האם הינך נייד/ת" checked={this.state.checked}
                   onPress={() => this.setState({ checked: !this.state.checked })} />   
</View>
                  <Text style={styles.paragraph}> אילוצים:</Text>
                  <View style={{flexDirection:'row',alignItems:'center',justifyContent: 'flex-start',flexWrap:'wrap'}}>

       <TextInput style={{width: 100}} text30 placeholder={'הזנ/י סיבה'}
       onChangeText={(reason1) => this.setState({ reason1:reason1 })} /></View>
               <View style={{flexDirection:'row',alignItems:'center',justifyContent: 'flex-start',flexWrap:'wrap'}}>

       <Text style={{width:100}} orange30 text40>מתאריך:</Text>
          <DatePicker
            style={{ width: 150 }}
            date={this.state.date1} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date" format="DD-MM-YYYY" minDate="01-01-2019" maxDate="01-01-2022"
            confirmBtnText="Confirm"  cancelBtnText="Cancel" 
            onDateChange={date => {
              this.setState({ date1:date });
            }}
          />
           <Text style={{width:100}} orange30 text40>עד תאריך:</Text>
          <DatePicker
            style={{ width: 150 }}
            date={this.state.date2} //initial date from state
            mode="date"  //The enum of date, datetime and time
            placeholder="select date" format="DD-MM-YYYY" minDate="01-01-2019" maxDate="01-01-2022"
            confirmBtnText="Confirm"  cancelBtnText="Cancel" 
            onDateChange={date => {
              this.setState({ date2: date });
            }}
          />
          </View>
        <TextInput style={{width: 150}} text30 placeholder={' הזנ/י סיבה'} 
         onChangeText={(reason2) => this.setState({ reason2:reason2 })}/>
     <View style={{flexDirection:'row',alignItems:'center',justifyContent: 'flex-start',flexWrap:'wrap'}}>

       <Text style={{width:100}} orange30 text40>מתאריך:</Text>
          <DatePicker
            style={{ width: 150 }}
            date={this.state.date3} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date" format="DD-MM-YYYY" minDate="01-01-2019" maxDate="01-01-2050"
            confirmBtnText="Confirm"  cancelBtnText="Cancel" 
            onDateChange={date => {
              this.setState({ date3: date });
            }}
          />
           <Text style={{width:100}} orange30 text40>עד תאריך:</Text>
          <DatePicker
            style={{ width: 150 }}
            date={this.state.date4} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date" format="DD-MM-YYYY" minDate="01-01-2019" maxDate="01-01-2050"
            confirmBtnText="Confirm"  cancelBtnText="Cancel" 
            onDateChange={date => {
              this.setState({ date4: date });
            }}
          /></View>
       <TextInput style={{width: 150}} text30 placeholder={' הזנ/י סיבה'}
          onChangeText={(reason3) => this.setState({ reason3:reason3 })}/>
               <View style={{flexDirection:'row',alignItems:'center',justifyContent: 'flex-start',flexWrap:'wrap'}}>

       <Text style={{width:100}} orange30 text40>מתאריך:</Text>
          <DatePicker 
            style={{ width: 150 }}
            date={this.state.date5} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date" format="DD-MM-YYYY" minDate="01-01-2019" maxDate="01-01-2050"
            confirmBtnText="Confirm"  cancelBtnText="Cancel" 
            onDateChange={date => {
              this.setState({ date5: date });
            }}
          />
           <Text style={{width:100}} orange30 text40>עד תאריך:</Text>
          <DatePicker
            style={{ width: 150 }}
            date={this.state.date6} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date" format="DD-MM-YYYY" minDate="01-01-2019" maxDate="01-01-2050"
            confirmBtnText="Confirm"  cancelBtnText="Cancel" 
            onDateChange={date => {
              this.setState({ date6: date });
            }}
          />
</View>
          
        <Text/>
        <AwesomeButtonRick type="primary"  onPress={this.onSend.bind(this)}>*       שלח        *</AwesomeButtonRick>
        <Text/>
        
       
        </View>
       

        </View>
        </ScrollView>
     </ImageBackground>
       
        )
   
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
   justifyContent: 'center'
  },
  
  paragraph: {
    fontSize:18,
    textAlign: 'center',
    color:"#4D5F66",
    fontWeight: 'bold',
    marginBottom:20,
    paddingTop:20,
  },

    icon:{
        color:"#4D5F66",
        fontSize:32,
        alignItems: 'center',
        justifyContent:'center'
        

    },
    paragraph: {
      fontSize:18,
      textAlign: 'center',
      color:"#4D5F66",
      fontWeight: 'bold',
      marginBottom:20,
      paddingTop:20,
    },

    body:{
      marginTop:30,
      borderColor:'#B3C3CA',
      borderWidth: 2,
      backgroundColor: '#ecf0f4',
      padding:20,
      borderRadius: 30,
      // alignItems: 'center',
      // justifyContent: 'center',
      width: 300,
      // height:350,
  
    },
    btn:{
       
      width: '100%', 
      height: 50, 
      backgroundColor: '#FF9800', 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',   
      bottom: 0,
      
    },

   dateIcon: {
     position: 'absolute',
     left: 0, 
     top: 4,
     marginRight: 0, },
      
  dateInput:
   {  marginLeft: 36,}
  

  });

export default Request;