import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="gradient-primary text-white py-20 px-4 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-yellow rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-light rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-12">
              <div className="flex-1 text-center md:text-left animate-fade-in-up">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">
                  ESA-MU Examination Bank
                </h1>
                <p className="text-lg md:text-xl text-accent-light mb-10 max-w-2xl text-balance leading-relaxed">
                  Access past examination papers from the School of Engineering at Moi University. Study, prepare, and
                  excel in your exams.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link
                    href="/browse"
                    className="bg-accent-yellow text-primary font-bold py-4 px-10 rounded-xl hover:bg-opacity-90 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 inline-block text-center"
                  >
                    Browse Exams
                  </Link>
                  <Link
                    href="/upload"
                    className="bg-accent-light text-primary font-bold py-4 px-10 rounded-xl hover:bg-opacity-90 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 inline-block text-center"
                  >
                    Upload Paper
                  </Link>
                </div>
              </div>
              <div className="flex-1 flex justify-center gap-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <Image
                  src="/moi-university-logo.png"
                  alt="Moi University Logo"
                  width={150}
                  height={150}
                  className="h-40 w-auto drop-shadow-lg hover:scale-110 transition-transform duration-300"
                />
                <Image
                  src="/esamu-logo.png"
                  alt="ESA-MU Logo"
                  width={150}
                  height={150}
                  className="h-40 w-auto drop-shadow-lg hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-b from-neutral-light to-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="section-title">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: "1",
                  title: "Browse",
                  description:
                    "Filter exams by department, year, semester, and exam type to find exactly what you need.",
                },
                {
                  number: "2",
                  title: "Download",
                  description: "Download past papers instantly to study at your own pace and prepare effectively.",
                },
                {
                  number: "3",
                  title: "Contribute",
                  description: "Share exam papers with the community to help fellow students prepare and succeed.",
                },
              ].map((item, index) => (
                <div
                  key={item.number}
                  className="card-modern card-hover p-8 border-l-4 border-accent group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-5xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                    {item.number}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="section-title">Our Departments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { code: "MPE", name: "Mechanical and Production Engineering" },
                { code: "TLE", name: "Electrical and Telecommunication Engineering" },
                { code: "EC", name: "Electrical and Electronics Engineering" },
                { code: "CPE", name: "Chemical and Processing Engineering" },
                { code: "CSE", name: "Civil and Structural Engineering" },
              ].map((dept) => (
                <Link
                  key={dept.code}
                  href={`/browse?department=${dept.code}`}
                  className="card-modern card-hover p-8 text-center group hover:bg-accent-light"
                >
                  <div className="text-3xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                    {dept.code}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed font-medium">{dept.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
