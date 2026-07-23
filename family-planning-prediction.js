// Machine Learning Models for Unmet Need for Family Planning Prediction
// Models simulated for Logistic Regression, Random Forest, LightGBM, and XGBoost

// 1. MODEL PERFORMANCE METRICS
const modelMetrics = {
  lr: {
    name: "Logistic Regression",
    accuracy: 0.812,
    auc: 0.841,
    precision: 0.785,
    recall: 0.761,
    f1: 0.773,
    description: "A baseline statistical model that computes the linear log-odds of unmet need. Good interpretability, but struggles to capture complex non-linear feature interactions."
  },
  rf: {
    name: "Random Forest",
    accuracy: 0.845,
    auc: 0.884,
    precision: 0.821,
    recall: 0.804,
    f1: 0.812,
    description: "An ensemble of decision trees trained on bootstrap samples. Excels at capturing non-linear relations and categorizations without overfitting."
  },
  lgbm: {
    name: "LightGBM",
    accuracy: 0.858,
    auc: 0.902,
    precision: 0.834,
    recall: 0.819,
    f1: 0.826,
    description: "Light Gradient Boosting Machine using leaf-wise growth. Highly efficient, handles categorical variables natively, and captures complex, deep interaction effects."
  },
  xgb: {
    name: "XGBoost",
    accuracy: 0.861,
    auc: 0.910,
    precision: 0.839,
    recall: 0.821,
    f1: 0.830,
    description: "Extreme Gradient Boosting utilizing level-wise tree growth and L1/L2 regularization. Achieves the highest predictive accuracy on tabular demographic data."
  }
};

// 2. FEATURE IMPORTANCE (Normalized to 100 max)
const featureImportances = {
  lr: [
    { feature: "Desire for Children", importance: 38 },
    { feature: "Number of Living Children", importance: 22 },
    { feature: "Wealth Quintile", importance: 15 },
    { feature: "Education Level", importance: 11 },
    { feature: "Age Group", importance: 7 },
    { feature: "Media Exposure", importance: 4 },
    { feature: "Health Facility Visit", importance: 2 },
    { feature: "Residence (Rural/Urban)", importance: 1 }
  ],
  rf: [
    { feature: "Desire for Children", importance: 32 },
    { feature: "Age Group", importance: 18 },
    { feature: "Number of Living Children", importance: 16 },
    { feature: "Wealth Quintile", importance: 13 },
    { feature: "Education Level", importance: 9 },
    { feature: "Media Exposure", importance: 5 },
    { feature: "Health Facility Visit", importance: 4 },
    { feature: "Residence (Rural/Urban)", importance: 3 }
  ],
  lgbm: [
    { feature: "Desire for Children", importance: 29 },
    { feature: "Age Group", importance: 22 },
    { feature: "Wealth Quintile", importance: 15 },
    { feature: "Number of Living Children", importance: 14 },
    { feature: "Education Level", importance: 10 },
    { feature: "Media Exposure", importance: 4 },
    { feature: "Health Facility Visit", importance: 3 },
    { feature: "Residence (Rural/Urban)", importance: 3 }
  ],
  xgb: [
    { feature: "Desire for Children", importance: 30 },
    { feature: "Age Group", importance: 20 },
    { feature: "Number of Living Children", importance: 16 },
    { feature: "Wealth Quintile", importance: 14 },
    { feature: "Education Level", importance: 11 },
    { feature: "Media Exposure", importance: 4 },
    { feature: "Health Facility Visit", importance: 3 },
    { feature: "Residence (Rural/Urban)", importance: 2 }
  ]
};

// 3. LOGISTIC REGRESSION PARAMETERS
const lrWeights = {
  intercept: -0.65,
  age: { // index 0-6 corresponding to 15-49
    0: 0.45,  // 15-19
    1: 0.35,  // 20-24
    2: 0.15,  // 25-29
    3: -0.05, // 30-34
    4: -0.20, // 35-39
    5: -0.35, // 40-44
    6: -0.55  // 45-49
  },
  education: { // 0: None, 1: Primary, 2: Secondary, 3: Higher
    0: 0.35,
    1: 0.15,
    2: -0.10,
    3: -0.40
  },
  wealth: { // 0: Poorest, 1: Poorer, 2: Middle, 3: Richer, 4: Richest
    0: 0.50,
    1: 0.25,
    2: 0.00,
    3: -0.20,
    4: -0.55
  },
  residence: { // 0: Urban, 1: Rural
    0: -0.20,
    1: 0.20
  },
  children: { // 0 to 4+
    0: -0.75,
    1: 0.10,
    2: 0.30,
    3: 0.45,
    4: 0.65
  },
  media: { // 0: No, 1: Yes
    0: 0.25,
    1: -0.25
  },
  facility: { // 0: No, 1: Yes
    0: 0.15,
    1: -0.15
  },
  desire: { // 0: Wants soon, 1: Wants later (2+ yrs), 2: No more/Undecided
    0: -1.30,
    1: 0.90,
    2: 1.15
  }
};

