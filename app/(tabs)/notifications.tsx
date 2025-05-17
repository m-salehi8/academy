import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import Card from '@/components/ui/Card';
import { Bell, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

// Mock notifications data
const NOTIFICATIONS = [
  {
    id: '1',
    title: 'دوره جدید اضافه شد',
    message: 'دوره "بیزینس کوچینگ علم نوین پولسازی" به آکادمی اضافه شد.',
    date: '۲۳ اردیبهشت ۱۴۰۴',
    read: false,
  },
  {
    id: '2',
    title: 'تخفیف ویژه',
    message: 'به مناسبت عید فطر، ۲۰٪ تخفیف برای کلیه دوره های آموزشی',
    date: '۲۰ اردیبهشت ۱۴۰۴',
    read: true,
  },
  {
    id: '3',
    title: 'وبینار رایگان',
    message: 'وبینار رایگان "اصول موفقیت در بازارهای مالی" روز جمعه ساعت ۱۸',
    date: '۱۵ اردیبهشت ۱۴۰۴',
    read: true,
  },
];

export default function NotificationsScreen() {
  const handleBack = () => {
    router.back();
  };

  const renderNotification = ({ item }: { item: any }) => (
    <Card style={[styles.notificationCard, item.read ? styles.readNotification : {}]}>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationDate}>{item.date}</Text>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>اعلان‌ها</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
        >
          <ArrowLeft color={Colors.text.secondary} size={24} />
        </TouchableOpacity>
      </View>

      {NOTIFICATIONS.length > 0 ? (
        <FlatList
          data={NOTIFICATIONS}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notificationsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Bell size={48} color={Colors.text.tertiary} />
          <Text style={styles.emptyText}>هیچ اعلانی وجود ندارد</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outline.default,
    position: 'relative',
  },
  headerTitle: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  backButton: {
    position: 'absolute',
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationsList: {
    padding: 16,
    paddingBottom: 80,
  },
  notificationCard: {
    marginBottom: 12,
    borderRightWidth: 4,
    borderRightColor: Colors.accent.primary,
  },
  readNotification: {
    borderRightColor: Colors.text.tertiary,
    opacity: 0.8,
  },
  notificationContent: {
    paddingVertical: 8,
  },
  notificationHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationTitle: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.md,
    color: Colors.text.primary,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.accent.primary,
  },
  notificationMessage: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    marginBottom: 8,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  notificationDate: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.tertiary,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.tertiary,
    marginTop: 16,
    writingDirection: 'rtl',
  },
});