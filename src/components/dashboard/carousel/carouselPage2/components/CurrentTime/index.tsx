import { getHotCountries } from '@/service/api'
import { useRequest } from 'ahooks'
import { formatInTimeZone } from 'date-fns-tz'
import { useEffect, useState } from 'react'
import './index.less'

// 全球主要国家与时区映射关系 - 仅作为备用
const COUNTRY_TIMEZONE_MAP: Record<string, string> = {
  中国: 'Asia/Shanghai',
  美国: 'America/New_York',
  日本: 'Asia/Tokyo',
  英国: 'Europe/London',
  德国: 'Europe/Berlin',
  法国: 'Europe/Paris',
  澳大利亚: 'Australia/Sydney',
  加拿大: 'America/Toronto',
  印度: 'Asia/Kolkata',
  巴西: 'America/Sao_Paulo',
  俄罗斯: 'Europe/Moscow',
  韩国: 'Asia/Seoul',
  新加坡: 'Asia/Singapore',
  阿联酋: 'Asia/Dubai',
  墨西哥: 'America/Mexico_City',
  西班牙: 'Europe/Madrid',
  意大利: 'Europe/Rome',
  荷兰: 'Europe/Amsterdam',
  瑞典: 'Europe/Stockholm',
  瑞士: 'Europe/Zurich',
  泰国: 'Asia/Bangkok',
  越南: 'Asia/Ho_Chi_Minh',
  马来西亚: 'Asia/Kuala_Lumpur',
  印度尼西亚: 'Asia/Jakarta',
  菲律宾: 'Asia/Manila',
  南非: 'Africa/Johannesburg',
  埃及: 'Africa/Cairo',
  土耳其: 'Europe/Istanbul',
  沙特阿拉伯: 'Asia/Riyadh',
  乌克兰: 'Europe/Kiev',
  秘鲁: 'America/Lima'
}

// 国家首都映射
const COUNTRY_CAPITAL_MAP: Record<string, string> = {
  中国: '北京',
  美国: '华盛顿',
  日本: '东京',
  英国: '伦敦',
  德国: '柏林',
  法国: '巴黎',
  澳大利亚: '堪培拉',
  加拿大: '渥太华',
  印度: '新德里',
  巴西: '巴西利亚',
  俄罗斯: '莫斯科',
  韩国: '首尔',
  新加坡: '新加坡',
  阿联酋: '阿布扎比',
  墨西哥: '墨西哥城',
  西班牙: '马德里',
  意大利: '罗马',
  荷兰: '阿姆斯特丹',
  瑞典: '斯德哥尔摩',
  瑞士: '伯尔尼',
  泰国: '曼谷',
  越南: '河内',
  马来西亚: '吉隆坡',
  印度尼西亚: '雅加达',
  菲律宾: '马尼拉',
  南非: '约翰内斯堡',
  埃及: '开罗',
  土耳其: '安卡拉',
  沙特阿拉伯: '利雅得',
  乌克兰: '基辅',
  秘鲁: '利马'
}

// 格式化函数
const formatTime = (date: Date, timezone: string) => {
  try {
    return formatInTimeZone(date, timezone, 'HH:mm:ss')
  } catch (error) {
    console.error('时区转换错误:', error)
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }
}

const formatDate = (date: Date, timezone: string) => {
  try {
    return formatInTimeZone(date, timezone, 'yyyy-MM-dd')
  } catch (error) {
    console.error('时区转换错误:', error)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }
}

// 根据国家名称猜测时区
const guessTimezone = (country: string): string => {
  // 首先检查我们预设的映射
  if (COUNTRY_TIMEZONE_MAP[country]) {
    return COUNTRY_TIMEZONE_MAP[country]
  }

  // 简单的国家-城市映射猜测
  const commonCities: Record<string, string> = {
    英国: 'Europe/London',
    法国: 'Europe/Paris',
    德国: 'Europe/Berlin',
    印度: 'Asia/Kolkata',
    日本: 'Asia/Tokyo',
    澳大利亚: 'Australia/Sydney',
    新西兰: 'Pacific/Auckland',
    俄罗斯: 'Europe/Moscow',
    巴西: 'America/Sao_Paulo',
    墨西哥: 'America/Mexico_City',
    加拿大: 'America/Toronto',
    美国: 'America/New_York'
  }

  for (const [knownCountry, timezone] of Object.entries(commonCities)) {
    if (country.includes(knownCountry)) {
      return timezone
    }
  }

  // 默认使用中国时区
  return 'Asia/Shanghai'
}

// 获取国家首都
const getCapital = (country: string): string => {
  // 首先检查预设的首都映射
  if (COUNTRY_CAPITAL_MAP[country]) {
    return COUNTRY_CAPITAL_MAP[country]
  }

  // 对于未知国家，返回国家名称作为首都
  return country
}

interface CityTimeItem {
  country: string
  city: string
  timezone: string
}

interface CurrentTimeProps {
  /**
   * 是否排除北京时间
   */
  excludeBeijing?: boolean
  /**
   * 最大显示的城市数量
   */
  maxDisplay?: number
  /**
   * 固定展示的国家列表
   */
  fixedCountries?: string[]
}

/**
 * 当前时间组件 - 支持多国家时区显示
 */
