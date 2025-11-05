import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  name: string;
  category: string;
  image: string;
  brands: string;
  index: number;
}

const ProductCard = ({ name, category, image, brands, index }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="aspect-square bg-muted relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground">
            {category}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">Available Brands: {brands}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button variant="outline" className="w-full" asChild>
            <a href="https://wa.me/1234567890">Enquiry</a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
