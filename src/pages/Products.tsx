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
      name: "Zodia",
      category: "Pesticides",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop",
      brands: "JU, UPL, Bayer",
    },
    {
      name: "Shooter-50",
      category: "Pesticides",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop",
      brands: "JU, UPL, Bayer",
    },
    {
      name: "ROTO-S",
      category: "Fertilizers",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop",
      brands: "JU, UPL, Bayer",
    },
    {
      name: "Alpha",
      category: "Pesticides",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop",
      brands: "JU, UPL, Bayer",
    },
    {
      name: "Hadar",
      category: "Fertilizers",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop",
      brands: "JU, UPL, Bayer",
    },
    {
      name: "Nor-Ko-T3",
      category: "Seeds",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop",
      brands: "JU, UPL, Bayer",
    },
    {
      name: "Hungama Gold",
      category: "Fertilizers",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop",
      brands: "JU, UPL, Bayer",
    },
    {
      name: "Cyper-25",
      category: "Pesticides",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop",
      brands: "JU, UPL, Bayer",
    },
    {
      name: "Sun Quit",
      category: "Pesticides",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop",
      brands: "JU, UPL, Bayer",
    },
    {
      name: "Minister",
      category: "Farm Tools",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop",
      brands: "JU, UPL, Bayer",
    },
    {
      name: "Heera",
      category: "Fertilizers",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop",
      brands: "JU, UPL, Bayer",
    },
    {
      name: "Mantra",
      category: "Seeds",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop",
      brands: "JU, UPL, Bayer",
    },
    {
      name: "Yodha",
      category: "Pesticides",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop",
      brands: "JU, UPL, Bayer",
    },
    {
      name: "Fatafat",
      category: "Pesticides",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=400&fit=crop",
      brands: "JU, UPL, Bayer",
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
            reference only. Kisan Bagwani Center is an independent retailer and not directly
            affiliated with these manufacturers. All trademarks belong to their respective owners.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
