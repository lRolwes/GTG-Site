import Link from 'next/link'
import Image from 'next/image'
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from 'lucide-react'
import { Josefin_Sans } from 'next/font/google'

const josefinSans = Josefin_Sans({ subsets: ['latin'] })

export function Footer() {
  return (
    <footer className={`${josefinSans.className} bg-white text-primary`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Image className="" width={200} height={200} src="/GTG_Logo.png" alt="GTG Vacations" />
            <p className="text-sm">
              Bringing families together through travel.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-primary hover:text-secondary">
                <span className="sr-only">Facebook</span>
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-primary hover:text-secondary">
                <span className="sr-only">Instagram</span>
                <InstagramIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-primary hover:text-secondary">
                <span className="sr-only">Twitter</span>
                <TwitterIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-primary hover:text-secondary">
                <span className="sr-only">YouTube</span>
                <YoutubeIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase">Solutions</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/cruises" className="text-primary hover:text-secondary">
                      Cruises
                    </Link>
                  </li>
                  <li>
                    <Link href="/allinclusives" className="text-base hover:text-secondary">
                      All-Inclusive Resorts
                    </Link>
                  </li>
                  <li>
                    <Link href="/grouptrips" className="text-base hover:text-secondary">
                      Group Trips
                    </Link>
                  </li>
                  <li>
                    <Link href="/findyourtrip" className="text-base hover:text-secondary">
                      Find Your Trip
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="pricing" className="text-base hover:text-secondary">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/traveltips" className="text-base hover:text-secondary">
                      Travel Tips
                    </Link>
                  </li>                 
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/about" className="text-base hover:text-secondary">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-base hover:text-secondary">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-base hover:text-secondary">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/claim" className="text-base hover:text-secondary">
                      Claim
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-base hover:text-secondary">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-base hover:text-secondary">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white pt-8">
          <p className="text-base text-center">&copy; 2024 GTG Vacations, LLC All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
