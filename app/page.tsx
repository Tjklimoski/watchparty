import Container from "@/components/util/Container";

export default function Home() {
  return (
    // Negative margin top is to offset the navbar, so content is centered on page
    <main className="-mt-16 sm:-mt-20">
      <Container>
        <div className="flex gap-2 h-screen items-center justify-center">
          <h1 className="text-5xl text-center -skew-y-3">
            Welcome to
            <br />
            <span className="text-6xl font-semibold">
              Watch<span className="text-primary">Party</span>!
            </span>
          </h1>
        </div>
      </Container>
    </main>
  );
}
