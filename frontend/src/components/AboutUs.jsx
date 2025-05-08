// "use client"

// import { motion } from "framer-motion"
// import {
//   Heart,
//   Users,
//   Globe,
//   Award,
//   Droplet,
//   Gift,
//   MapPin,
//   Mail,
//   ExternalLink,
//   UserPlus,
//   ChevronRight,
// } from "lucide-react"
// import { Link } from "react-router-dom"

// const AboutPage = () => {
//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <Link to="/" className="flex items-center">
//               <Heart className="h-8 w-8 text-red-500 mr-2" />
//               <span className="font-bold text-xl text-gray-800">LifeLink</span>
//             </Link>

//             <div className="hidden md:flex space-x-8">
//               <Link to="/" className="text-gray-600 hover:text-red-500 transition-colors">
//                 Home
//               </Link>
//               <Link to="/about" className="text-red-500 font-medium">
//                 About Us
//               </Link>
//               <Link to="/find-donor" className="text-gray-600 hover:text-red-500 transition-colors">
//                 Find Donors
//               </Link>
//               <Link to="/blood-requests" className="text-gray-600 hover:text-red-500 transition-colors">
//                 Blood Requests
//               </Link>
//             </div>

//             <div className="flex items-center space-x-4">
//               <Link to="/login" className="px-4 py-2 rounded-full text-gray-600 hover:text-red-500 transition-colors">
//                 Sign In
//               </Link>
//               <Link
//                 to="/register"
//                 className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
//               >
//                 Register
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="pt-20 pb-16 bg-gradient-to-br from-slate-50 via-red-50 to-blue-50">
//         <div className="container mx-auto px-4">
//           <motion.div
//             className="text-center max-w-3xl mx-auto"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="inline-block px-3 py-1 mb-6 text-sm font-medium text-red-500 bg-red-100 rounded-full">
//               Our Mission
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
//               Connecting Lives, One Drop at a Time
//             </h1>
//             <p className="text-lg text-gray-600 mb-8 leading-relaxed">
//               LifeLink is a revolutionary peer-to-peer platform connecting blood donors, recipients, and medical
//               suppliers to save lives and improve healthcare access for all.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Our Story Section */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row items-center gap-12">
//             <motion.div
//               className="md:w-1/2"
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="relative h-96 w-full rounded-3xl overflow-hidden shadow-xl">
//                 <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-red-500 to-blue-600 opacity-90"></div>
//                 <div className="absolute inset-0 flex items-center justify-center text-white">
//                   <div className="text-center px-4 relative z-10">
//                     <div className="bg-white/20 backdrop-blur-sm p-8 rounded-3xl">
//                       <Heart className="w-20 h-20 mx-auto mb-4" />
//                       <p className="text-2xl font-bold">Our Story</p>
//                       <p className="mt-2 text-white/80">Founded with a purpose</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-full opacity-50 blur-2xl"></div>
//                 <div className="absolute -top-6 -left-6 w-32 h-32 bg-red-500 rounded-full opacity-50 blur-2xl"></div>
//               </div>
//             </motion.div>

