const INFO_MAX_LENGTH = 140

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

      <div className="relative">
        <textarea
          className="w-full pr-16"
          rows={3}
          name="comment"
          id="comment"
          value={bandInfo}
          onChange={(e) => {
            if (e.target.value.length <= INFO_MAX_LENGTH) {
              setBandInfo(e.target.value)
            }
          }}
        />
        <p className="absolute bottom-4 right-4 text-xs">
          {bandInfo.length}/{INFO_MAX_LENGTH}
        </p>
      </div>

      <label htmlFor="link" className="pb-2 pt-6">
        Share a link to the band playing (optional)
      </label>

      <input
        type="text"
        name="link"
        id="link"
        value={bandLink}
        className="py-2"
        onChange={(e) => setBandLink(e.target.value)}
      />
    </div>
  )
}

export default InfoInput
