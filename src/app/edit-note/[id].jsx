
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";

import { useEffect, useState } from "react";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import { storage } from "@/components/AsyncStorage";


const Editpage = () => {

  const { id } = useLocalSearchParams();


  const [selectedData, setSelectedData] =
    useState({
      title: "",
      explain: "",
    });


  const [loading, setLoading] =
    useState(true);


  // تحميل الملاحظة
  useEffect(() => {

    const loadNoteData = async () => {

      try {

        const storedNotes =
          await storage.getItem("Notes");


        if (Array.isArray(storedNotes)) {

          const found =
            storedNotes.find(
              (item) =>
                item.ID.toString() ===
                id.toString()
            );


          if (found) {

            setSelectedData({

              title: found.title,

              explain: found.explain,

            });

          }

        }

      } catch (error) {

        console.error(
          "Error loading note:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    loadNoteData();

  }, [id]);


  // حفظ التعديل
  const saveNote = async () => {

    try {

      const storedNotes =
        await storage.getItem("Notes");


      if (!Array.isArray(storedNotes)) {
        return;
      }


      const updatedNotes =
        storedNotes.map((item) => {

          if (
            item.ID.toString() ===
            id.toString()
          ) {

            return {

              ...item,

              title:
                selectedData.title,

              explain:
                selectedData.explain,

            };

          }


          return item;

        });


      await storage.setItem(
        "Notes",
        updatedNotes
      );


      router.back();

    } catch (error) {

      console.error(
        "Error saving note:",
        error
      );

    }

  };


  if (loading) {

    return (

      <View style={styles.container}>

        <Text style={styles.text}>
          Loading...
        </Text>

      </View>

    );

  }


  return (

    <View style={styles.container}>

      <Text style={styles.text}>
        Edit Note ID: {id}
      </Text>


      {/* العنوان */}

      <TextInput

        style={styles.input}

        value={selectedData.title}

        onChangeText={(text) =>
          setSelectedData({
            ...selectedData,
            title: text,
          })
        }

        placeholder="Title"

        placeholderTextColor="#aaa"

      />


      {/* الوصف */}

      <TextInput

        style={[
          styles.input,
          styles.explainInput,
        ]}

        value={selectedData.explain}

        onChangeText={(text) =>
          setSelectedData({
            ...selectedData,
            explain: text,
          })
        }

        placeholder="Explain"

        placeholderTextColor="#aaa"

        multiline

      />


      {/* حفظ */}

      <Pressable
        style={styles.saveButton}
        onPress={saveNote}
      >

        <Text style={styles.saveText}>
          Save
        </Text>

      </Pressable>

    </View>

  );

};


export default Editpage;


const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: "#383737",

    padding: 20,

  },


  text: {

    color: "#fff",

    fontSize: 18,

    marginBottom: 15,

    fontFamily: "Cairo",

  },


  input: {

    backgroundColor: "#3a3a3a",

    color: "#fff",

    height: 50,

    borderRadius: 10,

    paddingHorizontal: 15,

    marginBottom: 15,

    fontSize: 16,

  },


  explainInput: {

    height: 120,

    paddingTop: 15,

    textAlignVertical: "top",

  },


  saveButton: {

    backgroundColor: "#ffc400",

    padding: 15,

    borderRadius: 10,

    alignItems: "center",

  },


  saveText: {

    color: "#383737",

    fontSize: 18,

    fontWeight: "bold",

  },

});
