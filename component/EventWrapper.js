import React, { Component, PropTypes } from 'react'

const isHandler = key => /^on[A-Z]+/.test(key)

export default class EventWrapper extends Component {
  static defaultProps = {
    as: 'div',
  }
  static contextTypes = {
    handlers: PropTypes.object,
  }
  render() {
    const {
      children,
      as: Tag,
      ...props,
    } = this.props
    const { handlers } = this.context
    for (let key in props) {
      if (isHandler(key)) {
        const handler = handlers[props[key]]
        if ('function' === typeof handler) {
          props[key] = handler
        }
      }
    }
    return (
      <Tag {...props}>{children}</Tag>
    )
  }
}