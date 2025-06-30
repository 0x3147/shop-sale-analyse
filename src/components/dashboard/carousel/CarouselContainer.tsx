import { useEffect, useState } from 'react'
import './CarouselContainer.less'
import CarouselPage1 from './carouselPage1'
import CarouselPage2 from './carouselPage2'

/**
 * 轮播容器组件
 * 自动在两个轮播页面之间切换
 */
export default function CarouselContainer() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // 轮播间隔时间（毫秒）
  const CAROUSEL_INTERVAL = 30000 // 30秒

  // 自动轮播逻辑
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)

      // 延迟切换页面，为过渡动画留时间
      setTimeout(() => {
        setCurrentPage((prev) => (prev === 0 ? 1 : 0))
        setIsTransitioning(false)
      }, 500) // 0.5秒过渡时间
    }, CAROUSEL_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="carousel-container">
      {/* 轮播内容区域 */}
      <div
        className={`carousel-content ${isTransitioning ? 'transitioning' : ''}`}
      >
        {currentPage === 0 ? <CarouselPage1 /> : <CarouselPage2 />}
      </div>
    </div>
  )
}
