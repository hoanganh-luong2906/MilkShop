import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StaffScreen from "../screens/staff/StaffScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import ViewOrderScreen from "../screens/staff/ViewOrderScreen";

const Tab = createBottomTabNavigator();

const StaffNavigator = () => {
  const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color }) => {
      let iconName;
      switch (route.name) {
        case "Staff Home":
          iconName = focused ? "home" : "home-outline";
          break;
      }
      return <Ionicons name={iconName} size={26} color={color} />;
    },
  });

  const tabOptions = {
    tabBarButton: () => null,
    tabBarStyle: { display: "none" },
  };
  return (
    <Tab.Navigator initialRouteName="Staff Home" screenOptions={screenOptions}>
      <Tab.Screen name="Staff Home" component={StaffScreen} />
      <Tab.Screen name="View Order" component={ViewOrderScreen} options={tabOptions}/>
    </Tab.Navigator>
  );
};

export default StaffNavigator;
