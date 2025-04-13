import { AimOutlined, DownOutlined, ShopOutlined } from '@ant-design/icons'
import { Button, Dropdown, Tooltip } from 'antd'
import { ReactNode, useState } from 'react'
import './index.less'

interface StoreSwitcherProps {
  onChange: (storeId: string) => void
}

const stores = [
  { id: 'all', name: '全部门店', city: '全国' },
  { id: 'store-001', name: '朝阳万达店', city: '北京' },
  { id: 'store-002', name: '海淀中关村店', city: '北京' },
  { id: 'store-003', name: '徐汇万体店', city: '上海' },
  { id: 'store-004', name: '天河正佳店', city: '广州' },
  { id: 'store-005', name: '南山科技园店', city: '深圳' }
]

/**
 * 店铺选择器组件
 * 用于在数据大屏中切换不同店铺的数据
 */
export function StoreSwitcher({ onChange }: StoreSwitcherProps) {
  const [value, setValue] = useState('all')
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (storeId: string) => {
    setValue(storeId)
    onChange(storeId)
    setIsOpen(false)
  }

  // 当前选中项
  const selectedStore = stores.find((store) => store.id === value)

  // 处理下拉框打开关闭事件
  const handleDropdownVisibleChange = (open: boolean) => {
    setIsOpen(open)
  }

  // 渲染选项
  const renderItem = (store: (typeof stores)[0]): ReactNode => {
    return (
      <div className="custom-option" onClick={() => handleChange(store.id)}>
        <ShopOutlined className="store-icon" />
        <div className="store-info">
          <div className="store-name">{store.name}</div>
          <div className="store-city">{store.city}</div>
        </div>
      </div>
    )
  }

  // 下拉菜单项
  const dropdownItems = {
    items: stores.map((store) => ({
      key: store.id,
      label: renderItem(store)
    }))
  }

  return (
    <div className={`store-switcher ${isOpen ? 'active' : ''}`}>
      <Tooltip title="门店位置" placement="bottom">
        <div className="store-location-icon">
          <AimOutlined />
        </div>
      </Tooltip>

      <div className="selected-store-info">
        <div className="current-store">{selectedStore?.name}</div>
        <div className="current-city">{selectedStore?.city}</div>
      </div>

      <Dropdown
        menu={dropdownItems}
        open={isOpen}
        onOpenChange={handleDropdownVisibleChange}
        trigger={['click']}
        placement="bottomRight"
        overlayClassName="store-select-dropdown"
      >
        <Tooltip title="切换门店" placement="bottom">
          <Button type="text" className="store-select-button">
            <DownOutlined className="select-arrow" />
          </Button>
        </Tooltip>
      </Dropdown>
    </div>
  )
}
