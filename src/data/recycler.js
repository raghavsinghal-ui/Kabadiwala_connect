export const recyclers = [
  {
    id: 1,
    name: "GreenCycle Recycling",
    location: "Sector 9",
    distance: 2.4,
    phone: "9876543210",
    materials: ["Copper", "Aluminium", "PCB", "E-Waste"],
    pricePerKg: {
      Copper: 620,
      Aluminium: 180,
      PCB: 420,
      "E-Waste": 110,
    },
    verified: true,
    pickup: true,
  },

  {
    id: 2,
    name: "EcoMetal Solutions",
    location: "Industrial Area",
    distance: 4.1,
    phone: "9812345678",
    materials: ["Copper", "Aluminium", "E-Waste"],
    pricePerKg: {
      Copper: 590,
      Aluminium: 175,
      "E-Waste": 105,
    },
    verified: true,
    pickup: false,
  },

  {
    id: 3,
    name: "Smart Scrap Recyclers",
    location: "Model Town",
    distance: 5.7,
    phone: "9898989898",
    materials: ["PCB", "E-Waste", "Copper"],
    pricePerKg: {
      PCB: 450,
      "E-Waste": 120,
      Copper: 610,
    },
    verified: true,
    pickup: true,
  },

  {
    id: 4,
    name: "Urban E-Waste Hub",
    location: "GT Road",
    distance: 7.2,
    phone: "9765432109",
    materials: ["E-Waste", "PCB", "Aluminium"],
    pricePerKg: {
      "E-Waste": 115,
      PCB: 430,
      Aluminium: 170,
    },
    verified: true,
    pickup: true,
  },
];