//             <motion.div
//               className="md:w-1/2"
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <h2 className="text-3xl font-bold text-gray-800 mb-6">How It All Began</h2>
//               <p className="text-gray-600 mb-4">
//                 LifeLink was born out of a personal tragedy. In 2019, our founder Dr. Sarah Chen lost her younger
//                 brother due to a shortage of rare blood type during an emergency. This devastating experience
//                 highlighted the critical gaps in our blood donation systems.
//               </p>
//               <p className="text-gray-600 mb-4">
//                 Determined to prevent similar tragedies, Dr. Chen assembled a team of healthcare professionals,
//                 technologists, and community organizers to create a direct peer-to-peer platform that would connect
//                 blood donors with recipients in real-time.
//               </p>
//               <p className="text-gray-600 mb-6">
//                 What started as a small community initiative has grown into a nationwide network with thousands of
//                 donors, saving countless lives through timely blood donations and medicine exchanges.
//               </p>
//               <div className="flex items-center text-red-500">
//                 <span className="font-medium mr-2">Learn more about our journey</span>
//                 <ExternalLink className="h-4 w-4" />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Our Mission & Values */}
//       <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
//         <div className="container mx-auto px-4">
//           <motion.div
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-500 bg-blue-100 rounded-full">
//               Our Purpose
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Mission & Values</h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               We're driven by a clear mission and guided by strong values that shape everything we do.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
//             <motion.div
//               className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//             >
//               <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
//                 <Heart className="w-7 h-7 text-red-500" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Mission</h3>
//               <p className="text-gray-600 mb-4">
//                 To create a world where no one dies due to lack of timely access to blood or essential medicines by
//                 building the most efficient peer-to-peer healthcare resource exchange network.
//               </p>
//               <p className="text-gray-600">
//                 We aim to break down barriers to healthcare access, empower communities to help each other, and
//                 revolutionize how critical medical resources are shared and distributed.
//               </p>
//             </motion.div>

//             <motion.div
//               className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
//                 <Award className="w-7 h-7 text-blue-500" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Values</h3>
//               <ul className="space-y-3 text-gray-600">
//                 <li className="flex items-start">
//                   <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
//                     <span className="text-red-500 text-sm font-bold">1</span>
//                   </div>
//                   <div>
//                     <span className="font-medium text-gray-800">Accessibility</span> - Making healthcare resources
//                     available to everyone, regardless of location or socioeconomic status
//                   </div>
//                 </li>
//                 <li className="flex items-start">
//                   <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
//                     <span className="text-blue-500 text-sm font-bold">2</span>
//                   </div>
//                   <div>
//                     <span className="font-medium text-gray-800">Safety</span> - Ensuring all exchanges are secure,
//                     verified, and follow strict medical protocols
//                   </div>
//                 </li>
//                 <li className="flex items-start">
//                   <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
//                     <span className="text-emerald-500 text-sm font-bold">3</span>
//                   </div>
//                   <div>
//                     <span className="font-medium text-gray-800">Community</span> - Building a supportive network of
//                     donors, recipients, and healthcare providers
//                   </div>
//                 </li>
//                 <li className="flex items-start">
//                   <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
//                     <span className="text-purple-500 text-sm font-bold">4</span>
//                   </div>
//                   <div>
//                     <span className="font-medium text-gray-800">Innovation</span> - Continuously improving our platform
//                     to better serve healthcare needs
//                   </div>
//                 </li>
//               </ul>
//             </motion.div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <Droplet className="w-10 h-10 text-red-500" />,
//                 title: "Blood Donation",
//                 description:
//                   "Connecting blood donors with recipients in real-time, especially for rare blood types and emergencies.",
//               },
//               {
//                 icon: <Gift className="w-10 h-10 text-emerald-500" />,
//                 title: "Medicine Exchange",
//                 description:
//                   "Facilitating the safe sharing of unused, unexpired medications to those who need them most.",
//               },
//               {
//                 icon: <Globe className="w-10 h-10 text-blue-500" />,
//                 title: "Global Impact",
//                 description: "Expanding our network globally to address healthcare resource disparities worldwide.",
//               },
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: 0.1 * (index + 3) }}
//               >
//                 <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                   {item.icon}
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
//                 <p className="text-gray-600">{item.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Our Impact */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <motion.div
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-emerald-500 bg-emerald-100 rounded-full">
//               Making A Difference
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Impact</h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Since our founding, we've made a significant impact on healthcare accessibility and saved countless lives.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
//             {[
//               { number: "10K+", label: "Active Donors", color: "text-red-500" },
//               { number: "5K+", label: "Lives Saved", color: "text-blue-500" },
//               { number: "200+", label: "Cities Covered", color: "text-emerald-500" },
//               { number: "15K+", label: "Medicines Shared", color: "text-purple-500" },
//             ].map((stat, index) => (
//               <motion.div
//                 key={index}
//                 className="text-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: 0.1 * index }}
//               >
//                 <p className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</p>
//                 <p className="text-gray-600">{stat.label}</p>
//               </motion.div>
//             ))}
//           </div>

