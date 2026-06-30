import { useEffect, useState } from 'react'
import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group'
import { IconSearch } from '@tabler/icons-react'
type Props = {
  searchValue?: string
  updateSearch: (value: string) => void
}

export function SearchBar({ searchValue = '', updateSearch }: Props) {
  const [value, setValue] = useState(searchValue)

  useEffect(() => {
    setValue(searchValue)
  }, [searchValue])

  return (
    <InputGroup>
      <InputGroupAddon>
        <IconSearch stroke={2} />
      </InputGroupAddon>
      <InputGroupInput
        value={value}
        type="search"
        placeholder="Search by title, description or ingredients..."
        onChange={(e) => {
          const nextValue = e.target.value
          setValue(nextValue)
          updateSearch(nextValue)
        }}
      />
    </InputGroup>
  )
}
