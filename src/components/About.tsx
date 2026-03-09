import React from "react";
import { motion } from "motion/react";
import { Award, Users, Globe, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dcea4db0d?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury Architecture"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.3em] text-white uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              Our Legacy
            </span>
            <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight leading-[0.85]">
              Redefining <br />
              <span className="italic font-serif font-light text-white/60">The Art of Living</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
              Since our inception, LuxeEstate has been the benchmark for luxury real estate, 
              connecting the world's most discerning individuals with extraordinary properties.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-black mb-8 tracking-tight leading-[0.9]">
                More Than Just <br />
                <span className="italic font-serif font-light">Real Estate</span>
              </h2>
              <div className="space-y-6 text-black/60 leading-relaxed">
                <p>
                  At LuxeEstate, we believe that a home is more than just a structure; it's a sanctuary, 
                  a reflection of one's journey, and a canvas for future memories. Our mission is to 
                  provide an unparalleled experience that transcends the traditional transaction.
                </p>
                <p>
                  We combine deep local expertise with a global perspective, utilizing cutting-edge 
                  technology and personalized concierge services to ensure every client finds their 
                  perfect sanctuary.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-12 mt-16">
                <div>
                  <p className="text-4xl font-bold mb-2">₦2.5B+</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-black/40">Total Sales Volume</p>
                </div>
                <div>
                  <p className="text-4xl font-bold mb-2">500+</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-black/40">Exclusive Listings</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80"
                  alt="Luxury Interior"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-black rounded-[2rem] p-6 text-white hidden md:flex flex-col justify-center items-center text-center shadow-2xl">
                <Shield className="w-8 h-8 mb-4 text-emerald-400" />
                <p className="text-xs font-bold uppercase tracking-widest">Trusted by Elites</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-4 block">Our Values</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The Pillars of Our Excellence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Shield,
                title: "Integrity",
                desc: "We operate with absolute transparency and honesty in every interaction, building relationships that last generations."
              },
              {
                icon: Globe,
                title: "Global Reach",
                desc: "Our network extends across continents, providing our clients with access to the world's most exclusive real estate markets."
              },
              {
                icon: Award,
                title: "Excellence",
                desc: "We settle for nothing less than perfection, from our marketing materials to our personalized concierge services."
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 bg-white rounded-[3rem] border border-black/5 hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <value.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-black/60 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-4 block">The Visionaries</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[0.9]">
                Meet the Minds <br />
                <span className="italic font-serif font-light">Behind the Brand</span>
              </h2>
            </div>
            <Link 
              to="/contact"
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:opacity-60 transition-opacity"
            >
              Join Our Team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alexander Vance",
                role: "Founder & CEO",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Elena Rodriguez",
                role: "Head of Global Sales",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Marcus Thorne",
                role: "Director of Concierge",
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Sophia Chen",
                role: "Chief Marketing Officer",
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80"
              }
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 relative">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                <p className="text-xs font-bold uppercase tracking-wider text-black/40">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-7xl font-bold mb-12 tracking-tight leading-[0.9]">
              Ready to find your <br />
              <span className="italic font-serif font-light text-white/60">next masterpiece?</span>
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link
                to="/"
                className="px-12 py-5 bg-white text-black rounded-2xl font-bold text-sm hover:bg-white/90 transition-all"
              >
                View Listings
              </Link>
              <Link 
                to="/contact"
                className="px-12 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition-all text-center"
              >
                Contact Concierge
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
