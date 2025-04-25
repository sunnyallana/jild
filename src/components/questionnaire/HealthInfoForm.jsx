import { useState } from "react";
import {
  TextField,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Radio,
  RadioGroup,
} from "@mui/material";

import PropTypes from "prop-types";

const HealthInfoForm = ({ data, onChange }) => {
  const [selectedConditions, setSelectedConditions] = useState(
    data.existingConditions || [],
  );
  const [selectedAllergies, setSelectedAllergies] = useState(
    data.allergies || [],
  );

  const conditions = [
    "Acne",
    "Eczema",
    "Psoriasis",
    "Rosacea",
    "Melasma",
    "Hyperpigmentation",
    "Dermatitis",
    "None",
  ];

  const allergies = [
    "Fragrances",
    "Preservatives",
    "Essential Oils",
    "Sulfates",
    "Parabens",
    "Lanolin",
    "None",
  ];

  const handleConditionChange = (condition) => {
    let updatedConditions;

    if (condition === "None") {
      updatedConditions = ["None"];
    } else {
      if (selectedConditions.includes(condition)) {
        updatedConditions = selectedConditions.filter(
          (c) => c !== condition && c !== "None",
        );
      } else {
        updatedConditions = selectedConditions
          .filter((c) => c !== "None")
          .concat(condition);
      }
    }

    setSelectedConditions(updatedConditions);
    onChange({ existingConditions: updatedConditions });
  };

  const handleAllergyChange = (allergy) => {
    let updatedAllergies;

    if (allergy === "None") {
      updatedAllergies = ["None"];
    } else {
      if (selectedAllergies.includes(allergy)) {
        updatedAllergies = selectedAllergies.filter(
          (a) => a !== allergy && a !== "None",
        );
      } else {
        updatedAllergies = selectedAllergies
          .filter((a) => a !== "None")
          .concat(allergy);
      }
    }

    setSelectedAllergies(updatedAllergies);
    onChange({ allergies: updatedAllergies });
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value === "true" });
  };

  return (
    <div className="card animate-fadeIn">
      <h2 className="text-2xl font-semibold text-neutral-800 mb-6">
        Health Information
      </h2>
      <p className="text-neutral-600 mb-6">
        Understanding your health helps us make safer recommendations for your
        skin.
      </p>

      <div className="mb-6">
        <Typography variant="subtitle1" gutterBottom>
          Do you have any of these skin conditions? (Select all that apply)
        </Typography>

        <FormGroup className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {conditions.map((condition) => (
            <FormControlLabel
              key={condition}
              control={
                <Checkbox
                  checked={selectedConditions.includes(condition)}
                  onChange={() => handleConditionChange(condition)}
                  sx={{
                    color: "#FB6F92",
                    "&.Mui-checked": {
                      color: "#FB6F92",
                    },
                  }}
                />
              }
              label={condition}
            />
          ))}
        </FormGroup>
      </div>

      <div className="mb-6">
        <Typography variant="subtitle1" gutterBottom>
          Do you have any allergies to these ingredients? (Select all that
          apply)
        </Typography>

        <FormGroup className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {allergies.map((allergy) => (
            <FormControlLabel
              key={allergy}
              control={
                <Checkbox
                  checked={selectedAllergies.includes(allergy)}
                  onChange={() => handleAllergyChange(allergy)}
                  sx={{
                    color: "#FB6F92",
                    "&.Mui-checked": {
                      color: "#FB6F92",
                    },
                  }}
                />
              }
              label={allergy}
            />
          ))}
        </FormGroup>
      </div>

      <div className="mb-6">
        <Typography variant="subtitle1" gutterBottom>
          Are you currently taking any medications?
        </Typography>

        <TextField
          name="medications"
          value={data.medications}
          onChange={handleTextChange}
          variant="outlined"
          fullWidth
          multiline
          rows={2}
          placeholder="List any medications that might affect your skin (e.g., Accutane, antibiotics, etc.)"
        />
      </div>

      <div className="mb-6">
        <Typography variant="subtitle1" gutterBottom>
          Do you have regular menstrual cycles?
        </Typography>

        <FormControl component="fieldset">
          <RadioGroup
            name="regularCycle"
            value={data.regularCycle.toString()}
            onChange={handleRadioChange}
          >
            <div className="flex space-x-4">
              <FormControlLabel
                value="true"
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
                label="Yes"
              />
              <FormControlLabel
                value="false"
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
                label="No"
              />
            </div>
          </RadioGroup>
        </FormControl>
      </div>

      <div>
        <Typography variant="subtitle1" gutterBottom>
          Are you currently pregnant or breastfeeding?
        </Typography>

        <FormControl component="fieldset">
          <RadioGroup
            name="pregnant"
            value={data.pregnant.toString()}
            onChange={handleRadioChange}
          >
            <div className="flex space-x-4">
              <FormControlLabel
                value="true"
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
                label="Yes"
              />
              <FormControlLabel
                value="false"
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
                label="No"
              />
            </div>
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default HealthInfoForm;

HealthInfoForm.propTypes = {
  data: PropTypes.shape({
    existingConditions: PropTypes.array,
    allergies: PropTypes.array,
    medications: PropTypes.string,
    regularCycle: PropTypes.bool,
    pregnant: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
