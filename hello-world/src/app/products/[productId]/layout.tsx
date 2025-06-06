export default function ProductDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children} {/* will be the product id */}
      <h2>Featured Products</h2>
    </>
  );
}
