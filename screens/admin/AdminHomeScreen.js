import React, { useEffect, useState } from "react";
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
import { Ionicons, Octicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";

function formatToVND(value) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "decimal" /* Use "decimal" style instead of "currency" */,
    minimumFractionDigits: 0, // Adjust for desired decimal places
  });

  const formattedNumber = formatter.format(value);
  return `${formattedNumber} VNĐ`; // Prepend "VND " manually
}

const AdminHomeScreen = () => {
  const categories = [
    {
      id: 1,
      title: "Sữa tươi các loại",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzeoWXfn3vxRKqAI6MWlQ4jX45LNZRfJFF1UKkuDEEQg&s",
    },
    {
      id: 2,
      title: "Sữa cho mẹ mang thai",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ssLBbXs5hb8zcdy7ryTVQ434v-GAELGPGZX6L4_qJQ&s",
    },
    {
      id: 3,
      title: "Sữa thực vật",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRE-5Hd_EV06614cxhufCT63nyVIV-VoUoQYpfh9iEEw&s",
    },
    {
      id: 4,
      title: "Sữa bột cao cấp",
      imageUrl:
        "https://static.vecteezy.com/system/resources/previews/020/880/179/original/milk-powder-icon-style-free-vector.jpg",
    },
    {
      id: 5,
      title: "Sữa cho người cao tuổi",
      imageUrl:
        "https://previews.123rf.com/images/vectorchef/vectorchef1506/vectorchef150600531/40648993-milk-icon.jpg",
    },
    {
      id: 6,
      title: "Sữa chua",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn3qWtJz7QhOMuwwfhDQAk_W7ys8-tE4Y8BgPmS9q4GA&s",
    },
  ];
  const products = [
    {
      id: 1,
      name: "Combo 2 Vinamilk Optimum Gold 4 850g",
      imageUrl:
        "https://cdn1.concung.com/2023/03/57728-98751/vinamilk-optimum-gold-4-850g-2-6-tuoi.png",
      price: "614240",
      rating: 4,
      soldNumber: 2,
      sales: 12,
    },
    {
      id: 2,
      name: "Combo 2 Vinamilk Optimum Gold 4 850g",
      imageUrl:
        "https://cdn1.concung.com/2023/03/57728-98751/vinamilk-optimum-gold-4-850g-2-6-tuoi.png",
      price: "614240",
      rating: 5,
      soldNumber: 10,
      sales: 13,
    },
    {
      id: 3,
      name: "Combo 2 Vinamilk Optimum Gold 4 850g",
      imageUrl:
        "https://cdn1.concung.com/2023/03/57728-98751/vinamilk-optimum-gold-4-850g-2-6-tuoi.png",
      price: "614240",
      rating: 5,
      soldNumber: 10,
      sales: 13,
    },
    {
      id: 4,
      name: "Combo 2 Vinamilk Optimum Gold 4 850g",
      imageUrl:
        "https://cdn1.concung.com/2023/03/57728-98751/vinamilk-optimum-gold-4-850g-2-6-tuoi.png",
      price: "614240",
      rating: 5,
      soldNumber: 10,
      sales: 13,
    },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("https://milk-shop-eight.vercel.app/api/product/top")
      .then((response) => response.json())
      .then((json) =>
        setData(
          json.data.filter(
            (product) =>
              !selectedCategory || product.category.name === selectedCategory
          )
        )
      )
      .catch((error) => console.error(error));
  }, [selectedCategory]);
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Octicons name="search" size={20} color="black" />
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Nhập tên sản phẩm"
        />
      </View>
      <CategoryContainer
        categories={categories}
        onCategoryPress={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            imageUrl={item.imageURL}
            price={item.price}
            rating={item.percentageRating}
            count={item.count}
            sales={item.sales}
          />
        )}
        numColumns={2}
      />
    </View>
  );
};

const CategoryContainer = ({
  categories,
  onCategoryPress,
  selectedCategory,
}) => {
  return (
    <View style={styles.categoryContainer}>
      {categories.map((category) => (
        <Pressable
          style={[
            styles.categoryIcon,
            selectedCategory === category.title
              ? styles.selectedCategory
              : null,
          ]}
          key={category.id}
          onPress={() => onCategoryPress(category.title)}
        >
          <Image
            source={{ uri: category.imageUrl }}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>{category.title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const ProductCard = ({ name, imageUrl, price, rating, count, sales }) => {
  return (
    <ScrollView>
      <Pressable style={styles.productCard}>
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
    width: "33%",
    marginBottom: 10,
    paddingVertical: 10
  },
  selectedCategory: {
    backgroundColor: '#FFDAB9',
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
    height: 200,
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

export default AdminHomeScreen;
