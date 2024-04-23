import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StaffScreen from "../screens/staff/StaffScreen";
import { Ionicons } from '@expo/vector-icons';
import ViewOrderScreen from "../screens/staff/ViewOrderScreen";
import DeliveryProgress from "../screens/staff/DeliveryProgress";
import ProductManagement from "../screens/staff/ProductManagement";
import ViewDetail from "../screens/staff/ViewDetail";
import ProfileScreen from "../screens/ProfileScreen";
import Voucher from "../screens/staff/Voucher";
import UpdateProfile from "../screens/UpdateProfile";

const Tab = createBottomTabNavigator();

const StaffNavigator = () => {
  const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarShowLabel: false,
    tabBarActiveTintColor: 'tomato',
    tabBarHideOnKeyboard: true,
    tabBarIcon: ({ focused, color }) => {
      let iconName;
      switch (route.name) {
        case "Staff Home":
          iconName = focused ? "home" : "home-outline";
          break;
        case "Product Management":
          iconName = focused ? "copy" : "copy-outline";
          break;
        case "Voucher":
          iconName = focused ? "ticket" : "ticket-outline";
          break;
        case "Profile":
          iconName = focused ? "person" : "person-outline";
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
      <Tab.Screen
        name="View Order"
        component={ViewOrderScreen}
        options={tabOptions}
      />
      <Tab.Screen
        name="Delivery Progress"
        component={DeliveryProgress}
        options={tabOptions}
      />
      <Tab.Screen name="Product Management" component={ProductManagement} />
      <Tab.Screen
        name="View Detail"
        component={ViewDetail}
        options={tabOptions}
      />
      <Tab.Screen name="Voucher" component={Voucher} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Update Profile" component={UpdateProfile}  options={tabOptions}/>
    </Tab.Navigator>
  );
};

export default StaffNavigator;