//           <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl p-8 md:p-12">
//             <div className="flex flex-col md:flex-row items-center">
//               <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Success Stories</h3>
//                 <p className="text-gray-600 mb-6">
//                   Our platform has facilitated countless life-saving connections. Here are just a few of the stories
//                   that inspire us to continue our mission.
//                 </p>
//                 <div className="space-y-4">
//                   {[
//                     {
//                       name: "Emily's Story",
//                       description: "Found a rare blood type donor within 30 minutes during an emergency surgery.",
//                     },
//                     {
//                       name: "The Johnson Family",
//                       description:
//                         "Accessed critical medication for their child when insurance delays threatened treatment.",
//                     },
//                     {
//                       name: "Memorial Hospital",
//                       description: "Connected with 50+ donors during a mass casualty event, saving multiple lives.",
//                     },
//                   ].map((story, index) => (
//                     <div key={index} className="flex items-start">
//                       <Heart className="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" />
//                       <div>
//                         <h4 className="font-medium text-gray-800">{story.name}</h4>
//                         <p className="text-sm text-gray-600">{story.description}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <button className="mt-6 px-6 py-2 bg-white text-red-500 border border-red-500 rounded-full hover:bg-red-50 transition-colors flex items-center">
//                   Read More Stories <ExternalLink className="w-4 h-4 ml-2" />
//                 </button>
//               </div>
//               <div className="md:w-1/2">
//                 <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden">
//                   <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 opacity-20"></div>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="text-center px-4">
//                       <blockquote className="text-xl md:text-2xl font-medium text-gray-800 italic">
//                         "LifeLink connected me with a donor in minutes when my daughter needed a rare blood type. I'm
//                         forever grateful."
//                       </blockquote>
//                       <p className="mt-4 text-gray-600">— Maria S., Mother & LifeLink User</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Meet Our Team */}
//       <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
//         <div className="container mx-auto px-4">
//           <motion.div
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-purple-500 bg-purple-100 rounded-full">
//               The People Behind LifeLink
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Our diverse team of healthcare professionals, technologists, and community organizers is united by a
//               shared mission to save lives.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               {
//                 name: "Dr. Sarah Chen",
//                 role: "Founder & CEO",
//                 bio: "Hematologist with 15+ years of experience. Founded LifeLink after losing her brother due to blood shortage.",
//                 image: "/placeholder.svg?height=300&width=300",
//               },
//               {
//                 name: "Michael Rodriguez",
//                 role: "CTO",
//                 bio: "Former tech lead at major healthcare platforms. Expert in secure medical data systems and geolocation technologies.",
//                 image: "/placeholder.svg?height=300&width=300",
//               },
//               {
//                 name: "Dr. Aisha Johnson",
//                 role: "Medical Director",
//                 bio: "Emergency medicine specialist who ensures all blood and medicine exchanges follow strict medical protocols.",
//                 image: "/placeholder.svg?height=300&width=300",
//               },
//               {
//                 name: "David Kim",
//                 role: "Community Director",
//                 bio: "Former non-profit leader who builds and nurtures our donor and recipient communities worldwide.",
//                 image: "/placeholder.svg?height=300&width=300",
//               },
//             ].map((member, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: 0.1 * index }}
//               >
//                 <img
//                   src={member.image || "/placeholder.svg"}
//                   alt={member.name}
//                   className="w-full h-64 object-cover object-center"
//                 />
//                 <div className="p-6">
//                   <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
//                   <p className="text-red-500 mb-3">{member.role}</p>
//                   <p className="text-gray-600 text-sm">{member.bio}</p>
//                   <div className="mt-4 flex space-x-3">
//                     <a
//                       href="#"
//                       className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-colors"
//                     >
//                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
//                       </svg>
//                     </a>
//                     <a
//                       href="#"
//                       className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-colors"
//                     >
//                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//                       </svg>
//                     </a>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           <div className="mt-12 text-center">
//             <Link
//               to="/team"
//               className="inline-flex items-center text-red-500 font-medium hover:text-red-600 transition-colors"
//             >
//               View Full Team <ChevronRight className="w-4 h-4 ml-1" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Partners & Affiliations */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <motion.div
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-gray-500 bg-gray-100 rounded-full">
//               Working Together
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Partners & Affiliations</h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               We collaborate with leading healthcare organizations, hospitals, and community groups to expand our
//               impact.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {[1, 2, 3, 4, 5, 6, 7, 8].map((partner) => (
//               <motion.div
//                 key={partner}
//                 className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-32"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: 0.05 * partner }}
//               >
//                 <img
//                   src={`/placeholder.svg?height=80&width=160&text=Partner ${partner}`}
//                   alt={`Partner ${partner}`}
//                   className="max-h-16"
//                 />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Get Involved */}
//       <section className="py-16 bg-gradient-to-br from-red-500 to-red-600 text-white relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-red-400 rounded-full opacity-30 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
//         <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full opacity-30 blur-3xl translate-y-1/2 -translate-x-1/3"></div>

