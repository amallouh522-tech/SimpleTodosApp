
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from "react-native";

import { Link } from "expo-router";


const ViewNots = ({ Notes }) => {

  return (

    <FlatList

      style={styles.Notes}

      data={Notes}

      keyExtractor={(item) =>
        item.ID.toString()
      }


      renderItem={({ item }) => (

        <Link
          href={`/edit-note/${item.ID}`}
          asChild
        >

          <Pressable
            style={styles.Note}
          >

            {/* العنوان */}

            <Text style={styles.Title}>
              {item.title}
            </Text>


            {/* الوصف */}

            <Text style={styles.Explain}>

              {item.explain
                .split(" ")
                .slice(0, 2)
                .join(" ")
              }

            </Text>


            {/* الزر */}

            <View style={styles.Clickme}>

              <Text
                style={styles.ClickmeText}
              >
                ⬆ Click Me ⬆
              </Text>

            </View>

          </Pressable>

        </Link>

      )}

    />

  );

};


export default ViewNots;


const styles = StyleSheet.create({

  Notes: {

    flex: 1,

  },


  Note: {

    backgroundColor: "#272727",

    marginHorizontal: 20,

    marginVertical: 10,

    padding: 20,

    alignItems: "center",

    borderRadius: 10,

  },


  Title: {

    color: "#fff",

    fontFamily: "Cairo",

    fontSize: 20,

    textAlign: "center",

  },


  Explain: {

    color: "#fff",

    fontFamily: "Cairo",

    fontSize: 16,

    marginTop: 5,

    textAlign: "center",

  },


  Clickme: {

    backgroundColor: "#f5bc00",

    paddingHorizontal: 20,

    paddingVertical: 12,

    borderRadius: 10,

    marginTop: 15,

  },


  ClickmeText: {

    color: "#fff",

    fontFamily: "Cairo",

    fontSize: 16,

    fontWeight: "bold",

  },

});
