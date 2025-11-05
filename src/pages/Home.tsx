import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout, Package, Wheat, Wrench, MapPin, Phone, MessageCircle } from "lucide-react";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  const categories = [
    {
      icon: Sprout,
      title: "Pesticides",
      description: "Quality pest control solutions for healthy crops",
    },
    {
      icon: Package,
      title: "Fertilizers",
      description: "Nutrient-rich fertilizers for optimal growth",
    },
    {
      icon: Wheat,
      title: "Seeds",
      description: "Premium quality seeds for better yields",
    },
    {
      icon: Wrench,
      title: "Farm Tools",
      description: "Durable equipment for efficient farming",
    },
  ];

  const featuredProducts = [
    {
      name: "Crop Protection Spray",
      category: "Pesticides",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop",
      brands: "JU, UPL, Bayer",
    },
    {
      name: "Organic Fertilizer",
      category: "Fertilizers",
      image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400&h=400&fit=crop",
      brands: "JU, UPL",
    },
    {
      name: "Hybrid Wheat Seeds",
      category: "Seeds",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=400&fit=crop",
      brands: "Bayer, UPL",
    },
    {
      name: "NPK Complex",
      category: "Fertilizers",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      brands: "JU, Bayer",
    },
    {
      name: "Hand Cultivator",
      category: "Farm Tools",
      image: "https://images.unsplash.com/photo-1593613581390-4b9e92873ed2?w=400&h=400&fit=crop",
      brands: "Local Brands",
    },
    {
      name: "Plant Growth Regulator",
      category: "Pesticides",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=400&fit=crop",
      brands: "UPL, Bayer",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-light via-background to-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-4 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Kisna Bhagwanji Center
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Trusted Agricultural & Pesticide Products Since 1990
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/products">Explore Products</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Our Categories</h2>
          <p className="text-muted-foreground text-lg">
            Complete solutions for all your agricultural needs
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.title} {...category} index={index} />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-lg">
              Top quality products from trusted brands
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.name} {...product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">About Us</h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            For over three decades, Kisna Bhagwanji Center has been serving the farming community
            with dedication and trust. As a family-run business, we understand the importance of
            quality agricultural products and personalized service for every farmer's success.
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link to="/about">Read More</Link>
          </Button>
        </motion.div>
      </section>

      {/* Contact Strip */}
      <section className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Phone className="h-5 w-5" />
              <span className="font-medium">+1 (234) 567-890</span>
            </a>
            <a
              href="https://wa.me/1234567890"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">WhatsApp Us</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Main Street, Agricultural District</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