//         <div className="container mx-auto px-4 relative z-10">
//           <motion.div
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-red-100 bg-white/20 backdrop-blur-sm rounded-full">
//               Join Our Mission
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Involved</h2>
//             <p className="text-xl text-white/80 max-w-2xl mx-auto">
//               There are many ways to contribute to our mission of saving lives through blood and medicine exchange.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <Droplet className="w-12 h-12" />,
//                 title: "Become a Donor",
//                 description:
//                   "Register as a blood donor and be notified when someone in your area needs your blood type.",
//               },
//               {
//                 icon: <Gift className="w-12 h-12" />,
//                 title: "Share Medicines",
//                 description:
//                   "Safely share unused, unexpired medications with those who need them but cannot afford them.",
//               },
//               {
//                 icon: <Users className="w-12 h-12" />,
//                 title: "Volunteer",
//                 description: "Help us organize blood drives, verify users, or contribute your skills to our platform.",
//               },
//             ].map(
//               (item, index) =>
//                 (
//                   <motion.div 
//                 key={index}
//                 className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-colors"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}\
//                 viewportopacity: 0, y: 20}}
//                 whileInView={{opacity: 1, y: 0}}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: 0.1 * index }}
//               >
//                 <div className="text-center">
//                   <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                     {item.icon}
//                   </div>
//                   <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
//                   <p className="text-white/80">{item.description}</p>
//                   <Link
//                     to="/register"
//                     className="inline-block mt-6 px-6 py-2 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors"
//                   >
//                     Get Started
//                   </Link>
//                 </div>
//               </motion.div>
//                 ),
//             )}
//           </div>

//           <div className="mt-16 text-center">
//             <Link
//               to="/register"
//               className="px-10 py-4 bg-white text-red-600 rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 font-bold text-lg inline-flex items-center"
//             >
//               <UserPlus className="w-5 h-5 mr-2" />
//               Join LifeLink Today
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row gap-12">
//             <motion.div
//               className="md:w-1/2"
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-500 bg-blue-100 rounded-full">
//                 Get In Touch
//               </div>
//               <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
//               <p className="text-gray-600 mb-8">
//                 Have questions about LifeLink? Want to partner with us or learn more about our mission? We'd love to
//                 hear from you.
//               </p>

