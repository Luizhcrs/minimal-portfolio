export function About() {
  const skills = [
    "Python", "TypeScript", "FastAPI", "React", "PostgreSQL", "Redis",
    "Docker", "Linux", "Selenium", "Pytest", "Next.js", "Tailwind",
    "C#", ".NET", "LLM", "Reverse Engineering",
  ]

  return (
    <section className="py-32 px-6 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-shrink-0 animate-slide-in-left">
            <div className="w-56 h-56 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow duration-500">
              <img
                src="./professional-developer-portrait-minimalist.jpg"
                alt="Profile"
                className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scroll-hover-inactive"
              />
            </div>
          </div>
          <div className="flex-1 space-y-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <h2 className="text-5xl md:text-6xl font-bold text-black dark:text-white">Sobre</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Engenharia de software full-cycle com atenção à qualidade e automação.
              Do schema SQL ao deploy, passando por testes, observabilidade e UX administrativa.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Áreas que me interessam: arquiteturas multi-tenant, identidade e autenticação,
              integrações de pagamento, sistemas com LLMs, reverse engineering e
              automação de tarefas repetitivas.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {skills.map((skill, index) => (
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
