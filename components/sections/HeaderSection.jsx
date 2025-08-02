import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../utils/colors";

const HeaderSection = ({ 
  user, 
  searchQuery, 
  setSearchQuery, 
  notificationCount 
}) => (
  <View style={{ backgroundColor: colors.indigo, paddingTop: 16, paddingBottom: 24, paddingHorizontal: 16 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 14 }}>Good morning</Text>
        <Text style={{ color: colors.white, fontSize: 20, fontWeight: 'bold' }}>📍 {user?.location}!</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={24} color={colors.white}/>
        {notificationCount > 0 && (
          <View style={{
            position: 'absolute',
            top: -4,
            right: -4,
            backgroundColor: colors.amber,
            borderRadius: 8,
            height: 16,
            width: 16,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{ color: colors.charcoal, fontSize: 10 }}>{notificationCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>

    {/* Search Bar */}
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.white,
      borderRadius: 16,
      paddingHorizontal: 16
    }}>
      <Ionicons name="search" size={20} color={colors.grey} />
      <TextInput 
        style={{
          flex: 1,
          height: 48,
          marginLeft: 12,
          color: colors.charcoal
        }}
        placeholder="Search by subject, mentor, or location..."
        placeholderTextColor={colors.grey}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={() => setSearchQuery("")}>
          <Ionicons name="close-circle" size={20} color={colors.grey} />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export default HeaderSection;