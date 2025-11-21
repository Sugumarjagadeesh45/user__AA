// /Users/webasebrandings/Downloads/new-main/src/Screen1/Shopping/icons/TopSale.tsx
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ProductCard from '../ProductCard';
import { CartContext } from '../ShoppingContent';
import { getApiBaseUrl } from '../../../../src/util/backendConfig';

const TopSale = () => {
  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const BASE_URL = getApiBaseUrl();

  useEffect(() => {
    fetchTopSaleProducts();
  }, []);

  const fetchTopSaleProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/groceries`);
      
      if (response.data.success) {
        const allProducts = response.data.data || [];
        
        // Filter for products with high discount (top sale items)
        const topSaleProducts = allProducts
          .filter(product => product.discount >= 20)
          .sort((a, b) => b.discount - a.discount);
        
        setProducts(topSaleProducts);
      }
    } catch (err) {
      console.error('Error fetching top sale products:', err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTopSaleProducts();
    setRefreshing(false);
  };

  const handleAddToCart = (product) => {
    if (product.stock <= 0) {
      alert('This product is out of stock');
      return;
    }
    addToCart(product);
    alert(`${product.name} added to cart`);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Top Sale</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4caf50" />
          <Text style={styles.loadingText}>Loading top deals...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Top Sale</Text>
        <View style={styles.placeholder} />
      </View>

      {products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Top Deals Available</Text>
          <Text style={styles.emptyText}>
            Check back later for amazing discounts and special offers!
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductCard product={item} addToCart={handleAddToCart} />
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4caf50',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
  },
  productsList: {
    padding: 15,
  },
});

export default TopSale;