// import bgImage from "../assets/images/bg-pattern2.png"
export default function Features() {
  const features = [
  {
    title: "Startups",
    description: "Discover and apply to startup opportunities based on your city, making it easier to find real-world experience near you.",
    icon: "🚀"
  },
  {
    title: "Internships",
    description: "Browse curated internships tailored for students and apply seamlessly with a streamlined application process.",
    icon: "👩🏻‍💻"
  },
  {
    title: "Blogs",
    description: "Read and share valuable tech blogs, experiences, and learning resources created by students and professionals.",
    icon: "📝"
  },
  {
    title: "Interview Experience",
    description: "Access real interview experiences shared by students to better prepare for your next opportunity.",
    icon: "💼"
  },
  {
    title: "Resume Analysis",
    description: "Get instant AI-powered feedback on your resume to improve your chances of getting shortlisted.",
    icon: "📑"
  },
  {
    title: "Community",
    description: "Connect with like-minded students, share opportunities, and grow together in a supportive community.",
    icon: "💬"
  }
];

  return (
    <section className="py-20 bg-black
    
        min-h-screen w-full bg-cover bg-center text-white"
        // style={{ backgroundImage: `url(${bgImage})` }}
      >
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="manrope text-3xl sm:text-4xl font-bold text-white mb-4">
            What we <span className="cursive text-[#d7742d]"> Offer</span> you
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Everything you need to build amazing products, shipped faster than ever before.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 sm:p-8 
              rounded-2xl 
              bg-white/5 backdrop-blur-md border border-white/10
              hover:border-[#e86100]/40 
              hover:shadow-lg hover:shadow-[#e86100]/10
              transition-all duration-300 hover:-translate-y-1"
            >
              
              {/* Icon */}
              <div className="text-3xl sm:text-4xl mb-4">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}