import { useAppSelector, useAppDispatch } from '@/GlobalStore/hooks'
import Menu from '@/components/Menu/Menu'
import SketchBoard from '@/components/SketchBoard/SketchBoard'
import Toolbox from '@/components/Toolbox/Toolbox'

export default function Home() {
  return (
    <main>
      <Menu />
      <Toolbox />
      <SketchBoard />
    </main>
  )
}
