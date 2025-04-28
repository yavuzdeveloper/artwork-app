export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="inline-block">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-6"></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-30 py-4">
            <div className="w-full h-[70vh] bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="p-6">
            <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-6 w-1/5 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
