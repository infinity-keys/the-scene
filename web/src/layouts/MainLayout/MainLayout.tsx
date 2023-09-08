import Nav from 'src/components/Nav/Nav'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Nav />
      {children}
    </>
  )
}

export default MainLayout