//               <div className="space-y-6">
//                 <div className="flex items-start">
//                   <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
//                     <MapPin className="w-5 h-5 text-red-500" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-800 mb-1">Our Headquarters</h3>
//                     <p className="text-gray-600">123 Healthcare Avenue, Medical District</p>
//                     <p className="text-gray-600">San Francisco, CA 94143</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
//                     <Mail className="w-5 h-5 text-red-500" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-800 mb-1">Email Us</h3>
//                     <p className="text-gray-600">General Inquiries: info@lifelink.org</p>
//                     <p className="text-gray-600">Support: support@lifelink.org</p>
//                     <p className="text-gray-600">Partnerships: partners@lifelink.org</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
//                     <svg
//                       className="w-5 h-5 text-red-500"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                       />
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-800 mb-1">Call Us</h3>
//                     <p className="text-gray-600">Toll Free: +1 (888) 555-LIFE</p>
//                     <p className="text-gray-600">International: +1 (415) 555-1234</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-8 flex space-x-4">
//                 <a
//                   href="#"
//                   className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-colors"
//                 >
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path
//                       fillRule="evenodd"
//                       d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </a>
//                 <a
//                   href="#"
//                   className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-colors"
//                 >
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//                   </svg>
//                 </a>
//                 <a
//                   href="#"
//                   className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-colors"
//                 >
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path
//                       fillRule="evenodd"
//                       d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </a>
//               </div>
//             </motion.div>

//             <motion.div
//               className="md:w-1/2"
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <div className="bg-gray-50 rounded-3xl p-8">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
//                 <form>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                     <div>
//                       <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                         Your Name
//                       </label>
//                       <input
//                         type="text"
//                         id="name"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                         placeholder="John Doe"
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         id="email"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                         placeholder="john@example.com"
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-6">
//                     <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
//                       Subject
//                     </label>
//                     <input
//                       type="text"
//                       id="subject"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                       placeholder="How can we help you?"
//                     />
//                   </div>

//                   <div className="mb-6">
//                     <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
//                       Message
//                     </label>
//                     <textarea
//                       id="message"
//                       rows={5}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                       placeholder="Your message here..."
//                     ></textarea>
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-colors"
//                   >
//                     Send Message
//                   </button>
//                 </form>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 py-16">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
//             <div>
//               <div className="flex items-center mb-6">
//                 <Heart className="h-8 w-8 text-red-500 mr-2" />
//                 <span className="font-bold text-xl text-white">LifeLink</span>
//               </div>
//               <p className="mb-6 text-gray-400">
//                 Connecting donors and recipients to save lives and improve healthcare access for all.
//               </p>
//               <div className="flex space-x-4">
//                 <a
//                   href="#"
//                   className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-500 hover:text-white transition-colors"
//                 >
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path
//                       fillRule="evenodd"
//                       d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </a>
//                 <a
//                   href="#"
//                   className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-500 hover:text-white transition-colors"
//                 >
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//                   </svg>
//                 </a>
//                 <a
//                   href="#"
//                   className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-500 hover:text-white transition-colors"
//                 >
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path
//                       fillRule="evenodd"
//                       d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </a>
//               </div>
//             </div>

//             <motion.div
//               className="md:w-1/2"
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <div className="bg-gray-50 rounded-3xl p-8">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
//                 <form>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                     <div>
//                       <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                         Your Name
//                       </label>
//                       <input
//                         type="text"
//                         id="name"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                         placeholder="John Doe"
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         id="email"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                         placeholder="john@example.com"
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-6">
//                     <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
//                       Subject
//                     </label>
//                     <input
//                       type="text"
//                       id="subject"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                       placeholder="How can we help you?"
//                     />
//                   </div>

