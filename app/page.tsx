export default function Home() {
  return (
    <main>
      <div className="flex gap-2 m-4 justify-center">
        <label>Movie:</label>
        <input type="search" className="input bg-neutral"/>
        <button className="btn btn-primary">SEARCH</button>
      </div>
    </main>
  )
}
