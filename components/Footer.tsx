import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <div className="text-center">
          {/* Logo/Brand */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">ReIgnite Acquisition</h3>
            <p className="text-gray-400">Automated Client Acquisition for B2B Consultants</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <Link href="/case-studies" className="text-gray-400 hover:text-white transition-colors">
              Case Studies
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500 text-sm">
              © {currentYear} ReIgnite Acquisition. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
