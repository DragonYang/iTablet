/*
  Copyright © SuperMap. All rights reserved.
  Author: yangshanglong
  E-mail: yangshanglong@supermap.com
*/

import * as React from 'react'
import { ScrollView, View, Text } from 'react-native'
import { RangeMode } from 'imobile_for_javascript'
import { Button, Row, BtnOne } from '../../../../../components'
import { Toast } from '../../../../../utils'
import NavigationService from '../../../../NavigationService'
import ThemeTable from '../ThemeTable'

import styles from './styles'

const CHOOSE = '请选择'

export default class ThemeRangeView extends React.Component {

  props: {
    title: string,
  }

  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      themeRangeList: [
        {visible: true, color: 'red', value: 1, caption: '标题1'},
        {visible: false, color: 'green', value: 2, caption: '标题2'},
        {visible: true, color: 'blue', value: 3, caption: '标题3'},
        {visible: true, color: 'blue', value: 3, caption: '标题3'},
        {visible: true, color: 'blue', value: 3, caption: '标题3'},
        {visible: true, color: 'blue', value: 3, caption: '标题3'},
        {visible: true, color: 'blue', value: 3, caption: '标题3'},
        {visible: true, color: 'blue', value: 3, caption: '标题3'},
        {visible: true, color: 'blue', value: 3, caption: '标题3'},
        {visible: true, color: 'blue', value: 3, caption: '标题3'},
        {visible: true, color: 'blue', value: 3, caption: '标题3'},
        {visible: true, color: 'blue', value: 3, caption: '标题3'},
        {visible: true, color: 'blue', value: 3, caption: '标题3'},
      ],
      data: {
        expression: '',
        rangeMode: RangeMode.EQUALINTERVAL,
        rangeCount: 1,
        precision: 1,
        fontSize: 10,
        colorMethod: '#0000FF',
      },
    }
  }

  rowAction = ({title}) => {

  }

  getExpression = value => {
    let data = this.state.data
    Object.assign(data, {expression: value})
    this.setState({
      data: data,
    })
  }

  getValue = obj => {
    let data = this.state.data
    let key = Object.keys(obj)[0]
    if (data[key] === obj[key]) return
    Object.assign(data, obj)
    this.setState({
      data: data,
    })
  }

  getFontName = value => {
    let data = this.state.data
    Object.assign(data, {fontName: value})
    this.setState({
      data: data,
    })
  }

  getFontSize = value => {
    let data = this.state.data
    Object.assign(data, {fontSize: value})
    this.setState({
      data: data,
    })
  }

  getAlign = value => {
    let data = this.state.data
    Object.assign(data, {align: value})
    this.setState({
      data: data,
    })
  }

  confirm = () => {
    Toast.show(JSON.stringify(this.state.data))
    // NavigationService.goBack()
  }

  reset = () => {
    // TODO reset
  }

  add = () => {
    // TODO add
  }

  delete = () => {
    // TODO delete
  }

  renderOperationBtns = () => {
    return (
      <View style={styles.operationBtns}>
        <BtnOne
          style={styles.operationBtn}
          size={BtnOne.SIZE.SMALL}
          BtnText='添加'
          BtnImageSrc={require('../../../../../assets/public/icon-add.png')}
          BtnClick={this.add}
        />
        <BtnOne
          style={styles.operationBtn}
          size={BtnOne.SIZE.SMALL}
          BtnText='删除'
          BtnImageSrc={require('../../../../../assets/public/icon-delete.png')}
          BtnClick={this.delete}
        />
      </View>
    )
  }

  renderContent = () => {
    return (
      <View style={styles.content}>
        <Row
          style={styles.row}
          key={'表达式'}
          value={this.state.data.expression || CHOOSE}
          type={Row.Type.TEXT_BTN}
          title={'表达式'}
          getValue={value => this.getValue({expression: value === CHOOSE ? '' : value })}
        />

        <Row
          style={styles.row}
          key={'分段方法'}
          value={this.state.data.align}
          type={Row.Type.RADIO_GROUP}
          title={'分段方法'}
          defaultValue={this.state.data.align}
          radioColumn={2}
          radioArr={[
            {title: '等距分段', value: RangeMode.EQUALINTERVAL},
            {title: '平方根分段', value: RangeMode.SQUAREROOT},
            {title: '标准差分段', value: RangeMode.STDDEVIATION},
            {title: '对数分段', value: RangeMode.LOGARITHM},
            {title: '等计数分段', value: RangeMode.QUANTILE},
            {title: '自定义分段', value: RangeMode.CUSTOMINTERVAL},
          ]}
          getValue={value => this.getValue({align: value})}
        />

        <Row
          style={styles.row}
          key={'段数'}
          defaultValue={10}
          value={this.state.data.rangeCount}
          type={Row.Type.CHOOSE_NUMBER}
          minValue={2}
          maxValue={32}
          title={'段数'}
          getValue={value => this.getValue({rangeCount: value})}
        />

        <Row
          style={styles.row}
          key={'分段舍入精度'}
          defaultValue={1}
          value={this.state.data.precision}
          type={Row.Type.CHOOSE_NUMBER}
          minValue={0.00000001}
          maxValue={10000000}
          times={10}
          title={'分段舍入精度'}
          getValue={value => this.getValue({precision: value})}
        />
  
        <Row
          style={styles.row}
          key={'颜色方案'}
          value={this.state.data.colorMethod}
          type={Row.Type.CHOOSE_COLOR}
          title={'颜色方案'}
          getValue={value => this.getValue({colorMethod: value})}
        />

        {this.renderOperationBtns()}

        <ThemeTable
          ref={ref => this.table = ref}
          data={this.state.themeRangeList}
          tableHead={['可见', '风格', '段值', '标题']}
          flexArr={[1, 2, 1, 2]}
        />
      </View>
    )
  }

  renderBtns = () => {
    return (
      <View style={styles.btns}>
        <Button title={'确定'} onPress={this.confirm}/>
        <Button type={Button.Type.GRAY} title={'重置'} onPress={this.reset}/>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderContent()}
        {this.renderBtns()}
      </ScrollView>
    )
  }
}