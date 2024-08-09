import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { Auth0Provider, useAuth0 } from 'react-native-auth0';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '@env';

// Main component for the home screen
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Auth0Provider wraps the application to provide authentication context */}
      <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
        {/* Component containing the authentication buttons */}
        <AuthButtons />
        {/* Component displaying user profile information */}
        <Profile />
      </Auth0Provider>
    </View>
  );
}

// Component that handles the login and logout buttons
function AuthButtons() {
  // Auth0 hook to manage authentication
  const { authorize, clearSession, user } = useAuth0();

  // Function to handle login
  const onLogin = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };

  // Function to handle logout
  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.buttonContainer}>
      {/* Show logout button if user is authenticated, otherwise show login button */}
      {user ? (
        <LogoutButton />
      ) : (
        <Button title="Login" onPress={onLogin} />
      )}
    </View>
  );
}

// Component for the login button
const LoginButton = () => {
  const { authorize } = useAuth0();

  const onPress = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };

  return <Button onPress={onPress} title="Log in" />;
};

// Component for the logout button
const LogoutButton = () => {
  const { clearSession } = useAuth0();

  const onPress = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log(e);
    }
  };

  return <Button onPress={onPress} title="Log out" />;
};

// Component to display user profile information
const Profile = () => {
  const { user, error } = useAuth0();

  return (
    <>
      {user && <Text>Logged in as {user.name}</Text>}
      {!user && <Text>Not logged in</Text>}
      {error && <Text>{error.message}</Text>}
    </>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
  },
});
