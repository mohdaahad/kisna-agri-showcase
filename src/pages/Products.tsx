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

  const categories = ["All", "Insecticides", "Fungicides", "Fertilizers"];

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
    },
    {
      id: 5,
      name: "JU-Farrera",
      category: "Insecticides",
      image: "/products/ju-farrera.png",
      brand: "JU Agri Sciences",
      mrp: 1150,
      uom: "1 Liter",
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
    },
    {
      id: 7,
      name: "JU Hemp",
      category: "Insecticides",
      image: "/products/ju-hemp.png",
      brand: "JU Agri Sciences",
      mrp: 890,
      uom: "500ml",
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
    },
    {
      id: 9,
      name: "Tridev",
      category: "Insecticides",
      image: "/products/tridev.png",
      brand: "JU Agri Sciences",
      mrp: 1100,
      uom: "1 Liter",
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
    },
    {
      id: 12,
      name: "JU-PLANO",
      category: "Fungicides",
      image: "/products/ju-plano.png",
      brand: "JU Agri Sciences",
      mrp: 950,
      uom: "500ml",
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
    },
    {
      id: 14,
      name: "NOVAZIDE",
      category: "Insecticides",
      image: "/products/novazide.png",
      brand: "JU Agri Sciences",
      mrp: 820,
      uom: "500ml",
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
    },
    {
      id: 16,
      name: "CARTAP GR",
      category: "Insecticides",
      image: "/products/cartap-gr.png",
      brand: "JU Agri Sciences",
      mrp: 490,
      uom: "1 Kg",
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
    },
    {
      id: 19,
      name: "XYLO GREEN",
      category: "Insecticides",
      image: "/products/xylo-green.png",
      brand: "JU Agri Sciences",
      mrp: 920,
      uom: "500ml",
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
    },
    {
      id: 22,
      name: "THIOLA",
      category: "Fungicides",
      image: "/products/thiola.png",
      brand: "JU Agri Sciences",
      mrp: 850,
      uom: "500ml",
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
    },
    {
      id: 24,
      name: "MANTRA FS",
      category: "Insecticides",
      image: "/products/mantra-fs.png",
      brand: "JU Agri Sciences",
      mrp: 540,
      uom: "500ml",
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
    },
    {
      id: 26,
      name: "SAMRAT",
      category: "Insecticides",
      image: "/products/samrat.png",
      brand: "JU Agri Sciences",
      mrp: 890,
      uom: "500ml",
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
    },
    {
      id: 28,
      name: "CHLORO-20",
      category: "Fertilizers",
      image: "/products/chloro-20.png",
      brand: "JU Agri Sciences",
      mrp: 420,
      uom: "1 Liter",
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
    },
    {
      id: 30,
      name: "MANTRA",
      category: "Fertilizers",
      image: "/products/mantra.png",
      brand: "JU Agri Sciences",
      mrp: 750,
      uom: "1 Liter",
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
    },
    {
      id: 32,
      name: "Cyper-25",
      category: "Insecticides",
      image: "/products/cyper-25.png",
      brand: "JU Agri Sciences",
      mrp: 520,
      uom: "500ml",
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
    },
    {
      id: 34,
      name: "JUPITER-505",
      category: "Fertilizers",
      image: "/products/jupiter-505.png",
      brand: "JU Agri Sciences",
      mrp: 820,
      uom: "1 Liter",
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
    },
    {
      id: 36,
      name: "Alpha",
      category: "Fertilizers",
      image: "/products/alpha.png",
      brand: "JU Agri Sciences",
      mrp: 720,
      uom: "1 Liter",
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
    },
    {
      id: 38,
      name: "VENUS",
      category: "Fertilizers",
      image: "/products/venus.png",
      brand: "JU Agri Sciences",
      mrp: 950,
      uom: "1 Liter",
    },
    // Parijat Agrochemicals Products
    {
      id: 39,
      name: "AADAT (Patented Product)",
      category: "Insecticides",
      image: "/products/aadat__patented_product_.png",
      brand: "Parijat Agrochemicals",
      mrp: 1200,
      offerPrice: 1080,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 40,
      name: "ABADDON",
      category: "Insecticides",
      image: "/products/abaddon.jpg",
      brand: "Parijat Agrochemicals",
      mrp: 850,
      uom: "1 Liter",
    },
    {
      id: 41,
      name: "AC-116",
      category: "Insecticides",
      image: "/products/ac_116.png",
      brand: "Parijat Agrochemicals",
      mrp: 750,
      offerPrice: 675,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 42,
      name: "AHEAD",
      category: "Insecticides",
      image: "/products/ahead.png",
      brand: "Parijat Agrochemicals",
      mrp: 920,
      uom: "1 Liter",
    },
    {
      id: 43,
      name: "AMBIVI",
      category: "Insecticides",
      image: "/products/ambivi.png",
      brand: "Parijat Agrochemicals",
      mrp: 680,
      offerPrice: 612,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 44,
      name: "APNAZEB M-45",
      category: "Fungicides",
      image: "/products/apnazeb_m_45.png",
      brand: "Parijat Agrochemicals",
      mrp: 550,
      uom: "1 Kg",
    },
    {
      id: 45,
      name: "ARADO Q+",
      category: "Insecticides",
      image: "/products/arado_q_.jpg",
      brand: "Parijat Agrochemicals",
      mrp: 1100,
      offerPrice: 990,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 46,
      name: "AUDICIA",
      category: "Insecticides",
      image: "/products/audicia.png",
      brand: "Parijat Agrochemicals",
      mrp: 980,
      uom: "1 Liter",
    },
    {
      id: 47,
      name: "BACE-50",
      category: "Insecticides",
      image: "/products/bace_50.png",
      brand: "Parijat Agrochemicals",
      mrp: 720,
      offerPrice: 648,
      offerPercentage: 10,
      uom: "1 Kg",
    },
    {
      id: 48,
      name: "BRILLAR",
      category: "Insecticides",
      image: "/products/brillar.jpg",
      brand: "Parijat Agrochemicals",
      mrp: 890,
      uom: "1 Liter",
    },
    {
      id: 49,
      name: "CARMI",
      category: "Insecticides",
      image: "/products/carmi.png",
      brand: "Parijat Agrochemicals",
      mrp: 650,
      offerPrice: 585,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 50,
      name: "CORATO",
      category: "Insecticides",
      image: "/products/corato.png",
      brand: "Parijat Agrochemicals",
      mrp: 1050,
      uom: "1 Liter",
    },
    {
      id: 51,
      name: "CREEPNIX",
      category: "Insecticides",
      image: "/products/creepnix.png",
      brand: "Parijat Agrochemicals",
      mrp: 780,
      offerPrice: 702,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 52,
      name: "CUTLASS",
      category: "Insecticides",
      image: "/products/cutlass.jpg",
      brand: "Parijat Agrochemicals",
      mrp: 950,
      uom: "1 Liter",
    },
    {
      id: 53,
      name: "DAHAN",
      category: "Insecticides",
      image: "/products/dahan.jpg",
      brand: "Parijat Agrochemicals",
      mrp: 820,
      offerPrice: 738,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 54,
      name: "DAIKO",
      category: "Insecticides",
      image: "/products/daiko.png",
      brand: "Parijat Agrochemicals",
      mrp: 880,
      uom: "1 Liter",
    },
    {
      id: 55,
      name: "DAITA",
      category: "Insecticides",
      image: "/products/daita.png",
      brand: "Parijat Agrochemicals",
      mrp: 600,
      offerPrice: 540,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 56,
      name: "DEMOLIT",
      category: "Insecticides",
      image: "/products/demolit.png",
      brand: "Parijat Agrochemicals",
      mrp: 750,
      uom: "1 Liter",
    },
    {
      id: 57,
      name: "DEVGADSTAR-23",
      category: "Fertilizers",
      image: "/products/devgadstar_23.jpg",
      brand: "Parijat Agrochemicals",
      mrp: 580,
      offerPrice: 522,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 58,
      name: "DHOL",
      category: "Insecticides",
      image: "/products/dhol.png",
      brand: "Parijat Agrochemicals",
      mrp: 690,
      uom: "500ml",
    },
    {
      id: 59,
      name: "DIATRON",
      category: "Insecticides",
      image: "/products/diatron.png",
      brand: "Parijat Agrochemicals",
      mrp: 720,
      offerPrice: 648,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 60,
      name: "DOZAN",
      category: "Insecticides",
      image: "/products/dozan.png",
      brand: "Parijat Agrochemicals",
      mrp: 650,
      uom: "500ml",
    },
    {
      id: 61,
      name: "EEYO PSP 500",
      category: "Fertilizers",
      image: "/products/eeyo_psp_500.png",
      brand: "Parijat Agrochemicals",
      mrp: 550,
      offerPrice: 495,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 62,
      name: "ELONA",
      category: "Insecticides",
      image: "/products/elona.png",
      brand: "Parijat Agrochemicals",
      mrp: 780,
      uom: "1 Liter",
    },
    {
      id: 63,
      name: "FIPTOR 80",
      category: "Insecticides",
      image: "/products/fiptor_80.png",
      brand: "Parijat Agrochemicals",
      mrp: 850,
      offerPrice: 765,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 64,
      name: "FLYER",
      category: "Insecticides",
      image: "/products/flyer.jpg",
      brand: "Parijat Agrochemicals",
      mrp: 920,
      uom: "1 Liter",
    },
    {
      id: 65,
      name: "FORMITE",
      category: "Fungicides",
      image: "/products/formite.png",
      brand: "Parijat Agrochemicals",
      mrp: 680,
      offerPrice: 612,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 66,
      name: "FUKA",
      category: "Insecticides",
      image: "/products/fuka.png",
      brand: "Parijat Agrochemicals",
      mrp: 600,
      uom: "500ml",
    },
    {
      id: 67,
      name: "GIBAC",
      category: "Fungicides",
      image: "/products/gibac.png",
      brand: "Parijat Agrochemicals",
      mrp: 550,
      offerPrice: 495,
      offerPercentage: 10,
      uom: "1 Kg",
    },
    {
      id: 68,
      name: "GLYCLEAR",
      category: "Fungicides",
      image: "/products/glyclear.png",
      brand: "Parijat Agrochemicals",
      mrp: 720,
      uom: "1 Liter",
    },
    {
      id: 69,
      name: "GRIMA",
      category: "Insecticides",
      image: "/products/grima.png",
      brand: "Parijat Agrochemicals",
      mrp: 750,
      offerPrice: 675,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 70,
      name: "HAZZ-T",
      category: "Insecticides",
      image: "/products/hazz_t.png",
      brand: "Parijat Agrochemicals",
      mrp: 680,
      uom: "1 Liter",
    },
    {
      id: 71,
      name: "HOP-MAAR",
      category: "Insecticides",
      image: "/products/hop_maar.png",
      brand: "Parijat Agrochemicals",
      mrp: 650,
      offerPrice: 585,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 72,
      name: "IMAZE-SUPER",
      category: "Fungicides",
      image: "/products/imaze_super.png",
      brand: "Parijat Agrochemicals",
      mrp: 580,
      uom: "1 Liter",
    },
    {
      id: 73,
      name: "IMPLICITE",
      category: "Insecticides",
      image: "/products/implicite.png",
      brand: "Parijat Agrochemicals",
      mrp: 820,
      offerPrice: 738,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 74,
      name: "INDAZOLE",
      category: "Fungicides",
      image: "/products/indazole.png",
      brand: "Parijat Agrochemicals",
      mrp: 600,
      uom: "500ml",
    },
    {
      id: 75,
      name: "IS SURE",
      category: "Fungicides",
      image: "/products/is_sure.png",
      brand: "Parijat Agrochemicals",
      mrp: 550,
      offerPrice: 495,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 76,
      name: "JIMITA",
      category: "Insecticides",
      image: "/products/jimita.png",
      brand: "Parijat Agrochemicals",
      mrp: 750,
      uom: "1 Liter",
    },
    {
      id: 77,
      name: "JONGA",
      category: "Insecticides",
      image: "/products/jonga.png",
      brand: "Parijat Agrochemicals",
      mrp: 680,
      offerPrice: 612,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 78,
      name: "KANJO SP",
      category: "Insecticides",
      image: "/products/kanjo_sp.png",
      brand: "Parijat Agrochemicals",
      mrp: 720,
      uom: "1 Liter",
    },
    {
      id: 79,
      name: "KANJO",
      category: "Insecticides",
      image: "/products/kanjo.gif",
      brand: "Parijat Agrochemicals",
      mrp: 650,
      offerPrice: 585,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 80,
      name: "KAZIRO",
      category: "Insecticides",
      image: "/products/kaziro.png",
      brand: "Parijat Agrochemicals",
      mrp: 780,
      uom: "1 Liter",
    },
    {
      id: 81,
      name: "KING CARB",
      category: "Fertilizers",
      image: "/products/king_carb.png",
      brand: "Parijat Agrochemicals",
      mrp: 550,
      offerPrice: 495,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 82,
      name: "KIRIN",
      category: "Insecticides",
      image: "/products/kirin.gif",
      brand: "Parijat Agrochemicals",
      mrp: 720,
      uom: "1 Liter",
    },
    {
      id: 83,
      name: "KIZOMBA",
      category: "Insecticides",
      image: "/products/kizomba.png",
      brand: "Parijat Agrochemicals",
      mrp: 680,
      offerPrice: 612,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 84,
      name: "LEONIS CO MAX",
      category: "Fertilizers",
      image: "/products/leonis_co_max.png",
      brand: "Parijat Agrochemicals",
      mrp: 850,
      uom: "1 Liter",
    },
    {
      id: 85,
      name: "LEONIS",
      category: "Fertilizers",
      image: "/products/leonis.jpg",
      brand: "Parijat Agrochemicals",
      mrp: 920,
      offerPrice: 828,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 86,
      name: "LOCSLAY 5",
      category: "Insecticides",
      image: "/products/locslay_5.png",
      brand: "Parijat Agrochemicals",
      mrp: 600,
      uom: "500ml",
    },
    {
      id: 87,
      name: "LUKARIO",
      category: "Insecticides",
      image: "/products/lukario.png",
      brand: "Parijat Agrochemicals",
      mrp: 750,
      offerPrice: 675,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 88,
      name: "MEDAD",
      category: "Insecticides",
      image: "/products/medad.png",
      brand: "Parijat Agrochemicals",
      mrp: 680,
      uom: "500ml",
    },
    {
      id: 89,
      name: "METRIPIL",
      category: "Insecticides",
      image: "/products/metripil.gif",
      brand: "Parijat Agrochemicals",
      mrp: 720,
      offerPrice: 648,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 90,
      name: "Mkel FUZICO-FS",
      category: "Fungicides",
      image: "/products/mkel_fuzico_fs.png",
      brand: "Parijat Agrochemicals",
      mrp: 650,
      uom: "500ml",
    },
    {
      id: 91,
      name: "MOJATI",
      category: "Insecticides",
      image: "/products/mojati.png",
      brand: "Parijat Agrochemicals",
      mrp: 780,
      offerPrice: 702,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 92,
      name: "MORTEL GR",
      category: "Insecticides",
      image: "/products/mortel_gr.png",
      brand: "Parijat Agrochemicals",
      mrp: 550,
      uom: "1 Kg",
    },
    {
      id: 93,
      name: "MORTEL PLUS",
      category: "Insecticides",
      image: "/products/mortel_plus.png",
      brand: "Parijat Agrochemicals",
      mrp: 680,
      offerPrice: 612,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 94,
      name: "MORTEL SC",
      category: "Insecticides",
      image: "/products/mortel_sc.png",
      brand: "Parijat Agrochemicals",
      mrp: 720,
      uom: "1 Liter",
    },
    {
      id: 95,
      name: "NAGARA SUPER",
      category: "Insecticides",
      image: "/products/nagara_super.png",
      brand: "Parijat Agrochemicals",
      mrp: 750,
      offerPrice: 675,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 96,
      name: "NAGARA",
      category: "Insecticides",
      image: "/products/nagara.png",
      brand: "Parijat Agrochemicals",
      mrp: 650,
      uom: "500ml",
    },
    {
      id: 97,
      name: "NAPOLEAN XTRA",
      category: "Fertilizers",
      image: "/products/napolean_xtra.png",
      brand: "Parijat Agrochemicals",
      mrp: 580,
      offerPrice: 522,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 98,
      name: "NAPOLEON",
      category: "Fertilizers",
      image: "/products/napoleon.png",
      brand: "Parijat Agrochemicals",
      mrp: 720,
      uom: "1 Liter",
    },
    {
      id: 99,
      name: "NISCHIT",
      category: "Insecticides",
      image: "/products/nischit.jpg",
      brand: "Parijat Agrochemicals",
      mrp: 850,
      offerPrice: 765,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 100,
      name: "NORIKO T3",
      category: "Fertilizers",
      image: "/products/noriko_t3.png",
      brand: "Parijat Agrochemicals",
      mrp: 680,
      uom: "500ml",
    },
    {
      id: 101,
      name: "NOWKO",
      category: "Insecticides",
      image: "/products/nowko.png",
      brand: "Parijat Agrochemicals",
      mrp: 750,
      offerPrice: 675,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 102,
      name: "ONTEEM",
      category: "Insecticides",
      image: "/products/onteem.png",
      brand: "Parijat Agrochemicals",
      mrp: 680,
      uom: "500ml",
    },
    {
      id: 103,
      name: "ORIENTAL",
      category: "Insecticides",
      image: "/products/oriental.png",
      brand: "Parijat Agrochemicals",
      mrp: 720,
      offerPrice: 648,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 104,
      name: "ORTEKO FG",
      category: "Fungicides",
      image: "/products/orteko_fg.png",
      brand: "Parijat Agrochemicals",
      mrp: 650,
      uom: "1 Liter",
    },
    {
      id: 105,
      name: "OXYCLEAR",
      category: "Fungicides",
      image: "/products/oxyclear.png",
      brand: "Parijat Agrochemicals",
      mrp: 600,
      offerPrice: 540,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 106,
      name: "PARAMINE",
      category: "Insecticides",
      image: "/products/paramine.png",
      brand: "Parijat Agrochemicals",
      mrp: 750,
      uom: "1 Liter",
    },
    {
      id: 107,
      name: "PARI ROOT PLUS",
      category: "Fertilizers",
      image: "/products/pari_root_plus.png",
      brand: "Parijat Agrochemicals",
      mrp: 580,
      offerPrice: 522,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 108,
      name: "Paribact-K",
      category: "Fertilizers",
      image: "/products/paribact_k.png",
      brand: "Parijat Agrochemicals",
      mrp: 650,
      uom: "500ml",
    },
    {
      id: 109,
      name: "Paribloom-23",
      category: "Fertilizers",
      image: "/products/paribloom_23.jpg",
      brand: "Parijat Agrochemicals",
      mrp: 720,
      offerPrice: 648,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 110,
      name: "PARICLEAR",
      category: "Fungicides",
      image: "/products/pariclear.jpg",
      brand: "Parijat Agrochemicals",
      mrp: 550,
      uom: "1 Liter",
    },
    {
      id: 111,
      name: "PARIFLEX",
      category: "Insecticides",
      image: "/products/pariflex.png",
      brand: "Parijat Agrochemicals",
      mrp: 780,
      offerPrice: 702,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 112,
      name: "PARIMAZE",
      category: "Insecticides",
      image: "/products/parimaze.png",
      brand: "Parijat Agrochemicals",
      mrp: 750,
      uom: "500ml",
    },
    {
      id: 113,
      name: "PARIQUAT",
      category: "Fungicides",
      image: "/products/pariquat.png",
      brand: "Parijat Agrochemicals",
      mrp: 680,
      offerPrice: 612,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 114,
      name: "PARISTAR",
      category: "Insecticides",
      image: "/products/paristar.png",
      brand: "Parijat Agrochemicals",
      mrp: 720,
      uom: "1 Liter",
    },
    {
      id: 115,
      name: "PARIURVA",
      category: "Fertilizers",
      image: "/products/pariurva.png",
      brand: "Parijat Agrochemicals",
      mrp: 650,
      offerPrice: 585,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 116,
      name: "PARIZINE",
      category: "Insecticides",
      image: "/products/parizine.png",
      brand: "Parijat Agrochemicals",
      mrp: 850,
      uom: "1 Liter",
    },
    {
      id: 117,
      name: "PARIZOX-T2",
      category: "Fungicides",
      image: "/products/parizox_t2.png",
      brand: "Parijat Agrochemicals",
      mrp: 780,
      offerPrice: 702,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 118,
      name: "PARIZOX",
      category: "Fungicides",
      image: "/products/parizox.png",
      brand: "Parijat Agrochemicals",
      mrp: 720,
      uom: "500ml",
    },
    {
      id: 119,
      name: "PARSUL",
      category: "Fungicides",
      image: "/products/parsul.png",
      brand: "Parijat Agrochemicals",
      mrp: 650,
      offerPrice: 585,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 120,
      name: "PEACK",
      category: "Insecticides",
      image: "/products/peack.png",
      brand: "Parijat Agrochemicals",
      mrp: 750,
      uom: "1 Liter",
    },
    {
      id: 121,
      name: "PERFORM",
      category: "Insecticides",
      image: "/products/perform.png",
      brand: "Parijat Agrochemicals",
      mrp: 680,
      offerPrice: 612,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 122,
      name: "SUPRANIL",
      category: "Insecticides",
      image: "/products/supranil.png",
      brand: "Parijat Agrochemicals",
      mrp: 720,
      uom: "1 Liter",
    },
    {
      id: 123,
      name: "TABAH",
      category: "Insecticides",
      image: "/products/tabah.png",
      brand: "Parijat Agrochemicals",
      mrp: 850,
      offerPrice: 765,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 124,
      name: "TAKE 44",
      category: "Insecticides",
      image: "/products/take_44.png",
      brand: "Parijat Agrochemicals",
      mrp: 600,
      uom: "500ml",
    },
    {
      id: 125,
      name: "TANCHUM",
      category: "Insecticides",
      image: "/products/tanchum.png",
      brand: "Parijat Agrochemicals",
      mrp: 750,
      offerPrice: 675,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 126,
      name: "TASAR",
      category: "Insecticides",
      image: "/products/tasar.jpg",
      brand: "Parijat Agrochemicals",
      mrp: 780,
      uom: "1 Liter",
    },
    {
      id: 127,
      name: "TEGATA",
      category: "Insecticides",
      image: "/products/tegata.png",
      brand: "Parijat Agrochemicals",
      mrp: 680,
      offerPrice: 612,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 128,
      name: "TEMBINE",
      category: "Insecticides",
      image: "/products/tembine.png",
      brand: "Parijat Agrochemicals",
      mrp: 720,
      uom: "1 Liter",
    },
    {
      id: 129,
      name: "THOR PLUS",
      category: "Fertilizers",
      image: "/products/thor_plus.png",
      brand: "Parijat Agrochemicals",
      mrp: 650,
      offerPrice: 585,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 130,
      name: "THOR",
      category: "Fertilizers",
      image: "/products/thor.png",
      brand: "Parijat Agrochemicals",
      mrp: 720,
      uom: "1 Liter",
    },
    {
      id: 131,
      name: "TUCKZILA",
      category: "Insecticides",
      image: "/products/tuckzila.jpg",
      brand: "Parijat Agrochemicals",
      mrp: 920,
      offerPrice: 828,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 132,
      name: "URUMI",
      category: "Insecticides",
      image: "/products/urumi.png",
      brand: "Parijat Agrochemicals",
      mrp: 850,
      uom: "1 Liter",
    },
    {
      id: 133,
      name: "VELEKTIN",
      category: "Insecticides",
      image: "/products/velektin.png",
      brand: "Parijat Agrochemicals",
      mrp: 780,
      offerPrice: 702,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 134,
      name: "VOSTRIX",
      category: "Insecticides",
      image: "/products/vostrix.png",
      brand: "Parijat Agrochemicals",
      mrp: 750,
      uom: "1 Liter",
    },
    {
      id: 135,
      name: "XYFEN ULTRA",
      category: "Insecticides",
      image: "/products/xyfen_ultra.png",
      brand: "Parijat Agrochemicals",
      mrp: 680,
      offerPrice: 612,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 136,
      name: "ZERMIA",
      category: "Insecticides",
      image: "/products/zermia.jpg",
      brand: "Parijat Agrochemicals",
      mrp: 920,
      uom: "1 Liter",
    },
    {
      id: 137,
      name: "ZINCAM 395",
      category: "Fertilizers",
      image: "/products/zincam_395.png",
      brand: "Parijat Agrochemicals",
      mrp: 580,
      offerPrice: 522,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 138,
      name: "ZIRAAT",
      category: "Insecticides",
      image: "/products/ziraat.jpg",
      brand: "Parijat Agrochemicals",
      mrp: 850,
      offerPrice: 765,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 139,
      name: "ZIRYAN",
      category: "Fertilizers",
      image: "/products/ziryan.png",
      brand: "Parijat Agrochemicals",
      mrp: 720,
      uom: "1 Liter",
    },
    {
      id: 140,
      name: "ZORYA",
      category: "Insecticides",
      image: "/products/zorya.png",
      brand: "Parijat Agrochemicals",
      mrp: 750,
      offerPrice: 675,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    // Crystal Crop Protection Products
    {
      id: 141,
      name: "Abacin",
      category: "Insecticides",
      image: "/products/abacin.jpg",
      brand: "Crystal Crop Protection",
      mrp: 650,
      offerPrice: 585,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 142,
      name: "Apex-50",
      category: "Insecticides",
      image: "/products/apex_50.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      uom: "1 Liter",
    },
    {
      id: 143,
      name: "Baaz",
      category: "Insecticides",
      image: "/products/baaz.jpg",
      brand: "Crystal Crop Protection",
      mrp: 680,
      offerPrice: 612,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 144,
      name: "Billo",
      category: "Insecticides",
      image: "/products/billo.jpg",
      brand: "Crystal Crop Protection",
      mrp: 750,
      uom: "1 Liter",
    },
    {
      id: 145,
      name: "Dursban",
      category: "Insecticides",
      image: "/products/dursban.jpg",
      brand: "Crystal Crop Protection",
      mrp: 850,
      offerPrice: 765,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 146,
      name: "Furadan",
      category: "Insecticides",
      image: "/products/furadan.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      uom: "1 Liter",
    },
    {
      id: 147,
      name: "Judo Plus",
      category: "Insecticides",
      image: "/products/judo_plus.jpg",
      brand: "Crystal Crop Protection",
      mrp: 680,
      offerPrice: 612,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 148,
      name: "Predator",
      category: "Insecticides",
      image: "/products/predator.jpg",
      brand: "Crystal Crop Protection",
      mrp: 920,
      uom: "1 Liter",
    },
    {
      id: 149,
      name: "Splendour",
      category: "Insecticides",
      image: "/products/splendour.jpg",
      brand: "Crystal Crop Protection",
      mrp: 780,
      offerPrice: 702,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 150,
      name: "Voltax",
      category: "Insecticides",
      image: "/products/voltax.png",
      brand: "Crystal Crop Protection",
      mrp: 850,
      uom: "1 Liter",
    },
    {
      id: 151,
      name: "Confidence 555",
      category: "Insecticides",
      image: "/products/confidence_555.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      offerPrice: 648,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 152,
      name: "Eldrin",
      category: "Insecticides",
      image: "/products/eldrin.jpg",
      brand: "Crystal Crop Protection",
      mrp: 680,
      uom: "500ml",
    },
    {
      id: 153,
      name: "Extra Super",
      category: "Insecticides",
      image: "/products/extra_super.jpg",
      brand: "Crystal Crop Protection",
      mrp: 750,
      offerPrice: 675,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 154,
      name: "Furadan Ultra",
      category: "Insecticides",
      image: "/products/furadan_ultra.jpg",
      brand: "Crystal Crop Protection",
      mrp: 850,
      uom: "1 Liter",
    },
    {
      id: 155,
      name: "Lara-909",
      category: "Insecticides",
      image: "/products/lara_909.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      offerPrice: 648,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 156,
      name: "Lunox",
      category: "Insecticides",
      image: "/products/lunox.jpg",
      brand: "Crystal Crop Protection",
      mrp: 680,
      uom: "500ml",
    },
    {
      id: 157,
      name: "Missile",
      category: "Insecticides",
      image: "/products/missile.jpg",
      brand: "Crystal Crop Protection",
      mrp: 780,
      offerPrice: 702,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 158,
      name: "Mitolin",
      category: "Insecticides",
      image: "/products/mitolin.jpg",
      brand: "Crystal Crop Protection",
      mrp: 750,
      uom: "1 Liter",
    },
    {
      id: 159,
      name: "Neo Super",
      category: "Insecticides",
      image: "/products/neo_super.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      offerPrice: 648,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 160,
      name: "Nidan",
      category: "Insecticides",
      image: "/products/nidan.jpg",
      brand: "Crystal Crop Protection",
      mrp: 680,
      uom: "500ml",
    },
    {
      id: 161,
      name: "Proclaim",
      category: "Insecticides",
      image: "/products/proclaim.jpg",
      brand: "Crystal Crop Protection",
      mrp: 850,
      offerPrice: 765,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 162,
      name: "Rapid",
      category: "Insecticides",
      image: "/products/rapid.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      uom: "1 Liter",
    },
    {
      id: 163,
      name: "Record",
      category: "Insecticides",
      image: "/products/record.jpg",
      brand: "Crystal Crop Protection",
      mrp: 680,
      offerPrice: 612,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 164,
      name: "Snapper",
      category: "Insecticides",
      image: "/products/snapper.jpg",
      brand: "Crystal Crop Protection",
      mrp: 750,
      uom: "1 Liter",
    },
    {
      id: 165,
      name: "Tribune",
      category: "Insecticides",
      image: "/products/tribune.jpg",
      brand: "Crystal Crop Protection",
      mrp: 780,
      offerPrice: 702,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 166,
      name: "Carlos",
      category: "Insecticides",
      image: "/products/carlos.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      uom: "1 Liter",
    },
    {
      id: 167,
      name: "MANDATE",
      category: "Insecticides",
      image: "/products/mandate.jpg",
      brand: "Crystal Crop Protection",
      mrp: 850,
      offerPrice: 765,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 168,
      name: "ACM-9",
      category: "Insecticides",
      image: "/products/acm_9.jpg",
      brand: "Crystal Crop Protection",
      mrp: 600,
      uom: "500ml",
    },
    {
      id: 169,
      name: "Allquit",
      category: "Fungicides",
      image: "/products/allquit.jpg",
      brand: "Crystal Crop Protection",
      mrp: 550,
      offerPrice: 495,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 170,
      name: "Avtaar",
      category: "Insecticides",
      image: "/products/avtaar.jpg",
      brand: "Crystal Crop Protection",
      mrp: 680,
      uom: "1 Liter",
    },
    {
      id: 171,
      name: "BANGO",
      category: "Insecticides",
      image: "/products/bango.jpg",
      brand: "Crystal Crop Protection",
      mrp: 750,
      offerPrice: 675,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 172,
      name: "BENTILA",
      category: "Insecticides",
      image: "/products/bentila.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      uom: "1 Liter",
    },
    {
      id: 173,
      name: "Clinton",
      category: "Insecticides",
      image: "/products/clinton.jpg",
      brand: "Crystal Crop Protection",
      mrp: 680,
      offerPrice: 612,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 174,
      name: "Guard",
      category: "Fungicides",
      image: "/products/guard.jpg",
      brand: "Crystal Crop Protection",
      mrp: 650,
      uom: "1 Liter",
    },
    {
      id: 175,
      name: "Penoxa",
      category: "Fungicides",
      image: "/products/penoxa.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      offerPrice: 648,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 176,
      name: "Ronaldo",
      category: "Insecticides",
      image: "/products/ronaldo.jpg",
      brand: "Crystal Crop Protection",
      mrp: 780,
      uom: "1 Liter",
    },
    {
      id: 177,
      name: "Shift",
      category: "Fungicides",
      image: "/products/shift.jpg",
      brand: "Crystal Crop Protection",
      mrp: 680,
      offerPrice: 612,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 178,
      name: "Srizone",
      category: "Fungicides",
      image: "/products/srizone.jpg",
      brand: "Crystal Crop Protection",
      mrp: 750,
      uom: "1 Liter",
    },
    {
      id: 179,
      name: "Topper 77",
      category: "Fungicides",
      image: "/products/topper_77.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      offerPrice: 648,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 180,
      name: "Weedor",
      category: "Fungicides",
      image: "/products/weedor.jpg",
      brand: "Crystal Crop Protection",
      mrp: 650,
      uom: "500ml",
    },
    {
      id: 181,
      name: "AMORA",
      category: "Insecticides",
      image: "/products/amora.jpg",
      brand: "Crystal Crop Protection",
      mrp: 850,
      offerPrice: 765,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 182,
      name: "TAMBOLA",
      category: "Insecticides",
      image: "/products/tambola.jpg",
      brand: "Crystal Crop Protection",
      mrp: 780,
      uom: "1 Liter",
    },
    {
      id: 183,
      name: "CUTOUT-38",
      category: "Fungicides",
      image: "/products/cutout_38.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      offerPrice: 648,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 184,
      name: "Hola",
      category: "Insecticides",
      image: "/products/hola.jpg",
      brand: "Crystal Crop Protection",
      mrp: 680,
      uom: "500ml",
    },
    {
      id: 185,
      name: "Izuka",
      category: "Insecticides",
      image: "/products/izuka.jpg",
      brand: "Crystal Crop Protection",
      mrp: 750,
      offerPrice: 675,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 186,
      name: "Novelty Gold",
      category: "Fertilizers",
      image: "/products/novelty_gold.jpg",
      brand: "Crystal Crop Protection",
      mrp: 580,
      uom: "1 Liter",
    },
    {
      id: 187,
      name: "Traam",
      category: "Insecticides",
      image: "/products/traam.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      offerPrice: 648,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 188,
      name: "AFFINITY FORCE",
      category: "Insecticides",
      image: "/products/affinity_force.jpg",
      brand: "Crystal Crop Protection",
      mrp: 850,
      uom: "1 Liter",
    },
    {
      id: 189,
      name: "ARSA",
      category: "Insecticides",
      image: "/products/arsa.jpg",
      brand: "Crystal Crop Protection",
      mrp: 780,
      offerPrice: 702,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 190,
      name: "AWSUM",
      category: "Insecticides",
      image: "/products/awsum.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      uom: "1 Liter",
    },
    {
      id: 191,
      name: "CRACKER",
      category: "Insecticides",
      image: "/products/cracker.jpg",
      brand: "Crystal Crop Protection",
      mrp: 680,
      offerPrice: 612,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 192,
      name: "RICEACT",
      category: "Fertilizers",
      image: "/products/riceact.png",
      brand: "Crystal Crop Protection",
      mrp: 650,
      uom: "1 Liter",
    },
    {
      id: 193,
      name: "Sunrice",
      category: "Fertilizers",
      image: "/products/sunrice.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      offerPrice: 648,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 194,
      name: "Azotrix",
      category: "Fertilizers",
      image: "/products/azotrix.jpg",
      brand: "Crystal Crop Protection",
      mrp: 580,
      uom: "1 Liter",
    },
    {
      id: 195,
      name: "Bavistin",
      category: "Fungicides",
      image: "/products/bavistin.jpg",
      brand: "Crystal Crop Protection",
      mrp: 550,
      offerPrice: 495,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 196,
      name: "Blue Copper",
      category: "Fungicides",
      image: "/products/blue_copper.jpg",
      brand: "Crystal Crop Protection",
      mrp: 600,
      uom: "1 Liter",
    },
    {
      id: 197,
      name: "Kyoto",
      category: "Fungicides",
      image: "/products/kyoto.jpg",
      brand: "Crystal Crop Protection",
      mrp: 680,
      offerPrice: 612,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 198,
      name: "Pluton",
      category: "Fungicides",
      image: "/products/pluton.jpg",
      brand: "Crystal Crop Protection",
      mrp: 750,
      uom: "1 Liter",
    },
    {
      id: 199,
      name: "Sulphin",
      category: "Fungicides",
      image: "/products/sulphin.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      offerPrice: 648,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 200,
      name: "Sure",
      category: "Fungicides",
      image: "/products/sure.jpg",
      brand: "Crystal Crop Protection",
      mrp: 650,
      uom: "500ml",
    },
    {
      id: 201,
      name: "Tilt",
      category: "Fungicides",
      image: "/products/tilt.jpg",
      brand: "Crystal Crop Protection",
      mrp: 680,
      offerPrice: 612,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 202,
      name: "Treat Power",
      category: "Fungicides",
      image: "/products/treat_power.jpg",
      brand: "Crystal Crop Protection",
      mrp: 750,
      uom: "1 Liter",
    },
    {
      id: 203,
      name: "Cryonil",
      category: "Fungicides",
      image: "/products/cryonil.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      offerPrice: 648,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 204,
      name: "SENATE",
      category: "Fungicides",
      image: "/products/senate.jpg",
      brand: "Crystal Crop Protection",
      mrp: 850,
      uom: "1 Liter",
    },
    {
      id: 205,
      name: "Cyplon",
      category: "Fungicides",
      image: "/products/cyplon.jpg",
      brand: "Crystal Crop Protection",
      mrp: 780,
      offerPrice: 702,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 206,
      name: "Monceren",
      category: "Fungicides",
      image: "/products/monceren.jpg",
      brand: "Crystal Crop Protection",
      mrp: 750,
      uom: "1 Liter",
    },
    {
      id: 207,
      name: "Mentor",
      category: "Fungicides",
      image: "/products/mentor.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      offerPrice: 648,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 208,
      name: "Remix",
      category: "Fungicides",
      image: "/products/remix.jpg",
      brand: "Crystal Crop Protection",
      mrp: 680,
      uom: "500ml",
    },
    {
      id: 209,
      name: "Treat",
      category: "Fungicides",
      image: "/products/treat.jpg",
      brand: "Crystal Crop Protection",
      mrp: 650,
      offerPrice: 585,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 210,
      name: "THEO SUPER",
      category: "Fungicides",
      image: "/products/theo_super.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      uom: "1 Liter",
    },
    {
      id: 211,
      name: "Vaccinator",
      category: "Fungicides",
      image: "/products/vaccinator.jpg",
      brand: "Crystal Crop Protection",
      mrp: 780,
      offerPrice: 702,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 212,
      name: "Crystorhiza",
      category: "Fertilizers",
      image: "/products/crystorhiza.jpg",
      brand: "Crystal Crop Protection",
      mrp: 580,
      uom: "1 Liter",
    },
    {
      id: 213,
      name: "EP-50",
      category: "Fertilizers",
      image: "/products/ep_50.jpg",
      brand: "Crystal Crop Protection",
      mrp: 550,
      offerPrice: 495,
      offerPercentage: 10,
      uom: "500ml",
    },
    {
      id: 214,
      name: "Nutrozen",
      category: "Fertilizers",
      image: "/products/nutrozen.jpg",
      brand: "Crystal Crop Protection",
      mrp: 650,
      uom: "1 Liter",
    },
    {
      id: 215,
      name: "Talwar Zinc Super-14",
      category: "Fertilizers",
      image: "/products/talwar_zinc_super_14.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      offerPrice: 648,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 216,
      name: "Talwar Zinc",
      category: "Fertilizers",
      image: "/products/talwar_zinc.jpg",
      brand: "Crystal Crop Protection",
      mrp: 680,
      uom: "1 Liter",
    },
    {
      id: 217,
      name: "Penitro",
      category: "Fertilizers",
      image: "/products/penitro.jpg",
      brand: "Crystal Crop Protection",
      mrp: 750,
      offerPrice: 675,
      offerPercentage: 10,
      uom: "1 Liter",
    },
    {
      id: 218,
      name: "Nutrozen paddy",
      category: "Fertilizers",
      image: "/products/nutrozen_paddy.jpg",
      brand: "Crystal Crop Protection",
      mrp: 650,
      uom: "1 Liter",
    },
    {
      id: 219,
      name: "Cryzib Plus",
      category: "Fungicides",
      image: "/products/cryzib_plus.jpg",
      brand: "Crystal Crop Protection",
      mrp: 720,
      offerPrice: 648,
      offerPercentage: 10,
      uom: "1 Liter",
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
