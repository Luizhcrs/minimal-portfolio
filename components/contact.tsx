import { Github, Linkedin, Mail, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"

const contacts = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:seu@email.com",
  },
  {
    name: "WhatsApp",
    icon: QrCode,
    href: "#",
  },
]

export function Contact() {
  return (
    <section className="py-32 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto text-center space-y-16">
        <div className="space-y-4 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold text-black dark:text-white">Contato</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Vamos conversar sobre seu próximo projeto</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {contacts.map((contact, index) => (
            <Button
              key={contact.name}
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 dark:border-gray-600 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-black dark:hover:border-white transition-all duration-300 group bg-transparent hover:scale-110 hover:shadow-xl animate-scale-in dark:text-gray-300"
              style={{ animationDelay: `${index * 100}ms` }}
              asChild
            >
              <a
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-6"
              >
                <contact.icon className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-black transition-colors" />
                <span className="text-base font-medium text-gray-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-black transition-colors">
                  {contact.name}
                </span>
              </a>
            </Button>
          ))}
        </div>
        <div
          className="pt-16 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">© 2025 Luiz Cavalcanti. Todos os direitos reservados.</p>
        </div>
      </div>
    </section>
  )
}