// 4. RANDOM FOREST TREES (Simulated paths returning probabilities)
function predictRandomForest(inputs) {
  // We average results from 5 diverse decision trees
  let votes = [];

  // Tree 1: Focuses on Desire and Parity
  if (inputs.desire === 0) {
    votes.push(0.08);
  } else {
    if (inputs.children === 0) {
      votes.push(0.25);
    } else {
      votes.push(inputs.wealth <= 1 ? 0.88 : 0.62);
    }
  }

  // Tree 2: Focuses on Age and Desire
  if (inputs.desire === 0) {
    votes.push(inputs.age <= 1 ? 0.18 : 0.04);
  } else if (inputs.desire === 1) {
    votes.push(inputs.age <= 2 ? 0.82 : 0.54); // Spacing desired by younger women
  } else {
    votes.push(inputs.age >= 3 ? 0.85 : 0.48); // Limiting desired by older women
  }

  // Tree 3: Focuses on Education, Residence, and Wealth
  if (inputs.wealth <= 1) {
    votes.push(inputs.residence === 1 ? 0.78 : 0.60);
  } else {
    votes.push(inputs.education >= 2 ? 0.32 : 0.49);
  }

  // Tree 4: Focuses on Media Exposure and Desire
  if (inputs.desire >= 1) {
    votes.push(inputs.media === 0 ? 0.79 : 0.58);
  } else {
    votes.push(0.05);
  }

  // Tree 5: Focuses on Parity and Facility Visits
  if (inputs.children >= 2) {
    votes.push(inputs.facility === 0 ? 0.74 : 0.52);
  } else {
    votes.push(inputs.desire === 1 ? 0.65 : 0.20);
  }

  // Average prediction
  return votes.reduce((a, b) => a + b, 0) / votes.length;
}

// 5. LIGHTGBM ENSEMBLE (Simulated sequential leaf-wise updates)
function predictLightGBM(inputs) {
  // LightGBM starts with base log-odds of about -0.5
  let logOdds = -0.52;

  // Tree 1: Split on Desire
  logOdds += (inputs.desire === 0) ? -1.15 : 0.75;

  // Tree 2: Split on Living Children (Parity)
  if (inputs.children === 0) {
    logOdds -= 0.60;
  } else if (inputs.children >= 3) {
    logOdds += 0.45;
  }

  // Tree 3: Split on Wealth index
  if (inputs.wealth <= 1) {
    logOdds += 0.38; // Poorer increases risk
  } else if (inputs.wealth >= 3) {
    logOdds -= 0.42; // Wealthier decreases risk
  }

  // Tree 4: Split on Age and Desire Interaction
  if (inputs.desire === 1 && inputs.age <= 2) {
    logOdds += 0.35; // Young + spacing = higher risk
  } else if (inputs.desire === 2 && inputs.age >= 4) {
    logOdds += 0.40; // Older + limiting = higher risk
  }

  // Tree 5: Residence and Education
  if (inputs.residence === 1 && inputs.education <= 1) {
    logOdds += 0.28;
  } else {
    logOdds -= 0.15;
  }

  // Sigmoid linkage
  return 1 / (1 + Math.exp(-logOdds));
}

// 6. XGBOOST ENSEMBLE (Simulated depth-wise sequential updates)
function predictXGBoost(inputs) {
  // XGBoost starts with base score log-odds of about -0.6
  let logOdds = -0.58;

  // Tree 1: Primary split on Desire
  if (inputs.desire === 0) {
    logOdds -= 1.25;
  } else {
    logOdds += 0.80;
  }

  // Tree 2: Split on living children
  if (inputs.children === 0) {
    logOdds -= 0.55;
  } else {
    logOdds += (inputs.children - 2) * 0.18;
  }

  // Tree 3: Education and Wealth interaction
  if (inputs.education === 0 && inputs.wealth <= 1) {
    logOdds += 0.48;
  } else if (inputs.education >= 2 && inputs.wealth >= 3) {
    logOdds -= 0.40;
  }

  // Tree 4: Media exposure and residence
  if (inputs.media === 0) {
    logOdds += 0.22;
  } else {
    logOdds -= 0.18;
  }

  // Tree 5: Age group specific splits
  if (inputs.age <= 1) { // 15-24
    logOdds += (inputs.desire === 1) ? 0.30 : -0.10;
  } else if (inputs.age >= 5) { // 40-49
    logOdds += (inputs.desire === 2) ? 0.35 : -0.30;
  }

  // Sigmoid linkage
  return 1 / (1 + Math.exp(-logOdds));
}

