var Resources = {
  Crystal: {
    name: "Crystal",
    description: "A transparent stone",
    increment: 8,
    critical: 0
  },
  Xenon: {
    name: "Xenon",
    description: "A noble gas",
    increment: 3,
    critical: 0
  },
  Twinkies: {
    name: "Twinkies",
    description: "A spongy treat",
    increment: 1,
    critical: 1
  }
};

var Units = {
  Miners: {
    name: "Miners",
    description: "Simple human laborer",
    resourceCost: {
      'Crystal': 60
    },
    rechargeCost: {
      'Twinkies': 0.125
    }
  },
  Marines: {
    name: "Marines",
    description: "The first to die, with distinction",
    resourceCost: {
      'Crystal': 30,
      'Xenon': 25
    },
    rechargeCost: {
      'Twinkies': 0.25
    }
  },
  'T-1000s': {
    name: "T-1000s",
    description: "Urgent advancement to chopper requested.",
    resourceCost: {
      'Crystal': 500
    },
    rechargeCost: {
      'Twinkies': 0.25
    }
  },
  Tanks: {
    name: "Tanks",
    description: "Area damage, slow.",
    resourceCost: {
      'Crystal': 500
    },
    rechargeCost: {
      'Twinkies': 1.25
    }
  },
  'Matt Millers': {
    name: "Matt Millers",
    description: "A.I. Researcher.",
    resourceCost: {
      'Crystal': 900,
      'Xenon': 300
    },
    rechargeCost: {
      'Twinkies': 2
    }
  }
};

var Buildings = {
  'Supply Depot': {
    name: "Supply Depot",
    description: "Supports <strong class='badge'>+10</strong> units",
    size: 3, // square meters
    resourceCost: {
      'Crystal': 80
    },
    visibility: 1
  },
  'Barracks': {
    name: "Barracks",
    description: "Supports <strong class='badge'>+10</strong> units",
    size: 3, // square meters
    resourceCost: {
      'Crystal': 80
    },
    visibility: 1
  },
  'Research Facility': {
    name: "Research Facility",
    description: "Supports <strong class='badge'>+10</strong> units",
    size: 3, // square meters
    resourceCost: {
      'Crystal': 1200
    },
    visibility: 0,
    researchPreReqs: [
      'Math', 'Science'
    ]
  }

};