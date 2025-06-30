import { getCountryHotProducts } from '@/service/api'
import { CountryHotProductsResponse } from '@/service/types'
import { useRequest } from 'ahooks'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import { useEffect, useState } from 'react'
import './index.less'

interface WorldHotCountriesMapProps {
  /**
   * 是否显示加载状态
   */
  loading?: boolean
}

/**
 * 世界热门国家地图组件
 * 显示有热门商品的国家在世界地图上的分布
 */
export default function WorldHotCountriesMap({
  loading: externalLoading = false
}: WorldHotCountriesMapProps) {
  const [countries, setCountries] = useState<string[]>([])
  const [mapReady, setMapReady] = useState(false)

  // 获取各国热门产品数据
  const { data, loading } = useRequest(getCountryHotProducts, {
    pollingInterval: 60000, // 每60秒轮询一次
    pollingWhenHidden: false,
    loadingDelay: 300,
    refreshOnWindowFocus: false,
    onError: (error) => {
      console.error('获取各国热门产品数据失败:', error)
    }
  })

  // 国家名称映射（中文到英文，匹配ECharts世界地图）
  const countryNameMap: Record<string, string> = {
    中国: 'China',
    美国: 'United States of America',
    俄罗斯: 'Russia',
    乌克兰: 'Ukraine',
    墨西哥: 'Mexico',
    巴西: 'Brazil',
    意大利: 'Italy',
    西班牙: 'Spain',
    秘鲁: 'Peru',
    英国: 'United Kingdom',
    法国: 'France',
    德国: 'Germany',
    日本: 'Japan',
    韩国: 'South Korea',
    印度: 'India',
    澳大利亚: 'Australia',
    加拿大: 'Canada',
    荷兰: 'Netherlands',
    比利时: 'Belgium',
    瑞士: 'Switzerland',
    奥地利: 'Austria',
    葡萄牙: 'Portugal',
    希腊: 'Greece',
    土耳其: 'Turkey',
    泰国: 'Thailand',
    越南: 'Vietnam',
    新加坡: 'Singapore',
    马来西亚: 'Malaysia',
    印度尼西亚: 'Indonesia',
    菲律宾: 'Philippines'
  }

  // 处理API数据
  useEffect(() => {
    if (data?.data) {
      const responseData = data.data as CountryHotProductsResponse

      // 提取所有国家名称（排除date和columns字段）
      const countryList = Object.keys(responseData).filter(
        (key) => key !== 'date' && key !== 'columns'
      )
      console.log(countryList)

      setCountries(countryList)
    }
  }, [data])

  // 注册世界地图
  useEffect(() => {
    const loadWorldMap = async () => {
      try {
        // 动态导入世界地图数据
        const worldMapData = await import('./worldMap.json')
        const mapData = worldMapData.default || worldMapData

        // 注册地图
        echarts.registerMap('world', mapData as any)
        setMapReady(true)
        console.log('世界地图注册成功')
      } catch (error) {
        console.error('世界地图数据加载失败:', error)
        setMapReady(false)
      }
    }

    loadWorldMap()
  }, [])

  const isLoading = loading || externalLoading || !mapReady

  // 配置ECharts地图
  const option = {
    backgroundColor: 'transparent',
    title: {
      text: '全球热门商品国家分布',
      left: 'center',
      top: '3%',
      textStyle: {
        color: '#15f4ee',
        fontSize: 28,
        fontWeight: 'bold',
        textShadowColor: 'rgba(21, 244, 238, 0.5)',
        textShadowBlur: 4
      }
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(15, 40, 80, 0.9)',
      borderColor: '#15f4ee',
      borderWidth: 1,
      textStyle: {
        color: '#fff',
        fontSize: 16
      },
      formatter: (params: any) => {
        // 从英文名称反向查找中文名称
        const chineseName =
          Object.keys(countryNameMap).find(
            (key) => countryNameMap[key] === params.name
          ) || params.name

        const hasHotProducts = countries.some(
          (country) => countryNameMap[country] === params.name
        )

        return `
          <div style="padding: 8px;">
            <div style="color: #15f4ee; font-weight: bold; margin-bottom: 4px;">${chineseName}</div>
            <div>${hasHotProducts ? '有热门商品' : '暂无热门商品'}</div>
            ${hasHotProducts ? `<div>热门商品数量: ${params.value || 0}</div>` : ''}
          </div>
        `
      }
    },
    visualMap: {
      show: false,
      min: 0,
      max: 10,
      inRange: {
        color: ['rgba(28, 62, 122, 0.3)', '#15f4ee']
      }
    },
    series: [
      {
        name: '世界地图',
        type: 'map',
        map: 'world',
        roam: false,
        zoom: 1.2,
        center: [0, 0],
        itemStyle: {
          // 默认国家颜色
          color: 'rgba(28, 62, 122, 0.3)',
          borderColor: 'rgba(94, 200, 234, 0.2)',
          borderWidth: 1
        },
        emphasis: {
          itemStyle: {
            color: 'rgba(28, 62, 122, 0.5)',
            borderColor: 'rgba(94, 200, 234, 0.4)',
            borderWidth: 2
          }
        },
        data: countries.map((country, index) => {
          const englishName = countryNameMap[country] || country
          return {
            name: englishName,
            value: 5 + index,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                { offset: 0, color: '#15f4ee' },
                { offset: 1, color: '#5ec8ea' }
              ]),
              borderColor: '#15f4ee',
              borderWidth: 2,
              shadowColor: 'rgba(21, 244, 238, 0.5)',
              shadowBlur: 8
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  { offset: 0, color: '#00d4ff' },
                  { offset: 1, color: '#15f4ee' }
                ]),
                borderColor: '#00d4ff',
                borderWidth: 3,
                shadowColor: 'rgba(0, 212, 255, 0.8)',
                shadowBlur: 12
              }
            }
          }
        }),
        label: {
          show: false
        }
      }
    ],
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicOut'
  }

  return (
    <div className="world-hot-countries-map">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner" />
          <div className="loading-text">
            {!mapReady ? '加载地图数据...' : '加载中...'}
          </div>
        </div>
      ) : (
        <ReactECharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      )}

      {/* 国家列表指示器 */}
      {mapReady && countries.length > 0 && (
        <div className="countries-indicator">
          <div className="indicator-title">当前热门国家</div>
          <div className="countries-list">
            {countries.slice(0, 6).map((country) => (
              <span key={country} className="country-tag">
                {country}
              </span>
            ))}
            {countries.length > 6 && (
              <span className="country-tag more">+{countries.length - 6}</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
