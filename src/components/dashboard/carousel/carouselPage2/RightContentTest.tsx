import CompactLayout from './components/CompactLayout'
import LeftContent from './components/LeftContent'
import RightContent from './components/RightContent'

/**
 * 第二个页面内容测试组件
 * 用于测试和预览完整的第二个页面效果
 */
export default function RightContentTest() {
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
        {/* 左侧内容 */}
        <div style={{ height: '100%' }}>
          <LeftContent />
        </div>

        <div style={{ height: '100%' }}></div>

        {/* 右侧内容 */}
        <div style={{ height: '100%' }}>
          <RightContent />
        </div>
      </div>
    </CompactLayout>
  )
}
