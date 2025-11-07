import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageCircle, Package, Shield, Truck } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  brand: string;
  mrp: number;
  offerPrice?: number;
  offerPercentage?: number;
  uom: string;
  description?: string;
  features?: string[];
  usage?: string;
}

const allProducts: Product[] = [
  {
    id: 1,
    name: "Zodia",
    category: "Pesticides",
    image: "/products/zodia.jpg",
    brand: "Syngenta",
    mrp: 1200,
    offerPrice: 1020,
    offerPercentage: 15,
    uom: "1 Liter",
    description: "Zodia is a highly effective insecticide for controlling various pests in crops.",
    features: ["Quick action formula", "Long-lasting protection", "Safe for beneficial insects"],
    usage: "Apply as foliar spray at recommended dosage during pest infestation."
  },
  {
    id: 2,
    name: "Shooter-50",
    category: "Pesticides",
    image: "/products/shooter-50.jpg",
    brand: "UPL",
    mrp: 450,
    offerPrice: 380,
    offerPercentage: 15,
    uom: "500ml",
    description: "Shooter-50 provides excellent control of sucking pests and mites.",
    features: ["Broad spectrum activity", "Systemic action", "Rain-fast formula"],
    usage: "Mix with water and spray uniformly on affected crops."
  },
  {
    id: 3,
    name: "ROTO-S",
    category: "Pesticides",
    image: "/products/roto-s.jpg",
    brand: "Bayer",
    mrp: 520,
    uom: "500ml",
    description: "ROTO-S is a powerful fungicide for disease management in various crops.",
    features: ["Preventive and curative action", "Wide spectrum fungicide", "Excellent crop safety"],
    usage: "Apply at disease onset or as preventive measure at recommended intervals."
  },
  {
    id: 4,
    name: "Alpha",
    category: "Fertilizers",
    image: "/products/alpha.jpg",
    brand: "Coromandel",
    mrp: 890,
    offerPrice: 800,
    offerPercentage: 10,
    uom: "1 Liter",
    description: "Alpha is a premium liquid fertilizer for enhanced plant growth and productivity.",
    features: ["Complete nutrient solution", "Quick absorption", "Improves yield quality"],
    usage: "Apply through drip irrigation or foliar spray as per crop requirements."
  },
  {
    id: 5,
    name: "Hadar",
    category: "Pesticides",
    image: "/products/hadar.jpg",
    brand: "Crystal",
    mrp: 380,
    uom: "250ml",
    description: "Hadar provides effective control of lepidopteran pests in field crops.",
    features: ["Contact and stomach action", "Low toxicity", "Environment friendly"],
    usage: "Spray on crop foliage when pests are observed."
  },
  {
    id: 6,
    name: "Nor-Ko-T3",
    category: "Pesticides",
    image: "/products/nor-ko-t3.jpg",
    brand: "Dhanuka",
    mrp: 650,
    offerPrice: 585,
    offerPercentage: 10,
    uom: "500ml",
    description: "Nor-Ko-T3 is a triple action insecticide for comprehensive pest control.",
    features: ["Multi-mode of action", "Extended protection", "Reduces resistance buildup"],
    usage: "Use as per recommended dosage for specific crops and pests."
  },
  {
    id: 7,
    name: "Hungama Gold",
    category: "Pesticides",
    image: "/products/hungama-gold.jpg",
    brand: "Iffco",
    mrp: 1150,
    offerPrice: 1035,
    offerPercentage: 10,
    uom: "1 Liter",
    description: "Hungama Gold offers superior weed control in various crops.",
    features: ["Selective herbicide", "Post-emergence application", "Non-toxic to crops"],
    usage: "Apply after weed emergence as directed on label."
  },
  {
    id: 8,
    name: "Cyper-25",
    category: "Pesticides",
    image: "/products/cyper-25.jpg",
    brand: "Gharda",
    mrp: 420,
    uom: "500ml",
    description: "Cyper-25 is an effective pyrethroid insecticide for pest management.",
    features: ["Fast knockdown effect", "Broad-spectrum control", "Cost-effective solution"],
    usage: "Dilute and spray on affected crops during pest attack."
  },
  {
    id: 9,
    name: "Sun Quit",
    category: "Pesticides",
    image: "/products/sun-quit.jpg",
    brand: "PI Industries",
    mrp: 340,
    offerPrice: 290,
    offerPercentage: 15,
    uom: "250ml",
    description: "Sun Quit provides excellent control of sucking pests and whiteflies.",
    features: ["Systemic and translaminar movement", "Long duration control", "Safe for pollinators"],
    usage: "Apply as foliar spray at recommended concentration."
  },
  {
    id: 10,
    name: "Minister",
    category: "Fertilizers",
    image: "/products/minister.jpg",
    brand: "Rallis",
    mrp: 980,
    uom: "1 Liter",
    description: "Minister is a balanced liquid fertilizer for all-round crop nutrition.",
    features: ["NPK with micronutrients", "Enhances flowering and fruiting", "Improves stress tolerance"],
    usage: "Apply through soil drench or foliar application as needed."
  },
  {
    id: 11,
    name: "Heera",
    category: "Pesticides",
    image: "/products/heera.jpg",
    brand: "Insecticides India",
    mrp: 480,
    offerPrice: 432,
    offerPercentage: 10,
    uom: "500ml",
    description: "Heera is a premium insecticide for control of bollworms and caterpillars.",
    features: ["Novel mode of action", "Rapid pest control", "Minimal environmental impact"],
    usage: "Spray uniformly on crop canopy at early pest stages."
  },
  {
    id: 12,
    name: "Mantra",
    category: "Fertilizers",
    image: "/products/mantra.jpg",
    brand: "Nagarjuna",
    mrp: 850,
    uom: "1 Liter",
    description: "Mantra is an organic-based fertilizer for sustainable crop production.",
    features: ["Organic nutrients", "Improves soil health", "Eco-friendly formulation"],
    usage: "Apply regularly during crop growth stages for best results."
  },
  {
    id: 13,
    name: "Yodha",
    category: "Pesticides",
    image: "/products/yodha.jpg",
    brand: "Anshul",
    mrp: 550,
    offerPrice: 495,
    offerPercentage: 10,
    uom: "500ml",
    description: "Yodha provides robust protection against fungal diseases.",
    features: ["Dual mode of action", "Preventive and curative", "Rain-stable formulation"],
    usage: "Apply at disease appearance or as preventive measure."
  },
  {
    id: 14,
    name: "Fatafat",
    category: "Pesticides",
    image: "/products/fatafat.jpg",
    brand: "Sharda",
    mrp: 310,
    offerPrice: 279,
    offerPercentage: 10,
    uom: "250ml",
    description: "Fatafat offers quick action against a wide range of insect pests.",
    features: ["Instant knockdown", "Contact insecticide", "Economical solution"],
    usage: "Spray directly on pests for immediate control."
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = allProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button onClick={() => navigate("/products")}>
              Back to Products
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleWhatsAppEnquiry = () => {
    const message = `Hi, I'm interested in ${product.name} (${product.brand}) - ${product.uom}`;
    const whatsappUrl = `https://wa.me/918532948658?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        <Button
          variant="ghost"
          onClick={() => navigate("/products")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[500px] object-cover"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <Badge className="mb-3">{product.brand}</Badge>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.category}</p>
            </div>

            <div className="flex items-baseline gap-3">
              {product.offerPrice ? (
                <>
                  <span className="text-3xl font-bold text-primary">
                    ₹{product.offerPrice}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.mrp}
                  </span>
                  <Badge variant="destructive">
                    {product.offerPercentage}% OFF
                  </Badge>
                </>
              ) : (
                <span className="text-3xl font-bold">₹{product.mrp}</span>
              )}
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Package className="h-5 w-5" />
              <span>{product.uom}</span>
            </div>

            <Card>
              <CardContent className="p-6">
                <p className="text-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            <Button
              onClick={handleWhatsAppEnquiry}
              className="w-full"
              size="lg"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Enquiry
            </Button>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-semibold">Genuine Products</p>
                    <p className="text-sm text-muted-foreground">100% Authentic</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Truck className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-semibold">Fast Delivery</p>
                    <p className="text-sm text-muted-foreground">Quick Service</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.features && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {product.usage && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Usage Instructions</h2>
                <p className="text-foreground leading-relaxed">{product.usage}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