// 7. DRIVERS EXPLAINER ENGINE
function getRiskDrivers(inputs, prob) {
  let drivers = [];

  // Desire for kids is the strongest driver
  if (inputs.desire === 0) {
    drivers.push({ text: "Desires another child within 2 years, which strongly aligns contraceptive non-use with actual pregnancy planning (lowering unmet need risk).", positive: true });
  } else if (inputs.desire === 1) {
    drivers.push({ text: "Desires to delay childbearing by 2+ years (spacing), generating a direct need for temporary contraception.", positive: false });
  } else if (inputs.desire === 2) {
    drivers.push({ text: "Desires no more children (limiting), indicating a critical need for long-term or permanent contraceptive methods.", positive: false });
  }

  // Parity / Children
  if (inputs.children >= 3) {
    drivers.push({ text: `High family size (living children: ${inputs.children}) heightens the urgency to limit family growth.`, positive: false });
  } else if (inputs.children === 0) {
    drivers.push({ text: "Has no living children, which naturally aligns with plans to begin childbearing shortly.", positive: true });
  }

  // Socio-economic vulnerabilities
  if (inputs.wealth <= 1) {
    const label = inputs.wealth === 0 ? "Poorest" : "Poorer";
    drivers.push({ text: `Falls within the '${label}' wealth quintile, indicating potential economic and physical barriers in acquiring family planning resources.`, positive: false });
  } else if (inputs.wealth === 4) {
    drivers.push({ text: "Belongs to the 'Richest' wealth quintile, which is strongly associated with higher disposable income, better access to services, and choices.", positive: true });
  }

  // Education barrier
  if (inputs.education === 0) {
    drivers.push({ text: "No formal school education, which is statistically linked to lower awareness of contraceptive methods and limited health literacy.", positive: false });
  } else if (inputs.education === 3) {
    drivers.push({ text: "Completed higher education, boosting agency in reproductive choices and knowledge of spacing/limiting benefits.", positive: true });
  }

  // Rural access
  if (inputs.residence === 1) {
    drivers.push({ text: "Resides in a rural area, where supply chains, clinic accessibility, and geographical distance restrict access to modern contraceptives.", positive: false });
  }

  // Media and health facilities interaction
  if (inputs.media === 0) {
    drivers.push({ text: "No exposure to family planning messages via radio, TV, or digital media, hindering public health education uptake.", positive: false });
  }
  if (inputs.facility === 0 && inputs.desire !== 0) {
    drivers.push({ text: "Has not visited a health center or received home outreach in the past year, missing vital counseling touchpoints.", positive: false });
  }

  // Sort: show negative drivers first for high risk, positive first for low risk
  if (prob >= 0.50) {
    drivers.sort((a, b) => a.positive - b.positive);
  } else {
    drivers.sort((a, b) => b.positive - a.positive);
  }

  // Return top 3 explanations
  return drivers.slice(0, 3);
}

// 8. MASTER PREDICT CONTROLLER
function predictUnmetNeed(modelName, inputs) {
  let probability = 0;

  // Run selected model logic
  switch (modelName) {
    case "lr":
      // Logistic Regression calculation
      let z = lrWeights.intercept;
      z += lrWeights.age[inputs.age];
      z += lrWeights.education[inputs.education];
      z += lrWeights.wealth[inputs.wealth];
      z += lrWeights.residence[inputs.residence];
      z += lrWeights.children[inputs.children];
      z += lrWeights.media[inputs.media];
      z += lrWeights.facility[inputs.facility];
      z += lrWeights.desire[inputs.desire];
      probability = 1 / (1 + Math.exp(-z));
      break;

    case "rf":
      probability = predictRandomForest(inputs);
      break;

    case "lgbm":
      probability = predictLightGBM(inputs);
      break;

    case "xgb":
      probability = predictXGBoost(inputs);
      break;

    default:
      probability = predictLightGBM(inputs);
      break;
  }

  // Classify unmet need
  let classification = "No Unmet Need";
  if (probability >= 0.50) {
    if (inputs.desire === 1) {
      classification = "Unmet Need (Spacing)";
    } else if (inputs.desire === 2) {
      classification = "Unmet Need (Limiting)";
    } else {
      // In case desire is set to "wants soon" but probability crosses 0.5 due to edge weights
      classification = "Unmet Need (Spacing)";
    }
  }

  const drivers = getRiskDrivers(inputs, probability);

  return {
    probability: probability,
    classification: classification,
    drivers: drivers
  };
}
