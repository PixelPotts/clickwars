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
    cost: {
      crystal: 60
    },
    consumes: {
      twinkies: 1
    },
    produces: {
      crystal: 1
    }
  },
  hunters: {
    name: "Twinkie Hunters",
    description: "Search & Destroy",
    cost: {
      crystal: 250
    },
    consumes: {
      twinkies: 1
    },
    produces: {
      twinkies: 2
    }
  },
  marines: {
    name: "Marines",
    description: "The first to die, with distinction",
    cost: {
      crystal: 30,
      xenon: 25
    },
    consumes: {
      twinkies: 1
    }
  },
  terminators: {
    name: "T-1000s",
    description: "Urgent advancement to chopper requested.",
    cost: {
      crystal: 500
    },
    consumes: {
      twinkies: 1
    }
  },
  tanks: {
    name: "Tanks",
    description: "Area damage, slow.",
    cost: {
      crystal: 500
    },
    consumes: {
      twinkies: 1.25
    }
  },
  millers: {
    name: "Matt Millers",
    description: "A.I. Researcher.",
    cost: {
      crystal: 900,
      xenon: 300
    },
    consumes: {
      twinkies: 2
    }
  }
};

var Buildings = {
  depots: {
    name: "Supply Depot",
    description: "Supports <strong class='badge'>+10</strong> units",
    size: 3, // square meters
    cost: {
      crystal: 80
    },
    visibility: 1
  },
  barracks: {
    name: "Barracks",
    description: "Supports <strong class='badge'>+10</strong> units",
    size: 3, // square meters
    cost: {
      crystal: 80
    },
    visibility: 1
  },
  researchFacility: {
    name: "Research Facility",
    description: "Supports <strong class='badge'>+10</strong> units",
    size: 3, // square meters
    cost: {
      crystal: 1200
    },
    visibility: 0,
    prerequisites: [
      'math', 'science'
    ]
  }
};