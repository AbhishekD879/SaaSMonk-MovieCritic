export default function Loading() {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-purple-500"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-purple-200 animate-spin"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }