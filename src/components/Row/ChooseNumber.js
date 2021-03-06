/*
 Copyright © SuperMap. All rights reserved.
 Author: Yang Shanglong
 E-mail: yangshanglong@supermap.com
 */
import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

import styles from './styles'

export default class ChooseNumber extends PureComponent {

  props: {
    style?: StyleSheet,
    valueStyle?: StyleSheet,
    value: number,
    defaultValue: number,
    getValue?: () => {},
    unit?: string,
    minValue: number,
    maxValue: number,
    times?: number,
    commonDifference?: number,
  }

  static defaultProps = {
    unit: '',
    value: '',
    minValue: '',
    maxValue: '',
    defaultValue: 2,
    times: 1,
    commonDifference: 1,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: props.value !== '' && props.value || props.defaultValue,
      plusAble: props.maxValue === '' || props.defaultValue < props.maxValue,
      miusAble: props.minValue === '' || props.defaultValue > props.minValue,
    }
  }

  minus = () => {
    if (this.props.minValue === '' || this.state.value > this.props.minValue) {
      let value = this.props.times > 1
        ? (this.state.value / this.props.times)
        : (this.state.value - this.props.commonDifference)
      this.setState({
        value: this.props.minValue !== '' && value < this.props.minValue ? this.props.minValue : value,
        miusAble: this.props.minValue === '' || value > this.props.minValue,
        plusAble: this.props.maxValue === '' || value < this.props.maxValue,
      }, () => {
        this.props.getValue && this.props.getValue(this.state.value)
      })
    } else {
      this.props.getValue && this.props.getValue(this.state.value)
    }
  }

  plus = () => {
    if (this.props.maxValue === '' || this.state.value < this.props.maxValue) {
      let value = this.props.times > 1
        ? (this.state.value * this.props.times)
        : (this.state.value + this.props.commonDifference)
      this.setState({
        value: this.props.maxValue !== '' && value > this.props.maxValue ? this.props.maxValue : value,
        plusAble: this.props.maxValue === '' || value < this.props.maxValue,
        miusAble: this.props.minValue === '' || value > this.props.minValue,
      }, () => {
        this.props.getValue && this.props.getValue(this.state.value)
      })
    } else {
      this.props.getValue && this.props.getValue(this.state.value)
    }
  }

  render() {

    return (
      <View style={styles.chooseNumberContainer}>
        <TouchableOpacity
          disable={!this.state.miusAble}
          style={this.state.miusAble ? styles.imageBtnView : styles.disableImageBtnView}
          accessible={true}
          accessibilityLabel={'减号'}
          onPress={() => this.minus()}
        >
          <Image style={styles.imageBtn} source={require('../../assets/public/icon-minus.png')} />
        </TouchableOpacity>
        <Text style={[styles.numberTitle, this.props.valueStyle]}>{this.state.value + ' ' + this.props.unit}</Text>
        <TouchableOpacity
          disable={!this.state.plusAble}
          style={this.state.plusAble ? styles.imageBtnView : styles.disableImageBtnView}
          accessible={true}
          accessibilityLabel={'加号'}
          onPress={() => this.plus()}
        >
          <Image style={styles.imageBtn} source={require('../../assets/public/icon-plus.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}