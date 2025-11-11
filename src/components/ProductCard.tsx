import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  image: string;
  brand: string;
  index: number;
}

const ProductCard = ({ 
  id,
  name, 
  category, 
  image, 
  brand, 
  index 
}: ProductCardProps) => {

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        {/* <Link to={`/products/${id}`}> */}
          <div className="aspect-square bg-muted relative overflow-hidden cursor-pointer">
            <img
              src={image}
              alt={`${name} - ${brand}`}
              className="w-full h-full object-contain p-4 hover:scale-110 transition-transform duration-300"
            />
            <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground font-semibold">
              {brand}
            </Badge>
          </div>
        {/* </Link> */} 
        <CardContent className="p-4 pb-2 flex-1 flex flex-col">
          {/* Product Name */}
          <div>
            <h3 className="font-bold text-lg text-foreground leading-snug hover:text-primary transition-colors cursor-pointer line-clamp-3">
              {name}
            </h3>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-2">
          <Button variant="default" className="w-full" asChild>
            <a href={`https://wa.me/918532948658?text=Hi, I'm interested in ${name} (${brand})`}>
              Enquiry on WhatsApp
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
