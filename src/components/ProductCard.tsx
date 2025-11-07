import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  image: string;
  brand: string;
  mrp: number;
  offerPrice?: number;
  offerPercentage?: number;
  uom: string;
  index: number;
}

const ProductCard = ({ 
  id,
  name, 
  category, 
  image, 
  brand, 
  mrp, 
  offerPrice, 
  offerPercentage,
  uom,
  index 
}: ProductCardProps) => {
  const finalPrice = offerPrice || mrp;
  const hasOffer = offerPrice && offerPrice < mrp;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        <Link to={`/products/${id}`}>
          <div className="aspect-square bg-muted relative overflow-hidden cursor-pointer">
            <img
              src={image}
              alt={`${name} - ${brand}`}
              className="w-full h-full object-contain p-4 hover:scale-110 transition-transform duration-300"
            />
            <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground font-semibold">
              {category}
            </Badge>
            {hasOffer && offerPercentage && (
              <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground font-bold">
                {offerPercentage}% OFF
              </Badge>
            )}
          </div>
        </Link>
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Link to={`/products/${id}`}>
              <h3 className="font-bold text-lg text-foreground leading-tight hover:text-primary transition-colors cursor-pointer">{name}</h3>
            </Link>
            <Badge variant="outline" className="flex items-center gap-1 shrink-0">
              <Tag className="w-3 h-3" />
              {brand}
            </Badge>
          </div>
          
          <div className="mt-auto">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-primary">₹{finalPrice}</span>
              {hasOffer && (
                <span className="text-sm text-muted-foreground line-through">₹{mrp}</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{uom}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
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
