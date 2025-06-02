import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/providers/AuthProvider";

const Schema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
});

type LoginFormData = z.infer<typeof Schema>;

const Page = () => {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: "nadine@devi.com",
      password: "123456",
    },
    mode: "onBlur",
  });

  const onLoginPress = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await signIn(data.email, data.password);
      console.log("🚀~ onLoginPress ~", result);
    } catch (e) {
      console.log(e);
      console.log("❌ Error in onLoginPress:", e);
      console.log("❌ Error JSON:", JSON.stringify(e, null, 2));
      Alert.alert("Error", "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 p-6 bg-white dark:bg-gray-900"
    >
      <View className="justify-center flex-1 w-full max-w-md mx-auto">
        <Text className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
          Welcome Back
        </Text>
        <Text className="mb-8 text-lg text-gray-600 dark:text-gray-400">
          Sign in to start your mental health journey
        </Text>
        <View className="gap-2">
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, onBlur } }) => (
              <View>
                <TextInput
                  autoCapitalize="none"
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  className="p-4 mb-5 bg-gray-100 border border-gray-300 rounded-xl dark:bg-gray-800 dark:text-white"
                />
                {errors.email && (
                  <Text className="text-red-500">{errors.email.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur } }) => (
              <View>
                <TextInput
                  autoCapitalize="none"
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  className="p-4 mb-5 bg-gray-100 border border-gray-300 rounded-xl dark:bg-gray-800 dark:text-white"
                />
                {errors.password && (
                  <Text className="text-red-500">
                    {errors.password.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>
        <TouchableOpacity
          onPress={handleSubmit(onLoginPress)}
          className={`bg-blue-600 rounded-xl p-4 items-center mt-6 ${isLoading ? "opacity-50" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-lg font-semibold text-white">Sign In</Text>
          )}
        </TouchableOpacity>
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
    </KeyboardAvoidingView>
  );
};

export default Page;
