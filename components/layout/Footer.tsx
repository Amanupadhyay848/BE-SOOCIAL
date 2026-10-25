import React from 'react';
import Link from 'next/link';

import { SERVICES_NAV_ITEMS, AGENCY_NAV_ITEMS, LEGAL_NAV_ITEMS } from '@/data/navigation';

export function Footer() {
  return (
    <footer className="w-full bg-[#080808] border-t border-white/[0.08] text-neutral-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Wordmark & Statement */}
          <div className="md:col-span-1 space-y-4">
            <Link
              href="/"
              className="text-xl font-black text-white hover:text-[#C6FF3D] transition-colors uppercase tracking-tight"
            >
              BE SOOCIAL
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-xs">
              Creative media & production agency engineering cultural gravity for brands through cinematic video, AI filmmaking, and high-performance digital experiences.
            </p>
            <div className="pt-2 text-xs font-mono text-neutral-400">
              Kolar Road, Bhopal, Madhya Pradesh · India
            </div>
          </div>

          {/* Col 2: Capabilities / Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-200">
              Capabilities
            </h3>
            <ul className="space-y-2 text-xs">
              {SERVICES_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-200">
              Agency
            </h3>
            <ul className="space-y-2 text-xs">
              {AGENCY_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`transition-colors ${
                      item.href === '/start-a-project'
                        ? 'text-[#C6FF3D] hover:underline font-medium'
                        : 'hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Studio Direct Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-200">
              Direct Inquiries
            </h3>
            <p className="text-xs text-neutral-400">
              For commercial productions, brand retainers, and collaborations:
            </p>
            <div className="space-y-1">
              <a
                href="mailto:Besoooocial@gmail.com"
                className="block text-xs font-mono text-white hover:text-[#C6FF3D] transition-colors break-all"
              >
                Besoooocial@gmail.com
              </a>
              <a
                href="tel:+916264878719"
                className="block text-xs font-mono text-white hover:text-[#C6FF3D] transition-colors"
              >
                +91 6264878719
              </a>
            </div>
            <div className="pt-2">
              <Link
                href="/admin"
                className="inline-block text-[11px] font-mono text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                Access Admin Portal →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} BE SOOCIAL LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {LEGAL_NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-neutral-200 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