export function CurrentTime({
  excludeBeijing = false,
  maxDisplay = 5,
  fixedCountries
}: CurrentTimeProps) {
  const [time, setTime] = useState(new Date())
  const [selectedCity, setSelectedCity] = useState<CityTimeItem>({
    country: '美国',
    city: '华盛顿',
    timezone: 'America/New_York'
  })
  const [showDropdown, setShowDropdown] = useState(false)
  const [cityOptions, setCityOptions] = useState<CityTimeItem[]>([])

  // 处理固定国家列表
  useEffect(() => {
    if (fixedCountries && fixedCountries.length > 0) {
      const fixedCityOptions = fixedCountries.map((country) => ({
        country,
        city: getCapital(country),
        timezone: guessTimezone(country)
      }))
      setCityOptions(fixedCityOptions)
    }
  }, [fixedCountries])

  // 使用API获取热门国家数据 (仅在未指定固定国家时使用)
  useRequest(getHotCountries, {
    pollingInterval: 60000, // 每分钟更新一次
    refreshOnWindowFocus: false,
    ready: !fixedCountries, // 只有在未指定固定国家时才调用API
    onSuccess: (res) => {
      if (res.success && res.data && res.data.length > 0) {
        // 获取热门国家，并准备城市时间选项
        let hotCountryOptions = res.data.map((item) => {
          const countryName = item.country
          return {
            country: countryName,
            city: getCapital(countryName),
            timezone: guessTimezone(countryName)
          }
        })

        // 如果需要排除北京时间
        if (excludeBeijing) {
          hotCountryOptions = hotCountryOptions.filter(
            (item) => !(item.country === '中国' && item.city === '北京')
          )
        }

        // 排序，确保没有中国时，默认显示第一个国家
        setCityOptions(hotCountryOptions)

        // 如果当前没有选中的国家或者选中的是被排除的北京，默认选择第一个
        if (
          !selectedCity.country ||
          (excludeBeijing &&
            selectedCity.country === '中国' &&
            selectedCity.city === '北京') ||
          !hotCountryOptions.some(
            (item) => item.country === selectedCity.country
          )
        ) {
          if (hotCountryOptions.length > 0) {
            setSelectedCity(hotCountryOptions[0])
          }
        }
      }
    }
  })

  // 每秒更新当前时间
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 选择城市
  const handleSelectCity = (city: CityTimeItem) => {
    setSelectedCity(city)
    setShowDropdown(false)
  }

  // 格式化时间的简化版本 - 针对固定国家网格显示
  const formatCompactTime = (date: Date, timezone: string) => {
    try {
      // 获取格式化的时间字符串
      const timeStr = formatInTimeZone(date, timezone, 'HH:mm:ss')
      // 分割时间字符串，以便为分隔符添加样式
      const [hours, minutes, seconds] = timeStr.split(':')

      // 返回带有特殊样式分隔符的JSX
      return (
        <>
          {hours}
          <span className="time-separator">:</span>
          {minutes}
          <span className="time-separator">:</span>
          {seconds}
        </>
      )
    } catch (error) {
      console.error('时区转换错误:', error)
      return date.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
    }
  }

  // 是否采用紧凑模式 - 特别针对8个国家的情况
  const isCompactMode = fixedCountries && fixedCountries.length === 8

  return (
    <div className="time-container">
      {/* 如果指定了固定国家列表 */}
      {fixedCountries && (
        <div
          className={`fixed-countries-grid ${isCompactMode ? 'compact-mode' : ''}`}
        >
          {cityOptions.map((city) => (
            <div
              key={`${city.country}-${city.city}`}
              className="city-time-item"
            >
              <div className="city-name">
                {city.city} ({city.country})
              </div>
              <div className="time">
                {isCompactMode
                  ? formatCompactTime(time, city.timezone)
                  : formatTime(time, city.timezone)}
              </div>
              {!isCompactMode && (
                <div className="date">{formatDate(time, city.timezone)}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 如果只显示一个选定的城市 */}
      {!fixedCountries && maxDisplay === 1 && (
        <>
          <div
            className="current-city"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {selectedCity.city} ({selectedCity.country})
            <span className="dropdown-icon">{showDropdown ? '▲' : '▼'}</span>
          </div>

          {showDropdown && (
            <div className="city-dropdown">
              {cityOptions.map((item) => (
                <div
                  key={`${item.country}-${item.city}`}
                  className={`city-option ${selectedCity.country === item.country ? 'active' : ''}`}
                  onClick={() => handleSelectCity(item)}
                >
                  {item.city} ({item.country})
                </div>
              ))}
            </div>
          )}

          <div className="time">{formatTime(time, selectedCity.timezone)}</div>
          <div className="date">{formatDate(time, selectedCity.timezone)}</div>
        </>
      )}

      {/* 如果显示多个城市 */}
      {!fixedCountries && maxDisplay > 1 && (
        <div className="multiple-cities">
          {cityOptions.slice(0, maxDisplay).map((city) => (
            <div
              key={`${city.country}-${city.city}`}
              className="city-time-item"
            >
              <div className="city-name">
                {city.city} ({city.country})
              </div>
              <div className="time">{formatTime(time, city.timezone)}</div>
              <div className="date">{formatDate(time, city.timezone)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
