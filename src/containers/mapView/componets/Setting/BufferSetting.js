import * as React from 'react'
import { Text, View } from 'react-native'
import { Row, Button } from '../../../../components'
import { scaleSize, Toast } from '../../../../utils'
import { BufferEndType } from 'imobile_for_javascript'
import ChooseLayer from './ChooseLayer'
import styles from './styles'

export default class BufferSetting extends React.Component {

  props: {
    data: Object,
    type: String,
    mapControl: Object,
    workspace: Object,
    selection: Object,
    map: Object,
    getData: () => {},
    close: () => {},
    setBufferSetting: () => {},
    setLoading: () => {},
  }

  static defaultProps = {
    data: {
      endType: BufferEndType.ROUND,
      distance: 10,
    },
  }

  constructor(props) {
    super(props)
    this.state = {
      distance: props.data.distance,
      endType: props.data.endType,

      label: '请选择',
      selectedLayer: {},
    }
  }

  getData = () => {
    return {
      distance: this.state.distance,
      endType: this.state.endType,
    }
  }

  getEndType = ({value}) => {
    this.setState({
      endType: value,
    })
  }

  getDistance = value => {
    this.setState({
      distance: value,
    })
  }

  getLayer = ({title, selectedgetSecondObj, index, value}) => {
    this.chooseLayer && this.chooseLayer.show()
  }

  getDataset = item => {
    this.setState({
      label: item.name,
      selectedLayer: item,
    })
  }

  confirm = () => {
    (async function() {
      let layer = await this.props.map.getLayer(this.state.selectedLayer.layerName)
      await layer.setSelectable(true)
      this.props.setBufferSetting && this.props.setBufferSetting(this.getData())
      Toast.show('设置成功')
    }).bind(this)()
  }

  close = () => {
    this.props.close && this.props.close()
  }

  renderSelect = () => {
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>参数设置</Text>
        </View>
        <View style={styles.content}>
          <Row
            style={{marginTop: scaleSize(30)}}
            key={'缓冲数据'}
            defaultValue={'请选择缓冲数据'}
            value={this.state.label}
            type={Row.Type.TEXT_BTN}
            title={'缓冲数据'}
            getValue={this.getLayer}
          />
          <Row
            style={styles.row}
            key={'缓冲类型'}
            title={'缓冲类型'}
            type={Row.Type.RADIO_GROUP}
            defaultValue={this.props.data.endType}
            radioArr={[
              {title: '圆头缓冲', value: BufferEndType.ROUND},
              {title: '平头缓冲', value: BufferEndType.FLAT},
            ]}
            radioColumn={1}
            getValue={this.getEndType}
          />
          <Row
            style={styles.row}
            key={'缓冲半径'}
            title={'缓冲半径'}
            minValue={1}
            maxValue={50}
            unit={'m'}
            type={Row.Type.CHOOSE_NUMBER}
            defaultValue={this.props.data.distance}
            getValue={this.getDistance}
          />
        </View>
      </View>
    )
  }

  renderBtns = () => {
    return (
      <View style={styles.btns}>
        {/*</TouchableOpacity>*/}
        <Button key={'确定'} title={'确定'} onPress={this.confirm}/>
        <Button key={'取消'} type={Button.Type.GRAY} title={'取消'} onPress={this.close}/>
      </View>
    )
  }

  renderChooseLayer = () => {
    return (
      <ChooseLayer
        ref={ref => this.chooseLayer = ref}
        map={this.props.map}
        mapcontrol={this.props.mapControl}
        workspace={this.props.workspace}
        getDataset={this.getDataset}
        setLoading={this.props.setLoading}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSelect()}
        {this.renderBtns()}
        {this.renderChooseLayer()}
      </View>
    )
  }
}