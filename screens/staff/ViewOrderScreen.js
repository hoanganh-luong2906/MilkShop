import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';

import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function ViewOrderScreen() {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.navigate("Staff Home");
  };

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.title}>
        <TouchableOpacity onPress={goBack}>
          <FontAwesome name="chevron-left" size={22} style={styles.goBack} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Chi tiết đơn hàng</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.item}>
          <Image
            source={{
              uri: "https://concung.com/2022/05/57007-87855-large_mobile/dielac-alpha-gold-iq-2-800g.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>
              Sữa bột Alphagold
              <Text style={styles.quantity}>{"   "}x2</Text>
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text style={styles.originPrice}>139000Đ</Text>
              <Text style={styles.unitPrice}>99000Đ</Text>
            </View>
            <View style={styles.retradeContainer}>
              <Text style={styles.retrade}>Đổi trả hàng trong 15 ngày</Text>
            </View>
          </View>
        </View>
        <View style={styles.blackLine}></View>
        <View style={styles.item}>
          <Image
            source={{
              uri: "https://cdn.nhathuoclongchau.com.vn/unsafe/https://cms-prod.s3-sgn09.fptcloud.com/00032632_sua_abbott_cho_tre_0_6_thang_similac_1_moi_prodi_g_va_5_hmos_400g_5562_6425_large_e5f804346a.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>
              Sữa bột Similac
              <Text style={styles.quantity}>{"   "}x1</Text>
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text style={styles.originPrice}>115000Đ</Text>
              <Text style={styles.unitPrice}>70000Đ</Text>
            </View>
            <View style={styles.retradeContainer}>
              <Text style={styles.retrade}>Đổi trả hàng trong 15 ngày</Text>
            </View>
          </View>
        </View>
        <View style={styles.blackLine}></View>
        <View style={styles.item}>
          <Image
            source={{
              uri: "https://suabottot.com/wp-content/uploads/2020/08/sua-ensure-uc.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>
              Sữa bột Ensure
              <Text style={styles.quantity}>{"   "}x2</Text>
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text style={styles.originPrice}>189000Đ</Text>
              <Text style={styles.unitPrice}>100000Đ</Text>
            </View>
            <View style={styles.retradeContainer}>
              <Text style={styles.retrade}>Đổi trả hàng trong 15 ngày</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoBox}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Thành tiền</Text>
            <Text style={styles.totalPrice}>450.000Đ</Text>
          </View>
          <View style={styles.grayLine}>
            <Text></Text>
          </View>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text style={styles.infoTitle}>
              <FontAwesome name="credit-card" size={16} /> Phương thức thanh toán
            </Text>
            <Text style={styles.infoContent}>
              Tài khoản liên kết với ShopeePay
            </Text>
          </View>
          <View style={styles.grayLine}>
            <Text></Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Thời gian đặt hàng</Text>
            <Text style={styles.infoContent}>20-04-2024 11:24</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Thời gian giao hàng</Text>
            <Text style={styles.infoContent}>20-04-2024 12:11</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Thời gian hoàn thành</Text>
            <Text style={styles.infoContent}>25-04-2024 12:00</Text>
          </View>
        </View>
      </View>
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
    marginLeft: 5
  },
  productName: {
    fontSize: 24,
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
  unitPrice: {
    fontSize: 18,
    color: "#000000",
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
    marginTop: 20,
  },
  totalText: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10
  },
  totalPrice: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
  },
  infoBox: {
    backgroundColor: "#FFBE98",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  infoTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000000",
  },
  infoContent: {
    fontSize: 16,
    color: "#000000",
  },
  grayLine: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    marginVertical: 10,
    height: 5,
  },
});
