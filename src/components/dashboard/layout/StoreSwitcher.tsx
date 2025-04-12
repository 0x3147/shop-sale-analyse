import { useState } from 'react'

interface StoreInfo {
  id: string
  name: string
}

interface StoreSwitcherProps {
  onChange?: (storeId: string) => void
}

/**
 * 店铺选择器组件
 * 用于在数据大屏中切换不同店铺的数据
 */
export function StoreSwitcher({ onChange }: StoreSwitcherProps) {
  // 模拟店铺数据
  const stores: StoreInfo[] = [
    { id: 'all', name: '全部门店' },
    { id: 'store1', name: '北京旗舰店' },
    { id: 'store2', name: '上海店' },
    { id: 'store3', name: '深圳店' },
    { id: 'store4', name: '广州店' },
    { id: 'store5', name: '成都店' }
  ]

  const [activeStore, setActiveStore] = useState('all')

  const handleStoreChange = (storeId: string) => {
    setActiveStore(storeId)
    onChange?.(storeId)
  }

  return (
    <div className="absolute left-28 top-1/2 flex -translate-y-1/2 items-center space-x-3 text-xs">
      <span className="text-slate-400">数据来源:</span>
      <div className="flex items-center space-x-2">
        {stores.map((store) => (
          <button
            key={store.id}
            className={`rounded-sm px-3 py-1 transition-colors ${
              activeStore === store.id
                ? 'bg-blue-500/30 text-blue-400'
                : 'text-slate-300 hover:bg-[#1c3e7a] hover:text-slate-200'
            }`}
            onClick={() => handleStoreChange(store.id)}
          >
            {store.name}
          </button>
        ))}
      </div>
    </div>
  )
}
