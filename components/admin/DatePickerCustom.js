import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';

export default function DatePickerCustom({ date, dateShow, onChange, isError }) {
    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <Pressable style={styles.inputContainer} onPress={showDatepicker} >
            <View style={styles.inputWrapper}>
                <Text style={[
                    styles.input,
                    { color: `${dateShow === "Hạn sử dụng" || dateShow === "Ngày nhập kho" || dateShow === "Ngày hết hạn" ? "grey" : "black"}` },
                    isError ? styles.inputError : null
                ]}>
                    {dateShow.toString()}
                </Text>
                <View style={styles.iconContainer}>
                    <AntDesign name="calendar" size={20} color={isError ? "red" : "black"} />
                </View>
            </View>
        </Pressable >
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 10
    },
    inputWrapper: {
        flex: 1,
        // flexDirection: "row",
        position: "relative"
    },
    input: {
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 3.5,
    },
    inputError: {
        borderColor: "red", // Change border color to red for invalid input
    },
    iconContainer: {
        position: 'absolute',
        right: 10,
        top: 2.5,
    },
    dateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        minWidth: 200,
        alignItems: 'center',
    },
});
