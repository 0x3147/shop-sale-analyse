import { Select } from 'antd'
import { useState } from 'react'
import './index.less'

interface StoreSwitcherProps {
  onChange: (storeId: string) => void
}

const stores = [
  { id: 'all', name: '全部门店' },
  { id: 'store-001', name: '北京朝阳店' },
  { id: 'store-002', name: '北京海淀店' },
  { id: 'store-003', name: '上海徐汇店' },
  { id: 'store-004', name: '广州天河店' },
  { id: 'store-005', name: '深圳南山店' }
]

/**
 * 店铺选择器组件
 * 用于在数据大屏中切换不同店铺的数据
 */
export function StoreSwitcher({ onChange }: StoreSwitcherProps) {
  const [value, setValue] = useState('all')

  const handleChange = (storeId: string) => {
    setValue(storeId)
    onChange(storeId)
  }

  return (
    <div className="store-switcher">
      <span className="label">门店:</span>
      <Select
        value={value}
        onChange={handleChange}
        options={stores.map((store) => ({
          value: store.id,
          label: store.name
        }))}
        className="store-select"
        popupClassName="store-select-dropdown"
        dropdownStyle={{ backgroundColor: '#0d2552' }}
        bordered={false}
        suffixIcon={<span className="select-arrow">▼</span>}
      />
    </div>
  )
}
