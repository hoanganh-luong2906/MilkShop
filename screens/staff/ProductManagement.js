import React, { useCallback, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  View,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

function formatToVND(value) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "decimal" /* Use "decimal" style instead of "currency" */,
    minimumFractionDigits: 0, // Adjust for desired decimal places
  });

  const formattedNumber = formatter.format(value);
  return `${formattedNumber} VNĐ`; // Prepend "VND " manually
}

function removeVietnameseDiacritics(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

const ProductManagement = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [arrSearch, setArrSearch] = useState([]);
  const [arrFilter, setArrFilter] = useState([]);
  const [arrCategoriesData, setCategoriesData] = useState([
    { _id: "", name: "" },
  ]);

  const handleGetProduct = () => {
    fetch("https://milk-shop-eight.vercel.app/api/product/top")
      .then((response) => response.json())
      .then((res) => {
        if (res.status == 200) {
          setData(res.data);
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setData([]);
      });
  };

  const handleSearchProduct = (searchValue) => {
    setSelectedCategory(null); // Unselect category
    setArrFilter([]);

    setSearchQuery(searchValue);
    if (searchValue.length != 0) {
      setArrSearch(
        data.filter((product) =>
          removeVietnameseDiacritics(product.name.toLowerCase()).includes(
            removeVietnameseDiacritics(searchQuery.toLowerCase())
          )
        )
      );
    } else {
      setArrSearch([]);
    }
  };

  const handleFilter = (selectedCategory) => {
    setArrFilter(
      data.filter((product) => product.category._id === selectedCategory)
    );
  };

  const getCategories = async () => {
    const response = await fetch(
      "https://milk-shop-eight.vercel.app/api/category"
    );
    const data = await response.json();
    setCategoriesData(data.data);
  };

  useFocusEffect(
    useCallback(() => {
      handleGetProduct();
      getCategories();
    }, [])
  );
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Octicons name="search" size={20} color="black" />
        <TextInput
          style={styles.searchInput}
          onChangeText={handleSearchProduct}
          value={searchQuery}
          placeholder="Nhập tên sản phẩm"
        />
      </View>
      <CategoryContainer
        categories={arrCategoriesData}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        setArrSearch={setArrSearch}
        handleFilter={handleFilter}
        setArrFilter={setArrFilter}
      />
      <FlatList
        data={
          arrSearch.length == 0 && arrFilter.length == 0
            ? data
            : arrSearch.length != 0
            ? arrSearch
            : arrFilter
        }
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            name={item.name}
            imageUrl={item.imageURL}
            price={item.price}
            rating={item.percentageRating}
            count={item.count}
            sales={item.sales}
            navigation={navigation}
          />
        )}
        numColumns={2}
      />
    </View>
  );
};

const CategoryContainer = ({
  categories,
  setSelectedCategory,
  selectedCategory,
  setArrSearch,
  handleFilter,
  setArrFilter,
}) => {
  return (
    <View style={styles.categoryContainer}>
      {categories.map((category, index) => (
        <Pressable
          style={[
            styles.categoryIcon,
            selectedCategory === category._id ? styles.selectedCategory : null,
          ]}
          key={category._id}
          onPress={() => {
            if (selectedCategory === category._id) {
              setSelectedCategory(null); // Unselect category
              setArrFilter([]);
            } else {
              setSelectedCategory(category._id); // Select the clicked category
              handleFilter(category._id);
              setArrSearch([]);
            }
          }}
        >
          <MaterialCommunityIcons name="cow" size={35} color="black" />
          <Text style={styles.categoryText}>{category.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const ProductCard = ({
  product,
  name,
  imageUrl,
  price,
  rating,
  count,
  sales,
  navigation,
}) => {
  return (
    <ScrollView>
      <Pressable
        style={[styles.productCard, { position: "relative" }]}
        onPress={() =>
          navigation.navigate("staff-product-detail", { product: product })
        }
      >
        <Pressable
          onPress={() => {
            navigation.navigate("staff-update-product", { product: product });
          }}
        >
          <FontAwesome name="pencil" size={18} color={"grey"} />
        </Pressable>
        <Image
          src={imageUrl}
          style={styles.productImages}
          resizeMode="contain"
        />
        <Text
          numberOfLines={2}
          style={{
            width: "100%",
            textAlign: "left",
            fontWeight: 500,
          }}
        >
          {name}
        </Text>
        <View style={styles.productBody}>
          <View style={styles.productRating}>
            {[...Array(5)].map((_, i) => (
              <MaterialIcons
                key={i}
                name={i < Math.round(rating) ? "star" : "star-border"}
                size={15}
                color="gold"
              />
            ))}
          </View>
          <Text
            style={{
              fontWeight: 500,
              opacity: 0.6,
              fontSize: 12,
              lineHeight: 20,
            }}
          >
            Đã bán {count < 1000 ? count : "999+"}
          </Text>
        </View>
        <View style={styles.productPrice}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {formatToVND(price)}
          </Text>
          {sales > 0 && <Text style={styles.productSale}>-{sales}%</Text>}
        </View>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFF3ED",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 40,
    marginVertical: 10,
    paddingLeft: 10,
    backgroundColor: "#FFBE98",
  },
  searchInput: {
    marginLeft: 30,
    flex: 1,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 10,
    backgroundColor: "#FEECE2",
    borderRadius: 20,
  },
  categoryIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: "33%",
    marginBottom: 10,
    paddingVertical: 10,
  },
  selectedCategory: {
    backgroundColor: "#FFDAB9",
    borderRadius: 20,
  },
  categoryImage: {
    width: 50,
    height: 50,
  },
  categoryText: {
    fontSize: 12,
  },
  productCard: {
    width: 170,
    height: 220,
    backgroundColor: "#FEECE2",
    elevation: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evently",
  },
  productImages: {
    width: "100%",
    height: 100,
  },
  productBody: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productRating: {
    marginTop: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  productPrice: {
    flexDirection: "row",
    alignItems: "center",
  },
  productSale: {
    marginLeft: 10,
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
    borderColor: "#FFBE98",
  },
});

export default ProductManagement;
