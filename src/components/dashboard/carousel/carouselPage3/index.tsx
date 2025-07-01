import CompactLayout from '../carouselPage2/components/CompactLayout'
import './index.less'

export default function CarouselPage3() {
  return (
    <CompactLayout>
      <div
        style={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '15px'
        }}
      >
        <div style={{ height: '100%' }}></div>

        <div style={{ height: '100%' }}></div>

        <div style={{ height: '100%' }}></div>
      </div>
    </CompactLayout>
  )
}
