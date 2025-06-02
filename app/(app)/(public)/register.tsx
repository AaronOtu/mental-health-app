import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";

const Schema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof Schema>;

const Page = () => {
  const { onRegister } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: "nadine@devi.com",
      password: "123456",
      confirmPassword: "123456",
    },
    mode: "onBlur",
  });
  const onSignUpPress = async (data: RegisterFormData) => {
    // console.log("Hello");
    // console.log(`SignUp data ~ `,data);
    setIsLoading(true);
    try {
      const result = await onRegister(data.email, data.password);
      console.log("🚀~ onSignUpPress ~", result);
    } catch (e) {
      console.log(e);
      console.log("❌ Error in onSignUpPress:", e);
      console.log("❌ Error JSON:", JSON.stringify(e, null, 2));
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
          Create Account
        </Text>
        <Text className="mb-8 text-lg text-gray-600 dark:text-gray-400">
          SignUp to start your mental health journey
        </Text>
        <View className="gap-2">
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <View>
                <TextInput
                  autoCapitalize="none"
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
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
            render={({ field: { value, onChange } }) => (
              <View>
                <TextInput
                  autoCapitalize="none"
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  className="p-4 mb-5 bg-gray-100 border border-gray-300 rounded-xl dark:bg-gray-800 dark:text-white"
                />
                {errors.confirmPassword && (
                  <Text className="text-red-500">
                    {errors.confirmPassword?.message}
                  </Text>
                )}
              </View>
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { value, onChange } }) => (
              <View>
                <TextInput
                  autoCapitalize="none"
                  placeholder="Confirm Password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  className="p-4 mb-5 bg-gray-100 border border-gray-300 rounded-xl dark:bg-gray-800 dark:text-white"
                />
                {errors.confirmPassword && (
                  <Text className="text-red-500">
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </View> 
            )}
          />
        </View>
        <TouchableOpacity
          onPress={handleSubmit(onSignUpPress)}
          className={`bg-blue-600 rounded-xl p-4 items-center mt-6 ${isLoading ? "opacity-50" : ""}`}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-lg font-semibold text-white">
              Create Account
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Page;
