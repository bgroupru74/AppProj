import React, { Component } from 'react';
import { Container, Header, Content, Button, Text,Icon ,ListItem,List, Left, Right,Body} from 'native-base';
import {AsyncStorage} from 'react-native';
import { Alert, TextInput, View, StyleSheet,Image,ImageBackground} from 'react-native';
//import Navigation from './components/Index';



const students='students'
const testarr=[{name:'כירוגית',val:'Surgical_test'},{name:'פנימית',val:'Internal_test'},{name:'מיון',val:'Emergency_test'},{name:'מיילדות',val:'Obstetrics_test'},{name:'ילדים',val:'Children_test'},{name:'פסיכיאטריה',val:'Psychiatry_test'},{name:'קהילה',val:'Community_test'}]



class tests extends Component {
  constructor(props){
    super(props);

    this.state = {  
        stData:[],
        testarr:[],
        filterObj:[]
      };
}



componentWillMount=async () => {
  try {
    const value = await AsyncStorage.getItem(students);
    if (value !== null) {
      // We have data!!
      const st=JSON.parse(value);
      //console.log(st);
      this.setState({stData:st});
      
    }
  } catch (error) {
      console.log("eror")
    // Error retrieving data
  }
}
 
children(){
 
  if(this.state.stData.Children_test==true){

    //<Icon Ionicons name="ios-close" style={styles.icon} />
    return(  <Icon Ionicons name="ios-close" style={styles.icon} /> )            
  }
  else{ 
     return( <Text style={styles.txt1}>לא עבר</Text>   )}
    
}

    
    render() {
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
          <View style={styles.container}>   
         
            {/* <Header style={{backgroundColor:'#4D5F66'}}>  */}
          
            
            {/* </Header> */}
            <Content>

            <View style={styles.body}>
            <Text style={styles.paragraph}>המבחנים שלי</Text>

            {testarr.map((item)=>{
           
            if(this.state.stData[item.val]==true){
             
             //console.log(item.name)
             return(

              <ListItem icon>
              <Left>
              
              <Text style={styles.text}> {item.name}</Text>
                          
              </Left>
              <Body>
               
             
              <Icon Ionicons name="checkmark-circle-outline" style={styles.iconV} />
             
             
               </Body>
             
            </ListItem>

             )
     
            }
            else{
              return(
                // <Text style={styles.txt1}>עבר</Text>
   
                 <ListItem icon>
                 <Left>
                 <Text style={styles.text}> {item.name}</Text>
                
                             
                 </Left>
                 <Body>
                  
                 <Icon Ionicons name="close-circle-outline" style={styles.iconx} />
                
                  </Body>
                
               </ListItem>
   
                )

            }

            })}


</View>
          </Content>
        </View>
        </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
   // justifyContent: 'center'
  },
    backgroundImage: {
      flex: 1,
      width: null,
      height: null,
  },
  
  

    icon:{
        color:'#4D5F66',
        fontSize:32,   
        
    },
    iconx:{
      color:'red',
      fontSize:32,   

  },
  paragraph: {
    fontSize:22,
    textAlign: 'center',
    color:"#4D5F66",
    fontWeight: 'bold',
    marginBottom:20,
    paddingTop:20,
  },

  iconV:{
    color:'green',
    fontSize:32, 
    paddingRight:30      

},

    txt1:{ textAlign:'left',
    color:'green'
    },
    txt2:{ textAlign:'left',
    color:'red'
    },
    text:{
      marginBottom:15,
      fontWeight: 'bold',
      fontSize:15,
      textAlign:'right'

    },
    body:{
      marginTop:30,
      borderColor:'#B3C3CA',
      borderWidth: 2,
      backgroundColor: '#ecf0f4',
      padding:20,
      borderRadius: 30,
   
      width: 280,
      // height:350,
  
    },
    // btn:{
       
    //   width: '100%', 
    //   height: 50, 
    //   backgroundColor: '#FF9800', 
    //   justifyContent: 'center', 
    //   alignItems: 'center',
    //   position: 'absolute',
      
    //   bottom: 0

    // }
  });
export default tests;
