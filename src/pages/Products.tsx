import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Pesticides", "Fertilizers", "Seeds", "Farm Tools"];

  const allProducts = [
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
    {
      name: "Insect Control Solution",
      category: "Pesticides",
      image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=400&fit=crop",
      brands: "JU, Bayer",
    },
    {
      name: "Bio Fertilizer",
      category: "Fertilizers",
      image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=400&h=400&fit=crop",
      brands: "UPL, Local",
    },
    {
      name: "Vegetable Seeds Pack",
      category: "Seeds",
      image: "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=400&h=400&fit=crop",
      brands: "Bayer, JU",
    },
    {
      name: "Garden Hoe",
      category: "Farm Tools",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      brands: "Local Brands",
    },
    {
      name: "Weed Control Herbicide",
      category: "Pesticides",
      image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&h=400&fit=crop",
      brands: "UPL, Bayer",
    },
    {
      name: "Micronutrient Mix",
      category: "Fertilizers",
      image: "https://images.unsplash.com/photo-1591857177131-47b35a6e4d5c?w=400&h=400&fit=crop",
      brands: "JU, UPL",
    },
  ];

  const filteredProducts =
    activeCategory === "All"
      ? allProducts
      : allProducts.filter((product) => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-light to-background py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Our Products</h1>
            <p className="text-xl text-muted-foreground">
              Quality agricultural solutions from trusted brands
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="min-w-[120px]"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={`${product.name}-${index}`} {...product} index={index} />
          ))}
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground text-center max-w-3xl mx-auto">
            <strong>Legal Disclaimer:</strong> Brand names shown (JU, UPL, Bayer) are for
            reference only. Kisna Bhagwanji Center is an independent retailer and not directly
            affiliated with these manufacturers. All trademarks belong to their respective owners.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
