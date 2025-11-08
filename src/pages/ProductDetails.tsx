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
    name: "AYAKA",
    category: "Insecticides",
    image: "/products/ayaka.png",
    brand: "JU Agri Sciences",
    mrp: 1450,
    offerPrice: 1305,
    offerPercentage: 10,
    uom: "1 Liter",
    description: "AYAKA is a powerful broad-spectrum insecticide for effective control of major pests in various crops.",
    features: ["Broad-spectrum control", "Long-lasting protection", "Quick action formula"],
    usage: "Apply as foliar spray at recommended dosage during pest infestation."
  },
  {
    id: 2,
    name: "JU Ultra",
    category: "Insecticides",
    image: "/products/ju-ultra.png",
    brand: "JU Agri Sciences",
    mrp: 1350,
    offerPrice: 1215,
    offerPercentage: 10,
    uom: "1 Liter",
    description: "JU Ultra provides superior pest control with advanced formulation for challenging infestations.",
    features: ["Advanced formulation", "Effective against resistant pests", "Safe for crops"],
    usage: "Mix with water and spray uniformly on affected crops."
  },
  {
    id: 3,
    name: "TAOSU",
    category: "Insecticides",
    image: "/products/taosu.png",
    brand: "JU Agri Sciences",
    mrp: 1280,
    offerPrice: 1152,
    offerPercentage: 10,
    uom: "1 Liter",
    description: "TAOSU is a highly effective insecticide for controlling sucking and chewing pests.",
    features: ["Dual action mode", "Systemic and contact activity", "Extended protection"],
    usage: "Apply at early pest stages for best results."
  },
  {
    id: 4,
    name: "Turban",
    category: "Insecticides",
    image: "/products/turban.png",
    brand: "JU Agri Sciences",
    mrp: 980,
    offerPrice: 882,
    offerPercentage: 10,
    uom: "500ml",
    description: "Turban offers excellent control of lepidopteran pests and caterpillars in field crops.",
    features: ["Selective action", "Minimal impact on beneficial insects", "Rain-fast formula"],
    usage: "Spray on crop foliage when pests are observed."
  },
  {
    id: 5,
    name: "JU-Farrera",
    category: "Insecticides",
    image: "/products/ju-farrera.png",
    brand: "JU Agri Sciences",
    mrp: 1150,
    uom: "1 Liter",
    description: "JU-Farrera provides comprehensive protection against various insect pests.",
    features: ["Multi-pest control", "Long residual activity", "Excellent crop safety"],
    usage: "Use as per recommended dosage for specific crops and pests."
  },
  {
    id: 6,
    name: "JU-Decigen",
    category: "Insecticides",
    image: "/products/ju-decigen.png",
    brand: "JU Agri Sciences",
    mrp: 1420,
    offerPrice: 1278,
    offerPercentage: 10,
    uom: "1 Liter",
    description: "JU-Decigen is a premium insecticide with novel mode of action for superior pest management.",
    features: ["Novel chemistry", "Prevents resistance buildup", "Effective at low doses"],
    usage: "Apply at pest appearance or as preventive measure."
  },
  {
    id: 7,
    name: "JU Hemp",
    category: "Insecticides",
    image: "/products/ju-hemp.png",
    brand: "JU Agri Sciences",
    mrp: 890,
    uom: "500ml",
    description: "JU Hemp provides natural pest control with organic-based formulation.",
    features: ["Organic ingredients", "Eco-friendly solution", "Safe for pollinators"],
    usage: "Dilute and spray on affected crops regularly."
  },
  {
    id: 8,
    name: "Kilron",
    category: "Insecticides",
    image: "/products/kilron.png",
    brand: "JU Agri Sciences",
    mrp: 750,
    offerPrice: 675,
    offerPercentage: 10,
    uom: "500ml",
    description: "Kilron offers quick knockdown and residual control of major insect pests.",
    features: ["Fast knockdown effect", "Broad-spectrum activity", "Cost-effective solution"],
    usage: "Spray directly on pests and affected plant parts."
  },
  {
    id: 9,
    name: "Tridev",
    category: "Insecticides",
    image: "/products/tridev.png",
    brand: "JU Agri Sciences",
    mrp: 1100,
    uom: "1 Liter",
    description: "Tridev is a three-way action insecticide for comprehensive pest management.",
    features: ["Triple action formula", "Controls multiple pest species", "Long-lasting protection"],
    usage: "Apply at recommended intervals for continuous protection."
  },
  {
    id: 10,
    name: "E-MATE",
    category: "Insecticides",
    image: "/products/e-mate.png",
    brand: "JU Agri Sciences",
    mrp: 580,
    offerPrice: 522,
    offerPercentage: 10,
    uom: "500ml",
    description: "E-MATE provides effective control of sucking pests and whiteflies.",
    features: ["Systemic movement", "Translaminar activity", "Extended pest control"],
    usage: "Apply as foliar spray at recommended concentration."
  },
  {
    id: 11,
    name: "ELECT SP",
    category: "Insecticides",
    image: "/products/elect-sp.png",
    brand: "JU Agri Sciences",
    mrp: 1320,
    offerPrice: 1188,
    offerPercentage: 10,
    uom: "1 Liter",
    description: "ELECT SP is a premium combination insecticide for broad-spectrum pest control.",
    features: ["Combination product", "Synergistic action", "Effective against resistant pests"],
    usage: "Use as per crop-specific recommendations."
  },
  {
    id: 12,
    name: "JU-PLANO",
    category: "Fungicides",
    image: "/products/ju-plano.png",
    brand: "JU Agri Sciences",
    mrp: 950,
    uom: "500ml",
    description: "JU-PLANO is a powerful fungicide for disease management in various crops.",
    features: ["Preventive and curative action", "Broad-spectrum fungicide", "Excellent crop safety"],
    usage: "Apply at disease onset or as preventive measure."
  },
  {
    id: 13,
    name: "JU-MANTRA SUPER",
    category: "Fungicides",
    image: "/products/ju-mantra-super.png",
    brand: "JU Agri Sciences",
    mrp: 1250,
    offerPrice: 1125,
    offerPercentage: 10,
    uom: "1 Liter",
    description: "JU-MANTRA SUPER provides superior fungal disease control with advanced formulation.",
    features: ["Advanced systemic fungicide", "Long-lasting protection", "Rain-stable formulation"],
    usage: "Apply at recommended intervals during disease-prone periods."
  },
  {
    id: 14,
    name: "NOVAZIDE",
    category: "Insecticides",
    image: "/products/novazide.png",
    brand: "JU Agri Sciences",
    mrp: 820,
    uom: "500ml",
    description: "NOVAZIDE offers novel chemistry for effective control of various insect pests.",
    features: ["Novel mode of action", "Prevents resistance development", "Safe formulation"],
    usage: "Spray uniformly on crop canopy at early pest stages."
  },
  {
    id: 15,
    name: "MINISTER",
    category: "Fertilizers",
    image: "/products/minister.png",
    brand: "JU Agri Sciences",
    mrp: 680,
    offerPrice: 612,
    offerPercentage: 10,
    uom: "1 Liter",
    description: "MINISTER is a balanced liquid fertilizer for all-round crop nutrition and growth.",
    features: ["Complete nutrient solution", "Improves flowering and fruiting", "Enhances stress tolerance"],
    usage: "Apply through soil drench or foliar application as needed."
  },
  {
    id: 16,
    name: "CARTAP GR",
    category: "Insecticides",
    image: "/products/cartap-gr.png",
    brand: "JU Agri Sciences",
    mrp: 490,
    uom: "1 Kg",
    description: "CARTAP GR is a granular insecticide for soil application and stem borer control.",
    features: ["Granular formulation", "Systemic action", "Controls stem borers and leaf folders"],
    usage: "Apply in soil or water during transplanting or at pest appearance."
  },
  {
    id: 17,
    name: "FIPRONIL GR",
    category: "Insecticides",
    image: "/products/fipronil-gr.png",
    brand: "JU Agri Sciences",
    mrp: 550,
    offerPrice: 495,
    offerPercentage: 10,
    uom: "1 Kg",
    description: "FIPRONIL GR provides effective control of soil and foliar pests in rice and other crops.",
    features: ["Granular application", "Long-lasting protection", "Controls multiple pests"],
    usage: "Broadcast in standing water or apply at soil surface."
  },
  {
    id: 18,
    name: "TRILOK",
    category: "Insecticides",
    image: "/products/trilok.png",
    brand: "JU Agri Sciences",
    mrp: 1180,
    offerPrice: 1062,
    offerPercentage: 10,
    uom: "1 Liter",
    description: "TRILOK offers triple action pest control with combined active ingredients.",
    features: ["Three-way action", "Broad pest spectrum", "Extended protection period"],
    usage: "Apply at pest appearance for comprehensive control."
  },
  {
    id: 19,
    name: "XYLO GREEN",
    category: "Insecticides",
    image: "/products/xylo-green.png",
    brand: "JU Agri Sciences",
    mrp: 920,
    uom: "500ml",
    description: "XYLO GREEN is an eco-friendly insecticide for sustainable pest management.",
    features: ["Environment-friendly", "Low toxicity", "Safe for beneficial insects"],
    usage: "Spray on crop foliage as per pest infestation level."
  },
  {
    id: 20,
    name: "ZERO MITE",
    category: "Insecticides",
    image: "/products/zero-mite.png",
    brand: "JU Agri Sciences",
    mrp: 780,
    offerPrice: 702,
    offerPercentage: 10,
    uom: "500ml",
    description: "ZERO MITE provides specialized control of mites and spider mites in various crops.",
    features: ["Specialized miticide", "Quick action on mites", "Safe for plants"],
    usage: "Apply when mite population is observed on leaves."
  },
  {
    id: 21,
    name: "MAHAKAL",
    category: "Insecticides",
    image: "/products/mahakal.png",
    brand: "JU Agri Sciences",
    mrp: 1380,
    offerPrice: 1242,
    offerPercentage: 10,
    uom: "1 Liter",
    description: "MAHAKAL is a powerful insecticide for control of major lepidopteran pests.",
    features: ["High efficacy", "Rapid pest control", "Long residual activity"],
    usage: "Spray uniformly on affected crops at recommended dosage."
  },
  {
    id: 22,
    name: "THIOLA",
    category: "Fungicides",
    image: "/products/thiola.png",
    brand: "JU Agri Sciences",
    mrp: 850,
    uom: "500ml",
    description: "THIOLA is a contact fungicide for prevention and control of fungal diseases.",
    features: ["Contact action", "Multi-site activity", "Prevents resistance"],
    usage: "Apply at first sign of disease or as preventive spray."
  },
  {
    id: 23,
    name: "LAMBDA CS",
    category: "Insecticides",
    image: "/products/lambda-cs.png",
    brand: "JU Agri Sciences",
    mrp: 620,
    offerPrice: 558,
    offerPercentage: 10,
    uom: "500ml",
    description: "LAMBDA CS offers quick knockdown and residual control of various pests.",
    features: ["Fast knockdown", "Capsule suspension formulation", "Extended protection"],
    usage: "Dilute and spray on affected crops during pest attack."
  },
  {
    id: 24,
    name: "MANTRA FS",
    category: "Insecticides",
    image: "/products/mantra-fs.png",
    brand: "JU Agri Sciences",
    mrp: 540,
    uom: "500ml",
    description: "MANTRA FS is a seed treatment insecticide for protection against soil and early-season pests.",
    features: ["Seed treatment formulation", "Protects seedlings", "Easy to apply"],
    usage: "Mix with seeds before sowing as per recommended dosage."
  },
  {
    id: 25,
    name: "JU-CLAIM",
    category: "Insecticides",
    image: "/products/ju-claim.png",
    brand: "JU Agri Sciences",
    mrp: 1290,
    offerPrice: 1161,
    offerPercentage: 10,
    uom: "1 Liter",
    description: "JU-CLAIM provides advanced pest control with novel chemistry for challenging pests.",
    features: ["Novel active ingredient", "Effective against resistant pests", "Excellent crop safety"],
    usage: "Apply at recommended intervals during crop growth."
  },
  {
    id: 26,
    name: "SAMRAT",
    category: "Insecticides",
    image: "/products/samrat.png",
    brand: "JU Agri Sciences",
    mrp: 890,
    uom: "500ml",
    description: "SAMRAT is a versatile insecticide for control of sucking and chewing pests.",
    features: ["Versatile application", "Broad-spectrum control", "Quick action"],
    usage: "Spray on affected crops at pest appearance."
  },
  {
    id: 27,
    name: "Samrat 30.5",
    category: "Insecticides",
    image: "/products/samrat-305.png",
    brand: "JU Agri Sciences",
    mrp: 950,
    offerPrice: 855,
    offerPercentage: 10,
    uom: "500ml",
    description: "Samrat 30.5 is an enhanced formulation for superior pest control performance.",
    features: ["Enhanced formulation", "Higher concentration", "Better efficacy"],
    usage: "Use as per crop-specific recommendations at lower volumes."
  },
  {
    id: 28,
    name: "CHLORO-20",
    category: "Fertilizers",
    image: "/products/chloro-20.png",
    brand: "JU Agri Sciences",
    mrp: 420,
    uom: "1 Liter",
    description: "CHLORO-20 is a specialized liquid fertilizer for enhanced chlorophyll production.",
    features: ["Improves chlorophyll content", "Enhances photosynthesis", "Better crop health"],
    usage: "Apply as foliar spray during vegetative growth stage."
  },
  {
    id: 29,
    name: "CHLORO-50",
    category: "Fertilizers",
    image: "/products/chloro-50.png",
    brand: "JU Agri Sciences",
    mrp: 580,
    offerPrice: 522,
    offerPercentage: 10,
    uom: "1 Liter",
    description: "CHLORO-50 is a high-concentration liquid fertilizer for superior plant nutrition.",
    features: ["High concentration formula", "Quick absorption", "Visible results"],
    usage: "Dilute and apply as foliar spray or soil drench."
  },
  {
    id: 30,
    name: "MANTRA",
    category: "Fertilizers",
    image: "/products/mantra.png",
    brand: "JU Agri Sciences",
    mrp: 750,
    uom: "1 Liter",
    description: "MANTRA is a balanced liquid fertilizer for comprehensive crop nutrition.",
    features: ["Complete nutrient package", "Organic-based formulation", "Improves soil health"],
    usage: "Apply regularly during crop growth stages for best results."
  },
  {
    id: 31,
    name: "Cyper-10",
    category: "Insecticides",
    image: "/products/cyper-10.png",
    brand: "JU Agri Sciences",
    mrp: 380,
    offerPrice: 342,
    offerPercentage: 10,
    uom: "500ml",
    description: "Cyper-10 is an economical pyrethroid insecticide for general pest control.",
    features: ["Cost-effective solution", "Broad-spectrum activity", "Quick action"],
    usage: "Dilute and spray on affected crops as needed."
  },
  {
    id: 32,
    name: "Cyper-25",
    category: "Insecticides",
    image: "/products/cyper-25.png",
    brand: "JU Agri Sciences",
    mrp: 520,
    uom: "500ml",
    description: "Cyper-25 is a higher concentration pyrethroid for effective pest management.",
    features: ["Higher concentration", "Lower application volume", "Fast knockdown effect"],
    usage: "Use at recommended dilution for various crop pests."
  },
  {
    id: 33,
    name: "SHOOTER-50",
    category: "Insecticides",
    image: "/products/shooter-50.png",
    brand: "JU Agri Sciences",
    mrp: 650,
    offerPrice: 585,
    offerPercentage: 10,
    uom: "500ml",
    description: "SHOOTER-50 provides excellent control of sucking pests and mites.",
    features: ["Effective against mites", "Systemic action", "Rain-fast formula"],
    usage: "Mix with water and spray uniformly on affected crops."
  },
  {
    id: 34,
    name: "JUPITER-505",
    category: "Fertilizers",
    image: "/products/jupiter-505.png",
    brand: "JU Agri Sciences",
    mrp: 820,
    uom: "1 Liter",
    description: "JUPITER-505 is a premium liquid fertilizer with balanced NPK for optimal growth.",
    features: ["Balanced NPK formula", "Enhances yield quality", "Improves plant vigor"],
    usage: "Apply through drip irrigation or foliar spray as per crop requirements."
  },
  {
    id: 35,
    name: "CENTURY",
    category: "Fertilizers",
    image: "/products/century.png",
    brand: "JU Agri Sciences",
    mrp: 890,
    offerPrice: 801,
    offerPercentage: 10,
    uom: "1 Liter",
    description: "CENTURY is a comprehensive liquid fertilizer for long-lasting crop nutrition.",
    features: ["Long-lasting nutrition", "Micronutrient enriched", "Improves stress tolerance"],
    usage: "Apply at regular intervals throughout crop cycle."
  },
  {
    id: 36,
    name: "Alpha",
    category: "Fertilizers",
    image: "/products/alpha.png",
    brand: "JU Agri Sciences",
    mrp: 720,
    uom: "1 Liter",
    description: "Alpha is a premium liquid fertilizer for enhanced plant growth and productivity.",
    features: ["Complete nutrient solution", "Quick absorption", "Improves yield quality"],
    usage: "Apply through drip irrigation or foliar spray as needed."
  },
  {
    id: 37,
    name: "MONO-36",
    category: "Fertilizers",
    image: "/products/mono-36.png",
    brand: "JU Agri Sciences",
    mrp: 680,
    offerPrice: 612,
    offerPercentage: 10,
    uom: "1 Liter",
    description: "MONO-36 is a specialized fertilizer for specific nutrient supplementation.",
    features: ["Targeted nutrition", "High concentration", "Quick response"],
    usage: "Apply as corrective measure or regular nutrition supplement."
  },
  {
    id: 38,
    name: "VENUS",
    category: "Fertilizers",
    image: "/products/venus.png",
    brand: "JU Agri Sciences",
    mrp: 950,
    uom: "1 Liter",
    description: "VENUS is a premium liquid fertilizer for superior crop performance.",
    features: ["Premium formulation", "Enhances flowering and fruiting", "Improves crop quality"],
    usage: "Apply at critical growth stages for maximum benefit."
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
