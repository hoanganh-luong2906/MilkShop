import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
export default function StaffScreen() {
  const navigation = useNavigation();

  const OrderItem = ({
    productName,
    originPrice,
    unitPrice,
    quantity,
    numOfProducts,
    total,
    status,
  }) => {
    switch (status) {
      case "Giao hàng thành công":
        iconColor = "green";
        textColor = "green";
        break;
      case "Đang giao hàng":
        iconColor = "orange";
        textColor = "orange";
        break;
      case "Giao hàng thất bại":
        iconColor = "red";
        textColor = "red";
        break;
      default:
        iconColor = "black";
        textColor = "black";
    }

    const viewOrder = () => {
      navigation.navigate("View Order");
    };
    const viewDeliveyProgress = () => {
      navigation.navigate("Delivery Progress");
    }
    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Image
            source={{
              uri: "https://concung.com/2022/05/57007-87855-large_mobile/dielac-alpha-gold-iq-2-800g.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>
              {productName}
              <Text style={styles.quantity}>
                {"   "}x{quantity}
              </Text>
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text style={styles.originPrice}>{originPrice}Đ</Text>
              <Text style={styles.unitPrice}>{unitPrice}Đ</Text>
            </View>
            <View style={styles.retradeContainer}>
              <Text style={styles.retrade}>Đổi trả hàng trong 15 ngày</Text>
            </View>
            <TouchableOpacity style={styles.seeMoreButton} onPress={viewOrder}>
              <Text style={styles.buttonText}>Xem thêm sản phẩm</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.otherProducts}>({numOfProducts} sản phẩm)</Text>
          <Text style={styles.total}>Tổng: {total}Đ</Text>
        </View>
        <View style={styles.line}>
          <Text></Text>
        </View>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            marginHorizontal: 10
          }}
          onPress={viewDeliveyProgress}
        >
          <FontAwesome name="truck" size={26} color={iconColor} />
          <Text
            style={{
              fontSize: 20,
              color: textColor,
              fontWeight: "bold",
              marginLeft: 5,
            }}
          >
            {status}
          </Text>
          <FontAwesome name="chevron-right" size={22} style={{ fontWeight: "200" }} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Quản lí đơn hàng</Text>
      <OrderItem
        productName="Sữa bột Alphagold"
        originPrice={139000}
        unitPrice={90000}
        quantity={2}
        numOfProducts={3}
        total={450000}
        status="Giao hàng thành công"
      />
      <OrderItem
        productName="Sữa bột Alphagold"
        originPrice={139000}
        unitPrice={90000}
        quantity={3}
        numOfProducts={4}
        total={650000}
        status="Đang giao hàng"
      />
      <OrderItem
        productName="Sữa bột Alphagold"
        originPrice={139000}
        unitPrice={90000}
        quantity={4}
        numOfProducts={2}
        total={420000}
        status="Giao hàng thất bại"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#FEECE2",
    marginVertical: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 120,
    marginRight: 10,
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
  },
  quantity: {
    flex: 1,
    color: "#584D4D",
    fontWeight: "300",
    fontSize: 16,
    marginLeft: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
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
  unitPrice: {
    fontSize: 18,
    color: "#000000",
  },
  retradeContainer: {
    backgroundColor: "#CDC8C5",
    width: "70%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  retrade: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  seeMoreButton: {
    backgroundColor: "#FFBE98",
    width: "70%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginVertical: 5,
    marginHorizontal: 25,
  },
  buttonText: {
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
  },
  otherProducts: {
    fontSize: 16,
    color: "#000000",
    marginTop: 10,
    marginLeft: 5,
  },
  total: {
    marginTop: 10,
    marginRight: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  line: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    marginVertical: 5,
    height: 2,
  },
});
