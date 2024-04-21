import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

export default function ViewDetail() {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.navigate("Product Management");
  };

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.title}>
        <TouchableOpacity onPress={goBack}>
          <FontAwesome name="chevron-left" size={22} style={styles.goBack} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Chi tiết sản phẩm</Text>
      </View>
      <View style={styles.titleBox}>
        <Text style={styles.productName}>Sữa bột Alphagold</Text>
      </View>
      <View style={styles.productContainer}>
        <Image
          source={{
            uri: "https://concung.com/2022/05/57007-87855-large_mobile/dielac-alpha-gold-iq-2-800g.jpg",
          }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>Mã sản phẩm: abc1</Text>
          <Text style={styles.productTitle}>Giá tiền: 90.000Đ</Text>
          <Text style={styles.productTitle}>Nhập kho ngày: 18/4/2024</Text>
          <Text style={styles.productTitle}>Hạn dùng ngày: 18/4/2025</Text>
          <Text style={styles.productTitle}>Dòng: Sữa bột cao cấp</Text>
          <Text style={styles.productTitle}>Tồn Kho: 20 sản phẩm</Text>
          <Text style={[styles.productTitle, { color: "green" }]}>
            Trạng thái: Còn hàng
          </Text>
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
  titleBox: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFBE98",
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  productName: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 5,
  },
  productContainer: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FEECE2",
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
  },

  productImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginVertical: 25,
  },
  productDetails: {
    alignItems: "flex-start",
  },
  productTitle: {
    marginBottom: 5,
    fontSize: 24,
  },
  productInformation: {
    marginBottom: 5,
  },
});
