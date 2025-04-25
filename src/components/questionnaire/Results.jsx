import { useState } from "react";
import {
  Typography,
  Button,
  Divider,
  Chip,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { ShoppingBag, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const acneProducts = [
  {
    name: "Salicylic Acid Cleanser",
    price: "$18.99",
    image: "https://images.pexels.com/photos/3737579/pexels-photo-3737579.jpeg",
    description: "Helps unclog pores and reduce acne breakouts",
  },
  {
    name: "Benzoyl Peroxide Treatment",
    price: "$14.50",
    image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg",
    description: "Targets acne-causing bacteria and reduces inflammation",
  },
  {
    name: "Oil-Free Moisturizer",
    price: "$22.00",
    image: "https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg",
    description: "Hydrates without clogging pores",
  },
];

const darkCircleProducts = [
  {
    name: "Caffeine Eye Serum",
    price: "$24.99",
    image: "https://images.pexels.com/photos/4465821/pexels-photo-4465821.jpeg",
    description: "Reduces puffiness and dark circles",
  },
  {
    name: "Vitamin C Eye Cream",
    price: "$28.50",
    image: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg",
    description: "Brightens under-eye area and reduces pigmentation",
  },
  {
    name: "Retinol Eye Treatment",
    price: "$32.00",
    image: "https://images.pexels.com/photos/7319158/pexels-photo-7319158.jpeg",
    description: "Stimulates collagen production to reduce dark circles",
  },
];

const acneRoutine = {
  morning: [
    { step: "Cleanser", product: "Salicylic Acid Cleanser" },
    { step: "Treatment", product: "Benzoyl Peroxide Spot Treatment" },
    { step: "Moisturizer", product: "Oil-Free Moisturizer with SPF" },
  ],
  evening: [
    { step: "Cleanser", product: "Gentle Foaming Cleanser" },
    { step: "Treatment", product: "Niacinamide Serum" },
    { step: "Moisturizer", product: "Oil-Free Night Cream" },
  ],
  weekly: [
    { step: "Exfoliation", product: "Chemical Exfoliant (AHA/BHA)" },
    { step: "Mask", product: "Clay Mask for Oil Control" },
  ],
};

const darkCircleRoutine = {
  morning: [
    { step: "Cleanser", product: "Gentle Hydrating Cleanser" },
    { step: "Eye Treatment", product: "Caffeine Eye Serum" },
    { step: "Moisturizer", product: "Hydrating Moisturizer with SPF" },
  ],
  evening: [
    { step: "Cleanser", product: "Creamy Cleanser" },
    { step: "Eye Treatment", product: "Retinol Eye Cream" },
    { step: "Moisturizer", product: "Rich Night Cream" },
  ],
  weekly: [
    { step: "Treatment", product: "Eye Mask for Dark Circles" },
    { step: "Massage", product: "Under-eye Massage with Jade Roller" },
  ],
};

const Results = ({ results }) => {
  const [activeTab, setActiveTab] = useState("morning");

  // Determine primary condition based on detections
  const primaryCondition =
    results?.detections?.length > 0
      ? results.detections.reduce((prev, current) =>
          prev.confidence > current.confidence ? prev : current,
        ).class
      : null;

  const recommendedProducts =
    primaryCondition === "Acne" ? acneProducts : darkCircleProducts;
  const recommendedRoutine =
    primaryCondition === "Acne" ? acneRoutine : darkCircleRoutine;

  // If results aren't loaded yet
  if (!results) {
    return (
      <div className="card text-center py-12">
        <CircularProgress sx={{ color: "#FB6F92", mb: 2 }} />
        <Typography variant="h6">Analyzing your skin...</Typography>
        <Typography variant="body2" color="textSecondary" className="mt-2">
          Our AI is processing your information to create personalized
          recommendations
        </Typography>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="card mb-6">
        <Typography variant="h5" component="h2" className="font-semibold mb-4">
          Your Skin Analysis Results
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div className="mb-6">
              <Typography variant="subtitle1" className="font-medium mb-2">
                Detected Conditions:
              </Typography>
              <div className="flex flex-wrap gap-2">
                {results.detections && results.detections.length > 0 ? (
                  results.detections.map((detection, index) => (
                    <Chip
                      key={index}
                      label={`${detection.class} (${(detection.confidence * 100).toFixed(1)}%)`}
                      sx={{
                        bgcolor: "#FB6F92",
                        color: "white",
                      }}
                    />
                  ))
                ) : (
                  <Typography variant="body2">
                    No conditions detected
                  </Typography>
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            {results.annotated_image && (
              <div>
                <Typography variant="subtitle1" className="font-medium mb-2">
                  Analysis Result:
                </Typography>
                <img
                  src={`data:image/jpeg;base64,${results.annotated_image}`}
                  alt="Analyzed skin"
                  className="w-full rounded-lg shadow-medium"
                />
              </div>
            )}
          </Grid>
        </Grid>
      </div>

      <div className="card mb-6">
        <Typography variant="h5" component="h2" className="font-semibold mb-4">
          Your Personalized Skincare Routine
        </Typography>

        <div className="flex border-b border-neutral-200 mb-4">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "morning"
                ? "text-primary border-b-2 border-primary"
                : "text-neutral-500 hover:text-primary"
            }`}
            onClick={() => setActiveTab("morning")}
          >
            Morning
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "evening"
                ? "text-primary border-b-2 border-primary"
                : "text-neutral-500 hover:text-primary"
            }`}
            onClick={() => setActiveTab("evening")}
          >
            Evening
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "weekly"
                ? "text-primary border-b-2 border-primary"
                : "text-neutral-500 hover:text-primary"
            }`}
            onClick={() => setActiveTab("weekly")}
          >
            Weekly
          </button>
        </div>

        <div className="space-y-4">
          {recommendedRoutine[activeTab].map((item, index) => (
            <div key={index} className="flex items-start">
              <div className="bg-primary-bg rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-medium">{index + 1}</span>
              </div>
              <div className="ml-4">
                <Typography variant="subtitle1" className="font-medium">
                  {item.step}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.product}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <Typography variant="h5" component="h2" className="font-semibold mb-4">
          Recommended Products
        </Typography>

        <Grid container spacing={3} className="mb-6">
          {recommendedProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {product.description}
                  </Typography>
                  <div className="flex justify-between items-center">
                    <Typography variant="subtitle2" fontWeight={600}>
                      {product.price}
                    </Typography>
                    <Button
                      size="small"
                      startIcon={<ShoppingBag size={14} />}
                      sx={{
                        color: "#FB6F92",
                        "&:hover": {
                          backgroundColor: "rgba(251, 111, 146, 0.05)",
                        },
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider className="mb-6" />

        <div className="flex justify-between items-center">
          <div className="flex items-center text-neutral-600">
            <Clock size={16} className="mr-2" />
            <Typography variant="body2">
              Analysis completed on {new Date().toLocaleDateString()}
            </Typography>
          </div>

          <Link to="/shop">
            <Button
              variant="contained"
              endIcon={<ArrowRight size={16} />}
              sx={{
                bgcolor: "#FB6F92",
                "&:hover": { bgcolor: "#FF8FAB" },
              }}
            >
              Shop All Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;

Results.propTypes = {
  results: PropTypes.shape({
    detections: PropTypes.array,
    annotated_image: PropTypes.string,
  }).isRequired,
};
