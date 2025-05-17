import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import Card from '../ui/Card';
import { Phone, BookOpen, MessagesSquare } from 'lucide-react-native';
import i18n from '../../utils/i18n';

interface SupportOptionsProps {
  onContactSupport: () => void;
  onAppTutorial: () => void;
  onSendMessage: () => void;
}

export default function SupportOptions({
  onContactSupport,
  onAppTutorial,
  onSendMessage,
}: SupportOptionsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>میستر تریدر آکادمی</Text>
      </View>

      <Card style={styles.card}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={onContactSupport}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Phone color={Colors.accent.primary} size={24} />
          </View>
          <Text style={styles.optionTitle}>{i18n.t('contactSupport')}</Text>
        </TouchableOpacity>
      </Card>

      <Card style={styles.card}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={onAppTutorial}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <BookOpen color={Colors.accent.primary} size={24} />
          </View>
          <Text style={styles.optionTitle}>{i18n.t('appTutorial')}</Text>
        </TouchableOpacity>
      </Card>

      <Card style={styles.card}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={onSendMessage}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <MessagesSquare color={Colors.accent.primary} size={24} />
          </View>
          <Text style={styles.optionTitle}>{i18n.t('sendMessage')}</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoText: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize['3xl'],
    color: Colors.accent.primary,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  card: {
    marginBottom: 16,
  },
  optionButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.accent.primary + '10', // 10% opacity
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  optionTitle: {
    fontFamily: Typography.fontFamily.semiBold,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});