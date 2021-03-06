/*
 Copyright © SuperMap. All rights reserved.
 Author: Yang Shanglong
 E-mail: yangshanglong@supermap.com
 */
import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import Radio from './Radio'
import styles from './styles'
import { scaleSize } from '../../utils'

export default class RadioGroup extends PureComponent {

  props: {
    style?: StyleSheet,
    data: Array,
    column?: number,
    defaultValue?: any,
    getSelected?: () => {},
    separatorHeight?: number,
  }

  static defaultProps = {
    data: [],
    type: 'input',
    column: 2,
    defaultValue: -1,
    separatorHeight: scaleSize(20),
  }

  constructor(props) {
    super(props)
    this.current = this.getIndexByValue(props.defaultValue)
    this.refArr = []
  }
  
  getIndexByValue = value => {
    let index = -1
    for (let i = 0; i < this.props.data.length; i++) {
      if (this.props.data[i].value === value) {
        index = i
        break
      }
    }
    return index
  }

  select = ({title, selected, index, value}) => {
    if (index === this.current) return
    this.current >= 0 && this.refArr && this.refArr[this.current] && this.refArr[this.current].select(false)
    this.current = index
    this.props.getSelected && this.props.getSelected({title, selected, index, value})
  }

  setRefs = (ref, index) => {
    this.refArr[index] = ref
  }

  renderRows = () => {
    let group = [], groupView = []
    this.props.data.forEach((obj, index) => {
      let row = Math.floor(index / this.props.column)
      if (!group[row]) group[row] = []
      group[row].push(
        <Radio
          key={obj.title + '-' + index}
          ref={ref => this.setRefs(ref, index)}
          index={index}
          title={obj.title}
          value={obj.value}
          selected={this.props.defaultValue === obj.value}
          // selected={this.current === index}
          onPress={this.select}
          // selectable={}
        />
      )
    })

    group.forEach((obj, index) => {
      groupView.push(
        <View key={'row-' + index} style={[styles.radioGroupRow, index !== 0 && {marginTop: this.props.separatorHeight}]}>
          {obj}
        </View>
      )
    })
    // group.forEach((obj, index) => {
    //   groupView.push(obj)
    // })

    return groupView
  }

  render() {
    return (
      <View style={styles.radioGroupContainer}>
        {this.renderRows()}
      </View>
    )
  }
}
