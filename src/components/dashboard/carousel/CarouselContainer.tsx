import { useEffect, useState } from 'react'
import './CarouselContainer.less'
import CarouselPage1 from './carouselPage1'
import CarouselPage2 from './carouselPage2'
import CarouselPage3 from './carouselPage3'

/**
 * 轮播容器组件
 * 自动在三个轮播页面之间切换
 */
export default function CarouselContainer() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // 轮播间隔时间（毫秒）
  const CAROUSEL_INTERVAL = 50000 // 50秒

  // 自动轮播逻辑
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)

      // 延迟切换页面，为过渡动画留时间
      setTimeout(() => {
        setCurrentPage((prev) => (prev + 1) % 3) // 在三个页面之间循环
        setIsTransitioning(false)
      }, 500) // 0.5秒过渡时间
    }, CAROUSEL_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  // 渲染当前页面
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 0:
        return <CarouselPage1 />
      case 1:
        return <CarouselPage2 />
      case 2:
        return <CarouselPage3 />
      default:
        return <CarouselPage1 />
    }
  }

  return (
    <div className="carousel-container">
      {/* 轮播内容区域 */}
      <div
        className={`carousel-content ${isTransitioning ? 'transitioning' : ''}`}
      >
        {renderCurrentPage()}
      </div>
    </div>
  )
}
