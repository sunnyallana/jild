import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { Search, ShoppingBag, Heart, ShoppingCart, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { getUserRecommendations } from "../utils/supabase";

// Mock product data
const products = [
  {
    id: 1,
    name: "Gentle Foaming Cleanser",
    category: "Cleanser",
    price: 24.99,
    image:
      "https://images.pexels.com/photos/3737579/pexels-photo-3737579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "A gentle foaming cleanser that removes impurities without stripping the skin.",
    rating: 4.7,
    reviews: 124,
    tags: ["sensitive skin", "oily skin"],
    recommended: true,
  },
  {
    id: 2,
    name: "Vitamin C Serum",
    category: "Serum",
    price: 38.5,
    image:
      "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Brightening serum with 15% vitamin C to reduce hyperpigmentation and boost collagen.",
    rating: 4.9,
    reviews: 89,
    tags: ["brightening", "anti-aging"],
    recommended: true,
  },
  {
    id: 3,
    name: "Oil-Free Moisturizer",
    category: "Moisturizer",
    price: 29.0,
    image:
      "https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Lightweight, oil-free moisturizer providing 24-hour hydration without clogging pores.",
    rating: 4.5,
    reviews: 156,
    tags: ["oily skin", "combination skin"],
    recommended: true,
  },
  {
    id: 4,
    name: "Hyaluronic Acid Toner",
    category: "Toner",
    price: 22.0,
    image:
      "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Alcohol-free toner with hyaluronic acid to hydrate and prepare skin for treatment products.",
    rating: 4.6,
    reviews: 78,
    tags: ["dry skin", "hydrating"],
    recommended: false,
  },
  {
    id: 5,
    name: "Retinol Night Cream",
    category: "Treatment",
    price: 42.99,
    image:
      "https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Anti-aging night cream with retinol to reduce fine lines and improve skin texture.",
    rating: 4.8,
    reviews: 112,
    tags: ["anti-aging", "night care"],
    recommended: false,
  },
  {
    id: 6,
    name: "SPF 50 Sunscreen",
    category: "Sunscreen",
    price: 19.95,
    image:
      "https://images.pexels.com/photos/7319158/pexels-photo-7319158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Broad-spectrum SPF 50 sunscreen that's lightweight and doesn't leave a white cast.",
    rating: 4.4,
    reviews: 203,
    tags: ["sun protection", "daily use"],
    recommended: false,
  },
  {
    id: 7,
    name: "Clay Purifying Mask",
    category: "Mask",
    price: 28.0,
    image:
      "https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Deep-cleansing clay mask that draws out impurities and reduces excess oil.",
    rating: 4.7,
    reviews: 95,
    tags: ["oily skin", "weekly treatment"],
    recommended: false,
  },
  {
    id: 8,
    name: "Brightening Eye Cream",
    category: "Eye Care",
    price: 34.5,
    image:
      "https://images.pexels.com/photos/4465821/pexels-photo-4465821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description:
      "Targeted eye cream that reduces dark circles and puffiness while brightening the under-eye area.",
    rating: 4.6,
    reviews: 67,
    tags: ["anti-aging", "brightening"],
    recommended: false,
  },
];

const Shop = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [userRecommendations, setUserRecommendations] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (user) {
        try {
          const recommendations = await getUserRecommendations(user.id);
          if (recommendations && recommendations.recommendations) {
            setUserRecommendations(
              recommendations.recommendations.map((r) => r.name),
            );
          }
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        }
      }
      setLoading(false);
    };

    fetchRecommendations();
  }, [user]);

  useEffect(() => {
    // Filter and sort products
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter,
      );
    }

    // Apply sort
    if (sortBy === "recommended") {
      // First show recommended products from AI, then other recommended products, then the rest
      filtered.sort((a, b) => {
        const aInUserRecs = userRecommendations.includes(a.name);
        const bInUserRecs = userRecommendations.includes(b.name);

        if (aInUserRecs && !bInUserRecs) return -1;
        if (!aInUserRecs && bInUserRecs) return 1;
        if (a.recommended && !b.recommended) return -1;
        if (!a.recommended && b.recommended) return 1;
        return 0;
      });
    } else if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, categoryFilter, sortBy, userRecommendations]);

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Show a visual feedback that the item was added
    setShowCart(true);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  const getCartTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const placeOrder = () => {
    // In a real application, this would send the order to a backend
    // But for demo purposes, we'll just simulate a successful order
    setOrderPlaced(true);
    setCheckoutOpen(false);
    setCart([]);
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-[70vh]">
        <CircularProgress sx={{ color: "#FB6F92" }} />
      </Box>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Typography
          variant="h4"
          component="h1"
          className="text-neutral-800 font-bold mb-2"
        >
          Shop Recommended Products
        </Typography>
        <Typography variant="body1" className="text-neutral-600">
          Discover skincare products tailored to your skin&apos;s needs
        </Typography>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-soft p-4 mb-8">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} className="text-neutral-500" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="recommended">Recommended</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setShowCart(true)}
              startIcon={<ShoppingCart size={18} />}
              sx={{
                borderColor: "#FB6F92",
                color: "#FB6F92",
                "&:hover": {
                  borderColor: "#FF8FAB",
                  backgroundColor: "rgba(251, 111, 146, 0.05)",
                },
              }}
            >
              Cart ({cart.length})
            </Button>
          </Grid>
        </Grid>
      </div>

      {/* Products */}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                },
              }}
            >
              <div className="relative">
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ height: 200, objectFit: "cover" }}
                />
                <div className="absolute top-2 right-2">
                  <Button
                    sx={{
                      minWidth: "unset",
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      backgroundColor: "white",
                      color: wishlist.includes(product.id)
                        ? "#FB6F92"
                        : "#64748B",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.9)",
                      },
                    }}
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart
                      size={18}
                      fill={wishlist.includes(product.id) ? "#FB6F92" : "none"}
                    />
                  </Button>
                </div>
                {(userRecommendations.includes(product.name) ||
                  product.recommended) && (
                  <div className="absolute top-2 left-2">
                    <Chip
                      label="Recommended"
                      size="small"
                      sx={{
                        backgroundColor: userRecommendations.includes(
                          product.name,
                        )
                          ? "#FB6F92"
                          : "#FFB3C6",
                        color: "white",
                      }}
                    />
                  </div>
                )}
              </div>

              <CardContent
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  {product.category}
                </Typography>

                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {product.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, flexGrow: 1 }}
                >
                  {product.description.length > 100
                    ? `${product.description.substring(0, 100)}...`
                    : product.description}
                </Typography>

                <div className="flex items-center mb-2">
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-primary" : "text-neutral-300"} fill-current`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 text-sm text-neutral-600">
                    ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    ${product.price.toFixed(2)}
                  </Typography>

                  <Button
                    variant="contained"
                    startIcon={<ShoppingBag size={16} />}
                    onClick={() => addToCart(product)}
                    sx={{
                      bgcolor: "#FB6F92",
                      "&:hover": { bgcolor: "#FF8FAB" },
                    }}
                  >
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Typography variant="h6" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try adjusting your search or filter criteria
          </Typography>
        </div>
      )}

      {/* Shopping Cart Dialog */}
      <Dialog
        open={showCart}
        onClose={() => setShowCart(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <div className="flex justify-between items-center">
            <Typography variant="h6">Your Cart</Typography>
            <Button
              onClick={() => setShowCart(false)}
              sx={{ minWidth: "auto", p: 1 }}
            >
              <X size={20} />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          {cart.length === 0 ? (
            <div className="text-center py-6">
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Your cart is empty
              </Typography>
              <Button
                variant="contained"
                onClick={() => setShowCart(false)}
                sx={{
                  mt: 2,
                  bgcolor: "#FB6F92",
                  "&:hover": { bgcolor: "#FF8FAB" },
                }}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center py-3 border-b border-neutral-200"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-grow">
                    <Typography variant="subtitle1" fontWeight={600}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price.toFixed(2)}
                    </Typography>
                  </div>
                  <div className="flex items-center">
                    <Button
                      size="small"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      sx={{ minWidth: "30px" }}
                    >
                      -
                    </Button>
                    <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                    <Button
                      size="small"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      sx={{ minWidth: "30px" }}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    onClick={() => removeFromCart(item.id)}
                    sx={{ ml: 2, color: "text.secondary" }}
                  >
                    <X size={18} />
                  </Button>
                </div>
              ))}
              <div className="mt-4 py-3 border-t border-neutral-200">
                <div className="flex justify-between items-center">
                  <Typography variant="subtitle1">Subtotal:</Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    ${getCartTotal()}
                  </Typography>
                </div>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    setShowCart(false);
                    setCheckoutOpen(true);
                  }}
                  sx={{
                    mt: 3,
                    bgcolor: "#FB6F92",
                    "&:hover": { bgcolor: "#FF8FAB" },
                  }}
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Checkout Dialog */}
      <Dialog
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">Checkout</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2"
            >
              <Typography variant="body1">
                {item.name} x {item.quantity}
              </Typography>
              <Typography variant="body1">
                ${(item.price * item.quantity).toFixed(2)}
              </Typography>
            </div>
          ))}

          <div className="mt-4 pt-4 border-t border-neutral-200">
            <div className="flex justify-between items-center">
              <Typography variant="subtitle1">Subtotal:</Typography>
              <Typography variant="subtitle1">${getCartTotal()}</Typography>
            </div>
            <div className="flex justify-between items-center mt-2">
              <Typography variant="subtitle1">Shipping:</Typography>
              <Typography variant="subtitle1">$0.00</Typography>
            </div>
            <div className="flex justify-between items-center mt-2">
              <Typography variant="subtitle1">Tax:</Typography>
              <Typography variant="subtitle1">
                ${(getCartTotal() * 0.08).toFixed(2)}
              </Typography>
            </div>
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-neutral-200">
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="primary">
                $
                {(
                  parseFloat(getCartTotal()) +
                  parseFloat(getCartTotal()) * 0.08
                ).toFixed(2)}
              </Typography>
            </div>
          </div>

          <Typography variant="h6" gutterBottom className="mt-6">
            Payment Method
          </Typography>
          <div className="bg-primary-bg p-4 rounded-lg">
            <div className="flex items-center">
              <input
                type="radio"
                id="cod"
                name="payment"
                checked
                readOnly
                className="mr-2"
              />
              <label htmlFor="cod" className="text-neutral-800 font-medium">
                Cash on Delivery
              </label>
            </div>
            <p className="text-neutral-600 text-sm mt-2">
              Pay when your order is delivered to your doorstep.
            </p>
          </div>

          <Typography variant="h6" gutterBottom className="mt-6">
            Shipping Address
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField label="First Name" fullWidth required />
            <TextField label="Last Name" fullWidth required />
            <TextField
              label="Address"
              fullWidth
              required
              className="md:col-span-2"
            />
            <TextField label="City" fullWidth required />
            <TextField label="Postal Code" fullWidth required />
            <TextField
              label="Phone Number"
              fullWidth
              required
              className="md:col-span-2"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setCheckoutOpen(false)}
            sx={{ color: "text.secondary" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={placeOrder}
            sx={{
              bgcolor: "#FB6F92",
              "&:hover": { bgcolor: "#FF8FAB" },
            }}
          >
            Place Order
          </Button>
        </DialogActions>
      </Dialog>

      {/* Order Success Snackbar */}
      <Snackbar
        open={orderPlaced}
        autoHideDuration={6000}
        onClose={() => setOrderPlaced(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOrderPlaced(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Your order has been placed successfully! It will be delivered within
          3-5 business days.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Shop;
