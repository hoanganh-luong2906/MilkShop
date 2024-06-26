import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function DeliveryProgress({ route }) {
  const navigation = useNavigation();
  const [order, setOrder] = useState([]);
  const { orderId } = route.params;

  useFocusEffect(
    useCallback(() => {
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
    }, [orderId])
  )

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
            <Text style={styles.titleText}>Tiến độ giao hàng</Text>
          </View>
          {/* <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Đã giao thành công -- 25 Tháng 4 2024
          </Text>
          <Text style={styles.headerText}>
            Vận chuyển thường -- Giao Hàng Nhanh
          </Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.codeContainer}>
            <Text style={styles.code}>
              Mã vận đơn{"                      "}ABCXYZ123456
            </Text>
          </View>
          <ProgressDetail
            date="25 Tháng 4"
            time="12:00"
            status="Đã giao hàng"
            receiver="Nguy****A"
            sender="Ngọc Tân"
            phone="111 222 8889"
            licensePlates="59A-123-456"
            currentStatus={1}
          />
          <ProgressDetail
            date="25 Tháng 4"
            time="11:30"
            status="Đang giao hàng"
            receiver="Nguy****A"
            sender="Ngọc Tân"
            phone="111 222 8889"
            licensePlates="59A-123-456"
            currentStatus={2}
          />
          <ProgressDetail
            date="20 Tháng 4"
            time="12:00"
            status="Đang chuẩn bị hàng"
            receiver="Nguy****A"
            sender="Ngọc Tân"
            phone="111 222 8889"
            licensePlates="59A-123-456"
            currentStatus={2}
          />
          <ProgressDetail
            date="20 Tháng 4"
            time="11:24"
            status="Đặt hàng thành công"
            start={0}
            currentStatus={2}
          />
        </View>
      </View> */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              {
                order?.shippingList?.[order?.shippingList?.length - 1]
                  ?.statusString
              }{" "}
              --{" "}
              {order?.timeCompletion?.substring(0, 5) +
                " " +
                order?.timeCompletion?.slice(10, 16)}
            </Text>
            <Text style={styles.headerText}>
              Vận chuyển thường -- Giao Hàng Nhanh
            </Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.codeContainer}>
              <Text style={styles.code}>
                Mã vận đơn{"                      "}ABCXYZ123456
              </Text>
            </View>
            {order?.shippingList?.map((shipping, index) => (
              <ProgressDetail
                key={index}
                date={shipping.date}
                timeCompletion={shipping.timeCompletion}
                status={shipping.statusString}
                statusString={shipping.statusString}
                receiver={shipping.receiver}
                sender={shipping.sender}
                senderPhone={shipping.senderPhone}
                licensePlate={shipping.licensePlate}
                currentStatus={
                  index === order?.shippingList?.length - 1 ? 1 : 2
                }
              />
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </>
  );
}
const ProgressDetail = ({
  date,
  statusString,
  receiver,
  sender,
  senderPhone,
  licensePlate,
  currentStatus,
  status,
  start,
}) => {
  switch (currentStatus) {
    case 1:
      textColor = "black";
      break;
    case 2:
      textColor = "#CDC8C5";
      break;
    default:
      iconColor = "black";
      textColor = "black";
  }
  switch (start) {
    case 0:
      displayForm = "none";
      break;
    default:
      displayForm = "flex";
      break;
  }
  switch (status) {
    case "Đã giao thành công":
      iconName = "check-circle";
      size = 16;
      progressLine = "none";
      break;
    case "Đang giao hàng":
      iconName = "truck";
      size = 16;
      progressLine = "flex";
      break;
    case "Đang chuẩn bị hàng":
      iconName = "dropbox";
      size = 16;
      progressLine = "flex";
      break;
    case "Người gửi hẹn lại ngày giao":
      iconName = "clock-o";
      size = 16;
      progressLine = "none";
      break;
    case "Đã huỷ":
      iconName = "remove";
      size = 16;
      progressLine = "none";
      break;
    // case "Đặt hàng thành công":
    //   iconName = "credit-card-alt";
    //   start = 0
    //   size = 12;
    //   progressLine = "none";
    //   break;
    default:
      iconName = "none";
      size = 0;
      break;
  }
  return (
    <>
      <View style={styles.milestoneContainer}>
        <View style={styles.leftInfo}>
          <Text style={[styles.milestoneText, { color: textColor }]}>
            {date?.substring(0, 10)}
          </Text>
          <Text style={[styles.milestoneText, { color: textColor }]}>
            {date?.substring(11, 16)}
          </Text>
        </View>
        <View style={styles.checkpoint}>
          <FontAwesome name={iconName} size={size} color="#000000" />
        </View>
        <View style={[styles.progressLine, { display: progressLine }]}>
          <Text></Text>
        </View>
        <View style={styles.rightInfo}>
          <Text style={[styles.infoStatus, { color: textColor }]}>
            {statusString}
          </Text>
          <Text
            style={[
              styles.infoText,
              { color: textColor, display: displayForm },
            ]}
          >
            Người nhận: {receiver}
          </Text>
          <Text
            style={[
              styles.infoText,
              { color: textColor, display: displayForm },
            ]}
          >
            Tài xế: {sender}
          </Text>
          <Text
            style={[
              styles.infoText,
              { color: textColor, display: displayForm },
            ]}
          >
            (+84) {senderPhone}
          </Text>
          <Text
            style={[
              styles.infoText,
              { color: textColor, display: displayForm },
            ]}
          >
            Biển số xe: {licensePlate}
          </Text>
        </View>
      </View>
    </>
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
  headerContainer: {
    padding: 10,
    borderRadius: 25,
    marginVertical: 15,
    backgroundColor: "#FFBE98",
    elevation: 5,
    borderWidth: 5,
    borderColor: "#FEECE2",
    marginHorizontal: 2
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
  },
  progressContainer: {
    position: "relative",
    backgroundColor: "#FEECE2",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: "#FFBE98",
    elevation: 5
  },
  codeContainer: {
    backgroundColor: "#FFBE98",
    height: 35,
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    elevation: 3
  },
  code: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  milestoneContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  leftInfo: {
    marginRight: 10,
    alignItems: "center",
  },
  milestoneText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "600",
  },
  checkpoint: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFBE98",
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
    width: 30,
    height: 30,
    marginLeft: -11,
    marginTop: -12,
    position: "absolute",
    left: "32%",
    top: "10%"
  },
  progressLine: {
    top: 30,
    height: "auto",
    bottom: 0,
    left: 15,
    width: 2,
    backgroundColor: "#000000",
  },
  rightInfo: {
    flex: 1,
    left: 40,
    paddingHorizontal: 10,
  },
  infoStatus: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000000",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 3,
    color: "#000000",
  },
});
