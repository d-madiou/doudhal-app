import React from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native"

// Color constants
const colors = {
  indigo: "#3F51B5",
  amber: "#FFC107",
  lightGrey: "#F5F5F5",
  white: "#FFFFFF",
  charcoal: "#212121",
  grey: "#757575",
}

interface EditProfileModalProps {
  visible: boolean
  editingField: string | null
  tempValue: string
  onClose: () => void
  onSave: () => void
  onValueChange: (value: string) => void
}

export default function EditProfileModal({
  visible,
  editingField,
  tempValue,
  onClose,
  onSave,
  onValueChange,
}: EditProfileModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View
          className="w-80 rounded-2xl p-6"
          style={{
            backgroundColor: colors.white,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 10,
          }}
        >
          <Text className="text-lg font-bold mb-4" style={{ color: colors.charcoal }}>
            Edit {editingField}
          </Text>
          <TextInput
            className="rounded-xl p-3 mb-4"
            style={{
              backgroundColor: colors.lightGrey,
              borderWidth: 1,
              borderColor: colors.grey,
              color: colors.charcoal,
            }}
            value={tempValue}
            onChangeText={onValueChange}
            placeholder={`Enter ${editingField?.toLowerCase()}`}
            placeholderTextColor={colors.grey}
            multiline={editingField === "bio"}
            numberOfLines={editingField === "bio" ? 4 : 1}
          />
          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 rounded-xl py-3"
              style={{
                backgroundColor: colors.lightGrey,
                borderWidth: 1,
                borderColor: colors.grey,
              }}
            >
              <Text className="text-center font-semibold" style={{ color: colors.grey }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSave}
              className="flex-1 rounded-xl py-3"
              style={{
                backgroundColor: colors.amber,
                shadowColor: colors.amber,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Text className="text-center font-semibold" style={{ color: colors.charcoal }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}