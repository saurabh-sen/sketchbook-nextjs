import Menu from '@/components/Menu/Menu'
import SketchBoard from '@/components/SketchBoard/SketchBoard'
import Toolbox from '@/components/Toolbox/Toolbox'

export default function Home() {
  return (
    <main style={{
      userSelect: 'none',
    }}>
      <Menu />
      <Toolbox />
      <SketchBoard />
    </main>
  )
}