//                   <div className="mb-6">
//                     <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
//                       Message
//                     </label>
//                     <textarea
//                       id="message"
//                       rows={5}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                       placeholder="Your message here..."
//                     ></textarea>
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-colors"
//                   >
//                     Send Message
//                   </button>
//                 </form>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 py-16">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
//             <div>
//               <div className="flex items-center mb-6">
//                 <Heart className="h-8 w-8 text-red-500 mr-2" />
//                 <span className="font-bold text-xl text-white">LifeLink</span>
//               </div>
//               <p className="mb-6 text-gray-400">
//                 Connecting donors and recipients to save lives and improve healthcare access for all.
//               </p>
//               <div className="flex space-x-4">
//                 <a
//                   href="#"
//                   className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-500 hover:text-white transition-colors"
//                 >
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path
//                       fillRule="evenodd"
//                       d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </a>
//                 <a
//                   href="#"
//                   className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-500 hover:text-white transition-colors"
//                 >
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//                   </svg>
//                 </a>
//                 <a
//                   href="#"
//                   className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-500 hover:text-white transition-colors"
//                 >
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path
//                       fillRule="evenodd"
//                       d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </a>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
//               <ul className="space-y-3">
//                 <li>
//                   <Link to="/" className="hover:text-red-400 transition-colors">
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/about" className="hover:text-red-400 transition-colors">
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/find-donor" className="hover:text-red-400 transition-colors">
//                     Find Donors
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/blood-requests" className="hover:text-red-400 transition-colors">
//                     Blood Requests
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/register" className="hover:text-red-400 transition-colors">
//                     Become a Donor
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-6 text-white">Legal</h3>
//               <ul className="space-y-3">
//                 <li>
//                   <a href="#" className="hover:text-red-400 transition-colors">
//                     Terms of Service
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-red-400 transition-colors">
//                     Privacy Policy
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-red-400 transition-colors">
//                     Cookie Policy
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-red-400 transition-colors">
//                     Donor Guidelines
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-red-400 transition-colors">
//                     Medicine Exchange Policy
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-6 text-white">Newsletter</h3>
//               <p className="text-gray-400 mb-4">
//                 Stay updated with the latest news, blood donation drives, and medical resources.
//               </p>
//               <form className="space-y-4">
//                 <div>
//                   <input
//                     type="email"
//                     placeholder="Your email address"
//                     className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                 >
//                   Subscribe
//                 </button>
//               </form>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-400 text-center">
//             <p>&copy; {new Date().getFullYear()} LifeLink. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );

// export default AboutPage

"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Users,
  Globe,
  Award,
  Droplet,
  Gift,
  MapPin,
  Mail,
  ExternalLink,
  UserPlus,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
     
