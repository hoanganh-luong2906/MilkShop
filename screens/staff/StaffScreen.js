import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import useAuth from "../../utils/useAuth";
export default function StaffScreen() {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(
          "https://milk-shop-eight.vercel.app/api/order"
        );
        const data = await response.json();
        setOrders(data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    getOrders();
  }, []);

  const viewOrder = (id) => {
    navigation.navigate("View Order", { orderId: id });
  };
  const viewDeliveyProgress = (id) => {
    navigation.navigate("Delivery Progress", { orderId: id });
  };
  //   return (
  //     <View style={styles.card}>
  //       <View style={styles.cardContent}>
  //         <Image
  //           source={{
  //             uri: "https://concung.com/2022/05/57007-87855-large_mobile/dielac-alpha-gold-iq-2-800g.jpg",
  //           }}
  //           style={styles.image}
  //           resizeMode="cover"
  //         />
  //         <View style={styles.productDetails}>
  //           <Text style={styles.productName}>
  //             {productName}
  //             <Text style={styles.quantity}>
  //               {"   "}x{quantity}
  //             </Text>
  //           </Text>
  //           <View
  //             style={{
  //               display: "flex",
  //               flexDirection: "row",
  //             }}
  //           >
  //             <Text style={styles.originPrice}>{originPrice}Đ</Text>
  //             <Text style={styles.unitPrice}>{unitPrice}Đ</Text>
  //           </View>
  //           <View style={styles.retradeContainer}>
  //             <Text style={styles.retrade}>Đổi trả hàng trong 15 ngày</Text>
  //           </View>
  //           <TouchableOpacity style={styles.seeMoreButton} onPress={viewOrder}>
  //             <Text style={styles.buttonText}>Xem thêm sản phẩm</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //       <View
  //         style={{
  //           display: "flex",
  //           flexDirection: "row",
  //           justifyContent: "space-between",
  //         }}
  //       >
  //         <Text style={styles.otherProducts}>({numOfProducts} sản phẩm)</Text>
  //         <Text style={styles.total}>Tổng: {total}Đ</Text>
  //       </View>
  //       <View style={styles.line}>
  //         <Text></Text>
  //       </View>
  //       <TouchableOpacity
  //         style={{
  //           display: "flex",
  //           flexDirection: "row",
  //           justifyContent: "space-between",
  //           marginVertical: 10,
  //           marginHorizontal: 10,
  //         }}
  //         onPress={viewDeliveyProgress}
  //       >
  //         <FontAwesome name="truck" size={26} color={iconColor} />
  //         <Text
  //           style={{
  //             fontSize: 20,
  //             color: textColor,
  //             fontWeight: "bold",
  //             marginLeft: 5,
  //           }}
  //         >
  //           {status}
  //         </Text>
  //         <FontAwesome
  //           name="chevron-right"
  //           size={22}
  //           style={{ fontWeight: "200" }}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };
  // const { logout } = useAuth();
  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      {/* <Pressable style={{ alignItems: "flex-end" }} onPress={() => logout()}>
        <MaterialIcons name="logout" size={30} color="black" />
      </Pressable> */}
      <Text style={styles.title}>Quản lí đơn hàng</Text>
      {orders.map((order, index) => (
        <OrderItem
          key={index}
          orderId={order._id}
          productName={order.productList[0].name}
          image={order.productList[0].imageURL}
          unitPrice={order.productList[0].price}
          quantity={order.productList[0].quantity}
          numOfProducts={order.productList.length}
          time={order.timeCompletion}
          total={order.totalPrice}
          discount={order.totalDiscount}
          onPress1={() => viewOrder(order._id)}
          onPress2={() => viewDeliveyProgress(order._id)}
        />
      ))}
    </ScrollView>
  );
}

const OrderItem = ({
  orderId,
  productName,
  image,
  unitPrice,
  quantity,
  numOfProducts,
  total,
  discount,
  onPress1,
  onPress2,
  time,
}) => {
  switch (time) {
    case "":
      iconColor = "orange";
      textColor = "orange";
      statusText = "Đang xử lí";
      break;
    default:
      iconColor = "green";
      textColor = "green";
      statusText = "Hoàn thành đơn hàng";
  }
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image
          source={{
            uri: `${image}`,
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.productDetails}>
          <Text style={{ display: "none" }}>{orderId}</Text>
          <Text style={styles.productName}>
            {productName.length < 35
              ? `${productName}`
              : `${productName.substring(0, 32)}...`}
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
            <Text style={styles.unitPrice}>{unitPrice}Đ</Text>
          </View>
          <View style={styles.retradeContainer}>
            <Text style={styles.retrade}>Đổi trả hàng trong 15 ngày</Text>
          </View>
          <TouchableOpacity style={styles.seeMoreButton} onPress={onPress1}>
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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.sale}>Giảm: {discount}Đ</Text>
        <Text style={styles.final}>Thành tiền: {total - discount}Đ</Text>
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
          marginHorizontal: 10,
        }}
        onPress={onPress2}
      >
        <FontAwesome name="truck" size={26} color={iconColor} />
        <Text
          style={{
            display: "none",
          }}
        >
          {time}
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: textColor,
            fontWeight: "bold",
            marginLeft: 5,
          }}
        >
          {statusText}
        </Text>
        <FontAwesome
          name="chevron-right"
          size={22}
          style={{ fontWeight: "200" }}
        />
      </TouchableOpacity>
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
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
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
    marginLeft: 10,
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
    fontSize: 20,
    color: "#000000",
  },
  sale: {
    fontSize: 16,
    color: "red",
    marginTop: 12,
    marginLeft: 5,
  },
  final: {
    fontSize: 20,
    color: "green",
    marginTop: 10,
    marginRight: 5,
    fontWeight: "bold",
  },
  line: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    marginVertical: 5,
    height: 2,
  },
});
