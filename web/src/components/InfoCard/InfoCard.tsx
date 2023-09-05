import Button from 'src/components/Button/Button'

const InfoCard = () => {
  return (
    <div className="w-full max-w-md font-semibold text-white shadow-lg">
      <div className="bg-neutral-750 overflow-hidden rounded-lg">
        <div
          className="flex min-h-[250px] flex-col items-end justify-end gap-2 bg-cover bg-center p-3 text-xs font-normal"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, .0), rgba(0, 0, 0, .80)), url(https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80)',
          }}
        >
          <div className="border border-white px-3 py-1">
            This show is great 🤩
          </div>
          <div className="border border-white px-3 py-1">
            This place is not crowded 🫥
          </div>
        </div>

        <div className="p-6">
          <div className="mb-1 flex items-center justify-between">
            <p>Dude Playing Guitar</p>
            <a
              href="http://google.com"
              className="hover:text-accent text-sm font-bold underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              +info
            </a>
          </div>
          <p className="text-xs">
            <span className="text-accent">Started!</span> (9:30pm)
          </p>
          <p className="text-xs">0.2 mi from you</p>
        </div>

        <div className="flex gap-3 px-6 pb-4">
          <Button outline fullWidth>
            Directions
          </Button>
          <Button fullWidth>Rate Scene</Button>
        </div>
      </div>
    </div>
  )
}

export default InfoCard
