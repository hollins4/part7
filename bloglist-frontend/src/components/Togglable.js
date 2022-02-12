import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisbility = () => {
    setVisible(!visible)
  }

  const buttonStyle = {
    marginTop: 5,
    marginBotton: 5
  }


  return (
    <div>
      <div style={showWhenVisible}>
        { props.children }
        <Button onClick={toggleVisbility} style={buttonStyle} variant="danger">Cancel</Button>
      </div>
      <br />
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisbility} >{props.buttonLabel}</Button>
      </div>
    </div>
  )

}

Togglable.proptype = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable