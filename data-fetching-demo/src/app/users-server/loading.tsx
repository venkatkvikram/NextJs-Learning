export default function LoadingPage() {
    return (
        <div
            className="flex flex-col items-center justify-center h-screen"
            role="status"
            aria-label="Loading"
        >
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-sm text-gray-600">Loading...</p>
        </div>
    );
}
