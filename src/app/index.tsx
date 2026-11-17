import {View,Text,Image,ActivityIndicator} from "react-native";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import { typography } from "@/constants/typography";

export default function HomeScreen() {
    const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-mint">
      <View className="flex-1 items-center justify-center px-6">

        {/* Small brand label */}
        <Text
          style={{ fontFamily: typography.medium }}
          className="text-darkGreen text-xs tracking-widest mb-8"
        >
          YOUR PERSONAL READING COMPANION
        </Text>

        {/* Avatar illustration */}
        <View className="w-52 h-52 rounded-full bg-lightGreen items-center justify-center mb-8">
          <Image
            source={require("../../assets/images/logo.png")}
            className="w-45 h-45"
            resizeMode="contain"
          />
        </View>

        {/* App name */}
        <Text
          style={{ fontFamily: typography.bold }}
          className="text-darkGreen text-4xl mt-8"
        >
          BookBuddy
        </Text>

        {/* Tagline */}
        <Text
          style={{ fontFamily: typography.medium }}
          className="text-green text-base mt-3"
        >
          Read • Track • Achieve
        </Text>

        <Text
          style={{ fontFamily: typography.regular }}
          className="text-darkGreen text-center text-sm mt-1 leading-6"
        >
          Every book tells a story.
        </Text>

        {/* Loading indicator */}
       {/* Get Started Button */}
       <View className="absolute bottom-10 w-full px-6">
         <Pressable
           onPress={() => router.push("/login")}
           className="bg-green rounded-full py-4 items-center"
         >
           <Text
             style={{ fontFamily: typography.semiBold }}
             className="text-white text-base"
           >
             Get Started
           </Text>
         </Pressable>
       </View>

      </View>
    </SafeAreaView>
  );
}
