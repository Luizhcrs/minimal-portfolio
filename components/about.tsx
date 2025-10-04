export function About() {
  return (
    <section className="py-32 px-6 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-shrink-0 animate-slide-in-left">
            <div className="w-56 h-56 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow duration-500">
              <img
                src="./professional-developer-portrait-minimalist.jpg"
                alt="Profile"
                className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
          <div className="flex-1 space-y-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <h2 className="text-5xl md:text-6xl font-bold text-black dark:text-white">Sobre Mim</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Especialista em QA e desenvolvimento full stack. 
              Experiência em Python, C#, JavaScript, Metabase e Docker. 
              Criador de soluções como assistente de IA para WhatsApp e cardápio digital integrado ao Google Sheets.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {["QA Testing", "Full Stack", "AI/ML", "Automation", "Python", "C#", "PostgreSQL", "Docker", "Metabase", "n8n"].map((skill, index) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-black dark:hover:border-white transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${300 + index * 50}ms` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
