import React, { useCallback, useState } from "react";
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
import ConfirmModal from "../../components/admin/ConfirmModal";
import { useFocusEffect } from "@react-navigation/native";

const removeVietnameseDiacritics = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const Item = ({ id, name, address, phone, status }) => {
  const [showAddress, setShowAddress] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [isEnabled, setIsEnabled] = useState(status);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleConfirm = () => {
    setConfirmVisible(!confirmVisible);
  };

  const saveChanges = async () => {
    try {
      const response = await fetch(
        `https://milk-shop-eight.vercel.app/api/account/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: !isEnabled, // Pass the new status value
          }),
        }
      );

      if (response.ok) {
        // Update the switch state and close the ConfirmModal
        toggleSwitch();
        setConfirmVisible(false);
      } else {
        console.error("Failed to update account status");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.item}>
      <Ionicons name="person-circle" size={100} color="black" />
      <View style={styles.details}>
        <Text style={styles.text}>Họ và tên: {name}</Text>
        <View style={{ justifyContent: "space-between" }}>
          <View style={styles.addressContent}>
            <Text style={styles.text}>Địa chỉ: </Text>
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
          <View style={styles.phoneContent}>
            <Text style={styles.text}>SĐT: </Text>
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
            onValueChange={handleConfirm}
            value={isEnabled}
          />
          <ConfirmModal
            textTitle={"Bạn có chắc chắn muốn cập nhật trạng thái tài khoản?"}
            visible={confirmVisible}
            onClose={() => setConfirmVisible(false)}
            onConfirm={saveChanges}
          />
        </View>
      </View>
    </View>
  );
};

const AccountScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetch("https://milk-shop-eight.vercel.app/api/account")
        .then((response) => response.json())
        .then((json) => setData(json.data))
        .catch((error) => console.error(error));
    }, [])
  )

  const renderItem = ({ item }) => {
    const { fullName, role } = item;
    const normalizedSearchQuery = removeVietnameseDiacritics(
      searchQuery.toLowerCase()
    );
    const normalizedName = removeVietnameseDiacritics(fullName.toLowerCase());

    if (normalizedName.includes(normalizedSearchQuery) && role !== "Admin") {
      return (
        <Item
          id={item._id}
          name={fullName}
          address={item.address}
          phone={item.phone}
          status={item.status}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Octicons name="search" size={20} color="black" />
        <TextInput
          style={styles.searchInput}
          onChangeText={(text) => setSearchQuery(text)}
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressText: {
    fontSize: 18,
    marginLeft: 20,
    color: "black",
  },
  phoneContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  phoneText: {
    fontSize: 18,
    marginLeft: 16,
    color: "black",
  },
  text: {
    fontSize: 18,
  },
  statusContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default AccountScreen;
