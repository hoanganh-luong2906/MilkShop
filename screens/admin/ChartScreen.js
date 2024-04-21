import { View, Text, ScrollView, StyleSheet, Pressable, Dimensions } from 'react-native'
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

export default function ChartScreen() {
    const arrayYears = ["2020", "2021", "2022", "2023", "2024",]
    const [choosedYear, setYear] = useState("2024");
    const [isShowed, setShowed] = useState(false)
    return (
        <LinearGradient
            colors={['#FFF3ED', '#FFFFFF']}
            style={{ flex: 1 }}
        >
            <ScrollView style={styles.screen}>
                <View style={styles.filterRow}>
                    <Pressable style={styles.filterBg} onPress={() => { setShowed(!isShowed) }} >
                        <Text style={styles.filterTxt}>{choosedYear}</Text>
                        <AntDesign style={styles.filterIcon} name={isShowed ? "caretup" : "caretdown"} size={15} color="black" />
                    </Pressable>
                    {isShowed &&
                        <View style={styles.showItem}>
                            {
                                arrayYears.map((year, index) => (
                                    <Pressable
                                        style={[styles.item, {
                                            borderTopLeftRadius: index == 0 ? 20 : 0,
                                            borderTopRightRadius: index == 0 ? 20 : 0,
                                            borderBottomLeftRadius: index == arrayYears.length - 1 ? 20 : 0,
                                            borderBottomRightRadius: index == arrayYears.length - 1 ? 20 : 0,
                                            backgroundColor: choosedYear === year ? "#FFBE98" : "#FEECE2",
                                            borderTopWidth: index == 0 || choosedYear === year ? 1 : 0,
                                            borderBottomWidth: index == arrayYears.length - 1 || choosedYear === year ? 1 : 0,
                                            borderLeftWidth: 1,
                                            borderRightWidth: 1,
                                        }]}
                                        onPress={() => {
                                            setYear(year)
                                        }}
                                        key={index}
                                    >
                                        <Text style={{ textAlign: "center", textAlignVertical: "center" }}>{year}</Text>
                                    </Pressable>
                                ))
                            }
                        </View>
                    }
                </View>
                {/* Notation */}
                <View style={styles.notationContainer}>
                    <View style={styles.notationTitleContainer}>
                        <View style={styles.notationTitle}>
                            <Text style={styles.notationTitleTxt}>Chú thích:</Text>
                        </View>
                    </View>
                    <View style={styles.notationItemContainer}>
                        <View style={styles.notationItem}>
                            <Text style={styles.notationItemTxt}>Số lượng thực: </Text>
                            <View style={{ flex: 0.4, justifyContent: "center" }}>
                                <View style={[styles.notationItemBg, { backgroundColor: "red" }]} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.notationItemContainer}>
                        <View style={styles.notationItem}>
                            <Text style={styles.notationItemTxt}>Doanh thu: </Text>
                            <View style={{ flex: 0.4, justifyContent: "center" }}>
                                <View style={[styles.notationItemBg, { backgroundColor: "orange" }]} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.notationItemContainer}>
                        <View style={styles.notationItem}>
                            <Text style={styles.notationItemTxt}>Giảm giá: </Text>
                            <View style={{ flex: 0.4, justifyContent: "center" }}>
                                <View style={[styles.notationItemBg, { backgroundColor: "yellow" }]} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.notationItemContainer}>
                        <View style={styles.notationItem}>
                            <Text style={styles.notationItemTxt}>Tổng doanh thu: </Text>
                            <View style={{ flex: 0.4, justifyContent: "center" }}>
                                <View style={[styles.notationItemBg, { backgroundColor: "purple" }]} />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Item */}
                <View style={styles.notationContainer}>
                    <View style={styles.notationItemContainer}>
                        <View style={styles.notationItem}>
                            <Text style={styles.textStyle}>Nhà cung cấp:</Text>
                            <Text style={styles.textStyle}>Vinamilk</Text>
                        </View>
                    </View>
                    <View style={styles.notationItemContainer}>
                        <View style={styles.notationItem}>
                            <Text style={styles.textStyle}>Loại sản phẩm:</Text>
                            <Text style={styles.textStyle}>Sữa tươi các loại</Text>
                        </View>
                    </View>
                    <View style={styles.notationItemContainer}>
                        <View style={styles.notationItem}>
                            <Text style={styles.textStyle}>Tên sản phẩm:</Text>
                            <Text style={styles.textStyle}>Sữa Bobs Organic</Text>
                        </View>
                    </View>

                    <View style={styles.notationItemContainer}>
                        <View style={styles.notationItem}>
                            <Text style={styles.notationItemTxt}>Số lượng thực: </Text>
                            <View style={styles.itemField1}>
                                <Text style={styles.itemField2}>71</Text>
                                <View style={styles.itemField3}>
                                    <View style={[styles.itemField4, { backgroundColor: "red" }]} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.notationItemContainer}>
                        <View style={styles.notationItem}>
                            <Text style={styles.notationItemTxt}>Doanh thu: </Text>
                            <View style={styles.itemField1}>
                                <Text style={styles.itemField2}>71</Text>
                                <View style={styles.itemField3}>
                                    <View style={[styles.itemField4, { backgroundColor: "orange" }]} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.notationItemContainer}>
                        <View style={styles.notationItem}>
                            <Text style={styles.notationItemTxt}>Giảm giá: </Text>
                            <View style={styles.itemField1}>
                                <Text style={styles.itemField2}>71</Text>
                                <View style={styles.itemField3}>
                                    <View style={[styles.itemField4, { backgroundColor: "yellow" }]} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.notationItemContainer}>
                        <View style={styles.notationItem}>
                            <Text style={styles.notationItemTxt}>Tổng doanh thu: </Text>
                            <View style={styles.itemField1}>
                                <Text style={styles.itemField2}>718709568709</Text>
                                <View style={styles.itemField3}>
                                    <View style={[styles.itemField4, { backgroundColor: "purple" }]} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    screen: {
    },
    filterRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        position: "relative"
    },
    filterBg: {
        flex: 0.8,
        height: 30,
        backgroundColor: "#FFBE98",
        borderRadius: 30,
        justifyContent: "center",
        position: "relative",
        borderWidth: 1,
        borderColor: "black"
    },
    filterIcon: {
        position: "absolute",
        right: 10
    },
    filterTxt: {
        textAlign: "center",
        textAlignVertical: "center"
    },
    showItem: {
        position: "absolute",
        bottom: -150,
        backgroundColor: "green",
        flex: 1,
        zIndex: 1,
        width: "80%",
        height: 150,
        borderRadius: 20,
    },
    item: {
        height: 30,
        justifyContent: "center",
        borderColor: "black"
    },
    notationContainer: {
        flex: 1,
        backgroundColor: "#FEECE2",
        height: 200,
        margin: 20,
        borderRadius: 30
    },
    notationItemContainer: {
        flex: 0.16,
        flexDirection: "row",
        justifyContent: "center",
    },
    notationTitleContainer: {
        flex: 0.2,
        flexDirection: "row",
        justifyContent: "center",
    },
    notationTitle: {
        flex: 0.9,
        justifyContent: "center",
    },
    notationTitleTxt: {
        textAlignVertical: "center",
        fontSize: 20,
        fontWeight: "bold"
    },
    notationItem: {
        flex: 0.9,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    notationItemTxt: {
        flex: 0.6,
        textAlignVertical: "center"
    },
    notationItemLineContainer: {
        flex: 0.4,
        justifyContent: "center",
    },
    notationItemBg: {
        flex: 0.4,
        height: 20,
        borderRadius: 30,
    },
    textStyle: {
        textAlignVertical: "center"
    },
    itemField1: {
        flex: 0.8,
        flexDirection: "row",
    },
    itemField2: {
        flex: 0.9,
        textAlign: "right",
        textAlignVertical: "center",
    },
    itemField3: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    itemField4: {
        borderRadius: 30,
        width: 15,
        height: 15
    },
});