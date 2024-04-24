import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import useAuth from '../../utils/useAuth';

export default function Voucher({ navigation }) {
  const { isLoggedIn } = useAuth();

  const handleNavigate = (nameRoute) => {
    navigation.navigate(nameRoute);
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.5 }}
      colors={[
        '#FEECE2',
        '#FFF3ED',
        '#FFF3ED',
        '#FAFAFA',
        '#FFFFFF',
        '#FFFFFF',
        '#FFFFFF',
        '#FFFFFF',
        '#FFFFFF',
      ]}
      style={styles.linearGradient}
    >
      {isLoggedIn && (
        <>
          <ScrollView style={styles.mainScreen}>
            <Text style={styles.title}>Quản lí mã giảm giá</Text>
            {/* Function 1 */}
            <Pressable
              style={styles.functionContainerStyle}
              onPress={() => {
                handleNavigate("staff-create-voucher");
              }}
            >
              <View style={styles.functionPressable}>
                <FontAwesome name="ticket" size={28} color="black" style={styles.functionIcon} />
                <Text style={styles.functionDescription}>
                  Thêm mã giảm giá
                </Text>
              </View>
              <AntDesign
                name='caretright'
                size={15}
                color='black'
              />
            </Pressable>
            <Image style={styles.image} source={require('../../assets/voucher.png')} resizeMode='cover' />
          </ScrollView>
        </>
      )
      }
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingTop: 35,
    paddingHorizontal: 15,
    borderRadius: 5,
    overflow: 'visible',
  },
  mainScreen: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  functionContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFBE98',
    paddingRight: 5,
  },
  functionPressable: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 10,
  },
  functionIcon: {
    marginRight: 10,
  },
  functionDescription: {
    textAlignVertical: 'center',
    fontSize: 15,
  },
  image: {
    width: 300,
    height: 350,
    alignSelf: "center",
    backgroundColor: "#FFFFFF"
  }
});
