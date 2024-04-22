import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, ScrollView, KeyboardAvoidingView, ToastAndroid, Pressable, FlatList } from 'react-native';
import React, { useCallback, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import moment from "moment";
import DatePickerCustom from './DatePickerCustom';
import { AntDesign } from '@expo/vector-icons';
import ConfirmModal from './ConfirmModal';

export default function UpdateProduct() {
    const arrImages = [
        "https://cdn1.concung.com/2023/03/61836-99104/tpddyh-varna-complete-si-lon-850g.png",
        "https://cdn1.concung.com/2022/03/54474-84246/scu-probi-duong-65-ml-5-chai.jpg",
        "https://cdn1.concung.com/2022/10/59711-94510/sua-chua-pho-mai-vi-dau-tay.jpg",
        "https://cdn1.concung.com/2024/04/66098-109575/sua-tuoi-tiet-trung-oldenburger-it-duong-180ml-loc-4-hop.png"
    ];
    const [isShowedImg, setShowedImg] = useState(false);

    const [dateChooseImportedDate, setDateChooseImportedDate] = useState(new Date());
    const [dateChooseExpiredDate, setDateChooseExpiredDate] = useState(new Date());

    const [product, setProduct] = useState({
        name: "",
        description: "",
        brandName: "",
        category: {
            _id: "",
            name: "",
            products: []
        },
        price: undefined,
        percentageRating: 0,
        quantity: undefined,
        sales: undefined,
        status: true,
        importedDate: "",
        expiredDate: "",
        imageURL: "",
    });
    const [productsData, setProductsData] = useState([]);
    const [isShowedProductData, setShowedProductData] = useState(false);

    const [arrCategoriesData, setCategoriesData] = useState([]);
    const [isShowedCategory, setShowedCategory] = useState(false);

    const [errors, setErrors] = useState({
        "name": false,
        "description": false,
        "brandName": false,
        "category": false,
        "price": false,
        "quantity": false,
        "sales": false,
        "importedDate": false,
        "expiredDate": false,
        "imageURL": false,
        "errorFinal": false,
    });
    const [errorsString, setErrorsString] = useState({
        "name": "",
        "description": "",
        "brandName": "",
        "category": "",
        "price": "",
        "quantity": "",
        "sales": "",
        "importedDate": "",
        "expiredDate": "",
        "imageURL": "",
        "errorFinal": ""
    });

    const [confirmVisible, setConfirmVisible] = useState(false);
    const handleConfirm = () => {
        setConfirmVisible(!confirmVisible)
    }

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

    function isPositiveIntegerAndGreater(value) {
        // Check if the value is a non-empty string
        if (typeof value !== 'string' || value.trim() === '') {
            return false;
        }

        // Check if the value is a valid positive integer
        const integerValue = parseInt(value, 10);
        if (isNaN(integerValue) || integerValue <= 0) {
            return false;
        }

        return true;
    }
    function isPositiveInteger(value) {
        // Check if the value is a non-empty string
        if (typeof value !== 'string' || value.trim() === '') {
            return false;
        }

        // Check if the value is a valid positive integer
        const integerValue = parseInt(value, 10);
        if (isNaN(integerValue) || integerValue < 0) {
            return false;
        }

        return true;
    }

    const validateForm = () => {
        // Define your validation criteria for each field
        const validations = {
            name: product.name === "", // Name should not be empty
            description: product.description === "", // Description should not be empty
            brandName: product.brandName === "", // Brand name should not be empty
            category: product.category.name === "", // Category should not be empty
            price: product.price === "" || product.price == undefined, // Price should be a valid number
            quantity: product.quantity === "" || product.quantity == undefined, // Quantity should be a valid number
            sales: product.sales === "" || product.sales == undefined, // Sales should be a valid number
            importedDate: product.importedDate === "", // Imported date should not be empty
            expiredDate: product.expiredDate === "", // Expired date should not be empty
            imageURL: product.imageURL === "",
            errorFinal: false,
        };

        const validationsString = {
            name: undefined,
            description: undefined,
            brandName: undefined,
            category: undefined,
            price: undefined,
            quantity: undefined,
            sales: undefined,
            importedDate: undefined,
            expiredDate: undefined,
            imageURL: undefined,
            errorFinal: undefined
        };

        //Name
        if (product.name === "") {
            validationsString.name = "Tên sản phẩm trống";
            validations.name = true;
        } else {
            validations.name = false;
        }

        //Description
        if (product.description === "") {
            validationsString.description = "Mô tả trống";
            validations.description = true;
        } else {
            validations.description = false;
        }

        //Brand
        if (product.brandName === "") {
            validationsString.brandName = "Tên hãng trống";
            validations.brandName = true;
        } else {
            validations.brandName = false;
        }

        //Category
        if (product.category.name === "") {
            validationsString.category = "Thể loại trống";
            validations.category = true;
        } else {
            validations.category = false;
        }

        //Price
        if (product.price === "" || product.price == undefined) {
            validationsString.price = "Giá trống";
            validations.price = true;
        } else if (!isPositiveIntegerAndGreater(product.price)) {
            validationsString.price = "Giá phải lớn hơn 0";
            validations.price = true;
        } else {
            validations.price = false;
        }

        //Quantity
        if (product.quantity === "" || product.quantity == undefined) {
            validationsString.quantity = "Số lượng trống";
            validations.quantity = true;
        } else if (!isPositiveIntegerAndGreater(product.quantity)) {
            validationsString.quantity = "Số lượng phải lớn hơn 0";
            validations.quantity = true;
        } else {
            validations.quantity = false;
        }

        //Sales
        if (product.sales === "" || product.sales == undefined) {
            validationsString.sales = "Giảm giá trống";
            validations.sales = true;
        } else if (!isPositiveInteger(product.sales)) {
            validationsString.sales = "Giảm giá phải là số nguyên dương";
            validations.sales = true;
        } else {
            validations.sales = false;
        }

        //Image
        if (product.imageURL === "") {
            validationsString.imageURL = "Hình ảnh trống";
            validations.imageURL = true;
        } else {
            validations.imageURL = false;
        }

        const currentDate = moment(new Date()).format('DD/MM/YYYY');
        //Expired date
        if (product.expiredDate === "") {
            validationsString.expiredDate = "Hạn sử dụng trống";
            validations.expiredDate = true;
        } else if (compareDates(product.expiredDate, currentDate) < 0) {
            validationsString.expiredDate = "Hạn sử dụng nhỏ hơn ngày hiện tại";
            validations.expiredDate = true;
        } else {
            validations.expiredDate = false;
        }

        //Imported date
        if (product.importedDate === "") {
            validationsString.importedDate = "Ngày nhập kho trống";
            validations.importedDate = true;
        } else if (compareDates(product.importedDate, currentDate) < 0) {
            validationsString.importedDate = "Ngày nhập kho nhỏ hơn ngày hiện tại";
            validations.importedDate = true;
        } else {
            validations.importedDate = false;
        }

        if (product.importedDate !== "" && product.expiredDate !== "") {
            if (compareDates(product.importedDate, product.expiredDate) == 1) {
                validationsString.errorFinal = "Hạn sử dụng không được nhỏ hơn ngày nhập kho";
                validations.errorFinal = true;
            } else {
                validations.errorFinal = false;
            }
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
            // Implement logic to save the edited product information
            // For simplicity, just logging the edited product name
            const copyProduct = {
                ...product,
                category: product.category._id,
            };
            const data = await putProduct(copyProduct);
            if (data.status == 201) {
                setProduct({
                    name: "",
                    description: "",
                    brandName: "",
                    category: {
                        _id: "",
                        name: "",
                        products: []
                    },
                    price: undefined,
                    percentageRating: 0,
                    quantity: undefined,
                    sales: undefined,
                    status: true,
                    importedDate: "",
                    expiredDate: "",
                    imageURL: "",
                })
                showError("Tạo sản phẩm thành công");
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

    async function putProduct(productData) {
        const url = 'https://milk-shop-eight.vercel.app/api/product';

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            const data = await response.json();
            console.log('Product putted response:', data);
            return data; // Return the posted product data if needed
        } catch (error) {
            console.error('Error putting product:', error);
            throw error; // Rethrow the error to handle it further up the call stack
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

    const getProducts = async () => {
        const response = await fetch("https://milk-shop-eight.vercel.app/api/product")
        const data = await response.json();
        setProductsData(data.data);
    }

    useFocusEffect(
        useCallback(() => {
            getCategories();
            getProducts();
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
                <ScrollView>
                    <View style={{ marginVertical: 10 }} />

                    {/* Product list for choosing */}
                    <Pressable style={[styles.filterContainer, { marginBottom: isShowedProductData ? -5 : 5 }]} onPress={() => { setShowedProductData(!isShowedProductData) }} >
                        <View style={styles.filterWrapper}>
                            <Text style={[
                                styles.inputFilter,
                                { color: `${product?._id ? "grey" : "black"}` },
                                errors.category ? styles.inputError : null
                            ]}>
                                {product?._id ? product?._id : "Chọn sản phẩm"}
                            </Text>
                            <View style={styles.iconFilterContainer}>
                                <AntDesign name={isShowedProductData ? "caretup" : "caretdown"} size={15} color={errors.category ? "red" : "grey"} />
                            </View>
                        </View>
                    </Pressable>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper}>
                            {
                                errors.category &&
                                <Text style={[
                                    styles.textError
                                ]}
                                >{errorsString.category}</Text>
                            }
                        </View>
                    </View>
                    {isShowedProductData &&
                        <View style={styles.showItemTest}>
                            {
                                productsData.map((item, index) => (
                                    <Pressable
                                        style={[styles.item, {
                                            borderTopLeftRadius: index == 0 ? 20 : 0,
                                            borderTopRightRadius: index == 0 ? 20 : 0,
                                            borderBottomLeftRadius: index == productsData.length - 1 ? 20 : 0,
                                            borderBottomRightRadius: index == productsData.length - 1 ? 20 : 0,
                                            backgroundColor: product?._id === item._id ? "#FFBE98" : "#FEECE2",
                                            borderTopWidth: index == 0 || product?._id === item._id ? 1 : 0,
                                            borderBottomWidth: index == productsData.length - 1 || product?._id === item._id ? 1 : 0,
                                            borderLeftWidth: 1,
                                            borderRightWidth: 1,
                                        }]}
                                        onPress={() => {
                                            setProduct(pre => ({
                                                ...pre,
                                                price: item.price.toString()
                                            }))
                                            setShowedProductData(!isShowedProductData)
                                        }}
                                        key={index}
                                    >
                                        <Text style={{ textAlign: "left", textAlignVertical: "center", paddingLeft: 10 }}>{item.name}</Text>
                                    </Pressable>
                                ))
                            }
                        </View>
                    }
                    {product?._id &&
                        <>

                            {/* Name */}
                            <View style={styles.inputContainer}>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={[styles.input, errors.name ? styles.inputError : null]}
                                        placeholder="Tên sản phẩm"
                                        value={product.name}
                                        onChangeText={(value) => handleChangeData("name", value)}
                                    />
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <View style={styles.inputWrapper}>
                                    {
                                        errors.name &&
                                        <Text style={[
                                            styles.textError
                                        ]}
                                        >{errorsString.name}</Text>
                                    }
                                </View>
                            </View>

                            {/* description */}
                            <View style={styles.inputContainer}>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={[styles.input, errors.description ? styles.inputError : null]}
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
                                    {
                                        errors.description &&
                                        <Text style={[
                                            styles.textError
                                        ]}
                                        >{errorsString.description}</Text>
                                    }
                                </View>
                            </View>

                            {/* imageURL */}
                            <Pressable style={[styles.filterContainer, { zIndex: 1 }]} onPress={() => { setShowedImg(!isShowedImg) }} >
                                <View style={styles.filterWrapper}>
                                    <Text style={[
                                        styles.inputFilter,
                                        { color: `${product.imageURL === "" ? "grey" : "black"}` },
                                        errors.imageURL ? styles.inputError : null
                                    ]}>
                                        {product.imageURL === "" ? "Hình sản phẩm" : product.imageURL}
                                    </Text>
                                    <View style={styles.iconFilterContainer}>
                                        <AntDesign name={isShowedImg ? "caretup" : "caretdown"} size={15} color={errors.imageURL ? "red" : "grey"} />
                                    </View>
                                </View>
                                {isShowedImg &&
                                    <View style={styles.showItem}>
                                        {
                                            arrImages.map((url, index) => (
                                                <Pressable
                                                    style={[styles.item, {
                                                        borderTopLeftRadius: index == 0 ? 20 : 0,
                                                        borderTopRightRadius: index == 0 ? 20 : 0,
                                                        borderBottomLeftRadius: index == arrImages.length - 1 ? 20 : 0,
                                                        borderBottomRightRadius: index == arrImages.length - 1 ? 20 : 0,
                                                        backgroundColor: product.imageURL === url ? "#FFBE98" : "#FEECE2",
                                                        borderTopWidth: index == 0 || product.imageURL === url ? 1 : 0,
                                                        borderBottomWidth: index == arrImages.length - 1 || product.imageURL === url ? 1 : 0,
                                                        borderLeftWidth: 1,
                                                        borderRightWidth: 1,
                                                    }]}
                                                    onPress={() => {
                                                        handleChangeData("imageURL", url)
                                                        setShowedImg(!isShowedImg)
                                                    }}
                                                    key={index}
                                                >
                                                    <Text style={{ textAlign: "left", textAlignVertical: "center", paddingLeft: 10 }}>{url}</Text>
                                                </Pressable>
                                            ))
                                        }
                                    </View>
                                }
                            </Pressable>
                            <View style={styles.inputContainer}>
                                <View style={styles.inputWrapper}>
                                    {
                                        errors.imageURL &&
                                        <Text style={[
                                            styles.textError
                                        ]}
                                        >{errorsString.imageURL}</Text>
                                    }
                                </View>
                            </View>

                            {/* price */}
                            <View style={styles.inputContainer}>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={[styles.input, errors.price ? styles.inputError : null]}
                                        placeholder="Giá"
                                        value={product.price}
                                        onChangeText={(value) => handleChangeData("price", value)}
                                        keyboardType='numeric'
                                    />
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <View style={styles.inputWrapper}>
                                    {
                                        errors.price &&
                                        <Text style={[
                                            styles.textError
                                        ]}
                                        >{errorsString.price}</Text>
                                    }
                                </View>
                            </View>

                            {/* quantity */}
                            <View style={styles.inputContainer}>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={[styles.input, errors.quantity ? styles.inputError : null]}
                                        placeholder="Số lượng"
                                        value={product.quantity}
                                        onChangeText={(value) => handleChangeData("quantity", value)}
                                        keyboardType='numeric'
                                    />
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <View style={styles.inputWrapper}>
                                    {
                                        errors.quantity &&
                                        <Text style={[
                                            styles.textError
                                        ]}
                                        >{errorsString.quantity}</Text>
                                    }
                                </View>
                            </View>

                            {/* Sales */}
                            <View style={styles.inputContainer}>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={[styles.input, errors.sales ? styles.inputError : null]}
                                        placeholder="Giảm giá (%)"
                                        value={product.sales}
                                        onChangeText={(value) => handleChangeData("sales", value)}
                                        keyboardType='numeric'
                                    />
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <View style={styles.inputWrapper}>
                                    {
                                        errors.sales &&
                                        <Text style={[
                                            styles.textError
                                        ]}
                                        >{errorsString.sales}</Text>
                                    }
                                </View>
                            </View>

                            {/* expiredDate */}
                            <DatePickerCustom isError={errors.expiredDate} date={dateChooseExpiredDate} dateShow={product.expiredDate.length == 0 ? "Hạn sử dụng" : product.expiredDate} onChange={handleChooseExpiredDate} />
                            <View style={styles.inputContainer}>
                                <View style={styles.inputWrapper}>
                                    {
                                        errors.expiredDate &&
                                        <Text style={[
                                            styles.textError
                                        ]}
                                        >{errorsString.expiredDate}</Text>
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
                            <ConfirmModal textTitle={"Bạn có chắc chắn sửa sản phẩm?"} visible={confirmVisible} onClose={() => setConfirmVisible(false)} onConfirm={saveChanges} />
                        </>
                    }
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
    showItemTest: {
        // position: "absolute",
        // bottom: -900,
        backgroundColor: "#FEECE2",
        // flex: 1,
        width: "100%",
        // height: 100,
        borderRadius: 20,
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
        justifyContent: "center",
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
