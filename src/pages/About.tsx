import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, Users, Target, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Only authentic products from trusted brands",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Personalized service for every farmer",
    },
    {
      icon: Target,
      title: "Expert Guidance",
      description: "Professional advice for better yields",
    },
    {
      icon: Heart,
      title: "Community Support",
      description: "Supporting local agriculture for 30+ years",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-light to-background py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">About Us</h1>
            <p className="text-xl text-muted-foreground">
              Building trust through quality products and dedicated service since 1990
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-foreground">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Kisan Bagwani Center was founded in 1990 with a simple mission: to provide
                farmers with access to quality agricultural products and expert guidance. What
                started as a small family shop has grown into a trusted name in the agricultural
                community.
              </p>
              <p>
                For over three decades, we've built relationships with leading manufacturers like
                JU, UPL, and Bayer to ensure our customers receive only genuine, high-quality
                products. Our family-run business model allows us to maintain the personal touch
                that farmers appreciate while offering the product range they need.
              </p>
              <p>
                We believe that agriculture is the backbone of our community, and supporting
                farmers with the right tools and products is not just business—it's our
                responsibility. Every product we stock, every piece of advice we give, comes from
                years of experience and a genuine commitment to your success.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop"
              alt="Agricultural store"
              className="rounded-2xl shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Our Values</h2>
            <p className="text-muted-foreground text-lg">
              The principles that guide everything we do
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card p-6 rounded-xl shadow-md text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                    <Icon className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-primary-foreground shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg md:text-xl leading-relaxed">
              To empower farmers with access to premium agricultural products, expert guidance,
              and unwavering support. We're committed to being more than just a supplier—we're
              your partner in agricultural success, dedicated to helping you achieve better yields
              and sustainable farming practices.
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
