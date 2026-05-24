import { BookOpen } from "lucide-react";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          // Logo + tagline 
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-indigo-600 to-violet-600">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-base leading-tight">
                F<span className="text-indigo-400">Edu</span>
              </div>
              <div className="text-xs text-gray-500">Lớp học đảo ngược</div>
            </div>
          </div>

          // Links 
          <div className="flex items-center gap-6 text-sm">
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Điều khoản
            </a>
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Chính sách
            </a>
            <a
              href="mailto:contact@fedu.vn"
              className="hover:text-white transition-colors"
            >
              Liên hệ
            </a>
          </div>

          // Copyright 
          <div className="text-xs text-gray-500">
            © {CURRENT_YEAR} FEdu. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}