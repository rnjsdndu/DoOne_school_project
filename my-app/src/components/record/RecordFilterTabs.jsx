import { useEffect, useRef, useState } from 'react'

const filters = [
  { value: 'all', label: '전체' },
  { value: 'success', label: '성공' },
  { value: 'fail', label: '실패' },
]

export function RecordFilterTabs({ activeFilter, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)
  const activeLabel = filters.find((filter) => filter.value === activeFilter)?.label ?? '전체'

  useEffect(() => {
    function handlePointerDown(event) {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [])

  const handleSelect = (value) => {
    onChange(value)
    setIsOpen(false)
  }

  return (
    <div className="filter-dropdown" ref={wrapperRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`filter-dropdown__trigger${isOpen ? ' is-open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        <span>{activeLabel}</span>
        <span className="filter-dropdown__icon" aria-hidden="true">
          {isOpen ? '▴' : '▾'}
        </span>
      </button>
      {isOpen ? (
        <div className="filter-dropdown__menu" role="listbox" aria-label="기록 결과 필터">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={`filter-dropdown__option${activeFilter === filter.value ? ' is-active' : ''}`}
              onClick={() => handleSelect(filter.value)}
              role="option"
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
