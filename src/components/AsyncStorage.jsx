
import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFIX = "NotesApp_";

export const storage = {
  async getItem(key) {
    const value = await AsyncStorage.getItem(`${PREFIX}${key}`);

    if (value === null) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  },

  async setItem(key, value) {
    const data =
      typeof value === "string"
        ? value
        : JSON.stringify(value);

    await AsyncStorage.setItem(`${PREFIX}${key}`, data);
  },

  async removeItem(key) {
    await AsyncStorage.removeItem(`${PREFIX}${key}`);
  },
};
