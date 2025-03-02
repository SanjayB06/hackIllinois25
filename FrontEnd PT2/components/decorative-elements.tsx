import { LeafLogo } from "./leaf-logo"

export const DecorativeElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 opacity-10">
        <LeafLogo className="w-full h-full text-sage-600" />
      </div>
      <div className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/3 translate-y-1/3 opacity-10">
        <LeafLogo className="w-full h-full text-sage-600" />
      </div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 opacity-10">
        <LeafLogo className="w-full h-full text-sage-600" />
      </div>
      <svg
        className="absolute top-0 right-0 w-64 h-64 text-sage-200 opacity-20"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" />
        <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="2" />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-48 h-48 text-sage-200 opacity-20"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 90 Q50 10 90 90" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M10 10 Q50 90 90 10" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    </div>
  )
}

