import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import moment from "moment";
import ConfirmModal from "../components/admin/ConfirmModal";
import DatePickerCustom from "../components/admin/DatePickerCustom";

export default function UpdateProfile({ route }) {
  const { userId } = route.params;
  const [dateChooseDateOfBirth, setDateChooseDateOfBirth] = useState(
    new Date()
  );

  const [profile, setProfile] = useState({
    gender: true, // true for male, false for female
    dateOfBirth: new Date(),
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    dateOfBirth: false,
    phone: false,
    address: false,
  });

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
      dateOfBirth: profile.dateOfBirth === "",
      phone: profile.phone === "",
      address: profile.address === "",
    };

    const isValid = Object.values(validations).every((value) => !value);
    setErrors(validations);
    return isValid;
  };

  const saveChanges = async () => {
    if (validateForm()) {
      try {
        const data = await putProfile(profile);
        if (data.status === 201) {
          // Clear form after successful update
          setProfile({
            gender: true,
            dateOfBirth: new Date(),
            phone: "",
            address: "",
          });
          showError("Profile updated successfully");
        } else {
          showError(`Server Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        showError("An error occurred while updating profile");
      }
    } else {
      showError("Please fill all required fields");
    }
  };

  const showError = (message) => {
    ToastAndroid.show(message, ToastAndroid.CENTER);
  };

  async function putProfile(profileData) {
    const url = `https://your-api-url/account/${userId}`;
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
      console.error("Error putting profile:", error);
      throw error;
    }
  }

  return (
    <LinearGradient colors={["#FFF3ED", "#FFFFFF"]} style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Gender:</Text>
        <TextInput
          style={styles.input}
          value={profile.gender ? "Male" : "Female"}
          editable={false}
        />
      </View>
      <DatePickerCustom
        isError={errors.dateOfBirth}
        date={dateChooseDateOfBirth}
        dateShow={
          profile.dateOfBirth.length == 0 ? "Ngày sinh" : profile.dateOfBirth
        }
        onChange={handleChooseDateOfBirth}
      />
      <View style={styles.inputContainer}>
        <Text>Phone:</Text>
        <TextInput
          style={[styles.input, errors.phone && styles.inputError]}
          placeholder="Phone"
          value={profile.phone}
          onChangeText={(value) => handleChangeData("phone", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Address:</Text>
        <TextInput
          style={[styles.input, errors.address && styles.inputError]}
          placeholder="Address"
          value={profile.address}
          onChangeText={(value) => handleChangeData("address", value)}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  inputError: {
    borderColor: "red",
  },
  saveButton: {
    backgroundColor: "#FFBE98",
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});
