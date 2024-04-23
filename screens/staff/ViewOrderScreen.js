import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function ViewOrderScreen({ route }) {
  const navigation = useNavigation();
  const [order, setOrder] = useState([]);
  const { orderId } = route.params;

  useEffect(() => {
    const getOrderDetail = async () => {
      try {
        const response = await fetch(
          `https://milk-shop-eight.vercel.app/api/order/${orderId}`
        );
        const data = await response.json();
        setOrder(data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    getOrderDetail();
  }, [orderId]);

  const goBack = () => {
    navigation.navigate("Staff Home");
  };

  return (
    <>
      <LinearGradient colors={["#FFF3ED", "#FFFFFF"]} style={styles.screen}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.title}>
            <TouchableOpacity onPress={goBack}>
              <FontAwesome
                name="chevron-left"
                size={22}
                style={styles.goBack}
              />
            </TouchableOpacity>
            <Text style={styles.titleText}>Chi tiết đơn hàng</Text>
          </View>
          <OrderDetail
            productList={order.productList}
            total={order.totalPrice}
            discount={order.totalDiscount}
            paymentMethod={order.paymentMethod}
            timeOrder={order.timeOrder}
            timePaid={order.timePayed}
            timeStartShip={order.timeStartShip}
            timeCompletion={order.timeCompletion}
          />
        </ScrollView>
      </LinearGradient>
    </>
  );
}

const OrderDetail = ({
  productList,
  total,
  discount,
  paymentMethod,
  timeOrder,
  timePaid,
  timeStartShip,
  timeCompletion,
}) => {
  function formatToVND(value) {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      minimumFractionDigits: 0,
    });

    const formattedNumber = formatter.format(value);
    return `${formattedNumber} VNĐ`;
  }

  return (
    <View style={styles.card}>
      {productList?.map((product, index) => (
        <View key={index}>
          <View style={styles.item}>
            <Image
              source={{
                uri: `${product.imageURL}`,
              }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>
                {product.name}
                <Text style={styles.quantity}>
                  {"   "}x{product.quantity}
                </Text>
              </Text>
              <Text style={styles.bracate}>Hãng: {product.brandName}</Text>
              <Text style={styles.bracate}>Loại: {product.category}</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <Text style={styles.unitPrice}>
                  Đơn giá: {formatToVND(product.price)}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.blackLine}></View>
        </View>
      ))}
      <View style={styles.infoBox}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Tổng</Text>
          <Text style={styles.totalPrice}>{formatToVND(total)}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Giảm</Text>
          <Text style={styles.totalPrice}>{formatToVND(discount)}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Thành tiền</Text>
          <Text style={styles.totalPrice}>{formatToVND(total - discount)}</Text>
        </View>
        <View style={styles.grayLine}>
          <Text></Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text style={styles.infoTitle}>
            <FontAwesome name="credit-card" size={16} /> Phương thức thanh toán
          </Text>
          <Text style={styles.infoContent}>{paymentMethod}</Text>
        </View>
        <View style={styles.grayLine}>
          <Text></Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Thời gian đặt hàng</Text>
          <Text style={styles.infoContent}>{timeOrder}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Thời gian thanh toán</Text>
          <Text style={styles.infoContent}>{timePaid}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Thời gian giao hàng</Text>
          <Text style={styles.infoContent}>{timeStartShip}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Thời gian hoàn thành</Text>
          <Text style={styles.infoContent}>{timeCompletion}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  titleText: {
    flex: 1,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  goBack: {
    marginRight: 10,
  },
  card: {
    backgroundColor: "#FEECE2",
    marginBottom: 30,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#FFBE98",
    elevation: 5
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 120,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
  },
  quantity: {
    flex: 1,
    color: "#584D4D",
    fontWeight: "300",
    fontSize: 16,
    marginLeft: 10,
  },
  originPrice: {
    fontSize: 16,
    color: "#CDC8C5",
    marginRight: 5,
    marginTop: 3,
    fontWeight: "500",
    textDecorationLine: "line-through",
    textDecorationColor: "#CDC8C5",
  },
  bracate: {
    marginTop: 5,
    fontWeight: "400",
    fontSize: 18,
  },
  unitPrice: {
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  blackLine: {
    height: 2,
    backgroundColor: "#000000",
    marginVertical: 15,
  },
  retradeContainer: {
    backgroundColor: "#CDC8C5",
    width: "70%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  retrade: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  totalText: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  totalPrice: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: "#FFBE98",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  infoTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000000",
  },
  infoContent: {
    fontSize: 18,
    color: "#000000",
  },
  grayLine: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    marginVertical: 10,
    height: 5,
  },
});
