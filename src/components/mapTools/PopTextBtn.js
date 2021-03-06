/*
  Copyright © SuperMap. All rights reserved.
  Author: Yang Shanglong
  E-mail: yangshanglong@supermap.com
*/

import * as React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'
import * as Util from '../../utils/constUtil'
import { scaleSize } from '../../utils'
import { color } from '../../styles'
import { size } from '../../styles'

export default class PopTitleBtn extends React.Component {

  static propTypes = {
    btnClick: PropTypes.func,
    title: PropTypes.string,
    style: PropTypes.any, // 按钮样式
    titleStyle: PropTypes.any, // 文字样式
    selected: PropTypes.any, // 是否选择
  }

  static defaultProps = {
    selected: undefined,
  }

  constructor(props) {
    super(props)
    this.state = {
      selected: props.selected,
    }
  }

  setSelected = selected => {
    this.setState({
      selected: selected,
    })
  }

  action = () => {
    this.props.btnClick && this.props.btnClick()
  }

  render() {
    let containerStyle
    if (this.props.selected !== undefined) {
      containerStyle = this.props.selected ? styles.containerSelected : styles.container
    } else {
      containerStyle = this.state.selected ? styles.containerSelected : styles.container
    }
    return (
      <TouchableOpacity accessible={true} accessibilityLabel={this.props.title} style={[containerStyle, this.props.style]} onPress={this.action}>
        {this.props.title && <Text style={[styles.text, this.props.titleStyle]}>{this.props.title}</Text>}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSelected: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: scaleSize(4),
    borderBottomColor: color.blue2,
  },
  text: {
    fontSize: size.fontSize.fontSizeLg,
    backgroundColor: 'transparent',
    height: size.fontSize.fontSizeLg + 5,
    textAlign: 'center',
  },
})