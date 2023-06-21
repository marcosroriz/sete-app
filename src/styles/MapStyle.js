import { StyleSheet } from "react-native";

export default StyleSheet.create({
    // Map Styles
    mapContainer: {
        resizeMode: "cover",
        width: "100%",
        height: "100%",
    },
    mapElement: {
        width: "100%",
        height: "100%",
    },
    mapFilterFAB: {
        position: "absolute",
        backgroundColor: "white",
        // borderColor: "gray",
        // borderWidth: 4,
        margin: 16,
        right: 0,
        top: 0,
        // width: 150,
        // // height: 200,
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
    },
    mapSecondFilterFAB: {
        position: "absolute",
        backgroundColor: "white",
        margin: 16,
        right: 0,
        top: 70,
    },
    moreMapInfoContainer: {
        width: "100%",
        padding: 0,
        margin: 0,
    },
    moreMapInfoList: {
        padding: 0,
        margin: 0,
    },
    moreMapInfoButtonsContainer: {
        marginTop: 10,
        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 12,
    },
    moreMapInfoButtons: {
        marginRight: 20,
    },
});
