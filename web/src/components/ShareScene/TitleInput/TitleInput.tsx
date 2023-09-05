const TitleInput = ({
  bandName,
  setBandName,
}: {
  bandName: string
  setBandName: (s: string) => void
}) => {
  return (
    <div className="mb-6 flex flex-col gap-1">
      <label htmlFor="title" className="pb-2">
        What is the band called?
      </label>
      <input
        type="text"
        name="title"
        id="title"
        value={bandName}
        onChange={(e) => setBandName(e.target.value)}
      />
    </div>
  )
}

export default TitleInput
