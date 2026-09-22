
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
} from "react-native";

import { useEffect, useState, useCallback } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import ViewNots from "@/components/ViewNots";

import { Link, useFocusEffect } from "expo-router";

import { storage } from "@/components/AsyncStorage";


const MainPage = () => {

  const [Notes, setNotes] = useState([]);

  const [Search, SetSearch] = useState("");

  const [ViewedNotes, SetViewedNotes] = useState([]);


  // جلب الملاحظات عند فتح الصفحة
  useFocusEffect(
    useCallback(() => {

      const fetchNotes = async () => {

        try {

          let storedNotes = await storage.getItem("Notes");


          // إذا لا توجد ملاحظات
          if (!Array.isArray(storedNotes) || storedNotes.length === 0) {

            const initialNotes = [

              {
                title: "Hello",
                explain: "Hello From your App",
                ID: 1,
              },

              {
                title: "Hello 2",
                explain: "Hello From your App 2",
                ID: 2,
              },

            ];


            await storage.setItem(
              "Notes",
              initialNotes
            );


            storedNotes = initialNotes;
          }


          setNotes(storedNotes);

          SetViewedNotes(storedNotes);


        } catch (error) {

          console.error(
            "Error fetching notes:",
            error
          );

        }

      };


      fetchNotes();

    }, [])
  );


  // البحث
  useEffect(() => {

    if (Search.trim() === "") {

      SetViewedNotes(Notes);

      return;

    }


    const searchText =
      Search.toLowerCase();


    const results = Notes.filter((note) =>
      note.title
        .toLowerCase()
        .includes(searchText)
    );


    SetViewedNotes(results);

  }, [Search, Notes]);


  return (

    <SafeAreaView
      style={styles.GlobalViewStyle}
    >

      {/* العنوان */}

      <View style={styles.title}>

        <Text
          style={[
            styles.HeaderPageStyle,
            styles.GlobalTextStyle,
          ]}
        >
          Notes App
        </Text>

      </View>


      {/* البحث */}

      <View style={styles.InputView}>

        <TextInput
          style={styles.SearchNoteStyle}

          placeholder="Search For A Note"

          placeholderTextColor="#aaa"

          value={Search}

          onChangeText={SetSearch}
        />

      </View>


      {/* الخط */}

      <View style={styles.provider} />


      {/* الملاحظات */}

      {ViewedNotes.length === 0 ? (

        <Text style={styles.NoDataText}>
          No Data
        </Text>

      ) : (

        <ViewNots
          Notes={ViewedNotes}
        />

      )}


      {/* زر الإضافة */}

      <Link
        href="/add"
        style={styles.AddButton}
      >

        <Text
          style={styles.AddButtonText}
        >
          +
        </Text>

      </Link>

    </SafeAreaView>

  );

};


export default MainPage;


const styles = StyleSheet.create({

  NoDataText: {

    textAlign: "center",

    color: "red",

    fontFamily: "Cairo",

    fontSize: 24,

  },


  AddButton: {

    position: "absolute",

    right: 20,

    bottom: 40,

    width: 60,

    height: 60,

    borderRadius: 30,

    backgroundColor: "#ffc400",

    justifyContent: "center",

    alignItems: "center",

    elevation: 5,

  },


  AddButtonText: {

    fontSize: 35,

    color: "#383737",

    fontWeight: "bold",

  },


  GlobalViewStyle: {

    flex: 1,

    backgroundColor: "#383737",

  },


  GlobalTextStyle: {

    fontFamily: "Cairo",

  },


  title: {

    margin: 20,

  },


  HeaderPageStyle: {

    fontSize: 24,

    color: "#ffffff",

    textAlign: "center",

  },


  InputView: {

    alignItems: "center",

  },


  SearchNoteStyle: {

    backgroundColor: "#3a3a3a",

    color: "#fff",

    height: 50,

    fontFamily: "Cairo",

    fontSize: 18,

    width: "70%",

    borderRadius: 10,

    borderWidth: 0,

    paddingHorizontal: 20,

    ...Platform.select({

      web: {
        outlineStyle: "none",
      },

    }),

  },


  provider: {

    marginVertical: 10,

    backgroundColor: "#ffffff8e",

    height: 1,

  },

});

