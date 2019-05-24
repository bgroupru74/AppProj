import React, { Component } from 'react';
import { Calendar, Agenda, LocaleConfig } from 'react-native-calendars';
import { View,Container, Header, Content, Button, Text,Icon } from 'native-base';
import { AsyncStorage, I18nManager , StyleSheet, ImageBackground} from 'react-native';


const DEPARTMENTS = [
  { number: 2, key: 'Surgical', name: 'כירוגית' },
  { number: 3, key: 'Internal', name: 'פנימית' },
  { number: 4, key: 'Obstetrics', name: 'מיילדות' },
  { number: 5, key: 'Children', name: 'ילדים' },
  { number: 6, key: 'Emergency', name: 'מיון' },
  { number: 7, key: 'Psychiatry', name: 'פסיכיאטריה' },
  { number: 8, key: 'Community', name: 'קהילה' }
];

const UNASSIGNED = 12;
const AssignmentSummary = ({ assignment, department, hospital }) => {
  I18nManager.forceRTL(true);
  const begin = new Date(assignment.begining).toLocaleDateString('he-IL');
  const end = new Date(assignment.ending).toLocaleDateString('he-IL');

  return (
    <View>
      <Text>התמחות במחלקת {department}</Text>
      <Text> בבית חולים: {hospital}</Text>
      <Text>
        בתאריכים: {begin} עד {end}
      </Text>
    </View>
  );
};

class CalendarScreen extends Component {
  constructor(props) {
    super(props);
    LocaleConfig.locales['he'] = {
      monthNames: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
      monthNamesShort: ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יונ', 'יול', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ'],
      dayNames: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
      dayNamesShort: ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש']
    };
    LocaleConfig.defaultLocale = 'he';

    this.state = {
      student: null,
      assignments: [],
      selectedDate: new Date().toISOString().split('T')[0], 
      items: {}
    };
  }
  async componentDidMount() {
    
    const student = await AsyncStorage.getItem('students').then(data => JSON.parse(data)); //הסטונדט שהבאנו- כמו לוקל סטורג
    const existing = DEPARTMENTS.map(dep => student[dep.key]).filter(n => n != UNASSIGNED); //הערך שונה מ12.-עבור כל מחלקה אצל הסטודנט נבדוק האם יש ערך בשדה המחלקה- כלומר האם קיים שיבוץ.
    const assignmentData = await fetch('https://proj.ruppin.ac.il/bgroup74/prod/api/Assigment').then(res => res.json());// מביא את כל ההקצאות
    const assignments = assignmentData.filter(ass => existing.includes(ass.NumofAss));// נקבל את ההקצאות של הסטודנט עי חיפוש מספר ההקצאה בכלל ההקצאות הקיימות
    const hospitalData = await fetch('https://proj.ruppin.ac.il/bgroup74/prod/api/hospital').then(res => res.json());
    const hospitals = hospitalData.reduce((list, curr) => {
      list[curr.NumOfH] = curr.nameOfH; //הופך לרשימה של בית חולים
      return list;
    }, {});
    const items = {};
    assignments.forEach(ass => { // נעבור על כל ההקצאות של הסטודנט
      var dates = [];
      var start = new Date(ass.begining);
      var end = new Date(ass.ending);
      while (start <= end) { 
        dates.push(start.toISOString().split('T')[0]);
        start.setDate(start.getDate() + 1);
      }
      dates.forEach(date => {
        items[date] = [
          {
            assignment: ass,
            hospital: hospitals[ass.NumOfH],
            department: DEPARTMENTS.find(x => x.number === ass.NumOfde).name // המוציא את השם של המחלקה לפי המספר מחלקה של ההקצאה.
          }
        ];
      });
    });
    this.setState({ student, assignments, items }); 
  }

  render() {
    I18nManager.forceRTL(true);
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
      <Container>
          {/* <Button style={styles.btn}
            onPress={()=>this.props.navigation.navigate('Profile')}
            style={{backgroundColor:"transparent"}}>
            <Icon   name="home" style={styles.icon} />
          </Button> */}
          <Text style={styles.paragraph}>הלו"ז שלי</Text>

      <Agenda
        onDayPress={day => {
          this.setState({ selectedDate: day.dateString });
        }}
        items={this.getItems()}
        markedDates={this.getMarked()}
        renderEmptyDate={() => {
        return <View />;
        }}
        rowHasChanged={(r1, r2) => {
          return r1.assignment.NumofAss !== r2.assignment.NumofAss;
        }}
        renderEmptyData={() => <View />}
        renderItem={item => {
          return <AssignmentSummary assignment={item.assignment} department={item.department} hospital={item.hospital} />;
        }}
      />
      </Container>
      </ImageBackground>
    );
  }

  
  getMarked = () => {
    const marked = {};
    Object.keys(this.state.items).forEach(date => {
      marked[date] = { marked: true };
    });
    return marked;
  };
  getItems = () => {
    var item = this.state.items[this.state.selectedDate];
    return { [this.state.selectedDate]: item };
  };
  // retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('name');
  //     if (value !== null) {
  //       // Our data is fetched successfully
  //       this.setState({ student: value.student });
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };
}

const styles = StyleSheet.create({


  icon:{
      color:"#4D5F66",
      fontSize:32,
      alignItems: 'center',
      justifyContent:'center',
      

  },

  paragraph: {
    fontSize:22,
    textAlign: 'center',
    color:"#4D5F66",
    fontWeight: 'bold',
    marginBottom:20,
    paddingTop:20,
  },

  btn:{
    width: 200,
    alignItems: 'center',
    borderRadius:20,
     paddingLeft:20, 
     paddingRight:20,
     borderWidth:2,
      borderColor:'#191970',

  }
});

export default CalendarScreen;
