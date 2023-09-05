const InfoInput = ({
  bandInfo,
  setBandInfo,
  bandLink,
  setBandLink,
}: {
  bandInfo: string
  setBandInfo: (s: string) => void
  bandLink: string
  setBandLink: (s: string) => void
}) => {
  return (
    <div className="mb-6 flex flex-col gap-1">
      <label htmlFor="comment" className="pb-2">
        Any comments? (optional)
      </label>

      <textarea
        name="comment"
        id="comment"
        onChange={(e) => setBandInfo(e.target.value)}
        value={bandInfo}
      />

      <label htmlFor="link" className="pb-2 pt-6">
        Share a link to the band playing (optional)
      </label>

      <input
        type="text"
        name="link"
        id="link"
        value={bandLink}
        onChange={(e) => setBandLink(e.target.value)}
      />
    </div>
  )
}

export default InfoInput
