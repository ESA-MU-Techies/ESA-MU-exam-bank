export function Footer() {
  return (
    <footer className="bg-primary-dark text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">ESA-MU</h3>
            <p className="text-accent-light text-sm">
              Engineering Students' Association - Moi University Examination Bank System
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/browse" className="hover:text-accent-light transition">
                  Browse Exams
                </a>
              </li>
              <li>
                <a href="/upload" className="hover:text-accent-light transition">
                  Upload Paper
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Departments</h4>
            <ul className="space-y-2 text-sm">
              <li>MPE - Mechanical and Production Engineering</li>
              <li>TLE - Electrical and Telecommunication Engineering</li>
              <li>EC - Electrical and Electronics Engineering</li>
              <li>CPE - Chemical and Processing Engineering</li>
              <li>CSE - Civil and Structural Engineering</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-accent pt-8 text-center text-sm text-accent-light">
          <p>&copy; 2025 ESA-MU Examination Bank. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
