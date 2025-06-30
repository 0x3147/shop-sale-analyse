import CompactLayout from './components/CompactLayout'
import RightContent from './components/RightContent'

/**
 * 第二个页面右侧内容测试组件
 * 用于测试和预览右侧内容的效果
 */
export default function RightContentTest() {
  return (
    <CompactLayout>
      <div
        style={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '15px'
        }}
      >
        {/* 左侧占位区域 */}
        <div
          style={{
            background: 'rgba(15, 40, 80, 0.3)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8fb3f1',
            fontSize: '24px'
          }}
        >
          左侧内容占位区域
          <br />
          （原店铺曝光量排行、Logo+ROI、月销售趋势等）
        </div>

        {/* 右侧内容 */}
        <div style={{ height: '100%' }}>
          <RightContent />
        </div>
      </div>
    </CompactLayout>
  )
}
