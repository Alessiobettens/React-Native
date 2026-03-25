import { StyleSheet, Text, ScrollView } from "react-native";

import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({title, description, price, image, onPress}) => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.card}>
            <Image source={image} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.price}>{price}</Text>
        <TouchableOpacity style={StyleSheet.button} onPress={onPress}>
            <Text>View Details</Text>
        </TouchableOpacity>
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    card: {
        width: 300,
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 16,
    },
    image: {
        width: "100%",
        height: 150,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 8,
    },
    description: {
        fontSize: 14,
        color: "#555",
        marginTop: 4,
    },
});

export default ProductCard;