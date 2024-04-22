import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import moment from "moment";
import DatePickerCustom from './DatePickerCustom';

export default function AddProduct() {
    const [dateChooseImportedDate, setDateChooseImportedDate] = useState(new Date(1598051730000));
    const [dateChooseExpiredDate, setDateChooseExpiredDate] = useState(new Date(1598051730000));
    const [product, setProduct] = useState({
        name: "",
        description: "",
        brandName: "",
        category: "",
        price: undefined,
        percentageRating: undefined,
        quantity: undefined,
        sales: undefined,
        status: true,
        importedDate: "",
        expiredDate: "",
        imageURL: "",
    })
    const [errors, setErrors] = useState({
        "brandName": false,
        "category": false,
        "description": false,
        "expiredDate": false,
        "importedDate": false,
        "name": false,
        "price": false,
        "quantity": false,
        "sales": false
    })
    const navigation = useNavigation();

    const handleChangeData = (fieldName, data) => {
        setProduct(prev => ({
            ...prev,
            [fieldName]: data
        }))
    }

    const handleChooseImportedDate = (event, selectedDate) => {
        // const currentDate = selectedDate;
        const currentDate = moment(selectedDate).format('DD/MM/YYYY');
        setProduct(prev => ({
            ...prev,
            importedDate: currentDate.toString()
        }))
        setDateChooseImportedDate(selectedDate);
    };
    const handleChooseExpiredDate = (event, selectedDate) => {
        // const currentDate = selectedDate;
        const currentDate = moment(selectedDate).format('DD/MM/YYYY');
        setProduct(prev => ({
            ...prev,
            expiredDate: currentDate.toString()
        }))
        setDateChooseExpiredDate(selectedDate);
    };

    const validateForm = () => {
        // Define your validation criteria for each field
        const validations = {
            name: product.name.trim() !== "", // Name should not be empty
            description: product.description.trim() !== "", // Description should not be empty
            brandName: product.brandName.trim() !== "", // Brand name should not be empty
            category: product.category.trim() !== "", // Category should not be empty
            price: !!product.price, // Price should be a valid number
            quantity: !!product.quantity, // Quantity should be a valid number
            sales: !!product.sales, // Sales should be a valid number
            importedDate: product.importedDate.trim() !== "", // Imported date should not be empty
            expiredDate: product.expiredDate.trim() !== "" // Expired date should not be empty
        };

        // Check if all fields are valid
        const isValid = Object.values(validations).every(value => value);

        // Return validation result and errors
        return { isValid, errors: validations };
    };

    const saveChanges = () => {
        // Validate the form
        const { isValid, errors } = validateForm();
        setErrors(errors);
        if (isValid) {
            // Implement logic to save the edited product information
            // For simplicity, just logging the edited product name
            console.log("Edited product name:", product.name);
        } else {
            // Display errors or handle invalid form
            console.log("Form is invalid. Errors:", errors);
            showError(errors);
        }
    };

    const showError = (errors) => {
        let message = "";
        if (errors.name) {
            message += "Empty product name.\n"
        }
        if (errors.brandName) {
            message += "Empty brand name.\n"
        }
        if (errors.description) {
            message += "Empty description.\n"
        }
        if (errors.category) {
            message += "Empty category.\n"
        }
        if (errors.price) {
            message += "Empty price.\n"
        }
        if (errors.quantity) {
            message += "Empty quantity.\n"
        }
        if (errors.sales) {
            message += "Empty sales.\n"
        }
        if (errors.importedDate) {
            message += "Empty imported date.\n"
        }
        if (errors.expiredDate) {
            message += "Empty expired date.\n"
        }
        ToastAndroid.show(message, ToastAndroid.CENTER);
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={{
            flex: 1
        }}>
            <LinearGradient
                colors={['#FFF3ED', '#FFFFFF']}
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    paddingTop: 20
                }}
            >
                <ScrollView>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={styles.title}>Cập nhật hàng hóa</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Tên sản phẩm"
                                value={product.name}
                                onChangeText={(value) => handleChangeData("name", value)}
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Mô tả"
                                value={product.description}
                                onChangeText={(value) => handleChangeData("description", value)}
                                multiline={true} // Allow multiple lines
                                numberOfLines={5} // Set initial number of lines
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Hãng"
                                value={product.brandName}
                                onChangeText={(value) => handleChangeData("brandName", value)}
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Thể loại"
                                value={product.category}
                                onChangeText={(value) => handleChangeData("category", value)}
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Giá"
                                value={product.price}
                                onChangeText={(value) => handleChangeData("price", value)}
                                keyboardType='numeric'
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Số lượng"
                                value={product.quantity}
                                onChangeText={(value) => handleChangeData("quantity", value)}
                                keyboardType='numeric'
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Giảm giá (%)"
                                value={product.sales}
                                onChangeText={(value) => handleChangeData("sales", value)}
                                keyboardType='numeric'
                            />
                        </View>
                    </View>
                    <DatePickerCustom date={dateChooseImportedDate} dateShow={product.importedDate.length == 0 ? "Ngày nhập kho" : product.importedDate} onChange={handleChooseImportedDate} />
                    <DatePickerCustom date={dateChooseExpiredDate} dateShow={product.expiredDate.length == 0 ? "Hạn sử dụng" : product.expiredDate} onChange={handleChooseExpiredDate} />

                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: 10
                        }}
                    >
                        <View
                            style={{
                                flex: 0.8,
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <TouchableOpacity style={styles.saveButton} onPress={() => { saveChanges() }}>
                                <Text style={styles.buttonText}>Cập nhật</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => { navigation.goBack() }}
                            >
                                <Text style={styles.buttonText}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient >
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 24,
        fontWeight: "bold",
    },
    inputContainer: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 10
    },
    inputWrapper: {
        flex: 1
    },
    input: {
        borderColor: "#CCCCCC",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    saveButton: {
        flex: 0.4,
        backgroundColor: "#FFBE98",
        paddingVertical: 10,
        borderRadius: 15,
        alignItems: "center"
    },
    cancelButton: {
        flex: 0.4,
        backgroundColor: "#CDC8C5",
        paddingVertical: 10,
        borderRadius: 15,
        alignItems: "center"
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 18,
        alignItems: "center",
        textAlignVertical: "center"
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
