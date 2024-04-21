import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import React from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';

export default function DatePickerCustom({ date, dateShow, onChange }) {
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
                <Text style={styles.input}>
                    {dateShow.toString()}
                </Text>
                <View style={styles.iconContainer}>
                    <AntDesign name="calendar" size={20} color="black" />
                </View>
            </View>
        </Pressable>
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
        borderColor: "#CCCCCC",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 3.5,
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