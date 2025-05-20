import { Stack } from "expo-router";

export default function PublicLayout() {
  return (
    <Stack>

        <Stack.Screen
            name="login"
            options={{ 
              headerShown: false ,
              title:"Login"
            }}
        />
        <Stack.Screen
            name="register"
            options={{ 
                title:"Create Account",
                }}
        />

    </Stack>
  );
}