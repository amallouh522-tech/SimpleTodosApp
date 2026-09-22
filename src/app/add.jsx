import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";

import { useState } from "react";

import { router } from "expo-router";

import { storage } from "@/components/AsyncStorage";


const AddPage = () => {

  const [title, setTitle] = useState("");

  const [explain, setExplain] = useState("");


  const saveNote = async () => {

    // التأكد من إدخال العنوان
    if (title.trim() === "") {

      Alert.alert(
        "تنبيه",
        "Please enter a title"
      );

      return;
    }


    try {

      // جلب الملاحظات الموجودة
      const storedNotes =
        await storage.getItem("Notes");


      const notes =
        Array.isArray(storedNotes)
          ? storedNotes
          : [];


      // إنشاء ID جديد
      const newID =
        notes.length > 0
          ? Math.max(
              ...notes.map(
                (item) => Number(item.ID) || 0
              )
            ) + 1
          : 1;


      // الملاحظة الجديدة
      const newNote = {

        ID: newID,

        title: title.trim(),

        explain: explain.trim(),

      };


      // إضافة الملاحظة
      const updatedNotes = [
        ...notes,
        newNote,
      ];


      // حفظ البيانات
      await storage.setItem(
        "Notes",
        updatedNotes
      );


      // الرجوع للصفحة الرئيسية
      router.back();


    } catch (error) {

      console.error(
        "Error adding note:",
        error
      );


      Alert.alert(
        "Error",
        "Could not save the note"
      );

    }

  };


  return (

    <View style={styles.container}>

      {/* العنوان */}

      <Text style={styles.header}>
        Add New Note
      </Text>


      {/* Title */}

      <Text style={styles.label}>
        Title
      </Text>

      <TextInput

        style={styles.input}

        value={title}

        onChangeText={setTitle}

        placeholder="Enter note title"

        placeholderTextColor="#aaa"

      />


      {/* Explain */}

      <Text style={styles.label}>
        Explain
      </Text>

      <TextInput

        style={[
          styles.input,
          styles.explainInput,
        ]}

        value={explain}

        onChangeText={setExplain}

        placeholder="Enter note description"

        placeholderTextColor="#aaa"

        multiline

        textAlignVertical="top"

      />


      {/* Save */}

      <Pressable
        style={styles.saveButton}
        onPress={saveNote}
      >

        <Text style={styles.saveText}>
          Save
        </Text>

      </Pressable>


      {/* Cancel */}

      <Pressable
        style={styles.cancelButton}
        onPress={() => router.back()}
      >

        <Text style={styles.cancelText}>
          Cancel
        </Text>

      </Pressable>

    </View>

  );

};


export default AddPage;


const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: "#383737",

    padding: 20,

  },


  header: {

    color: "#fff",

    fontFamily: "Cairo",

    fontSize: 26,

    fontWeight: "bold",

    textAlign: "center",

    marginBottom: 30,

  },


  label: {

    color: "#fff",

    fontFamily: "Cairo",

    fontSize: 18,

    marginBottom: 8,

  },


  input: {

    backgroundColor: "#3a3a3a",

    color: "#fff",

    height: 55,

    borderRadius: 10,

    paddingHorizontal: 15,

    marginBottom: 20,

    fontSize: 17,

    fontFamily: "Cairo",

  },


  explainInput: {

    height: 150,

    paddingTop: 15,

  },


  saveButton: {

    backgroundColor: "#ffc400",

    height: 55,

    borderRadius: 10,

    justifyContent: "center",

    alignItems: "center",

    marginTop: 10,

  },


  saveText: {

    color: "#383737",

    fontSize: 19,

    fontFamily: "Cairo",

    fontWeight: "bold",

  },


  cancelButton: {

    backgroundColor: "#555",

    height: 55,

    borderRadius: 10,

    justifyContent: "center",

    alignItems: "center",

    marginTop: 12,

  },


  cancelText: {

    color: "#fff",

    fontSize: 18,

    fontFamily: "Cairo",

    fontWeight: "bold",

  },

});
