import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/utils/api';

export default function CompleteProfilePage() {
  const { user, updateUser } = useAuth();
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    checkUserProfile();
  }, []);

  const checkUserProfile = async () => {
    try {
      const userData = await api.user.getProfile();
      
      // اگر کاربر قبلاً پروفایلش رو تکمیل کرده، به صفحه اصلی هدایت شود
      if (userData.first_name || userData.last_name || userData.email) {
        router.replace('/(tabs)');
        return;
      }

      setFirstName(userData.first_name || '');
      setLastName(userData.last_name || '');
      setEmail(userData.email || '');
    } catch (error) {
      console.error('Error checking profile:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'لطفاً یک ایمیل معتبر وارد کنید';
    }
    return '';
  };

  const handleSubmit = async () => {
    // Reset errors
    setErrors({
      firstName: '',
      lastName: '',
      email: '',
    });

    // Validate email if provided
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors(prev => ({ ...prev, email: emailError }));
      return;
    }

    setLoading(true);

    try {
      const updatedUser = await api.user.updateProfile({
        first_name: firstName || undefined,
        last_name: lastName || undefined,
        email: email || undefined,
      });

      // Update user in auth state
      updateUser(updatedUser);

      // Navigate to main app
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle specific error cases if needed
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.accent.primary} />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.title}>تکمیل اطلاعات</Text>
        <Text style={styles.description}>
          لطفاً اطلاعات خود را تکمیل کنید تا بتوانیم خدمات بهتری به شما ارائه دهیم
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="نام"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="نام خود را وارد کنید"
          error={errors.firstName}
          containerStyle={styles.input}
        />

        <TextInput
          label="نام خانوادگی"
          value={lastName}
          onChangeText={setLastName}
          placeholder="نام خانوادگی خود را وارد کنید"
          error={errors.lastName}
          containerStyle={styles.input}
        />

        <TextInput
          label="ایمیل"
          value={email}
          onChangeText={setEmail}
          placeholder="ایمیل خود را وارد کنید"
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={styles.input}
        />

        <Button
          title="ذخیره اطلاعات"
          onPress={handleSubmit}
          loading={loading}
          fullWidth
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  contentContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 48,
    marginBottom: 32,
  },
  title: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.xl,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  description: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});