import { Link } from "wouter";

export function Footer() {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "Features", href: "#platform" },
        { label: "Industries", href: "#industries" },
        { label: "API Documentation", href: "#api" },
        { label: "Integration Guide", href: "#integration" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Hansei", href: "/about" },
        { label: "Research", href: "/research" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Training", href: "/training" },
        { label: "Community", href: "/community" },
        { label: "Status", href: "/status" }
      ]
    }
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Security", href: "/security" }
  ];

  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4" data-testid="footer-logo">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <div>
                <span className="text-lg font-bold">DSB GENIUS</span>
                <span className="text-xs text-neutral-400 block -mt-1">Powered by Hansei Intelligence</span>
              </div>
            </Link>
            <p className="text-neutral-400 text-sm mb-4">
              Revolutionary AI-powered manufacturing optimization platform transforming how businesses optimize their operations.
            </p>
            <div className="text-xs text-neutral-500">
              © 2024 Hansei Intelligence. All rights reserved.
              <br />
              Patent Pending • Trademark Applied
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4" data-testid={`footer-section-${index}`}>
                {section.title}
              </h4>
              <div className="space-y-2 text-sm text-neutral-400">
                {section.links.map((link, linkIndex) => (
                  <a 
                    key={linkIndex}
                    href={link.href} 
                    className="hover:text-white transition-colors block"
                    data-testid={`footer-link-${index}-${linkIndex}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-neutral-400 mb-4 md:mb-0">
              Hansei Intelligence • DSB GENIUS Platform • Manufacturing Optimization Leader
            </div>
            <div className="flex items-center space-x-6">
              {legalLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                  data-testid={`footer-legal-${index}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
