import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Page = () => {
  return (
    <View className="items-center justify-center flex-1">
      <View className="flex-row justify-center mt-4">
        <Text className="text-gray dark:text-white">
          Don't have an account?
        </Text>
        <Link href="/register" asChild>
          <TouchableOpacity>
            <Text className="font-semibold text-blue-500"> Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Page;


