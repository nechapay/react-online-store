import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Context } from '..'

const TypeBar = observer(() => {
  const { device } = useContext(Context)
  return (
    <ListGroup className="mt-2">
      {device.types.map((type) => (
        <ListGroup.Item
          style={{ cursor: 'pointer' }}
          active={type.id === device.selectedType.id}
          onClick={() =>
            device.selectedType.id !== type.id ? device.setSelectedType(type) : device.setSelectedType({})
          }
          key={type.id}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
})

export default TypeBar
