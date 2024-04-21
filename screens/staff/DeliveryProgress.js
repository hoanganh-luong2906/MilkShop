import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';

export default function DeliveryProgress() {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.navigate("Staff Home");
  };
  const ProgressDetail = ({
    currentStatus,
    date,
    time,
    status,
    receiver,
    sender,
    phone,
    licensePlates,
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
      case "Đã giao hàng":
        iconName = "check-circle";
        size = 16;
        progressLine = "flex";
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
      case "Đặt hàng thành công":
        iconName = "credit-card-alt";
        size = 12;
        progressLine = "none";
        break;
      default:
        iconName = "none";
        size = 0;
        break;
    }
    return (
      <View style={styles.milestoneContainer}>
        <View style={styles.leftInfo}>
          <Text style={[styles.milestoneText, { color: textColor }]}>
            {date}
          </Text>
          <Text style={[styles.milestoneText, { color: textColor }]}>
            {time}
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
            {status}
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
            (+84) {phone}
          </Text>
          <Text
            style={[
              styles.infoText,
              { color: textColor, display: displayForm },
            ]}
          >
            Biển số xe: {licensePlates}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={styles.title}>
        <TouchableOpacity onPress={goBack}>
          <FontAwesome name="chevron-left" size={22} style={styles.goBack} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Tiến độ giao hàng</Text>
      </View>
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

        {/* <View style={styles.milestoneContainer}>
            <View style={styles.leftInfo}>
              <Text style={styles.milestoneText}>20 Tháng 4</Text>
              <Text style={styles.milestoneText}>11:24</Text>
            </View>
            <View style={styles.checkpoint}>
              <Icon name="credit-card-alt" size={12} color="#000000" />
            </View>
            <View style={styles.rightInfo}>
              <Text style={styles.infoStatus}>Đặt hàng thành công</Text>
            </View>
          </View> */}
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
  },
  codeContainer: {
    backgroundColor: "#FFBE98",
    height: 35,
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
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
    width: 30,
    height: 30,
    marginLeft: -12,
    marginTop: -12,
    position: "absolute",
    left: "31%",
    top: "10%",
  },
  progressLine: {
    top: 30,
    height: 115,
    bottom: 0,
    left: 15,
    width: 2,
    backgroundColor: "#000000",
  },
  rightInfo: {
    flex: 1,
    left: 40,
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
