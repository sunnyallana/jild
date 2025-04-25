import { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const SkinConcernsForm = ({ data, onChange }) => {
  const [selectedConcerns, setSelectedConcerns] = useState(
    data.primaryConcerns || [],
  );

  const skinTypes = ["Oily", "Dry", "Combination", "Normal", "Sensitive"];

  const concerns = [
    "Acne",
    "Blackheads",
    "Wrinkles",
    "Fine lines",
    "Dark spots",
    "Uneven texture",
    "Redness",
    "Dullness",
    "Large pores",
    "Dehydration",
    "Dark circles",
    "Sun damage",
  ];

  const handleSkinTypeChange = (e) => {
    onChange({ skinType: e.target.value });
  };

  const handleConcernChange = (concern) => {
    let updatedConcerns;

    if (selectedConcerns.includes(concern)) {
      updatedConcerns = selectedConcerns.filter((c) => c !== concern);
    } else {
      updatedConcerns = [...selectedConcerns, concern];
    }

    setSelectedConcerns(updatedConcerns);
    onChange({ primaryConcerns: updatedConcerns });
  };

  const handleProductsChange = (e) => {
    onChange({ currentProducts: e.target.value });
  };

  return (
    <div className="card animate-fadeIn">
      <h2 className="text-2xl font-semibold text-neutral-800 mb-6">
        Skin Concerns
      </h2>
      <p className="text-neutral-600 mb-6">
        Tell us about your skin so we can create a personalized skincare routine
        for you.
      </p>

      <div className="mb-8">
        <Typography variant="subtitle1" gutterBottom>
          How would you describe your skin type?
        </Typography>

        <FormControl component="fieldset">
          <RadioGroup
            name="skinType"
            value={data.skinType}
            onChange={handleSkinTypeChange}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {skinTypes.map((type) => (
                <FormControlLabel
                  key={type}
                  value={type.toLowerCase()}
                  control={
                    <Radio
                      sx={{
                        color: "#FB6F92",
                        "&.Mui-checked": {
                          color: "#FB6F92",
                        },
                      }}
                    />
                  }
                  label={type}
                />
              ))}
            </div>
          </RadioGroup>
        </FormControl>
      </div>

      <div className="mb-8">
        <Typography variant="subtitle1" gutterBottom>
          What are your primary skin concerns? (Select up to 3)
        </Typography>

        <FormGroup className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {concerns.map((concern) => (
            <FormControlLabel
              key={concern}
              control={
                <Checkbox
                  checked={selectedConcerns.includes(concern.toLowerCase())}
                  onChange={() => handleConcernChange(concern.toLowerCase())}
                  disabled={
                    !selectedConcerns.includes(concern.toLowerCase()) &&
                    selectedConcerns.length >= 3
                  }
                  sx={{
                    color: "#FB6F92",
                    "&.Mui-checked": {
                      color: "#FB6F92",
                    },
                  }}
                />
              }
              label={concern}
            />
          ))}
        </FormGroup>
        <Typography variant="caption" className="text-neutral-500 mt-2">
          {selectedConcerns.length}/3 selected
        </Typography>
      </div>

      <div>
        <Typography variant="subtitle1" gutterBottom>
          What skincare products are you currently using?
        </Typography>

        <TextField
          name="currentProducts"
          value={data.currentProducts}
          onChange={handleProductsChange}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          placeholder="Example: Cetaphil Gentle Cleanser, The Ordinary Niacinamide 10% + Zinc 1%, CeraVe Moisturizing Cream, etc."
        />
      </div>
    </div>
  );
};

export default SkinConcernsForm;

SkinConcernsForm.propTypes = {
  data: PropTypes.shape({
    primaryConcerns: PropTypes.array,
    skinType: PropTypes.string,
    currentProducts: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
