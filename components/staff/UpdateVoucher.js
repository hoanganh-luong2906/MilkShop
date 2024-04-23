import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, ScrollView, KeyboardAvoidingView, ToastAndroid, Pressable } from 'react-native';
import React, { useCallback, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from "moment";
import { AntDesign } from '@expo/vector-icons';
import ConfirmModal from '../admin/ConfirmModal';
import DatePickerCustom from '../admin/DatePickerCustom';

export default function UpdateVoucher() {
    const arrChoosePercent = [
        { title: "Giảm theo giá tiền", isPercent: false },
        { title: "Giảm theo phần trăm", isPercent: true },
    ]
    const [isShowedPercent, setShowedPercent] = useState(false);

    const [dateChooseEndDate, setDateChooseEndDate] = useState(new Date());

    const [voucher, setVoucher] = useState({
        discount: undefined,
        isPercent: false,
        description: "",
        categories_applied: [],
        endAt: "",
    });

    const [arrCategoriesData, setCategoriesData] = useState([]);
    const [isShowedCategory, setShowedCategory] = useState(false);

    const [errors, setErrors] = useState({
        "discount": false,
        "description": false,
        "categories_applied": false,
        "endAt": false,
        "errorFinal": false,
    });
    const [errorsString, setErrorsString] = useState({
        "discount": "",
        "description": "",
        "categories_applied": "",
        "endAt": "",
        "errorFinal": ""
    });

    const [confirmVisible, setConfirmVisible] = useState(false);
    const handleConfirm = () => {
        setConfirmVisible(!confirmVisible)
    }

    const navigation = useNavigation();

    const handleChangeData = (fieldName, data) => {
        setVoucher(prev => ({
            ...prev,
            [fieldName]: data
        }))
    }

    const handleChooseEndDate = (event, selectedDate) => {
        // const currentDate = selectedDate;
        const currentDate = moment(selectedDate).format('DD/MM/YYYY');
        setVoucher(prev => ({
            ...prev,
            endAt: currentDate.toString()
        }))
        setDateChooseEndDate(selectedDate);
    };

    function isPositiveIntegerAndGreater(value) {
        // Check if the value is a non-empty string
        if (typeof value !== 'string' || value.trim() === '') {
            return false;
        }

        // Check if the value contains commas
        if (value.includes(',') || value.includes('.')) {
            return false;
        }

        // Check if the value is a valid positive integer
        const integerValue = parseInt(value, 10);
        if (isNaN(integerValue) || integerValue <= 0 || !Number.isInteger(integerValue)) {
            return false;
        }

        return true;
    }
    function isPositiveInteger(value) {
        // Check if the value is a non-empty string
        if (typeof value !== 'string' || value.trim() === '') {
            return false;
        }

        // Check if the value contains commas
        if (value.includes(',') || value.includes('.')) {
            return false;
        }

        // Check if the value is a valid positive integer
        const integerValue = parseInt(value, 10);
        if (isNaN(integerValue) || integerValue < 0 || !Number.isInteger(integerValue)) {
            return false;
        }

        return true;
    }

    const toggleItemInArray = (item) => {
        // Check if the item exists in the array based on a specific property
        const index = voucher.categories_applied.findIndex(existingItem => existingItem === item._id.toString());

        if (index !== -1) {
            // Item exists, remove it
            const newArray = [...voucher.categories_applied];
            newArray.splice(index, 1);
            setVoucher(prev => ({ ...prev, categories_applied: newArray }));
        } else {
            // Item doesn't exist, add it
            setVoucher(prev => ({ ...prev, categories_applied: [...prev.categories_applied, item._id.toString()] }));
        }
    };

    const isItemInArray = (item) => {
        // Check if the item exists in the array based on a specific property
        return voucher.categories_applied.some(existingItem => existingItem === item._id.toString());
    };

    const validateForm = () => {
        // Define your validation criteria for each field
        const validations = {
            discount: voucher.discount === "" || voucher.discount == undefined,
            description: voucher.description === "",
            categories_applied: voucher.categories_applied.length == 0,
            endAt: voucher.endAt === "",
        };

        const validationsString = {
            discount: undefined,
            description: undefined,
            categories_applied: undefined,
            endAt: undefined,
        };

        //discount
        if (voucher.discount === "" || voucher.discount == undefined) {
            validationsString.discount = "Giá giảm trống";
            validations.discount = true;
        } else if (!isPositiveIntegerAndGreater(voucher.discount)) {
            validationsString.discount = `Giá giảm phải đúng định dạng. VD: "50"`;
            if (voucher.isPercent) {
                if (parseInt(voucher.discount, 10) <= 0 || parseInt(voucher.discount, 10) > 100) {
                    validationsString.discount = `Giá giảm phải nằm trong khoảng từ 1 đến 100. VD: "50"`;
                }
            } else {
                if (parseInt(voucher.discount, 10) <= 0) {
                    validationsString.discount = `Giá giảm phải lớn hơn 0`;
                }
            }
            validations.discount = true;
        } else if (isPositiveIntegerAndGreater(voucher.discount)) {
            if (voucher.isPercent) {
                if (parseInt(voucher.discount, 10) > 100) {
                    validationsString.discount = `Giá giảm phải nằm trong khoảng từ 1 đến 100. VD: "50"`;
                    validations.discount = true;
                }
            } else {
                if (parseInt(voucher.discount, 10) <= 0) {
                    validationsString.discount = `Giá giảm phải lớn hơn 0`;
                    validations.discount = true;
                }
            }
        } else {
            validations.discount = false;
        }

        //Description
        if (voucher.description === "") {
            validationsString.description = "Mô tả trống";
            validations.description = true;
        } else {
            validations.description = false;
        }

        //categories_applied
        if (voucher.categories_applied.length == 0) {
            validationsString.categories_applied = "Phải chọn ít nhất 1 thể loại để áp dụng";
            validations.categories_applied = true;
        } else {
            validations.categories_applied = false;
        }

        const currentDate = moment(new Date()).format('DD/MM/YYYY');
        //Expired date
        if (voucher.endAt === "") {
            validationsString.endAt = "Ngày hết hạn trống";
            validations.endAt = true;
        } else if (compareDates(voucher.endAt, currentDate) <= 0) {
            validationsString.endAt = "Ngày hết hạn phải lớn hơn ngày hiện tại";
            validations.endAt = true;
        } else {
            validations.endAt = false;
        }

        // Check if all fields are valid
        const isValid = Object.values(validations).every(value => !value);

        // Return validation result and errors
        return { isValid, errors: validations, validationsString: validationsString };
    };

    const saveChanges = async () => {
        // Validate the form
        const { isValid, errors, validationsString } = validateForm();
        setErrors(errors);
        setErrorsString(validationsString);
        if (isValid) {
            const data = await putVoucher(voucher);
            if (data.status == 201) {
                setVoucher({
                    discount: undefined,
                    isPercent: false,
                    description: "",
                    categories_applied: [],
                    endAt: "",
                })
                showError("Tạo mã giảm giá thành công");
            } else if (data.status == 400) {
                // showError(`${data.message}`);
                setErrors(prev => ({
                    ...prev,
                    errorFinal: true
                }))
                setErrorsString(prev => ({
                    ...prev,
                    errorFinal: data.message
                }))
            } else {
                showError(`Lỗi Server: ${data.message}`);
            }
        } else {
            showError("Có lỗi xảy ra");
        }
        handleConfirm();
    };

    const showError = (message) => {
        ToastAndroid.show(message, ToastAndroid.CENTER);
    };

    async function putVoucher(voucherData) {
        const url = 'https://milk-shop-eight.vercel.app/api/voucher';

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(voucherData)
            });

            const data = await response.json();
            console.log('Voucher putted response:', data);
            return data; // Return the posted voucher data if needed
        } catch (error) {
            console.error('Error putting voucher:', error);
            showError("Có lỗi xảy ra", error);
        }
    }

    function compareDates(dateString1, dateString2) {
        // Convert the input strings to Date objects
        const parts1 = dateString1.split('/');
        const day1 = parseInt(parts1[0], 10);
        const month1 = parseInt(parts1[1], 10) - 1; // Months are zero-based
        const year1 = parseInt(parts1[2], 10);
        const date1 = new Date(year1, month1, day1);

        const parts2 = dateString2.split('/');
        const day2 = parseInt(parts2[0], 10);
        const month2 = parseInt(parts2[1], 10) - 1; // Months are zero-based
        const year2 = parseInt(parts2[2], 10);
        const date2 = new Date(year2, month2, day2);

        // Compare the two dates
        if (date1 < date2) {
            return -1; // date1 is before date2
        } else if (date1 > date2) {
            return 1; // date1 is after date2
        } else {
            return 0; // dates are equal
        }
    }

    const getCategories = async () => {
        const response = await fetch("https://milk-shop-eight.vercel.app/api/category")
        const data = await response.json();
        setCategoriesData(data.data);
    }

    useFocusEffect(
        useCallback(() => {
            getCategories();
        }, [])
    )

    return (
        <KeyboardAvoidingView behavior="padding" style={{
            flex: 1
        }}>
            <LinearGradient
                colors={['#FFF3ED', '#FFFFFF']}
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                }}
            >
                <ScrollView >
                    <View style={{ marginVertical: 10 }} />

                    {/* discount */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={[styles.input, errors.discount ? styles.inputError : null]}
                                placeholder={voucher.isPercent ? "Phần trăm giảm (%)" : "Giá giảm"}
                                value={voucher.discount}
                                onChangeText={(value) => handleChangeData("discount", value)}
                                keyboardType='numeric'
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            {
                                errors.discount &&
                                <Text style={[
                                    styles.textError
                                ]}
                                >{errorsString.discount}</Text>
                            }
                        </View>
                    </View>

                    {/* isPercent */}
                    <Pressable style={[styles.filterContainer, { zIndex: 2 }]} onPress={() => { setShowedPercent(!isShowedPercent) }} >
                        <View style={styles.filterWrapper}>
                            <Text style={[
                                styles.inputFilter,
                                errors.category ? styles.inputError : null
                            ]}>
                                {voucher.isPercent ? arrChoosePercent[1].title : arrChoosePercent[0].title}
                            </Text>
                            <View style={styles.iconFilterContainer}>
                                <AntDesign name={isShowedPercent ? "caretup" : "caretdown"} size={15} color={"black"} />
                            </View>
                        </View>
                        {isShowedPercent &&
                            <View style={styles.showItem}>
                                {
                                    arrChoosePercent.map((item, index) => (
                                        <Pressable
                                            style={[styles.item, {
                                                borderTopLeftRadius: index == 0 ? 20 : 0,
                                                borderTopRightRadius: index == 0 ? 20 : 0,
                                                borderBottomLeftRadius: index == arrChoosePercent.length - 1 ? 20 : 0,
                                                borderBottomRightRadius: index == arrChoosePercent.length - 1 ? 20 : 0,
                                                backgroundColor: voucher.isPercent === item.isPercent ? "#FFBE98" : "#FEECE2",
                                                borderWidth: 1,
                                            }]}
                                            onPress={() => {
                                                setVoucher(prev => ({
                                                    ...prev,
                                                    isPercent: item.isPercent
                                                }))
                                                setShowedPercent(!isShowedPercent)
                                            }}
                                            key={index}
                                        >
                                            <Text style={{ textAlign: "left", textAlignVertical: "center", paddingLeft: 10 }}>{item.title}</Text>
                                        </Pressable>
                                    ))
                                }
                            </View>
                        }
                    </Pressable>

                    {/* description */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={[styles.input, errors.description ? styles.inputError : null]}
                                placeholder="Mô tả"
                                value={voucher.description}
                                onChangeText={(value) => handleChangeData("description", value)}
                                multiline={true} // Allow multiple lines
                                numberOfLines={5} // Set initial number of lines
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            {
                                errors.description &&
                                <Text style={[
                                    styles.textError
                                ]}
                                >{errorsString.description}</Text>
                            }
                        </View>
                    </View>

                    {/* categories_applied */}
                    <Pressable style={[styles.filterContainer, { zIndex: 2 }]} onPress={() => { setShowedCategory(!isShowedCategory) }} >
                        <View style={styles.filterWrapper}>
                            <Text style={[
                                styles.inputFilter,
                                errors.categories_applied ? styles.inputError : null
                            ]}>
                                Chọn thể loại áp dụng mã giảm giá
                            </Text>
                            <View style={styles.iconFilterContainer}>
                                <AntDesign name={isShowedCategory ? "caretup" : "caretdown"} size={15} color={errors.categories_applied ? "red" : "grey"} />
                            </View>
                        </View>
                    </Pressable>
                    {isShowedCategory &&
                        <View style={{ marginTop: -10, marginBottom: 10 }}>
                            {
                                arrCategoriesData.map((item, index) => (
                                    <Pressable
                                        style={[styles.item, {
                                            borderTopLeftRadius: index == 0 ? 20 : 0,
                                            borderTopRightRadius: index == 0 ? 20 : 0,
                                            borderBottomLeftRadius: index == arrCategoriesData.length - 1 ? 20 : 0,
                                            borderBottomRightRadius: index == arrCategoriesData.length - 1 ? 20 : 0,
                                            backgroundColor: isItemInArray(item) ? "#FFBE98" : "#FEECE2",
                                            borderTopWidth: 0.5,
                                            borderBottomWidth: 0.5,
                                            borderLeftWidth: 1,
                                            borderRightWidth: 1,
                                        }]}
                                        onPress={() => {
                                            toggleItemInArray(item);
                                        }}
                                        key={index}
                                    >
                                        <Text style={{ flex: 0.9, textAlign: "left", textAlignVertical: "center", paddingLeft: 10 }}>{item.name}</Text>
                                        <View style={{ flex: 0.1, justifyContent: "center" }}>
                                            <AntDesign name={isItemInArray(item) ? "minuscircleo" : "pluscircleo"} size={24} color="black" />
                                        </View>
                                    </Pressable>
                                ))
                            }
                        </View>
                    }
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            {
                                errors.categories_applied &&
                                <Text style={[
                                    styles.textError
                                ]}
                                >{errorsString.categories_applied}</Text>
                            }
                        </View>
                    </View>

                    {/* endAt */}
                    <DatePickerCustom isError={errors.endAt} date={dateChooseEndDate} dateShow={voucher.endAt.length == 0 ? "Ngày hết hạn" : voucher.endAt} onChange={handleChooseEndDate} />
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            {
                                errors.endAt &&
                                <Text style={[
                                    styles.textError
                                ]}
                                >{errorsString.endAt}</Text>
                            }
                        </View>
                    </View>

                    {/* Error final */}
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            {
                                errors.errorFinal &&
                                <Text style={[
                                    styles.textError
                                ]}
                                >{errorsString.errorFinal}</Text>
                            }
                        </View>
                    </View>

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
                            <TouchableOpacity style={styles.saveButton} onPress={() => { handleConfirm() }}>
                                <Text style={styles.buttonText}>Tạo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => { navigation.goBack() }}
                            >
                                <Text style={styles.buttonText}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ConfirmModal textTitle={"Bạn có chắc chắn tạo mã giảm giá này?"} visible={confirmVisible} onClose={() => setConfirmVisible(false)} onConfirm={saveChanges} />
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
        marginBottom: 5
    },
    inputWrapper: {
        flex: 1
    },
    input: {
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    filterContainer: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 10,
    },
    filterWrapper: {
        flex: 1,
        position: "relative"
    },
    inputFilter: {
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 3.5,
    },
    iconFilterContainer: {
        position: 'absolute',
        right: 10,
        top: 5,
    },
    showItem: {
        position: "absolute",
        bottom: -100,
        backgroundColor: "#FEECE2",
        flex: 1,
        width: "100%",
        height: 100,
        borderRadius: 20,
    },
    item: {
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: "black"
    },
    inputError: {
        borderColor: "red", // Change border color to red for invalid input
    },
    textError: {
        color: "red", // Change border color to red for invalid input
        fontSize: 12,
        paddingLeft: 10
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
