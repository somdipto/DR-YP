import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  Image,
  StatusBar,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function SearchScreen() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const brands = [
    'Nike', 'Adidas', 'Zara', 'H&M', 'Uniqlo', 'Puma', 'Gucci', 'Louis Vuitton', 'Chanel', 'Dior'
  ]

  const trendingItems = [
    { id: 1, title: 'Oversized Hoodie', price: 89, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop', brand: 'Nike' },
    { id: 2, title: 'Vintage Jeans', price: 129, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop', brand: 'Zara' },
    { id: 3, title: 'Sneakers', price: 199, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop', brand: 'Adidas' },
  ]

  const newArrivals = [
    { id: 4, title: 'Silk Dress', price: 299, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop', brand: 'H&M' },
    { id: 5, title: 'Leather Jacket', price: 399, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop', brand: 'Uniqlo' },
    { id: 6, title: 'Summer Top', price: 59, image: 'https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=300&h=400&fit=crop', brand: 'Zara' },
  ]

  const menItems = [
    { id: 7, title: 'Formal Shirt', price: 79, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop', brand: 'H&M' },
    { id: 8, title: 'Chinos', price: 99, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop', brand: 'Uniqlo' },
  ]

  const womenItems = [
    { id: 9, title: 'Floral Dress', price: 149, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop', brand: 'Zara' },
    { id: 10, title: 'Blazer', price: 199, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop', brand: 'H&M' },
  ]

  const categories = [
    { id: 'men', name: 'MEN', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center', color: '#000000' },
    { id: 'women', name: 'WOMEN', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop&crop=center', color: '#8B5CF6' },
  ]

  const youMightLike = []
  const related = []

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.modernHeader}>
        <Text style={styles.logoText}>DRYP</Text>

        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search brands, styles..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </Pressable>
          )}
        </View>

        <Pressable onPress={() => router.push('/cart')} style={styles.cartButton}>
          <Ionicons name="cart-outline" size={24} color="#000" />
        </Pressable>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Categories Section */}
        {/* <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <Pressable key={category.id} style={styles.categoryCard}>
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <View style={[styles.categoryOverlay, { backgroundColor: category.color }]}>
                <Text style={styles.categoryText}>{category.name}</Text>
              </View>
            </Pressable>
          ))}
        </View> */}

        {/* Brands Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BRANDS</Text>
          {brands.length === 0 ? (
            <Text style={styles.emptyText}>No Brands Found</Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {brands.map((brand, index) => (
                <Pressable key={index} style={styles.brandCard}>
                  <Text style={styles.brandText}>{brand}</Text>
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Trending Now Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TRENDING NOW</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {trendingItems.map((item) => (
              <View key={item.id} style={styles.productCard}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productBrand}>{item.brand}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* New Arrivals Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NEW ARRIVALS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {newArrivals.map((item) => (
              <View key={item.id} style={styles.productCard}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productBrand}>{item.brand}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Men Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MEN</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {menItems.map((item) => (
              <View key={item.id} style={styles.productCard}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productBrand}>{item.brand}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Women Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>WOMEN</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {womenItems.map((item) => (
              <View key={item.id} style={styles.productCard}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productBrand}>{item.brand}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* You Might Like Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>YOU MIGHT LIKE</Text>
          {youMightLike.length === 0 ? (
            <Text style={styles.emptyText}>No Clothes you might like Found</Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {youMightLike.map((item, index) => (
                <View key={index} style={styles.likeCard}>
                  <Text>{item}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Related Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RELATED</Text>
          {related.length === 0 ? (
            <View style={styles.emptyContainer}>
              {/* Empty space for related items */}
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {related.map((item, index) => (
                <View key={index} style={styles.relatedCard}>
                  <Text>{item}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  notificationButton: {
    padding: 8,
  },
  notificationIcon: {
    fontSize: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
  },
  categoryCard: {
    flex: 1,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '400',
    paddingVertical: 10,
  },
  emptyContainer: {
    height: 50,
  },
  modernHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.5,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    marginLeft: 8,
    paddingVertical: 0,
  },
  cartButton: {
    padding: 4,
  },
  brandCard: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  brandText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  trendingCard: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    marginRight: 10,
  },
  arrivalCard: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    marginRight: 10,
  },
  likeCard: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    marginRight: 10,
  },
  relatedCard: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    marginRight: 10,
  },
  bottomSpacing: {
    height: 100,
  },
  productCard: {
    width: 160,
    marginRight: 15,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 0,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  productImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#f8f9fa',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginTop: 0,
    marginBottom: 4,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  productBrand: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 6,
    paddingHorizontal: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
})
