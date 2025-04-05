"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { Heart, Droplet, MapPin, Shield, Search, MessageSquare, Users, Award, UserPlus, Gift } from "lucide-react"
import "./index.css"
import Navbar from "./components/Navbar"


function App() {
  const controls = useAnimation()
  const featuresRef = useRef(null)
  const howItWorksRef = useRef(null)
  const testimonialRef = useRef(null)

  // Refs for each section
  const sectionRefs = [useRef(null), useRef(null), useRef(null)]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (featuresRef.current) {
      observer.observe(featuresRef.current)
    }

    sectionRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current)
      }

      sectionRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [controls])

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" })
  }

  // Data for the sections
  const sections = [
    {
      id: "find-donors",
      title: "Find Donors Nearby",
      description:
        "Quickly connect with blood donors and medicine suppliers in your area through our geolocation-based matching system. Our platform ensures you find help when you need it most, especially during emergencies.",
      icon: <Droplet className="w-12 h-12 text-red-500" />,
      color: "from-red-400 to-red-600",
    },
    {
      id: "secure-exchange",
      title: "Secure & Private Exchange",
      description:
        "Your privacy and security are our top priorities. Our platform provides end-to-end encrypted communication channels and verified profiles to ensure safe and legitimate exchanges between donors and recipients.",
      icon: <Shield className="w-12 h-12 text-blue-500" />,
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "medicine-sharing",
      title: "Medicine Sharing Network",
      description:
        "Access a community-driven network for sharing unused, unexpired medications. Our verification system ensures all medicines are legitimate, properly stored, and safe for use, helping reduce waste and increase access.",
      icon: <Gift className="w-12 h-12 text-emerald-500" />,
      color: "from-emerald-400 to-emerald-600",
    },
  ]

  return (
    <div className="font-sans bg-slate-50">
      {/* Navigation */}
<Navbar/>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-slate-50 via-red-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-3 py-1 mb-6 text-sm font-medium text-red-500 bg-red-100 rounded-full">
                Saving Lives Together
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                Connecting <span className="text-red-500">Blood Donors</span> &{" "}
                <span className="text-blue-500">Medicine</span> When It Matters Most
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our P2P platform connects those in need with donors and suppliers in real-time, making critical
                resources accessible during emergencies and everyday situations.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-8 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center">
                  <Search className="w-5 h-5 mr-2" />
                  Find a Donor
                </button>
                <button className="px-8 py-3.5 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-50 transition-colors flex items-center justify-center">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Be a Donor
                </button>
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative h-80 md:h-96 w-full rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-red-500 to-blue-600 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center px-4 relative z-10">
                    <div className="bg-white/20 backdrop-blur-sm p-8 rounded-3xl">
                      <Droplet className="w-20 h-20 mx-auto mb-4" />
                      <p className="text-2xl font-bold">Every Drop Counts</p>
                      <p className="mt-2 text-white/80">Join our community of life-savers today</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-full opacity-50 blur-2xl"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-red-500 rounded-full opacity-50 blur-2xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-red-500 mb-2">10K+</p>
              <p className="text-gray-600">Active Donors</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">5K+</p>
              <p className="text-gray-600">Lives Saved</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-emerald-500 mb-2">200+</p>
              <p className="text-gray-600">Cities Covered</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">15K+</p>
              <p className="text-gray-600">Medicines Shared</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 },
            }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-500 bg-blue-100 rounded-full">
              Our Platform
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose LifeLink?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform offers unique features designed to make blood and medicine exchange safe, efficient, and
              accessible to all.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 },
              }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-500 transition-colors duration-300">
                <Search className="w-7 h-7 text-red-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Advanced Search</h3>
              <p className="text-gray-600">
                Filter by blood type, medication, location, and availability to find exactly what you need.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 },
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors duration-300">
                <MapPin className="w-7 h-7 text-blue-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Geolocation Matching</h3>
              <p className="text-gray-600">
                Connect with nearby donors and suppliers for faster access during critical situations.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 },
              }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors duration-300">
                <Shield className="w-7 h-7 text-emerald-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Verified Profiles</h3>
              <p className="text-gray-600">
                All donors and suppliers undergo verification to ensure authenticity and safety.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 },
              }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors duration-300">
                <MessageSquare className="w-7 h-7 text-purple-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Secure Communication</h3>
              <p className="text-gray-600">
                End-to-end encrypted messaging ensures your personal information remains private.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="py-20 bg-gradient-to-br from-white to-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-emerald-500 bg-emerald-100 rounded-full">
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to connect donors with recipients in just a few simple steps.
            </p>
          </motion.div>

          {sections.map((section, index) => {
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={section.id}
                ref={sectionRefs[index]}
                className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center mb-24 last:mb-0`}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className={`w-full md:w-1/2 mb-10 md:mb-0 ${isEven ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 mb-6">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-blue-500 text-white font-bold text-xl">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{section.description}</p>
                    <button className="px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors flex items-center">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className={`relative h-64 md:h-96 w-full rounded-3xl overflow-hidden shadow-2xl`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-90`}></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="text-center px-6 bg-white/10 backdrop-blur-sm p-8 rounded-3xl">
                        <div className="mb-4 bg-white/20 p-4 rounded-2xl inline-block">{section.icon}</div>
                        <p className="text-2xl font-bold">{section.title}</p>
                        <p className="mt-2 text-white/80">Step {index + 1} of our simple process</p>
                      </div>
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-full opacity-20 blur-2xl"></div>
                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-white rounded-full opacity-20 blur-2xl"></div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Donor CTA Section */}
      <section className="py-16 bg-gradient-to-br from-red-500 to-red-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-400 rounded-full opacity-30 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full opacity-30 blur-3xl translate-y-1/2 -translate-x-1/3"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 md:p-16 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Become a Donor Today</h2>
                <p className="text-white/80 text-lg max-w-2xl">
                  Join thousands of donors who are making a difference in their communities. Your donation can save
                  lives and provide essential medications to those in need.
                </p>
              </div>
              <div>
                <button className="px-8 py-4 bg-white text-red-600 rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 font-bold text-lg flex items-center">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Be a Donor
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-purple-500 bg-purple-100 rounded-full">
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how our platform has helped connect people and save lives across the country.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-3xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Sarah M.</h4>
                  <p className="text-sm text-gray-500">Blood Recipient</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "During my emergency surgery, I needed a rare blood type. LifeLink connected me with a donor just 10
                minutes away. I'm forever grateful for this platform."
              </p>
              <div className="flex text-yellow-400">
                <Award className="w-5 h-5" />
                <Award className="w-5 h-5" />
                <Award className="w-5 h-5" />
                <Award className="w-5 h-5" />
                <Award className="w-5 h-5" />
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-3xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">James K.</h4>
                  <p className="text-sm text-gray-500">Regular Donor</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "I've been donating blood for years, but never knew who it helped. Through LifeLink, I can connect
                directly with recipients and see the impact of my donations."
              </p>
              <div className="flex text-yellow-400">
                <Award className="w-5 h-5" />
                <Award className="w-5 h-5" />
                <Award className="w-5 h-5" />
                <Award className="w-5 h-5" />
                <Award className="w-5 h-5" />
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-3xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Dr. Patel</h4>
                  <p className="text-sm text-gray-500">Healthcare Provider</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "The medicine exchange feature has been invaluable for our rural clinic. We can now quickly source
                medications for patients who otherwise couldn't afford them."
              </p>
              <div className="flex text-yellow-400">
                <Award className="w-5 h-5" />
                <Award className="w-5 h-5" />
                <Award className="w-5 h-5" />
                <Award className="w-5 h-5" />
                <Award className="w-5 h-5" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-10 md:mb-0 md:pr-12"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-500 bg-blue-100 rounded-full">
                Mobile App
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Take LifeLink Everywhere You Go</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our mobile app puts the power of our platform in your pocket. Find donors, manage your profile, and
                receive notifications about urgent needs in your area.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-black transition-colors flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.5,12.5c0-0.91-0.39-1.73-1-2.31v4.61C17.11,14.23,17.5,13.41,17.5,12.5z M16,9h-1v6h1V9z M12,9v6h2V9H12z M10,9H8v6h2V9z M6,9H5v6h1V9z M7.5,9h-1v6h1V9z M13.5,9h-1v6h1V9z M9.5,9h-1v6h1V9z M4,8c-0.55,0-1,0.45-1,1v6c0,0.55,0.45,1,1,1h16c0.55,0,1-0.45,1-1V9c0-0.55-0.45-1-1-1H4z" />
                  </svg>
                  App Store
                </button>
                <button className="px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-black transition-colors flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  Google Play
                </button>
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative h-96 w-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-red-100 to-blue-100 p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-blue-500/10"></div>
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="bg-white rounded-3xl shadow-xl w-64 h-full overflow-hidden border-8 border-gray-800">
                    <div className="bg-red-500 text-white p-4 flex items-center">
                      <Heart className="h-6 w-6 mr-2" />
                      <span className="font-bold">LifeLink</span>
                    </div>
                    <div className="p-4">
                      <div className="bg-gray-100 rounded-lg p-3 mb-3">
                        <h4 className="font-bold text-sm mb-1">Urgent: Blood Needed</h4>
                        <p className="text-xs text-gray-600">Type O- needed at Memorial Hospital (2.3 miles away)</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 mb-3">
                        <h4 className="font-bold text-sm mb-1">New Donor Match</h4>
                        <p className="text-xs text-gray-600">John D. is available to donate Type A+ blood</p>
                      </div>
                      <div className="bg-red-100 rounded-lg p-3">
                        <h4 className="font-bold text-sm text-red-800 mb-1">Your Donation Impact</h4>
                        <p className="text-xs text-red-700">Your donations have helped 5 people this month!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-red-500 to-red-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-400 rounded-full opacity-30 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full opacity-30 blur-3xl translate-y-1/2 -translate-x-1/3"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-white/80">
              Join our community today and help save lives through blood donation and medicine sharing.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="px-10 py-4 bg-white text-red-600 rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 font-bold text-lg">
                Register Now
              </button>
              <button className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-red-600 transition-all duration-300 font-bold text-lg">
                Be a Donor
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <Heart className="h-8 w-8 text-red-500 mr-2" />
                <span className="font-bold text-xl text-white">LifeLink</span>
              </div>
              <p className="mb-6 text-gray-400">
                Connecting donors and recipients to save lives and improve healthcare access for all.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Find Donors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Become a Donor
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Blood Donation FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Medicine Exchange Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Safety Protocols
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Verification Process
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Community Stories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-red-400" />
                  <span>123 Healthcare Ave, Medical District</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>support@lifelink.org</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+1 (800) LIFE-LINK</span>
                </li>
              </ul>
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3 text-white">Subscribe to our newsletter</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-4 py-2 rounded-l-full text-gray-800 w-full focus:outline-none"
                  />
                  <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-r-full transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} LifeLink. All rights reserved.</p>
            <div className="flex justify-center space-x-6 mt-4">
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

