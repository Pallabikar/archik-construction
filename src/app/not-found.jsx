import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-slate-700 mb-4">Page Not Found</h2>
      <p className="text-slate-600 max-w-md mb-8">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">
          Return to Homepage
        </Button>
      </Link>
    </div>
  )
}