<Navbar/>
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-slate-50 via-red-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 mb-6 text-sm font-medium text-red-500 bg-red-100 rounded-full">
              Our Mission
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Connecting Lives, One Drop at a Time
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              LifeLink is a revolutionary peer-to-peer platform connecting blood donors, recipients, and medical
              suppliers to save lives and improve healthcare access for all.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-96 w-full rounded-3xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-red-500 to-blue-600 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center px-4 relative z-10">
                    <div className="bg-white/20 backdrop-blur-sm p-8 rounded-3xl">
                      <Heart className="w-20 h-20 mx-auto mb-4" />
                      <p className="text-2xl font-bold">Our Story</p>
                      <p className="mt-2 text-white/80">Founded with a purpose</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-full opacity-50 blur-2xl"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-red-500 rounded-full opacity-50 blur-2xl"></div>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">How It All Began</h2>
              <p className="text-gray-600 mb-4">
                LifeLink was born out of a personal tragedy. In 2019, our founder Dr. Jyotishman Bordoloi lost her younger
                brother due to a shortage of rare blood type during an emergency. This devastating experience
                highlighted the critical gaps in our blood donation systems.
              </p>
              <p className="text-gray-600 mb-4">
                Determined to prevent similar tragedies, Dr. Bordoloi assembled a team of healthcare professionals,
                technologists, and community organizers to create a direct peer-to-peer platform that would connect
                blood donors with recipients in real-time.
              </p>
              <p className="text-gray-600 mb-6">
                What started as a small community initiative has grown into a nationwide network with thousands of
                donors, saving countless lives through timely blood donations and medicine exchanges.
              </p>
              <div className="flex items-center text-red-500">
                <span className="font-medium mr-2">Learn more about our journey</span>
                <ExternalLink className="h-4 w-4" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-500 bg-blue-100 rounded-full">
              Our Purpose
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Mission & Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're driven by a clear mission and guided by strong values that shape everything we do.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                To create a world where no one dies due to lack of timely access to blood or essential medicines by
                building the most efficient peer-to-peer healthcare resource exchange network.
              </p>
              <p className="text-gray-600">
                We aim to break down barriers to healthcare access, empower communities to help each other, and
                revolutionize how critical medical resources are shared and distributed.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Values</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-red-500 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Accessibility</span> - Making healthcare resources
                    available to everyone, regardless of location or socioeconomic status
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-blue-500 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Safety</span> - Ensuring all exchanges are secure,
                    verified, and follow strict medical protocols
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-emerald-500 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Community</span> - Building a supportive network of
                    donors, recipients, and healthcare providers
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-purple-500 text-sm font-bold">4</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Innovation</span> - Continuously improving our platform
                    to better serve healthcare needs
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Droplet className="w-10 h-10 text-red-500" />,
                title: "Blood Donation",
                description:
                  "Connecting blood donors with recipients in real-time, especially for rare blood types and emergencies.",
              },
              {
                icon: <Gift className="w-10 h-10 text-emerald-500" />,
                title: "Medicine Exchange",
                description:
                  "Facilitating the safe sharing of unused, unexpired medications to those who need them most.",
              },
              {
                icon: <Globe className="w-10 h-10 text-blue-500" />,
                title: "Global Impact",
                description: "Expanding our network globally to address healthcare resource disparities worldwide.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 3) }}
              >
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-emerald-500 bg-emerald-100 rounded-full">
              Making A Difference
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Since our founding, we've made a significant impact on healthcare accessibility and saved countless lives.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { number: "10K+", label: "Active Donors", color: "text-red-500" },
              { number: "5K+", label: "Lives Saved", color: "text-blue-500" },
              { number: "200+", label: "Cities Covered", color: "text-emerald-500" },
              { number: "15K+", label: "Medicines Shared", color: "text-purple-500" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <p className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Success Stories</h3>
                <p className="text-gray-600 mb-6">
                  Our platform has facilitated countless life-saving connections. Here are just a few of the stories
                  that inspire us to continue our mission.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      name: "Emily's Story",
                      description: "Found a rare blood type donor within 30 minutes during an emergency surgery.",
                    },
                    {
                      name: "The Johnson Family",
                      description:
                        "Accessed critical medication for their child when insurance delays threatened treatment.",
                    },
                    {
                      name: "Memorial Hospital",
                      description: "Connected with 50+ donors during a mass casualty event, saving multiple lives.",
                    },
                  ].map((story, index) => (
                    <div key={index} className="flex items-start">
                      <Heart className="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-800">{story.name}</h4>
                        <p className="text-sm text-gray-600">{story.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-6 px-6 py-2 bg-white text-red-500 border border-red-500 rounded-full hover:bg-red-50 transition-colors flex items-center">
                  Read More Stories <ExternalLink className="w-4 h-4 ml-2" />
                </button>
              </div>
              <div className="md:w-1/2">
                <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-4">
                      <blockquote className="text-xl md:text-2xl font-medium text-gray-800 italic">
                        "LifeLink connected me with a donor in minutes when my daughter needed a rare blood type. I'm
                        forever grateful."
                      </blockquote>
                      <p className="mt-4 text-gray-600">— Maria S., Mother & LifeLink User</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-purple-500 bg-purple-100 rounded-full">
              The People Behind LifeLink
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our diverse team of healthcare professionals, technologists, and community organizers is united by a
              shared mission to save lives.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Jyotishman Bordoloi",
                role: "Founder & CEO",
                bio: "Hematologist with 15+ years of experience. Founded LifeLink after losing her brother due to blood shortage.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Paramjit Saikia",
                role: "CTO",
                bio: "Former tech lead at major healthcare platforms. Expert in secure medical data systems and geolocation technologies.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Dr. Niyar Kalita",
                role: "Medical Director",
                bio: "Emergency medicine specialist who ensures all blood and medicine exchanges follow strict medical protocols.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "David Kim",
                role: "Community Director",
                bio: "Former non-profit leader who builds and nurtures our donor and recipient communities worldwide.",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-red-500 mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                  <div className="mt-4 flex space-x-3">
                    <a
                      href="#"
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/about"
              className="inline-flex items-center text-red-500 font-medium hover:text-red-600 transition-colors"
            >
              View Full Team <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners & Affiliations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-gray-500 bg-gray-100 rounded-full">
              Working Together
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Partners & Affiliations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We collaborate with leading healthcare organizations, hospitals, and community groups to expand our
              impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((partner) => (
              <motion.div
                key={partner}
                className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-32"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * partner }}
              >
                <img
                  src={`/placeholder.svg?height=80&width=160&text=Partner ${partner}`}
                  alt={`Partner ${partner}`}
                  className="max-h-16"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-16 bg-gradient-to-br from-red-500 to-red-600 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-400 rounded-full opacity-30 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full opacity-30 blur-3xl translate-y-1/2 -translate-x-1/3"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-red-100 bg-white/20 backdrop-blur-sm rounded-full">
              Join Our Mission
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Involved</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              There are many ways to contribute to our mission of saving lives through blood and medicine exchange.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Droplet className="w-12 h-12" />,
                title: "Become a Donor",
                description:
                  "Register as a blood donor and be notified when someone in your area needs your blood type.",
              },
              {
                icon: <Gift className="w-12 h-12" />,
                title: "Share Medicines",
                description:
                  "Safely share unused, unexpired medications with those who need them but cannot afford them.",
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: "Volunteer",
                description: "Help us organize blood drives, verify users, or contribute your skills to our platform.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-white/80">{item.description}</p>
                  <Link
                    to="/registration"
                    className="inline-block mt-6 px-6 py-2 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/registration"
              className="px-10 py-4 bg-white text-red-600 rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 font-bold text-lg inline-flex items-center"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Join LifeLink Today
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-500 bg-blue-100 rounded-full">
                Get In Touch
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
              <p className="text-gray-600 mb-8">
                Have questions about LifeLink? Want to partner with us or learn more about our mission? We'd love to
                hear from you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">Our Headquarters</h3>
                    <p className="text-gray-600">123 Healthcare Avenue, Medical District</p>
                    <p className="text-gray-600">San Francisco, CA 94143</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">Email Us</h3>
                    <p className="text-gray-600">General Inquiries: info@lifelink.org</p>
                    <p className="text-gray-600">Support: support@lifelink.org</p>
                    <p className="text-gray-600">Partnerships: partners@lifelink.org</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-red-500"
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
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">Call Us</h3>
                    <p className="text-gray-600">Toll Free: +1 (888) 555-LIFE</p>
                    <p className="text-gray-600">International: +1 (415) 555-1234</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-colors"
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
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-colors"
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
            </motion.div>

            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-gray-50 rounded-3xl p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
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
                  <Link to="/" className="hover:text-red-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-red-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/find-donor" className="hover:text-red-400 transition-colors">
                    Find Donors
                  </Link>
                </li>
                <li>
                  <Link to="/blood-requests" className="hover:text-red-400 transition-colors">
                    Blood Requests
                  </Link>
                </li>
                <li>
                  <Link to="/registration" className="hover:text-red-400 transition-colors">
                    Become a Donor
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Donor Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-400 transition-colors">
                    Medicine Exchange Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Stay updated with the latest news, blood donation drives, and medical resources.
              </p>
              <form className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-400 text-center">
            <p>© {new Date().getFullYear()} LifeLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;