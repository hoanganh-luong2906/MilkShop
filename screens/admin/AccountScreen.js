import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
  Switch,
} from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";

const Item = ({ name, address, phone, status }) => {
  const [showAddress, setShowAddress] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [isEnabled, setIsEnabled] = useState(status);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View style={styles.item}>
      <Ionicons name="person-circle" size={100} color="black" />
      <View style={styles.details}>
        <Text style={styles.text}>Họ và tên: {name}</Text>
        <View style={styles.addressContent}>
          <Text style={styles.text}>Địa chỉ: </Text>
          <View style={styles.addressInfo}>
            <TextInput
              style={styles.addressText}
              secureTextEntry={showAddress ? false : true}
              editable={false}
            >
              {address}
            </TextInput>
            <Pressable
              style={styles.showBtn}
              onPress={() => setShowAddress(!showAddress)}
            >
              <Icon
                name={showAddress ? "eye-off-sharp" : "eye-sharp"}
                size={20}
                color="black"
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.phoneContent}>
          <Text style={styles.text}>SĐT: </Text>
          <View style={styles.phoneInfo}>
            <TextInput
              style={styles.phoneText}
              secureTextEntry={showPhone ? false : true}
              editable={false}
            >
              {phone}
            </TextInput>
            <Pressable
              style={styles.showBtn}
              onPress={() => setShowPhone(!showPhone)}
            >
              <Icon
                name={showPhone ? "eye-off-sharp" : "eye-sharp"}
                size={20}
                color="black"
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.statusContent}>
          <Text style={styles.text}>Trạng thái tài khoản: </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={isEnabled ? "#FFBE98" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </View>
  );
};

const AccountScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://milk-shop-eight.vercel.app/api/account")
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((error) => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
    <Item
      name={item.fullName}
      address={item.address}
      phone={item.phone}
      status={item.status}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Octicons name="search" size={20} color="black" />
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Nhập tên tài khoản"
        />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF3ED",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 40,
    marginVertical: 10,
    paddingLeft: 10,
    backgroundColor: "#FFBE98",
  },
  searchInput: {
    marginLeft: 30,
    flex: 1,
  },
  item: {
    backgroundColor: "#FEECE2",
    flexDirection: "row",
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  details: {
    marginLeft: 10,
  },
  addressContent: {
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
  },
  addressInfo: {
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
  },
  addressText: {
    fontSize: 12,
    marginRight: 5,
    color: "black",
  },
  phoneContent: {
    flexDirection: "row",
  },
  phoneInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 22,
  },
  phoneText: {
    fontSize: 12,
    marginRight: 5,
    color: "black",
  },
  text: {
    fontSize: 18,
  },
  statusContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    alignItems: "center",
  },
});

export default AccountScreen;
