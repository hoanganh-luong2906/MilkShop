import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  ToastAndroid,
} from "react-native";
import useAuth from "../../utils/useAuth";
import DatePickerCustom from "./DatePickerCustom";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfirmModal from "./ConfirmModal";
import { useNavigation } from "@react-navigation/native";

const UpdateAdminProfile = ({route}) => {
  const { userId, user } = route.params;
  const navigation = useNavigation()
  const { isChanged, setIsChanged } = useAuth();

  const [dateChooseDateOfBirth, setDateChooseDateOfBirth] = useState(
    new Date()
  );

  const [profile, setProfile] = useState({
    fullName: user?.fullName || "",
    dateOfBirth: user?.dateOfBirth || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const [errors, setErrors] = useState({
    fullName: false,
    dateOfBirth: false,
    phone: false,
    address: false,
    errorFinal: false,
  });

  const [errorsString, setErrorsString] = useState({
    fullName: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    errorFinal: "",
  });

  const [confirmVisible, setConfirmVisible] = useState(false);
  const handleConfirm = () => {
    setConfirmVisible(!confirmVisible);
  };

  const handleChooseDateOfBirth = (event, selectedDate) => {
    // const currentDate = selectedDate;
    const currentDate = moment(selectedDate).format("DD/MM/YYYY");
    setProfile((prev) => ({
      ...prev,
      dateOfBirth: currentDate.toString(),
    }));
    setDateChooseDateOfBirth(selectedDate);
  };

  const handleChangeData = (fieldName, data) => {
    setProfile((prev) => ({
      ...prev,
      [fieldName]: data,
    }));
  };

  const validateForm = () => {
    const validations = {
      fullName: profile.dateOfBirth === "",
      dateOfBirth: profile.dateOfBirth === "",
      phone: profile.phone === "",
      address: profile.address === "",
      errorFinal: false,
    };
    const validationsString = {
      fullName: undefined,
      dateOfBirth: undefined,
      phone: undefined,
      address: undefined,
      errorFinal: undefined,
    };
    if (profile.fullName === "") {
      validationsString.fullName = "Tên trống";
      validations.fullName = true;
    } else {
      validations.fullName = false;
    }

    if (profile.dateOfBirth === "") {
      validationsString.dateOfBirth = "Ngày sinh trống";
      validations.dateOfBirth = true;
    } else {
      validations.dateOfBirth = false;
    }

    if (profile.phone === "") {
      validationsString.phone = "SĐT trống";
      validations.phone = true;
    } else {
      validations.phone = false;
    }

    if (profile.address === "") {
      validationsString.address = "Địa chỉ trống";
      validations.address = true;
    } else {
      validations.address = false;
    }
    const isValid = Object.values(validations).every((value) => !value);
    setErrors(validations);
    return {
      isValid,
      errors: validations,
      validationsString: validationsString,
    };
  };

  const saveChanges = async () => {
    const { isValid, errors, validationsString } = validateForm();
    setErrors(errors);
    setErrorsString(validationsString);
    if (isValid) {
      try {
        const data = await putProfile(profile);
        if (data.status === 200) {
          // Clear form after successful update
          // setUser(profile)
          showError(data.message);
          setConfirmVisible(false);
          await AsyncStorage.setItem("user", JSON.stringify(data.data));
          setIsChanged(!isChanged);
          navigation.goBack()
        } else {
          setErrors((prev) => ({
            ...prev,
            errorFinal: true,
          }));
          setErrorsString((prev) => ({
            ...prev,
            errorFinal: data.message,
          }));
        }
      } catch (error) {
        console.error("Lỗi cập nhât:", error);
        showError("An error occurred while updating profile");
      }
    } else {
      showError("Xin hãy điền đầy đủ");
      setConfirmVisible(false);
    }
  };

  const showError = (message) => {
    ToastAndroid.show(message, ToastAndroid.CENTER);
  };

  async function putProfile(profileData) {
    const url = `https://milk-shop-eight.vercel.app/api/account/${userId}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });
      return await response.json();
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      throw error;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Họ và Tên</Text>
        <TextInput
          style={[styles.input, errors.fullName && styles.inputError]}
          placeholder="Enter your full name"
          value={profile.fullName}
          onChangeText={(value) => handleChangeData("fullName", value)}
        />
        {errors.fullName && (
          <Text style={styles.errorText}>Xin hãy nhập tên</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput
          style={[styles.input, errors.address && styles.inputError]}
          placeholder="Enter your address"
          value={profile.address}
          onChangeText={(value) => handleChangeData("address", value)}
        />
        {errors.address && (
          <Text style={styles.errorText}>Xin hãy nhập địa chỉ</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={[styles.input, errors.phone && styles.inputError]}
          placeholder="Enter your phone number"
          keyboardType="numeric"
          value={profile.phone}
          onChangeText={(value) => handleChangeData("phone", value)}
        />
        {errors.phone && (
          <Text style={styles.errorText}>Xin hãy nhập số điện thoại</Text>
        )}
      </View>

      <Text style={styles.label}>Ngày sinh</Text>
      <DatePickerCustom
        isError={errors.dateOfBirth}
        date={dateChooseDateOfBirth}
        dateShow={
          profile.dateOfBirth.length === 0 ? "Ngày sinh" : profile.dateOfBirth
        }
        onChange={handleChooseDateOfBirth}
      />
      {errors.dateOfBirth && (
        <Text style={styles.errorText}>Xin hãy chọn ngày sinh</Text>
      )}

      <View style={styles.buttonContainer}>
        <Pressable style={styles.updateButton} onPress={() => handleConfirm()}>
          <Text style={styles.updateButtonText}>Cập nhật</Text>
        </Pressable>
        <ConfirmModal
          textTitle={"Bạn có chắc chắn sửa hồ sơ?"}
          visible={confirmVisible}
          onClose={() => setConfirmVisible(false)}
          onConfirm={saveChanges}
        />
        <Pressable style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Huỷ</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  errorText: {
    color: "red",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  updateButton: {
    flex: 0.4,
    backgroundColor: "#FFBE98",
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  cancelButton: {
    flex: 0.4,
    backgroundColor: "#CDC8C5",
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  updateButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cancelButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default UpdateAdminProfile;
