/*
 Copyright © SuperMap. All rights reserved.
 Author: Yangshanglong
 E-mail: yangshanglong@supermap.com
 */

import * as React from 'react'
import { SectionList } from 'react-native'
import { Toast } from '../../utils'
import { Container, ListSeparator, TextBtn, DataSetListSection, DataSetListItem  } from '../../components'

import styles from './styles'

export default class AddDataset extends React.Component {

  props: {
    navigation: Object,
  }

  constructor(props) {
    super(props)
    const { params } = this.props.navigation.state
    this.workspace = params.workspace
    this.map = params.map
    this.cb = params.cb
    this.state = {
      dataSourceList: [],
      openList: {},
    }
  }

  componentDidMount() {
    this.getDatasets()
  }

  getDatasets = async () => {
    let list = []
    let dataSources = await this.workspace.getDatasources()
    let count = await dataSources.getCount()
    for (let i = 0; i < count; i++) {
      let dataSetList = []
      let dataSource = await dataSources.get(i)
      let name = await dataSource.getAlias()
      let dataSets = await dataSource.getDatasets()
      let dataSetCount = await dataSets.getCount()
      for (let j = 0; j < dataSetCount; j++) {
        let dataset = await dataSets.get(j)
        let dsName = await dataset.getName()
        let dsType = await dataset.getType()
        let isAdd = await this.map.containsCaption(dsName, name)
        // let isAdd = await this.map.contains(dsName + "@" + name)
        // let isAdd = false

        dataSetList.push({
          name: dsName,
          type: dsType,
          isAdd: isAdd,
          dataset: dataset,
          section: i,
          key: i + '-' + dsName,
        })
      }

      list.push({
        key: name,
        isShow: true,
        data: dataSetList,
        index: i,
      })
    }
    this.setState({
      dataSourceList: list,
    }, () => {
      this.container.setLoading(false)
    })
  }

  showSection = (section, isShow?: boolean) => {
    let newData = this.state.dataSourceList
    if (isShow === undefined) {
      section.isShow = !section.isShow
    } else {
      section.isShow = isShow
    }
    newData[section.index] = section
    this.setState({
      dataSourceList: newData.concat(),
    })
  }

  select = data => {
    let newList = this.state.openList
    if (newList[data.section + '-' + data.name]) {
      delete(newList[data.section + '-' + data.name])
    } else {
      newList[data.section + '-' + data.name] = data
    }
    this.setState({
      openList: newList,
    })
  }

  /**
   * 添加数据集
   * @returns {Promise.<void>}
   */
  addDatasets = async () => {
    if (Object.getOwnPropertyNames(this.state.openList).length <= 0) return
    for(let key in this.state.openList) {
      let item = this.state.openList[key]
      await this.map.addLayer(item.dataset, true)
    }
    Toast.show('添加图层成功')

    this.props.navigation.goBack()
    this.cb && this.cb()
  }

  _renderSetion = ({ section }) => {
    return (
      <DataSetListSection data={section} height={60} onPress={this.showSection} />
    )
  }

  _renderItem = ({ item }) => {
    return (
      <DataSetListItem radio={true} hidden={!this.state.dataSourceList[item.section].isShow} data={item} height={60} onPress={this.select} />
    )
  }

  _renderItemSeparatorComponent = ({ section }) => {
    return section.isShow ? <ListSeparator /> : null
  }

  // _renderSectionSeparatorComponent = ({ section }) => {
  //   return section.isShow ? <ListSeparator height={scaleSize(20)} /> : null
  // }

  _keyExtractor = item => (item.key + item.index)

  render() {
    return (
      <Container
        ref={ref => this.container = ref}
        initWithLoading
        headerProps={{
          title: '添加图层',
          navigation: this.props.navigation,
          headerRight: <TextBtn btnText="添加" textStyle={styles.headerBtnTitle} btnClick={this.addDatasets} />,
        }}>
        <SectionList
          renderSectionHeader={this._renderSetion}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          sections={this.state.dataSourceList}
          ItemSeparatorComponent={this._renderItemSeparatorComponent}
          // SectionSeparatorComponent={this._renderSectionSeparatorComponent}
        />
      </Container>
    )
  }
}