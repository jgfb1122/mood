const EntryCard = ({ entry }) => {
    const date = new Date(entry.createdAt).toDateString()
    return (
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5">{date}</div>
        <div className="px-4 py-5">test entry analysis</div>
        <div className="px-4 py-4">test entry analysis mood</div>
      </div>
    )
  }
  
  export default EntryCard