import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, Animated } from 'react-native';
import { Search, Bell, Menu as MenuIcon, X } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import Menu from '@/components/ui/Menu';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';

export default function MainHeader() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const { logout } = useAuth();
  
  // Animation value for search input
  const searchInputWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Set Persian date
    const today = new Date();
    const options = { 
      weekday: 'long' as const, 
      day: 'numeric' as const, 
      month: 'long' as const 
    };
    
    // Using toLocaleDateString with 'fa-IR' locale to get Persian date
    const persianDate = today.toLocaleDateString('fa-IR', options);
    setCurrentDate(persianDate);
  }, []);

  const toggleSearch = () => {
    if (searchVisible) {
      // Hide search
      Animated.timing(searchInputWidth, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }).start(() => {
        setSearchVisible(false);
        setSearchQuery('');
      });
    } else {
      // Show search
      setSearchVisible(true);
      Animated.timing(searchInputWidth, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false
      }).start();
    }
  };

  const handleNotificationPress = () => {
    // Simply toggle the notifications panel visibility
    setNotificationsVisible(!notificationsVisible);
  };

  const handleMenuPress = () => {
    // Simply toggle the menu visibility
    setMenuVisible(!menuVisible);
  };

  return (
    <>
      <View style={styles.header}>
        {/* Left side - Bell icon */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleNotificationPress}
        >
          <Bell size={24} color={Colors.text.primary} />
        </TouchableOpacity>

        {/* Center - Date or Search Input */}
        {searchVisible ? (
          <Animated.View 
            style={[
              styles.searchInputContainer,
              { 
                width: searchInputWidth.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '60%']
                }) 
              }
            ]}
          >
            <TextInput
              style={styles.searchInput}
              placeholder="جستجو..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={Colors.text.tertiary}
              autoFocus
            />
            <TouchableOpacity onPress={toggleSearch}>
              <X size={18} color={Colors.text.secondary} />
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Text style={styles.dateText}>{currentDate}</Text>
        )}

        {/* Right side - Search & Menu icons */}
        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={toggleSearch}
          >
            <Search size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleMenuPress}
          >
            <MenuIcon size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Render notification panel if visible */}
      {notificationsVisible && (
        <View style={styles.notificationPanel}>
          <Text style={styles.panelTitle}>اعلان‌ها</Text>
          {/* Notification content would go here */}
        </View>
      )}

      <Menu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onLogout={() => {
          setMenuVisible(false);
          logout();
          router.replace('/(tabs)');
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outline.default,
  },
  dateText: {
    fontFamily: Typography.fontFamily.medium,
    fontSize: Typography.fontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 36,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.fontSize.sm,
    color: Colors.text.primary,
    textAlign: 'right',
    writingDirection: 'rtl',
    paddingHorizontal: 8,
  },
  notificationPanel: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outline.default,
    padding: 16,
    zIndex: 100,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  panelTitle: {
    fontFamily: Typography.fontFamily.bold,
    fontSize: Typography.fontSize.lg,
    color: Colors.text.primary,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 16,
  },
});