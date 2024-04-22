import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ProductManagement() {
  const navigation = useNavigation();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedProductName, setEditedProductName] = useState("");
  
  const viewDetail = () => {
    navigation.navigate("View Detail");
  };
  const toggleEditModal = () => {
    setIsEditModalVisible(!isEditModalVisible);
  };

  const saveChanges = () => {
    // Implement logic to save the edited product information
    // For simplicity, just logging the edited product name
    console.log("Edited product name:", editedProductName);
    toggleEditModal(); // Close the edit modal after saving changes
  };
  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Quản lí hàng hóa</Text>
      <View style={styles.searchBarContainer}>
        <FontAwesome name="search" style={styles.icon} />
        <TextInput style={styles.searchInput} placeholder="Tìm sản phẩm" />
        <FontAwesome name="filter" style={styles.icon} />
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <TouchableOpacity onPress={viewDetail}>
            <Image
              source={{
                uri: "https://concung.com/2022/05/57007-87855-large_mobile/dielac-alpha-gold-iq-2-800g.jpg",
              }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <Text style={styles.cardText}>Sữa bột Alphagold</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>139000Đ</Text>
              <Text style={styles.discountPrice}>90000Đ</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.availabilityContainer}>
            <Text style={styles.availability}>Còn hàng</Text>
            <TouchableOpacity onPress={toggleEditModal}>
              <FontAwesome name="pencil" style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card}>
          <TouchableOpacity onPress={viewDetail}>
            <Image
              source={{
                uri: "https://concung.com/2022/05/57007-87855-large_mobile/dielac-alpha-gold-iq-2-800g.jpg",
              }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <Text style={styles.cardText}>Sữa bột Alphagold</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>139000Đ</Text>
              <Text style={styles.discountPrice}>90000Đ</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.availabilityContainer}>
            <Text style={styles.availability}>Còn hàng</Text>
            <TouchableOpacity onPress={toggleEditModal}>
              <FontAwesome name="pencil" style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal visible={isEditModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Cập nhật hàng hóa</Text>
          <TextInput
            style={styles.input}
            placeholder="Tên sản phẩm"
            value={editedProductName}
          />
          <TextInput
            style={styles.input}
            placeholder="Dòng"
            value={editedProductName}
          />
          <TextInput
            style={styles.input}
            placeholder="Giá"
            value={editedProductName}
          />
          <TextInput
            style={styles.input}
            placeholder="Giảm giá"
            value={editedProductName}
          />
          <TextInput
            style={styles.input}
            placeholder="Tình trạng"
            value={editedProductName}
          />
          <TextInput
            style={styles.input}
            placeholder="Ngày nhập kho"
            value={editedProductName}
          />
          <TextInput
            style={styles.input}
            placeholder="Ngày hết hạn"
            value={editedProductName}
          />
          <View
            style={{
              display: "flex",
              width: 250,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={toggleEditModal}
            >
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
              <Text style={styles.buttonText}>Cập nhật</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFBE98",
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  icon: {
    fontSize: 20,
    color: "#000000",
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#FEECE2",
    width: "48%",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  originalPrice: {
    fontSize: 14,
    color: "#CDC8C5",
    textDecorationLine: "line-through",
    marginRight: 5,
  },
  discountPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  availabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  availability: {
    color: "green",
    fontWeight: "700",
  },
  editIcon: {
    fontSize: 16,
    color: "#000000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#FFBE98",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#CDC8C5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18
  },
});
