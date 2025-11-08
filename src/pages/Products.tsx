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

  const categories = ["All", "Insecticides", "Fungicides", "Herbicides", "Fertilizers", "Micronutrients", "Biostimulants", "Special Products", "Dusting Powder"];

  const allProducts: Product[] = [
    // JU Agri Sciences Products
    {
      id: 1,
      name: "JU Rahat",
      category: "Fungicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_20708314501759482763.jpeg",
      brand: "JU Agri Sciences",
      mrp: 2875,
      offerPrice: 2210,
      offerPercentage: 23,
      uom: "250 Gm",
    },
    {
      id: 2,
      name: "Ju Mahakal",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_10547199731759483883.webp",
      brand: "JU Agri Sciences",
      mrp: 3940,
      offerPrice: 2880,
      offerPercentage: 27,
      uom: "250 Gm",
    },
    {
      id: 3,
      name: "JU E-Mate",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_6682724321759309465.webp",
      brand: "JU Agri Sciences",
      mrp: 2680,
      offerPrice: 1931,
      offerPercentage: 28,
      uom: "500 Gm",
    },
    {
      id: 4,
      name: "JU Decigen",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_7443160111752757978.webp",
      brand: "JU Agri Sciences",
      mrp: 4620,
      offerPrice: 3335,
      offerPercentage: 28,
      uom: "300 ML",
    },
    {
      id: 5,
      name: "JU Loud",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_16538939211752917503.webp",
      brand: "JU Agri Sciences",
      mrp: 2250,
      offerPrice: 1481,
      offerPercentage: 34,
      uom: "115 ML",
    },
    {
      id: 6,
      name: "Ju Zodia",
      category: "Fungicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_17139985031755606160.webp",
      brand: "JU Agri Sciences",
      mrp: 2250,
      offerPrice: 1451,
      offerPercentage: 35,
      uom: "500 ML",
    },
    {
      id: 7,
      name: "JU Mix",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_8892f303f9f92d641a443ddcda9660fa-10-07-23-10-59-49.webp",
      brand: "JU Agri Sciences",
      mrp: 290,
      offerPrice: 183,
      offerPercentage: 37,
      uom: "16 Gm",
    },
    {
      id: 8,
      name: "Ju Azole",
      category: "Fungicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_05f18625f6e944ce5f43c490e4d3518b-07-17-25-16-58-25.webp",
      brand: "JU Agri Sciences",
      mrp: 1372,
      offerPrice: 793,
      offerPercentage: 42,
      uom: "200 ML",
    },
    {
      id: 9,
      name: "Ju Gaurav-L",
      category: "Biostimulants",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_11285977681759485486.webp",
      brand: "JU Agri Sciences",
      mrp: 805,
      offerPrice: 457,
      offerPercentage: 43,
      uom: "1 Ltr",
    },
    {
      id: 10,
      name: "JU Samrat 70",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_45b762635bcc437bf5cfdaa7d0cb575c-06-29-23-11-44-05.webp",
      brand: "JU Agri Sciences",
      mrp: 3000,
      offerPrice: 1600,
      offerPercentage: 47,
      uom: "200 Gm",
    },
    {
      id: 11,
      name: "Ju Glypho-41",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_16870452041757739579.webp",
      brand: "JU Agri Sciences",
      mrp: 535,
      offerPrice: 245,
      offerPercentage: 54,
      uom: "500 ML",
    },
    {
      id: 12,
      name: "JU Agri Glunate",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_9355057621715324410.webp",
      brand: "JU Agri Sciences",
      mrp: 1250,
      offerPrice: 550,
      offerPercentage: 56,
      uom: "1 Ltr",
    },
    {
      id: 13,
      name: "JU Bullet",
      category: "Fungicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_6915316431711618094.webp",
      brand: "JU Agri Sciences",
      mrp: 1044,
      offerPrice: 445,
      offerPercentage: 57,
      uom: "600 Gm",
    },
    {
      id: 14,
      name: "JU Strepto Plus",
      category: "Fungicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_17694103681746276511.webp",
      brand: "JU Agri Sciences",
      mrp: 420,
      offerPrice: 180,
      offerPercentage: 57,
      uom: "60 Gm",
    },
    {
      id: 15,
      name: "Ju Glypho-71",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_18742260971749462980.webp",
      brand: "JU Agri Sciences",
      mrp: 302,
      offerPrice: 125,
      offerPercentage: 59,
      uom: "200 Gm",
    },
    {
      id: 16,
      name: "Ju Tridev",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_8042319971759490960.webp",
      brand: "JU Agri Sciences",
      mrp: 2605,
      offerPrice: 770,
      offerPercentage: 70,
      uom: "500 ML",
    },
    {
      id: 17,
      name: "JU Masaal",
      category: "Fungicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_19688292681759488719.webp",
      brand: "JU Agri Sciences",
      mrp: 500,
      offerPrice: 141,
      offerPercentage: 72,
      uom: "500 Gm",
    },
    {
      id: 18,
      name: "JU Ecomax+",
      category: "Biostimulants",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_7758423261759487435.webp",
      brand: "JU Agri Sciences",
      mrp: 814,
      offerPrice: 165,
      offerPercentage: 80,
      uom: "4 Kg",
    },
    {
      id: 19,
      name: "JU Venus",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_17013997671759481115.webp",
      brand: "JU Agri Sciences",
      mrp: 626,
      offerPrice: 432,
      offerPercentage: 31,
      uom: "200 Gm",
    },
    {
      id: 20,
      name: "JU Mantra",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_b3d9aae0dae35a7243bec542a6e918e0-06-08-23-17-04-57.webp",
      brand: "JU Agri Sciences",
      mrp: 6000,
      offerPrice: 4050,
      offerPercentage: 33,
      uom: "1 Kg",
    },
    {
      id: 21,
      name: "JU Thiola",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_17368815771752923649.webp",
      brand: "JU Agri Sciences",
      mrp: 1580,
      offerPrice: 931,
      offerPercentage: 41,
      uom: "500 ML",
    },
    {
      id: 22,
      name: "Ju Vita Gold",
      category: "Biostimulants",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_1369747451753681852.webp",
      brand: "JU Agri Sciences",
      mrp: 1890,
      offerPrice: 940,
      offerPercentage: 50,
      uom: "250 Gm",
    },
    {
      id: 23,
      name: "Ju Mantra FS",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_eb5d490676705dd6b0e1a71f3284bbeb-07-08-23-15-04-10.webp",
      brand: "JU Agri Sciences",
      mrp: 2290,
      offerPrice: 1123,
      offerPercentage: 51,
      uom: "1 Ltr",
    },
    {
      id: 24,
      name: "JU Laathi",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_7382740701720766566.webp",
      brand: "JU Agri Sciences",
      mrp: 405,
      offerPrice: 187,
      offerPercentage: 54,
      uom: "100 Gm",
    },
    {
      id: 25,
      name: "JU Xylo Green",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_7921143661744102184.webp",
      brand: "JU Agri Sciences",
      mrp: 580,
      offerPrice: 256,
      offerPercentage: 56,
      uom: "100 Gm",
    },
    {
      id: 26,
      name: "JU Cyper",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_5a0384797aef5773fc8347975080f306-06-16-23-17-41-40.webp",
      brand: "JU Agri Sciences",
      mrp: 2860,
      offerPrice: 1186,
      offerPercentage: 59,
      uom: "2 Ltr",
    },
    {
      id: 27,
      name: "JU Potash 2000",
      category: "Fertilizers",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_12049762241753792752.webp",
      brand: "JU Agri Sciences",
      mrp: 657,
      offerPrice: 251,
      offerPercentage: 62,
      uom: "180 Gm",
    },
    {
      id: 28,
      name: "JU Clear",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_3141070211754400111.webp",
      brand: "JU Agri Sciences",
      mrp: 2886,
      offerPrice: 1067,
      offerPercentage: 63,
      uom: "1.4 Ltr",
    },
    {
      id: 29,
      name: "JU Elect SP",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_3384806461753780429.webp",
      brand: "JU Agri Sciences",
      mrp: 2500,
      offerPrice: 851,
      offerPercentage: 66,
      uom: "1 Kg",
    },
    {
      id: 30,
      name: "Ju Fulltoss",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_7905702441753676647.webp",
      brand: "JU Agri Sciences",
      mrp: 760,
      offerPrice: 260,
      offerPercentage: 66,
      uom: "320 Gm",
    },
    {
      id: 31,
      name: "JU Novazide",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_7271495751715754169.webp",
      brand: "JU Agri Sciences",
      mrp: 810,
      offerPrice: 270,
      offerPercentage: 67,
      uom: "250 ML",
    },
    {
      id: 32,
      name: "JU Teer",
      category: "Biostimulants",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_19127731031744366864.webp",
      brand: "JU Agri Sciences",
      mrp: 600,
      offerPrice: 200,
      offerPercentage: 67,
      uom: "250 ML",
    },
    {
      id: 33,
      name: "Ju Hungama Gold",
      category: "Fungicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_cafacc0fce757731230163a6a39e7290-06-22-23-16-12-31.webp",
      brand: "JU Agri Sciences",
      mrp: 615,
      offerPrice: 185,
      offerPercentage: 70,
      uom: "1 Ltr",
    },
    {
      id: 34,
      name: "JU Shooter-50",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_6166506821755936894.webp",
      brand: "JU Agri Sciences",
      mrp: 465,
      offerPrice: 139,
      offerPercentage: 70,
      uom: "500 ML",
    },
    {
      id: 35,
      name: "Ju Agro Active",
      category: "Biostimulants",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_e975d35908ccb6a75e0d1532e7a61a7a-04-25-23-11-45-19.webp",
      brand: "JU Agri Sciences",
      mrp: 860,
      offerPrice: 240,
      offerPercentage: 72,
      uom: "500 ML",
    },
    {
      id: 36,
      name: "JU Agri Fop",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_16410587411713002502.webp",
      brand: "JU Agri Sciences",
      mrp: 382,
      offerPrice: 104,
      offerPercentage: 73,
      uom: "100 ML",
    },
    {
      id: 37,
      name: "JU Samrat",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_ba5fc63e8b1dec37e6195de6a213f5a2-06-22-23-16-15-53.webp",
      brand: "JU Agri Sciences",
      mrp: 275,
      offerPrice: 64,
      offerPercentage: 77,
      uom: "100 ML",
    },
    {
      id: 38,
      name: "JU Domil",
      category: "Fungicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_00db51fc300a3a2ab816cd3301434335-06-08-23-16-34-26.webp",
      brand: "JU Agri Sciences",
      mrp: 850,
      offerPrice: 176,
      offerPercentage: 79,
      uom: "500 Gm",
    },
    {
      id: 39,
      name: "JU Get Set",
      category: "Special Products",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_4b5b7822c199e329206d7af712d88d35-12-15-23-18-14-29.webp",
      brand: "JU Agri Sciences",
      mrp: 330,
      offerPrice: 70,
      offerPercentage: 79,
      uom: "100 ML",
    },
    {
      id: 40,
      name: "Ju Keeper",
      category: "Special Products",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_ed4c36b7fe37b317ba85424945399007-07-08-23-13-58-31.webp",
      brand: "JU Agri Sciences",
      mrp: 500,
      offerPrice: 100,
      offerPercentage: 80,
      uom: "1 Ltr",
    },
    {
      id: 41,
      name: "Ju Magic Super",
      category: "Biostimulants",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_e94414dbf7e34471aa8a01fd82f848bf-02-20-24-18-38-46.webp",
      brand: "JU Agri Sciences",
      mrp: 3000,
      offerPrice: 585,
      offerPercentage: 81,
      uom: "50 Kg",
    },
    {
      id: 42,
      name: "JU Cropcol",
      category: "Fungicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_ce5e5f5de375c857ee6154c748f5a55b-02-20-24-18-37-40.webp",
      brand: "JU Agri Sciences",
      mrp: 535,
      offerPrice: 100,
      offerPercentage: 81,
      uom: "500 Gm",
    },
    {
      id: 43,
      name: "JU Morgain",
      category: "Biostimulants",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_8e62912a9424dac7330037c6eb64898c-07-08-23-15-52-40.webp",
      brand: "JU Agri Sciences",
      mrp: 560,
      offerPrice: 100,
      offerPercentage: 82,
      uom: "250 ML",
    },
    {
      id: 44,
      name: "Ju Burn Out",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_fe16d25e067e6045f4877b57d3439bd0-07-08-23-12-46-22.webp",
      brand: "JU Agri Sciences",
      mrp: 710,
      offerPrice: 129,
      offerPercentage: 82,
      uom: "1 Ltr",
    },
    {
      id: 45,
      name: "Ju Pendi Plus",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_10041261701742531883.webp",
      brand: "JU Agri Sciences",
      mrp: 645,
      offerPrice: 112,
      offerPercentage: 83,
      uom: "1 Ltr",
    },
    {
      id: 46,
      name: "Ju Sulvet-80",
      category: "Fungicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_6c995c892fa100ad6a4a622f0d81b8e9-04-27-23-15-33-53.webp",
      brand: "JU Agri Sciences",
      mrp: 3000,
      offerPrice: 500,
      offerPercentage: 83,
      uom: "20 Kg",
    },
    {
      id: 47,
      name: "JU Atrazine",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_042862da79023de4ffc22a603306be7b-06-22-23-09-35-24.webp",
      brand: "JU Agri Sciences",
      mrp: 375,
      offerPrice: 60,
      offerPercentage: 84,
      uom: "500 Gm",
    },
    {
      id: 48,
      name: "Ju Century",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_17016258251746276022.webp",
      brand: "JU Agri Sciences",
      mrp: 185,
      offerPrice: 27,
      offerPercentage: 85,
      uom: "100 ML",
    },
    {
      id: 49,
      name: "Ju JUPITER-505",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_16095333661755938398.webp",
      brand: "JU Agri Sciences",
      mrp: 339,
      offerPrice: 48,
      offerPercentage: 86,
      uom: "250 ML",
    },
    {
      id: 50,
      name: "Ju Weedout",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_adc9966f1f96d6915b02b54215ca3e5e-06-16-23-12-35-21.webp",
      brand: "JU Agri Sciences",
      mrp: 310,
      offerPrice: 43,
      offerPercentage: 86,
      uom: "500 ML",
    },
    // Crystal Products
    {
      id: 51,
      name: "Crystal Carlos",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_18152208711756703568.webp",
      brand: "Crystal",
      mrp: 8939,
      offerPrice: 7034,
      offerPercentage: 21,
      uom: "1 Kg",
    },
    {
      id: 52,
      name: "Crystal Bavistin",
      category: "Fungicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_16158029111743741010.webp",
      brand: "Crystal",
      mrp: 720,
      offerPrice: 155,
      offerPercentage: 78,
      uom: "500 Gm",
    },
    {
      id: 53,
      name: "Crystal Dursban",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_10434271531743757120.webp",
      brand: "Crystal",
      mrp: 355,
      offerPrice: 61,
      offerPercentage: 83,
      uom: "500 ML",
    },
    {
      id: 54,
      name: "Crystal ABACIN",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_1539990121743756937.webp",
      brand: "Crystal",
      mrp: 861,
      offerPrice: 220,
      offerPercentage: 74,
      uom: "100 ML",
    },
    {
      id: 55,
      name: "Crystal Kyoto",
      category: "Fungicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_3118130001743757284.webp",
      brand: "Crystal",
      mrp: 1800,
      offerPrice: 1195,
      offerPercentage: 34,
      uom: "500 ML",
    },
    {
      id: 56,
      name: "Crystal Monceren",
      category: "Fungicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_3bd822a7a60fab716be40254e67e49e2-03-31-23-10-56-12.webp",
      brand: "Crystal",
      mrp: 1550,
      offerPrice: 307,
      offerPercentage: 80,
      uom: "1 Ltr",
    },
    {
      id: 57,
      name: "Crystal Amora",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_87933c675179c381efae23ed22d05613-04-01-23-11-52-22.webp",
      brand: "Crystal",
      mrp: 1065,
      offerPrice: 109,
      offerPercentage: 90,
      uom: "600 ML",
    },
    {
      id: 58,
      name: "Crystal Pluton",
      category: "Fungicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_dd0c045e665336549c46ddb9f2cf1bfe-08-20-22-10-58-51.webp",
      brand: "Crystal",
      mrp: 9845,
      offerPrice: 1384,
      offerPercentage: 86,
      uom: "3 Kg",
    },
    {
      id: 59,
      name: "Crystal Blue Copper",
      category: "Fungicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_15897811831746268390.webp",
      brand: "Crystal",
      mrp: 725,
      offerPrice: 236,
      offerPercentage: 67,
      uom: "500 Gm",
    },
    {
      id: 60,
      name: "Crystal Apex 50",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_18ba1fb0a584779c15ec3d1a4bf6fb80-10-04-22-10-32-38.webp",
      brand: "Crystal",
      mrp: 3185,
      offerPrice: 685,
      offerPercentage: 78,
      uom: "1 Ltr",
    },
    // United (Herbicides, Insecticides, Fungicides)
    {
      id: 61,
      name: "ULBELA",
      category: "Herbicides",
      image: "/products/herbicide/Ulbela.jpg",
      brand: "United Agro",
      mrp: 450,
      uom: "270 Gm",
    },
    {
      id: 62,
      name: "Unisert",
      category: "Herbicides",
      image: "/products/herbicide/unisert.jpg",
      brand: "United Agro",
      mrp: 850,
      uom: "1 Ltr",
    },
    {
      id: 63,
      name: "Unifop",
      category: "Herbicides",
      image: "/products/herbicide/unifop.jpg",
      brand: "United Agro",
      mrp: 920,
      uom: "1 Ltr",
    },
    {
      id: 64,
      name: "ULPHABET",
      category: "Herbicides",
      image: "/products/herbicide/Ulphabet.jpg",
      brand: "United Agro",
      mrp: 780,
      uom: "1 Ltr",
    },
    {
      id: 65,
      name: "PENDA FORCE",
      category: "Herbicides",
      image: "/products/herbicide/Penda-Force.jpg",
      brand: "United Agro",
      mrp: 1850,
      uom: "3.5 Ltr",
    },
    {
      id: 66,
      name: "U-KILL",
      category: "Herbicides",
      image: "/products/herbicide/1-U-Kill.jpg",
      brand: "United Agro",
      mrp: 620,
      uom: "1 Ltr",
    },
    {
      id: 67,
      name: "UMPIRE",
      category: "Herbicides",
      image: "/products/herbicide/2-Umpire.jpg",
      brand: "United Agro",
      mrp: 710,
      uom: "1 Ltr",
    },
    {
      id: 68,
      name: "U-TERMINATE",
      category: "Herbicides",
      image: "/products/herbicide/3-U-Terminate.jpg",
      brand: "United Agro",
      mrp: 2800,
      uom: "5 Ltr",
    },
    {
      id: 69,
      name: "UT 71",
      category: "Herbicides",
      image: "/products/herbicide/01 united.jpg",
      brand: "United Agro",
      mrp: 280,
      uom: "100 Gm",
    },
    {
      id: 70,
      name: "UNIQUE",
      category: "Herbicides",
      image: "/products/herbicide/Unique.jpg",
      brand: "United Agro",
      mrp: 2950,
      uom: "5 Ltr",
    },
    {
      id: 71,
      name: "U-PENDA",
      category: "Herbicides",
      image: "/products/herbicide/U-Penda.jpg",
      brand: "United Agro",
      mrp: 3200,
      uom: "5 Ltr",
    },
    {
      id: 72,
      name: "U-MIX",
      category: "Herbicides",
      image: "/products/herbicide/umix.jpg",
      brand: "United Agro",
      mrp: 180,
      uom: "8 Gm",
    },
    {
      id: 73,
      name: "Rip Super",
      category: "Herbicides",
      image: "/products/herbicide/ripsuper.jpg",
      brand: "United Agro",
      mrp: 880,
      uom: "1 Ltr",
    },
    {
      id: 74,
      name: "UNDERLINE",
      category: "Herbicides",
      image: "/products/herbicide/Underline.jpg",
      brand: "United Agro",
      mrp: 750,
      uom: "1 Ltr",
    },
    {
      id: 75,
      name: "U-Maitri",
      category: "Herbicides",
      image: "/products/herbicide/U-Maitri (Herbicide).jpg",
      brand: "United Agro",
      mrp: 420,
      uom: "500 Gm",
    },
    {
      id: 76,
      name: "URION",
      category: "Herbicides",
      image: "/products/herbicide/urion.jpg",
      brand: "United Agro",
      mrp: 890,
      uom: "1 Ltr",
    },
    {
      id: 77,
      name: "UPRISE",
      category: "Herbicides",
      image: "/products/herbicide/uprisenew.jpg",
      brand: "United Agro",
      mrp: 580,
      uom: "500 Gm",
    },
    {
      id: 78,
      name: "UPCHLOR",
      category: "Herbicides",
      image: "/products/herbicide/7-Upchlor.JPG",
      brand: "United Agro",
      mrp: 3100,
      uom: "5 Ltr",
    },
    {
      id: 79,
      name: "UGRA",
      category: "Herbicides",
      image: "/products/herbicide/Ugra.jpg",
      brand: "United Agro",
      mrp: 820,
      uom: "1 Ltr",
    },
    {
      id: 80,
      name: "UNISHIELD",
      category: "Herbicides",
      image: "/products/herbicide/unishield.jpg",
      brand: "United Agro",
      mrp: 390,
      uom: "160 Gm",
    },
    {
      id: 81,
      name: "Ultron",
      category: "Herbicides",
      image: "/products/herbicide/ultron.jpg",
      brand: "United Agro",
      mrp: 220,
      uom: "80 Gm",
    },
    // United Insecticides
    {
      id: 82,
      name: "UTOPIA",
      category: "Insecticides",
      image: "/products/insecticide/utopia.jpg",
      brand: "United Agro",
      mrp: 2800,
      uom: "4 Kg",
    },
    {
      id: 83,
      name: "UNIWAR",
      category: "Insecticides",
      image: "/products/insecticide/Uniwar.jpg",
      brand: "United Agro",
      mrp: 950,
      uom: "333 Gm",
    },
    {
      id: 84,
      name: "URNOLD",
      category: "Insecticides",
      image: "/products/insecticide/Urnold.jpg",
      brand: "United Agro",
      mrp: 780,
      uom: "1 Ltr",
    },
    {
      id: 85,
      name: "UPFRONT",
      category: "Insecticides",
      image: "/products/insecticide/upfront.png",
      brand: "United Agro",
      mrp: 890,
      uom: "1 Ltr",
    },
    {
      id: 86,
      name: "Thunder",
      category: "Insecticides",
      image: "/products/insecticide/thundar.jpg",
      brand: "United Agro",
      mrp: 820,
      uom: "1 Ltr",
    },
    {
      id: 87,
      name: "Unimetro",
      category: "Insecticides",
      image: "/products/insecticide/unimetro.jpg",
      brand: "United Agro",
      mrp: 1250,
      uom: "1 Kg",
    },
    {
      id: 88,
      name: "UNICURE",
      category: "Insecticides",
      image: "/products/insecticide/unicure.png",
      brand: "United Agro",
      mrp: 180,
      uom: "25 Gm",
    },
    {
      id: 89,
      name: "STARLORD",
      category: "Insecticides",
      image: "/products/insecticide/starlord.jpg",
      brand: "United Agro",
      mrp: 720,
      uom: "500 Gm",
    },
    {
      id: 90,
      name: "UMBRELLA SUPER",
      category: "Insecticides",
      image: "/products/insecticide/umbrella-super.png",
      brand: "United Agro",
      mrp: 950,
      uom: "1 Ltr",
    },
    {
      id: 91,
      name: "UMEPHOS",
      category: "Insecticides",
      image: "/products/insecticide/umephos.png",
      brand: "United Agro",
      mrp: 880,
      uom: "1 Ltr",
    },
    {
      id: 92,
      name: "ULFA",
      category: "Insecticides",
      image: "/products/insecticide/9-Ulfa.jpg",
      brand: "United Agro",
      mrp: 3200,
      uom: "5 Ltr",
    },
    {
      id: 93,
      name: "UPCORD",
      category: "Insecticides",
      image: "/products/insecticide/10-Upcord.jpg",
      brand: "United Agro",
      mrp: 3500,
      uom: "5 Ltr",
    },
    {
      id: 94,
      name: "UPPERKILL",
      category: "Insecticides",
      image: "/products/insecticide/11-UpperKill.jpg",
      brand: "United Agro",
      mrp: 3300,
      uom: "5 Ltr",
    },
    {
      id: 95,
      name: "ULD - 505",
      category: "Insecticides",
      image: "/products/insecticide/12-ULD-505.jpg",
      brand: "United Agro",
      mrp: 3400,
      uom: "5 Ltr",
    },
    {
      id: 96,
      name: "URSBAN",
      category: "Insecticides",
      image: "/products/insecticide/13-Ursban.jpg",
      brand: "United Agro",
      mrp: 3150,
      uom: "5 Ltr",
    },
    {
      id: 97,
      name: "U-SAMA",
      category: "Insecticides",
      image: "/products/insecticide/14-U-Sama.jpg",
      brand: "United Agro",
      mrp: 3600,
      uom: "5 Ltr",
    },
    {
      id: 98,
      name: "UMITE",
      category: "Insecticides",
      image: "/products/insecticide/Umite.jpg",
      brand: "United Agro",
      mrp: 950,
      uom: "1 Ltr",
    },
    {
      id: 99,
      name: "UVARAJ",
      category: "Insecticides",
      image: "/products/insecticide/Uvaraj.jpg",
      brand: "United Agro",
      mrp: 870,
      uom: "1 Ltr",
    },
    {
      id: 100,
      name: "U-KALUX",
      category: "Insecticides",
      image: "/products/insecticide/19-U-Kalux.jpg",
      brand: "United Agro",
      mrp: 3250,
      uom: "5 Ltr",
    },
    {
      id: 101,
      name: "UCIDIN",
      category: "Insecticides",
      image: "/products/insecticide/20-Ucidin.jpg",
      brand: "United Agro",
      mrp: 3100,
      uom: "5 Ltr",
    },
    {
      id: 102,
      name: "UVA",
      category: "Insecticides",
      image: "/products/insecticide/21-Uva.jpg",
      brand: "United Agro",
      mrp: 3450,
      uom: "5 Ltr",
    },
    {
      id: 103,
      name: "UVA STRONG",
      category: "Insecticides",
      image: "/products/insecticide/22-Uva-Strong.jpg",
      brand: "United Agro",
      mrp: 3600,
      uom: "5 Ltr",
    },
    {
      id: 104,
      name: "UVA SMART",
      category: "Insecticides",
      image: "/products/insecticide/23-Uva-smart.jpg",
      brand: "United Agro",
      mrp: 950,
      uom: "1 Ltr",
    },
    {
      id: 105,
      name: "UNICRON",
      category: "Insecticides",
      image: "/products/insecticide/25-Unicron.jpg",
      brand: "United Agro",
      mrp: 3300,
      uom: "5 Ltr",
    },
    {
      id: 106,
      name: "UNITRIN",
      category: "Insecticides",
      image: "/products/insecticide/unitrinnew.jpg",
      brand: "United Agro",
      mrp: 3500,
      uom: "5 Ltr",
    },
    {
      id: 107,
      name: "U-BINK",
      category: "Insecticides",
      image: "/products/insecticide/28-U-Bink.jpg",
      brand: "United Agro",
      mrp: 920,
      uom: "1 Ltr",
    },
    {
      id: 108,
      name: "UJALA",
      category: "Insecticides",
      image: "/products/insecticide/29-Ujala.jpg",
      brand: "United Agro",
      mrp: 850,
      uom: "1 Ltr",
    },
    {
      id: 109,
      name: "UNIMIDA",
      category: "Insecticides",
      image: "/products/insecticide/30-Unimida.jpg",
      brand: "United Agro",
      mrp: 780,
      uom: "1 Ltr",
    },
    {
      id: 110,
      name: "UNIMIDA SUPER",
      category: "Insecticides",
      image: "/products/insecticide/31-Unimida-Super.jpg",
      brand: "United Agro",
      mrp: 890,
      uom: "1 Ltr",
    },
    {
      id: 111,
      name: "UNIMIDA SUPREME",
      category: "Insecticides",
      image: "/products/insecticide/Unimida Supreme.jpg",
      brand: "United Agro",
      mrp: 450,
      uom: "150 Gm",
    },
    {
      id: 112,
      name: "UMARK",
      category: "Insecticides",
      image: "/products/insecticide/umark.png",
      brand: "United Agro",
      mrp: 820,
      uom: "1 Ltr",
    },
    {
      id: 113,
      name: "URGENT",
      category: "Insecticides",
      image: "/products/insecticide/33-Urgent-SC.jpg",
      brand: "United Agro",
      mrp: 890,
      uom: "1 Ltr",
    },
    {
      id: 114,
      name: "URGENT (GR)",
      category: "Insecticides",
      image: "/products/insecticide/34-Urgent-GR.jpg",
      brand: "United Agro",
      mrp: 780,
      uom: "1 Kg",
    },
    {
      id: 115,
      name: "UNIFURAN",
      category: "Insecticides",
      image: "/products/insecticide/Unifuran 01.jpg",
      brand: "United Agro",
      mrp: 850,
      uom: "1 Kg",
    },
    {
      id: 116,
      name: "ULTIMATE",
      category: "Insecticides",
      image: "/products/insecticide/Ultimate (Insecticide).jpg",
      brand: "United Agro",
      mrp: 1200,
      uom: "1 Kg",
    },
    {
      id: 117,
      name: "UNITOP",
      category: "Insecticides",
      image: "/products/insecticide/38-Unitop.jpg",
      brand: "United Agro",
      mrp: 3800,
      uom: "7.5 Kg",
    },
    {
      id: 118,
      name: "UNITOP PLUS",
      category: "Insecticides",
      image: "/products/insecticide/Unitop-Plus-new.jpg",
      brand: "United Agro",
      mrp: 1150,
      uom: "1 Kg",
    },
    {
      id: 119,
      name: "UNIPRIDE",
      category: "Insecticides",
      image: "/products/insecticide/Unipridenew.jpg",
      brand: "United Agro",
      mrp: 680,
      uom: "500 Gm",
    },
    {
      id: 120,
      name: "UNTIM",
      category: "Insecticides",
      image: "/products/insecticide/Untim.jpg",
      brand: "United Agro",
      mrp: 920,
      uom: "1 Ltr",
    },
    {
      id: 121,
      name: "U-WANT",
      category: "Insecticides",
      image: "/products/insecticide/42-U-Want.jpg",
      brand: "United Agro",
      mrp: 880,
      uom: "1 Ltr",
    },
    {
      id: 122,
      name: "MALATHION",
      category: "Insecticides",
      image: "/products/insecticide/43-Malathion.jpg",
      brand: "United Agro",
      mrp: 3200,
      uom: "5 Ltr",
    },
    {
      id: 123,
      name: "U-CLAIM",
      category: "Insecticides",
      image: "/products/insecticide/U-claim.jpg",
      brand: "United Agro",
      mrp: 720,
      uom: "500 Gm",
    },
    {
      id: 124,
      name: "U-STAR",
      category: "Insecticides",
      image: "/products/insecticide/44-U-Star.jpg",
      brand: "United Agro",
      mrp: 1100,
      uom: "1 Kg",
    },
    {
      id: 125,
      name: "U-SMASH",
      category: "Insecticides",
      image: "/products/insecticide/U-Smash.jpg",
      brand: "United Agro",
      mrp: 920,
      uom: "1 Ltr",
    },
    // United Fungicides
    {
      id: 126,
      name: "UNIFER",
      category: "Fungicides",
      image: "/products/fungicide/unifer-systemic-fungicide.jpg",
      brand: "United Agro",
      mrp: 850,
      uom: "1 Kg",
    },
    {
      id: 127,
      name: "URDAS",
      category: "Fungicides",
      image: "/products/fungicide/Urdas.jpg",
      brand: "United Agro",
      mrp: 920,
      uom: "1 Ltr",
    },
    {
      id: 128,
      name: "SEVAK",
      category: "Fungicides",
      image: "/products/fungicide/sevak.png",
      brand: "United Agro",
      mrp: 780,
      uom: "1 Ltr",
    },
    {
      id: 129,
      name: "UPGRADE",
      category: "Fungicides",
      image: "/products/fungicide/Upgrade.jpg",
      brand: "United Agro",
      mrp: 890,
      uom: "1 Kg",
    },
    {
      id: 130,
      name: "U-KLEANER",
      category: "Fungicides",
      image: "/products/fungicide/U-Kleaner.jpg",
      brand: "United Agro",
      mrp: 580,
      uom: "500 Gm",
    },
    {
      id: 131,
      name: "U-BECTO",
      category: "Fungicides",
      image: "/products/fungicide/U-Becto.jpg",
      brand: "United Agro",
      mrp: 120,
      uom: "20 Gm",
    },
    {
      id: 132,
      name: "UNDERCONTROL",
      category: "Fungicides",
      image: "/products/fungicide/47-Undercontrol.jpg",
      brand: "United Agro",
      mrp: 3400,
      uom: "5 Ltr",
    },
    {
      id: 133,
      name: "UNDERCONTROL PLUS",
      category: "Fungicides",
      image: "/products/fungicide/48-UnderControl-Plus.jpg",
      brand: "United Agro",
      mrp: 2100,
      uom: "2.5 Ltr",
    },
    {
      id: 134,
      name: "UTTAM",
      category: "Fungicides",
      image: "/products/fungicide/49-Uttam.jpg",
      brand: "United Agro",
      mrp: 920,
      uom: "1 Ltr",
    },
    {
      id: 135,
      name: "UDAY",
      category: "Fungicides",
      image: "/products/fungicide/50-Uday.jpg",
      brand: "United Agro",
      mrp: 880,
      uom: "1 Ltr",
    },
    {
      id: 136,
      name: "UG-One",
      category: "Fungicides",
      image: "/products/fungicide/UG-one.jpg",
      brand: "United Agro",
      mrp: 850,
      uom: "1 Ltr",
    },
    {
      id: 137,
      name: "UNIBLAST",
      category: "Fungicides",
      image: "/products/fungicide/51-Uniblast.jpg",
      brand: "United Agro",
      mrp: 420,
      uom: "250 Gm",
    },
    {
      id: 138,
      name: "USTAAD",
      category: "Fungicides",
      image: "/products/fungicide/ustaadnew.jpg",
      brand: "United Agro",
      mrp: 8500,
      uom: "10 Kg",
    },
    {
      id: 139,
      name: "UNISTIN",
      category: "Fungicides",
      image: "/products/fungicide/Unistinnew.jpg",
      brand: "United Agro",
      mrp: 1100,
      uom: "1 Kg",
    },
    {
      id: 140,
      name: "U-KLEAN",
      category: "Fungicides",
      image: "/products/fungicide/U-Klean (1).jpg",
      brand: "United Agro",
      mrp: 620,
      uom: "500 Gm",
    },
    {
      id: 141,
      name: "UCOZEB",
      category: "Fungicides",
      image: "/products/fungicide/54-Ucozeb.jpg",
      brand: "United Agro",
      mrp: 950,
      uom: "1 Kg",
    },
    // United Biostimulants and Special Products
    {
      id: 142,
      name: "BHUMIGOLD",
      category: "Biostimulants",
      image: "/products/biostimulants/bhumigold.jpg",
      brand: "United Agro",
      mrp: 680,
      uom: "1 Ltr",
    },
    {
      id: 143,
      name: "UVENGER",
      category: "Special Products",
      image: "/products/specialproduct/Uvenger.jpg",
      brand: "United Agro",
      mrp: 450,
      uom: "1 Ltr",
    },
    {
      id: 144,
      name: "U-HANG",
      category: "Special Products",
      image: "/products/specialproduct/27-U-Hang.jpg",
      brand: "United Agro",
      mrp: 380,
      uom: "500 ML",
    },
    {
      id: 145,
      name: "UMBA",
      category: "Special Products",
      image: "/products/specialproduct/Umba.jpg",
      brand: "United Agro",
      mrp: 280,
      uom: "150 ML",
    },
    {
      id: 146,
      name: "UNMOL",
      category: "Special Products",
      image: "/products/specialproduct/Unmol-Gr.jpg",
      brand: "United Agro",
      mrp: 520,
      uom: "1 Kg",
    },
    {
      id: 147,
      name: "U-CHAMP",
      category: "Special Products",
      image: "/products/specialproduct/U-Champ.jpg",
      brand: "United Agro",
      mrp: 420,
      uom: "250 Gm",
    },
    // United Micronutrients
    {
      id: 148,
      name: "PRABAL",
      category: "Micronutrients",
      image: "/products/micronutrients/Prabal.jpg",
      brand: "United Agro",
      mrp: 850,
      uom: "1 Ltr",
    },
    {
      id: 149,
      name: "ULTRAZYME GR",
      category: "Micronutrients",
      image: "/products/micronutrients/Ultrazyme.jpg",
      brand: "United Agro",
      mrp: 12500,
      uom: "20 Kg",
    },
    {
      id: 150,
      name: "ULTRA VITA",
      category: "Micronutrients",
      image: "/products/micronutrients/ultra_vita.jpg",
      brand: "United Agro",
      mrp: 8500,
      uom: "10 Kg",
    },
    {
      id: 151,
      name: "ULTRA-SUPER",
      category: "Micronutrients",
      image: "/products/micronutrients/57-UltraSuper.jpg",
      brand: "United Agro",
      mrp: 3400,
      uom: "5 Ltr",
    },
    {
      id: 152,
      name: "ULTRA SUPER GOLD",
      category: "Micronutrients",
      image: "/products/micronutrients/Ultra-Super-Gold.jpg",
      brand: "United Agro",
      mrp: 3600,
      uom: "5 Ltr",
    },
    {
      id: 153,
      name: "ULTRA MAGIC",
      category: "Micronutrients",
      image: "/products/micronutrients/Ultra-Magic.jpg",
      brand: "United Agro",
      mrp: 3500,
      uom: "5 Ltr",
    },
    {
      id: 154,
      name: "ULTRADHOOM",
      category: "Micronutrients",
      image: "/products/micronutrients/60-Ultra-Dhoom.jpg",
      brand: "United Agro",
      mrp: 3450,
      uom: "5 Ltr",
    },
    {
      id: 155,
      name: "ULTRA CHARGE",
      category: "Micronutrients",
      image: "/products/micronutrients/Ultra-Charge.jpg",
      brand: "United Agro",
      mrp: 3550,
      uom: "5 Ltr",
    },
    {
      id: 156,
      name: "ULTRAMIN",
      category: "Micronutrients",
      image: "/products/micronutrients/62-Ultramin.jpg",
      brand: "United Agro",
      mrp: 3400,
      uom: "5 Ltr",
    },
    {
      id: 157,
      name: "ULTRA-VEG",
      category: "Micronutrients",
      image: "/products/micronutrients/63-Ultra-Vegetable.jpg",
      brand: "United Agro",
      mrp: 920,
      uom: "1 Ltr",
    },
    {
      id: 158,
      name: "ULTRA-PADDY",
      category: "Micronutrients",
      image: "/products/micronutrients/64-Ultra-Paddy.jpg",
      brand: "United Agro",
      mrp: 880,
      uom: "1 Ltr",
    },
    {
      id: 159,
      name: "ULTRAHUME",
      category: "Micronutrients",
      image: "/products/micronutrients/65-Ultra-Hume.jpg",
      brand: "United Agro",
      mrp: 950,
      uom: "1 Ltr",
    },
    {
      id: 160,
      name: "ULTRA-SOYA SPECIAL",
      category: "Micronutrients",
      image: "/products/micronutrients/66-Ultra-Soyabean.jpg",
      brand: "United Agro",
      mrp: 920,
      uom: "1 Ltr",
    },
    {
      id: 161,
      name: "ULTRA-COTTON PLUS",
      category: "Micronutrients",
      image: "/products/micronutrients/67-Ultra-Cotton.jpg",
      brand: "United Agro",
      mrp: 950,
      uom: "1 Ltr",
    },
    {
      id: 162,
      name: "ULTRA-SHAKTI",
      category: "Micronutrients",
      image: "/products/micronutrients/68-Ultra-Shakti.jpg",
      brand: "United Agro",
      mrp: 890,
      uom: "1 Ltr",
    },
    {
      id: 163,
      name: "ULTRA-SUL",
      category: "Micronutrients",
      image: "/products/micronutrients/69-Ultra-Sul.jpg",
      brand: "United Agro",
      mrp: 920,
      uom: "1 Ltr",
    },
    {
      id: 164,
      name: "Sampoorna Gold",
      category: "Biostimulants",
      image: "/products/biostimulants/sampoorna.jpg",
      brand: "United Agro",
      mrp: 850,
      uom: "1 Ltr",
    },
    {
      id: 165,
      name: "ACHOOK",
      category: "Biostimulants",
      image: "/products/biostimulants/ACHHOK.jpg",
      brand: "United Agro",
      mrp: 780,
      uom: "1 Ltr",
    },
    {
      id: 166,
      name: "SUPER-KAWACH",
      category: "Biostimulants",
      image: "/products/biostimulants/SUPER-KAWACH.jpg",
      brand: "United Agro",
      mrp: 820,
      uom: "1 Ltr",
    },
    {
      id: 167,
      name: "ULTRA-MONO",
      category: "Micronutrients",
      image: "/products/micronutrients/70-Ultra-Mono.jpg",
      brand: "United Agro",
      mrp: 890,
      uom: "1 Ltr",
    },
    {
      id: 168,
      name: "RAFTAAR",
      category: "Micronutrients",
      image: "/products/micronutrients/raftaar.png",
      brand: "United Agro",
      mrp: 920,
      uom: "1 Ltr",
    },
    {
      id: 169,
      name: "ULTRA JADOO",
      category: "Insecticides",
      image: "/products/insecticide/45-Ultra-Jadoo.jpg",
      brand: "United Agro",
      mrp: 3200,
      uom: "5 Kg",
    },
    // United Dusting Powder
    {
      id: 170,
      name: "URSBAN 1.5% DP",
      category: "Dusting Powder",
      image: "/products/dusting_powder/Ursban-DP.jpg",
      brand: "United Agro",
      mrp: 1850,
      uom: "25 Kg",
    },
    {
      id: 171,
      name: "UTHION 5% DP",
      category: "Dusting Powder",
      image: "/products/dusting_powder/ushion.jpg",
      brand: "United Agro",
      mrp: 2100,
      uom: "25 Kg",
    },
    {
      id: 172,
      name: "UCIDIN DP",
      category: "Dusting Powder",
      image: "/products/dusting_powder/Ucidin Dusting Powder.jpg",
      brand: "United Agro",
      mrp: 3500,
      uom: "50 Kg",
    },
    {
      id: 173,
      name: "URJUN",
      category: "Dusting Powder",
      image: "/products/dusting_powder/urjunnew.jpg",
      brand: "United Agro",
      mrp: 3400,
      uom: "50 Kg",
    },
    // Parijat Products
    {
      id: 174,
      name: "Parijat Velektin",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_11311469521754572360.webp",
      brand: "Parijat",
      mrp: 1390,
      offerPrice: 566,
      offerPercentage: 59,
      uom: "300 Gm",
    },
    {
      id: 175,
      name: "Parijat Rafaz",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_7692368271751086413.webp",
      brand: "Parijat",
      mrp: 900,
      offerPrice: 450,
      offerPercentage: 50,
      uom: "250 ML",
    },
    {
      id: 176,
      name: "Parijat Rubah",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_16567126501753677372.webp",
      brand: "Parijat",
      mrp: 1625,
      offerPrice: 701,
      offerPercentage: 57,
      uom: "800 Gm",
    },
    {
      id: 177,
      name: "Parijat Polestar",
      category: "Fungicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_a8bb6c5539704e9455784ec609702c01-11-08-22-15-58-57.webp",
      brand: "Parijat",
      mrp: 900,
      offerPrice: 695,
      offerPercentage: 23,
      uom: "250 Gm",
    },
    {
      id: 178,
      name: "Parijat Oxyclear",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_87933c675179c381efae23ed22d05613-02-14-23-13-45-34.webp",
      brand: "Parijat",
      mrp: 1325,
      offerPrice: 488,
      offerPercentage: 63,
      uom: "500 ML",
    },
    {
      id: 179,
      name: "Parijat Supranil",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_a39cf3241c451cf81f17e72de7e9559b-05-05-23-17-36-52.webp",
      brand: "Parijat",
      mrp: 490,
      offerPrice: 163,
      offerPercentage: 67,
      uom: "250 ML",
    },
    {
      id: 180,
      name: "Parijat Dhol",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_81bb714e80b9dd4f9a185ebf2348170d-09-19-23-11-54-42.webp",
      brand: "Parijat",
      mrp: 320,
      offerPrice: 157,
      offerPercentage: 51,
      uom: "200 Gm",
    },
    {
      id: 181,
      name: "Parijat Glyclear",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_fc89b76e46824caebad113b562c2bb4b-09-19-23-12-28-21.webp",
      brand: "Parijat",
      mrp: 800,
      offerPrice: 321,
      offerPercentage: 60,
      uom: "1 Ltr",
    },
    {
      id: 182,
      name: "Parijat Pariquat",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_e4f0f27470f97066859c03172a9a01d4-01-03-24-15-50-43.webp",
      brand: "Parijat",
      mrp: 530,
      offerPrice: 74,
      offerPercentage: 86,
      uom: "1 Ltr",
    },
    {
      id: 183,
      name: "Parijat Mortel",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_6028649931716368960.webp",
      brand: "Parijat",
      mrp: 320,
      offerPrice: 70,
      offerPercentage: 78,
      uom: "200 ML",
    },
    {
      id: 184,
      name: "Parijat Leonis",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_530467401756961531.webp",
      brand: "Parijat",
      mrp: 590,
      offerPrice: 155,
      offerPercentage: 74,
      uom: "200 ML",
    },
    {
      id: 185,
      name: "Parijat Diatron",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_848559851716025826.webp",
      brand: "Parijat",
      mrp: 240,
      offerPrice: 83,
      offerPercentage: 65,
      uom: "50 Gm",
    },
    {
      id: 186,
      name: "Parijat Daita",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_17630701161757485777.webp",
      brand: "Parijat",
      mrp: 480,
      offerPrice: 317,
      offerPercentage: 34,
      uom: "200 ML",
    },
    {
      id: 187,
      name: "Parijat PARAMINE",
      category: "Herbicides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_10710631321750684254.webp",
      brand: "Parijat",
      mrp: 700,
      offerPrice: 210,
      offerPercentage: 70,
      uom: "1 Ltr",
    },
    {
      id: 188,
      name: "Parijat GIBAC",
      category: "Biostimulants",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_10368082771757486885.webp",
      brand: "Parijat",
      mrp: 1200,
      offerPrice: 581,
      offerPercentage: 52,
      uom: "1 Ltr",
    },
    {
      id: 189,
      name: "Parajita Fiptor 80",
      category: "Insecticides",
      image: "https://dujjhct8zer0r.cloudfront.net/media/prod_image/thumb/thumb_18482964161757486152.webp",
      brand: "Parijat",
      mrp: 3250,
      offerPrice: 1565,
      offerPercentage: 52,
      uom: "200 Gm",
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
