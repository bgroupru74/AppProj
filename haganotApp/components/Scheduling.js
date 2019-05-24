import { Button, Container, Icon,Header, Text } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage,ImageBackground,StyleSheet, View, TouchableOpacity, Button as Btn } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


const DEPARTMENTS = [
  { number: 2, key: 'Surgical', name: 'כירוגית' },
  { number: 3, key: 'Internal', name: 'פנימית' },
  { number: 4, key: 'Obstetrics', name: 'מיילדות' },
  { number: 5, key: 'Children', name: 'ילדים' },
  { number: 6, key: 'Emergency', name: 'מיון' },
  { number: 7, key: 'Psychiatry', name: 'פסיכיאטריה' },
  { number: 8, key: 'Community', name: 'קהילה' }
];
class Scheduling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      assignments: [],
      hospitals: {},
      student: null
    };
  }

  componentDidMount = async () => {
    const student = await AsyncStorage.getItem('students').then(data => JSON.parse(data));
    const assignments = await fetch(`https://proj.ruppin.ac.il/bgroup74/test1/tar4/api/asforstudent?id=${student.ID}`).then(res =>
      res.json() // רשימה של ההקצאות שקיבל הסטודנט
    );
    const hospitalData = await fetch('https://proj.ruppin.ac.il/bgroup74/prod/api/hospital').then(res => res.json());
    const hospitals = hospitalData.reduce((list, curr) => {
      list[curr.NumOfH] = curr.nameOfH;
      return list;
    }, {});
    this.setState({ hospitals, assignments, student });
  };
  onDeparmentPress = department => {
    this.setState({ selected: department });
  };

  onFinishClick = assignment => {
    const { student } = this.state;
    console.log(assignment.NumOfAss);
    fetch('https://proj.ruppin.ac.il/bgroup74/test1/tar4/api/status', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        IdOfStudent: '' + student.ID,
        NumOfAss: assignment.NumOfAss,
        isFinish: true,
        status: assignment.status
      })
    })
      .then(res => {
        var assignments = this.state.assignments.filter(ass => assignment.NumOfAss !== ass.NumOfAss);
        assignment.isFinish = true;
        this.setState({ assignments: [assignment, ...assignments] });
      })
      .catch(error => {
        console.log('ERROR');
      });
  };
  render() {
    const relevantDepartments = this.state.assignments.map(ass => ass.numOfd);
    const departments = DEPARTMENTS.filter(dep => relevantDepartments.includes(dep.number));
    const { selected, hospitals, assignments } = this.state;
    return (
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
    
        <Text style={styles.paragraph}>השיבוצים שלי</Text>

        <View style={styles.list}>
          {selected ? (
            <FlatList
              extraData={this.state.assignments}
              data={assignments.filter(ass => ass.numOfd == selected.number)}
              keyExtractor={item => '' + item.NumOfAss}
              renderItem={({ item }) => {
                const begin = new Date(item.begining).toLocaleDateString('he-IL');
                const end = new Date(item.ending).toLocaleDateString('he-IL');
                return (
                  <View style={styles.body}>
                    <Text>מחלקה: {selected.name}</Text>
                    <Text>בית חולים: {hospitals[item.numOfh]}</Text>
                    <Text>פעיל:{assignments.status}</Text>
                    <Text>
                      מתאריך {begin} עד {end}
                    </Text>
                    <Btn
                      onPress={() => {
                        this.onFinishClick(item);
                      }}
                      title="סיימתי"
                      disabled={item.isFinish}
                      color="#345cd3"
                    />
                  </View>
                );
              }}
            />
          ) : (
            <FlatList
              data={departments}
              keyExtractor={item => '' + item.key}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    this.onDeparmentPress(item);
                  }}>
                  <View style={styles.listush}>
                    <Text style={styles.listItem}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
    // justifyContent: 'center'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap'
  },
  listItem: {
    padding: 10,
    fontSize: 18,
    flex: 1
  },
  paragraph: {
    textAlign: 'center'
  },

  icon: {
    color: '#4D5F66',
    fontSize: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  paragraph: {
    fontSize:22,
    textAlign: 'center',
    color:"#4D5F66",
    fontWeight: 'bold',
    marginBottom:20,
    // paddingTop:20,
  },
  body:{
    // marginTop:30,
    borderColor:'#B3C3CA',
    borderWidth: 2,
    backgroundColor: '#ecf0f4',
    padding:20,
    borderRadius: 30,
    // alignItems: 'center',
    // justifyContent: 'center',
    width: 300,
    // // height:350,
    
  
  },
  listush:{
    borderColor:'#B3C3CA',
    borderWidth: 2,
    backgroundColor: '#ecf0f4',
    borderRadius: 30,
    width: 260,
    alignItems: 'center',
    marginBottom:15,

  },
  btn: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',

    bottom: 0
  }
});
export default Scheduling;