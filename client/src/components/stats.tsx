const StatsSection = () => {
  return (
    <div className="w-full mt-10">
      
      <div className="mx-auto max-w-6xl px-6 sm:px-6 md:px-10 lg:px-8">
        
        <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 py-8 px-6 sm:px-10">
          
          <div className="grid grid-cols-4 md:grid-cols-4 gap-2 text-center">
            
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-blue-400">
                500+
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                Success Stories
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-green-400">
                50K+
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                Community Members
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-purple-400">
                25+
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                Partner Companies
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-orange-400">
                1000+
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                Resources Shared
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default StatsSection