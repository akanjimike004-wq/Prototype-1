import React from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from "lucide-react";
import { cn } from "../lib/utils";

export const Contact = () => {
  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Header */}
      <section className="py-24 bg-black text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.3em] text-white uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              Get In Touch
            </span>
            <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight leading-[0.85]">
              Let's Start a <br />
              <span className="italic font-serif font-light text-white/60">Conversation</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
              Whether you're looking to acquire a masterpiece or list your sanctuary, 
              our concierge team is ready to provide unparalleled guidance.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-16">
              <div>
                <h2 className="text-3xl font-bold mb-8 tracking-tight">Our Abuja Headquarters</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <MapPin className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-2 uppercase tracking-wider text-black/40">Address</h4>
                      <p className="text-lg font-medium leading-relaxed">
                        Plot 456, Maitama District,<br />
                        Abuja, FCT, Nigeria
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-2 uppercase tracking-wider text-black/40">Phone</h4>
                      <p className="text-lg font-medium">+234 (0) 800 LUXE ESTATE</p>
                      <p className="text-sm text-black/40 mt-1">Mon - Fri, 9am - 6pm WAT</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-2 uppercase tracking-wider text-black/40">Email</h4>
                      <p className="text-lg font-medium">concierge@luxeestate.ng</p>
                      <p className="text-sm text-black/40 mt-1">Response within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-[#F9F9F9] rounded-[2rem] border border-black/5">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-emerald-500" />
                  Private Viewing Hours
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-black/5">
                    <span className="text-sm font-medium">Monday - Friday</span>
                    <span className="text-sm text-black/60">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-black/5">
                    <span className="text-sm font-medium">Saturday</span>
                    <span className="text-sm text-black/60">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Sunday</span>
                    <span className="text-sm text-black/60 italic">By Appointment Only</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-black/5 shadow-2xl shadow-black/5">
                <div className="mb-12">
                  <h3 className="text-3xl font-bold mb-4 tracking-tight">Send a Message</h3>
                  <p className="text-black/60">Fill out the form below and our dedicated concierge will contact you shortly.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 ml-1">Full Name</label>
                      <input
                        required
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-6 py-4 bg-black/5 border border-transparent focus:border-black/10 rounded-2xl outline-none transition-all placeholder:text-black/20"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 ml-1">Email Address</label>
                      <input
                        required
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-6 py-4 bg-black/5 border border-transparent focus:border-black/10 rounded-2xl outline-none transition-all placeholder:text-black/20"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 ml-1">Phone Number</label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-6 py-4 bg-black/5 border border-transparent focus:border-black/10 rounded-2xl outline-none transition-all placeholder:text-black/20"
                        placeholder="+234 ..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 ml-1">Inquiry Type</label>
                      <select
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full px-6 py-4 bg-black/5 border border-transparent focus:border-black/10 rounded-2xl outline-none transition-all cursor-pointer"
                      >
                        <option>General Inquiry</option>
                        <option>Property Viewing</option>
                        <option>Selling a Property</option>
                        <option>Investment Opportunities</option>
                        <option>Concierge Services</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 ml-1">Your Message</label>
                    <textarea
                      required
                      rows={6}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-6 py-4 bg-black/5 border border-transparent focus:border-black/10 rounded-2xl outline-none transition-all placeholder:text-black/20 resize-none"
                      placeholder="How can we assist you today?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full py-6 rounded-2xl font-bold text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3",
                      isSuccess 
                        ? "bg-emerald-500 text-white" 
                        : "bg-black text-white hover:bg-black/90"
                    )}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : isSuccess ? (
                      "Message Sent Successfully"
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[500px] bg-[#F9F9F9] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="text-white w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold">Interactive Map</h3>
            <p className="text-black/40 max-w-xs mx-auto">Visit us at our Maitama District office for a private consultation.</p>
          </div>
        </div>
        {/* Visual decoration to simulate a map */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
      </section>
    </div>
  );
};
