
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "@/constants/colors";
import { typography } from "@/constants/typography";

type TabName = "home" | "discover" | "library" | "profile";

interface Tab {
  key: TabName;
  label: string;
  icon: string;
}

const TABS: Tab[] = [
  { key: "home", label: "Home", icon: "⌂" },
  { key: "discover", label: "Discover", icon: "⌕" },
  { key: "library", label: "Library", icon: "▤" },
  { key: "profile", label: "Profile", icon: "♙" },
];

interface BottomTabBarProps {
  activeTab: TabName;
}

export default function BottomTabBar({
  activeTab,
}: BottomTabBarProps) {
  const router = useRouter();

  const handleTabPress = (tab: TabName) => {
    if (tab === "profile") {
      router.push("/profile");
      return;
    }

    router.replace(`/${tab}` as "/home" | "/discover" | "/library");
  };

  return (
    <View style={styles.bottomBar}>
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;

        return (
          <Pressable
            key={tab.key}
            style={styles.tabItem}
            onPress={() => handleTabPress(tab.key)}
          >
            <Text style={isActive ? styles.activeTabIcon : styles.tabIcon}>
              {tab.icon}
            </Text>

            <Text style={isActive ? styles.activeTabText : styles.tabText}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingTop: 10,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 3,
  },
  activeTabIcon: {
    fontSize: 24,
    color: COLORS.primary,
  },
  activeTabText: {
    fontFamily: typography.semiBold,
    fontSize: 10,
    color: COLORS.primary,
  },
  tabIcon: {
    fontSize: 23,
    color: COLORS.gray,
  },
  tabText: {
    fontFamily: typography.medium,
    fontSize: 10,
    color: COLORS.gray,
  },
});
