import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Header() {
const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate('Home')
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text} onPress={handleOnPress}>CEBRASPE EVENTS SEARCH</Text>
      </View>
      </>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ff7702',
      height: 90,
      paddingTop: 40,
      padding: 0,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    text: {
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: 25,
      letterSpacing: -0.24,
      color: '#FFF',
      marginLeft: 15,
      fontFamily: 'OpenSans_700Bold'
    }
  });
export default Header;