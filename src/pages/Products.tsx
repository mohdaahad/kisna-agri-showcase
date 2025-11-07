import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
}

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const categories = ["All", "Pesticides", "Fertilizers", "Seeds", "Farm Tools"];

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
    },
    {
      id: 3,
      name: "ROTO-S",
      category: "Pesticides",
      image: "/products/roto-s.jpg",
      brand: "Bayer",
      mrp: 520,
      uom: "500ml",
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
    },
    {
      id: 5,
      name: "Hadar",
      category: "Pesticides",
      image: "/products/hadar.jpg",
      brand: "Crystal",
      mrp: 380,
      uom: "250ml",
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
    },
    {
      id: 8,
      name: "Cyper-25",
      category: "Pesticides",
      image: "/products/cyper-25.jpg",
      brand: "Gharda",
      mrp: 420,
      uom: "500ml",
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
    },
    {
      id: 10,
      name: "Minister",
      category: "Fertilizers",
      image: "/products/minister.jpg",
      brand: "Rallis",
      mrp: 980,
      uom: "1 Liter",
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
    },
    {
      id: 12,
      name: "Mantra",
      category: "Fertilizers",
      image: "/products/mantra.jpg",
      brand: "Nagarjuna",
      mrp: 850,
      uom: "1 Liter",
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
    },
  ];

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter((product) => product.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered = [...filtered].sort((a, b) => (a.offerPrice || a.mrp) - (b.offerPrice || b.mrp));
        break;
      case "price-desc":
        filtered = [...filtered].sort((a, b) => (b.offerPrice || b.mrp) - (a.offerPrice || a.mrp));
        break;
      case "name-asc":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return filtered;
  }, [activeCategory, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get product count per category
  const getCategoryCount = (category: string) => {
    if (category === "All") return allProducts.length;
    return allProducts.filter((p) => p.category === category).length;
  };

  // Reset to page 1 when filters change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Hero Section with Farming Background */}
      <section 
        className="relative py-24 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-products.jpg')" }}
      >
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-background mb-4"
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-background/90"
          >
            Quality Agricultural Solutions for Every Need
          </motion.p>
        </div>
      </section>

      {/* Search and Sort Section */}
      <section className="py-6 border-b bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by product name, brand, or category..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryChange(category)}
                className="min-w-[120px]"
              >
                {category}
                <span className="ml-2 px-2 py-0.5 rounded-full bg-background/20 text-xs">
                  {getCategoryCount(category)}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground text-center">
            Showing {paginatedProducts.length} of {filteredProducts.length} products
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-4">
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product, index) => (
                <ProductCard key={product.id} {...product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-2">No products found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <PaginationEllipsis key={page} />;
                  }
                  return null;
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className={
                      currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </section>
      )}

      {/* Legal Disclaimer */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
            <strong>Legal Disclaimer:</strong> Brand names and logos shown are for reference purposes only. 
            Kisan Bagwani Center is an independent retailer and not affiliated with, endorsed by, or sponsored 
            by the manufacturers of the products displayed. All trademarks belong to their respective owners.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
