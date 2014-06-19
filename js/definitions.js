var Resources = {
  crystal: {
    name: "Crystal",
    description: "A transparent stone",
    increment: 8,
    critical: 0
  },
  xenon: {
    name: "Xenon",
    description: "A noble gas",
    increment: 3,
    critical: 0
  },
  twinkies: {
    name: "Twinkies",
    description: "A spongy treat",
    increment: 1,
    critical: 1
  }
};

var Units = {
  miners: {
    name: "Miners",
    description: "Simple human laborer",
    resourceCost: {
      crystal: 60
    },
    rechargeCost: {
      twinkies: 1
    },
    minesFor: "crystal",
    mineIncrement: 1
  },
  twinkieHunters: {
    name: "Twinkie Hunters",
    description: "Search & Destroy",
    resourceCost: {
      crystal: 250
    },
    rechargeCost: {
      twinkies: 1
    },
    minesFor: "twinkies",
    mineIncrement: 2
  },
  marines: {
    name: "Marines",
    description: "The first to die, with distinction",
    resourceCost: {
      crystal: 30,
      xenon: 25
    },
    rechargeCost: {
      twinkies: 1
    }
  },
  t1000s: {
    name: "T-1000s",
    description: "Urgent advancement to chopper requested.",
    resourceCost: {
      crystal: 500
    },
    rechargeCost: {
      twinkies: 1
    }
  },
  tanks: {
    name: "Tanks",
    description: "Area damage, slow.",
    resourceCost: {
      crystal: 500
    },
    rechargeCost: {
      twinkies: 1.25
    }
  },
  millers: {
    name: "Matt Millers",
    description: "A.I. Researcher.",
    resourceCost: {
      crystal: 900,
      xenon: 300
    },
    rechargeCost: {
      twinkies: 2
    }
  }
};

var Buildings = {
  depots: {
    name: "Supply Depot",
    description: "Supports <strong class='badge'>+10</strong> units",
    size: 3, // square meters
    resourceCost: {
      crystal: 80
    },
    visibility: 1
  },
  barracks: {
    name: "Barracks",
    description: "Supports <strong class='badge'>+10</strong> units",
    size: 3, // square meters
    resourceCost: {
      crystal: 80
    },
    visibility: 1
  },
  researchFacility: {
    name: "Research Facility",
    description: "Supports <strong class='badge'>+10</strong> units",
    size: 3, // square meters
    resourceCost: {
      crystal: 1200
    },
    visibility: 0,
    researchPreReqs: [
      'math', 'science'
    ]
  }

};