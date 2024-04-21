import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Sữa bột Alphagold",
      price: 90000,
      quantity: 2,
      imageUri:
        "https://concung.com/2022/05/57007-87855-large_mobile/dielac-alpha-gold-iq-2-800g.jpg",
    },
    {
      id: "2",
      name: "Sữa bột Similac",
      price: 70000,
      quantity: 1,
      imageUri:
        "https://cdn.nhathuoclongchau.com.vn/unsafe/https://cms-prod.s3-sgn09.fptcloud.com/00032632_sua_abbott_cho_tre_0_6_thang_similac_1_moi_prodi_g_va_5_hmos_400g_5562_6425_large_e5f804346a.jpg",
    },
    {
      id: "3",
      name: "Sữa Ensure",
      price: 100000,
      quantity: 2,
      imageUri:
        "https://suabottot.com/wp-content/uploads/2020/08/sua-ensure-uc.jpg",
    },
    {
      id: "4",
      name: "Sữa Lạc",
      price: 30000,
      quantity: 3,
      imageUri:
        "https://suabottot.com/wp-content/uploads/2020/08/sua-ensure-uc.jpg",
    },
  ]);

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const increaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        <View style={styles.headerBox}>
          <Text style={styles.header}>Giỏ hàng</Text>
        </View>
        <View style={styles.container}>
          {cartItems.map((item) => (
            <View style={styles.card} key={item.id}>
              <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}Đ</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                    <View style={styles.quantityButtonContainer}>
                      <Text style={styles.quantityButton}>-</Text>
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.itemQuantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                    <View style={styles.quantityButtonContainer}>
                      <Text style={styles.quantityButton}>+</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>Thành tiền</Text>
          <Text style={styles.totalPriceText}>{calculateTotalPrice()}Đ</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Thanh toán</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Tiếp tục mua hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF3ED",
    paddingVertical: 10,
  },
  headerBox: {
    backgroundColor: "#FFF3ED",
    alignItems: "center",
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000",
    textAlign: "center",
  },
  container: {
    marginHorizontal: 10,
  },
  card: {
    backgroundColor: "#FEECE2",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#FFBE98",
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 100,
    height: 120,
    resizeMode: "cover",
    marginRight: 15,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
  },
  itemPrice: {
    fontSize: 22,
    color: "#000000",
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButtonContainer: {
    backgroundColor: "#FFBE98",
    borderRadius: 5,
  },
  quantityButton: {
    fontSize: 24,
	fontWeight: "bold",
    color: "#000000",
    paddingHorizontal: 10,
  },
  itemQuantity: {
    fontSize: 20,
    color: "#000000",
    marginHorizontal: 15,
	fontWeight: "bold",
  },
  totalPriceContainer: {
    backgroundColor: "#FFBE98",
    padding: 10,
    borderRadius: 20,
    marginTop: 0,
    marginHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalPriceText: {
    fontSize: 20,
    paddingHorizontal: 5,
    fontWeight: "bold",
    color: "#000000",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "#FFBE98",
    borderRadius: 20,
    paddingVertical: 12,
    width: "48%",
  },
  buttonText: {
    textAlign: "center",
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CartScreen;
