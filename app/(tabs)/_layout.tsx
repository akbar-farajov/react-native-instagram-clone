import { Ionicons } from "@expo/vector-icons"; // Instagram stilində ikonlar üçün
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          position: "absolute",
          overflow: "hidden",
          height: 70,
          borderColor: "transparent",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarActiveTintColor: "black",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarActiveTintColor: "black",
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: "Upload",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
          tabBarActiveTintColor: "black",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarActiveTintColor: "black",
        }}
      />
      <Tabs.Screen
        name="profile/[username]"
        options={{
          href: null,
          title: "User Profile",
        }}
      />
    </Tabs>
  );
}
