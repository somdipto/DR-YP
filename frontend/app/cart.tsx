import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  Pressable, 
  StyleSheet, 
  StatusBar,
  Dimensions,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore, CartItem } from '../src/state/cart';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CartScreen() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();
  const router = useRouter();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleQuantityChange = (item: CartItem, change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemBrand}>{item.brand}</Text>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
        </View>
        
        <View style={styles.quantityContainer}>
          <Pressable 
            style={[styles.quantityButton, styles.decreaseButton]} 
            onPress={() => handleQuantityChange(item, -1)}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </Pressable>
          
          <Text style={styles.quantityText}>{item.quantity}</Text>
          
          <Pressable 
            style={[styles.quantityButton, styles.increaseButton]} 
            onPress={() => handleQuantityChange(item, 1)}
          >
            <Text style={[styles.quantityButtonText, { color: '#fff' }]}>+</Text>
          </Pressable>
        </View>
      </View>
      
      <Pressable 
        style={styles.removeButton} 
        onPress={() => removeFromCart(item.id)}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.modernHeader}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <View style={styles.placeholder} />
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Start swiping to discover items you love!</Text>
          <Pressable style={styles.continueButton} onPress={() => router.push('/deck')}>
            <Text style={styles.continueButtonText}>Continue Shopping</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {/* Items Count */}
          <View style={styles.itemsHeader}>
            <Text style={styles.itemsCount}>
              {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
            </Text>
          </View>

          {/* Cart Items */}
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderCartItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />

          {/* Summary & Checkout */}
          <View style={styles.summaryContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>{formatPrice(getTotalPrice())}</Text>
            </View>
            
            <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>
                Checkout • {formatPrice(getTotalPrice())}
              </Text>
            </Pressable>
            
            <Pressable style={styles.continueShoppingButton} onPress={() => router.push('/deck')}>
              <Text style={styles.continueShoppingText}>Continue Shopping</Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  backButton: {
    padding: 8,
    marginLeft: -4,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#000000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.5,
  },
  placeholder: {
    width: 40,
  },
  itemsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  itemsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
      },
    }),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f8f9fa',
  },
  itemImage: {
    width: 100,
    height: 120,
    backgroundColor: '#f5f5f5',
  },
  itemDetails: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  itemInfo: {
    flex: 1,
  },
  itemBrand: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 20,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  decreaseButton: {
    borderColor: '#e9ecef',
    backgroundColor: '#f8f9fa',
  },
  increaseButton: {
    borderColor: '#000000',
    backgroundColor: '#000000',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginHorizontal: 15,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#666666',
  },
  summaryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#ffffff',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000000',
  },
  checkoutButton: {
    backgroundColor: '#000000',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 12,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
      },
    }),
  },
  checkoutButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  continueShoppingButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  continueShoppingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: '#000000',
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
      },
    }),
  },
  continueButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
});
