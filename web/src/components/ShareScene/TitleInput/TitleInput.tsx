const TITLE_MAX_LENGTH = 40

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
      <div className="relative">
        <textarea
          className="w-full pr-16 uppercase"
          rows={2}
          name="title"
          id="title"
          value={bandName}
          onChange={(e) => {
            if (e.target.value.length <= TITLE_MAX_LENGTH) {
              setBandName(e.target.value)
            }
          }}
        />
        <p className="absolute bottom-4 right-4 text-xs">
          {bandName.length}/{TITLE_MAX_LENGTH}
        </p>
      </div>
    </div>
  )
}

export default TitleInput
