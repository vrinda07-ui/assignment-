import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useUser, useClerk } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

export default function ProfileScreen() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      // Force navigation to login screen after sign out
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Sign out error:', error);
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  // Debug logging to check user data
  useEffect(() => {
    console.log('User data:', user);
    console.log('Is user loaded:', isLoaded);
    console.log('User ID:', user?.id);
    console.log('User email:', user?.primaryEmailAddress?.emailAddress);
  }, [user, isLoaded]);

  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </View>
    );
  }

  // If user is still null after loading, show a message
  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Authentication Issue</Text>
            <Text style={styles.errorText}>
              User data is not available. This might be a temporary issue.
            </Text>
            <TouchableOpacity 
              style={styles.retryButton} 
              onPress={() => setRefreshing(!refreshing)}
            >
              <Text style={styles.retryButtonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleSignOut}
          >
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Information</Text>
          
          <View style={styles.infoGroup}>
            <Text style={styles.label}>User ID</Text>
            <Text style={styles.value}>{user?.id || 'Not available'}</Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.label}>Email Address</Text>
            <Text style={styles.value}>
              {user?.primaryEmailAddress?.emailAddress || 
               user?.emailAddresses?.[0]?.emailAddress || 
               'Not available'}
            </Text>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.value}>
              {user?.username || 
               `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 
               'Not available'}
            </Text>
          </View>

          {user?.firstName && (
            <View style={styles.infoGroup}>
              <Text style={styles.label}>First Name</Text>
              <Text style={styles.value}>{user.firstName}</Text>
            </View>
          )}

          {user?.lastName && (
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Last Name</Text>
              <Text style={styles.value}>{user.lastName}</Text>
            </View>
          )}

          <View style={styles.infoGroup}>
            <Text style={styles.label}>Account Created</Text>
            <Text style={styles.value}>
              {user?.createdAt 
                ? new Date(user.createdAt).toLocaleDateString()
                : 'Not available'
              }
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Status</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusIndicator, styles.statusActive]} />
            <Text style={styles.statusText}>Active</Text>
          </View>
          <Text style={styles.statusDescription}>
            Your account is active and secure. All authentication features are working properly.
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleSignOut}
        >
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#64748b',
  },
  errorText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  content: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  infoGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusActive: {
    backgroundColor: '#10b981',
  },
  statusText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
  },
  statusDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
