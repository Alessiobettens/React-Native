import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

const ProductDetail = ({route}) => {
    const { title, description, price, image} = route.params;

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1){
            setQuantity(quantity - 1);
        }
    };

  return (
    <ScrollView style={styles.container}>
        <Text style={styles.title}>Detailscherm</Text>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>{price}</Text>

        <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.button} onPress={decreaseQuantity}>
                <Text style= {styles.buttonText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity style={styles.button} onPress={increaseQuantity}>
                <Text style= {styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.totalPrice}>Totaal: ${price * quantity}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductDetail;