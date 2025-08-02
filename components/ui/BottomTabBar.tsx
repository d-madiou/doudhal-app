import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const BottomTabBar: React.FC<BottomTabBarProps> = ({ 
  state, 
  descriptors, 
  navigation,
  insets 
}) => {
  return (
    <View
      className="flex-row justify-around py-2 bg-white border-t border-gray-200"
      style={{ paddingBottom: insets?.bottom || 20 }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        let iconName: React.ComponentProps<typeof Ionicons>['name'];

        switch (route.name) {
          case 'Home':
            iconName = isFocused ? 'home' : 'home-outline';
            break;
          case 'Mentors':
          case 'Mentor':
            iconName = isFocused ? 'people' : 'people-outline';
            break;
          case 'Bookings':
          case 'Booking':
            iconName = isFocused ? 'calendar' : 'calendar-outline';
            break;
          case 'Chat':
            iconName = isFocused ? 'chatbubbles' : 'chatbubbles-outline';
            break;
          case 'Profile':
            iconName = isFocused ? 'person' : 'person-outline';
            break;
          default:
            iconName = 'help-circle-outline';
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const tintColor = isFocused ? colors.indigo : colors.grey;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            className="flex-1 items-center justify-center p-1"
          >
            <Ionicons name={iconName} size={24} color={tintColor} />
            <Text className="text-xs font-semibold mt-1" style={{ color: tintColor }}>
              {typeof label === 'string' ? label : route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabBar;