import logoImg from '@/assets/logo.png'
import CompactLayout from '../carouselPage2/components/CompactLayout'
import SimpleROI from '../components/simpleROI'
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

        <div style={{ height: '100%' }}>
          <div className="center-header">
            <div className="header-content">
              {/* Logo区域 */}
              <div className="logo-container">
                <img src={logoImg} alt="京科社技" className="logo-image" />
              </div>

              {/* 简化的ROI组件 */}
              <div className="roi-container">
                <SimpleROI />
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: '100%' }}></div>
      </div>
    </CompactLayout>
  )
}
