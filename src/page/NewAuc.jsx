import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import newAuct from '../interact/newAuc'

const { Option } = Select;
const { RangePicker } = DatePicker;

function NewAuc(props){
	const [state, setstate] = useState(false);
	const [startprice, setstartprice] = useState(5);
	const [startdate, setstartdate] = useState(0);
	const [enddate, setenddate] = useState(0);
	var id = parseInt(props.id);

	const showDrawer = () => {
		setstate(true);
	};

	const onClose = () => {
		setstate(false);
	};

	const onChangeprice = (value) => {
		setstartprice(value);
		console.log('start price: ', value);
	}

	const onChangedata = (value, dateString) => {
		setstartdate(value[0].valueOf());
		setenddate(value[1].valueOf());
		console.log('Selected Time: ', startdate, enddate);
		console.log('Formatted Selected Time: ', dateString);
	}
	  
	const onOk = (value) => {
		console.log('onOk: ', value);
	}

	return (
	<>
		<Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
		新建拍卖
		</Button>
		<Drawer
		title="Create a new account"
		width={400}
		onClose={onClose}
		closable={false}
		visible={state}
		bodyStyle={{ paddingBottom: 80 }}
		extra={
			<Space>
			<Button onClick={onClose}>Cancel</Button>
			<Button onClick={newAuct(props.id, startdate, enddate, startprice)} type="primary">
				Submit
			</Button>
			</Space>
		}
		>
		<Form layout="vertical" hideRequiredMark>
			<Row gutter={16}>
			<Col span={24}>
				<Form.Item
				name="price"
				label="StartPrice"
				rules={[{ required: true, message: 'Please enter start price' }]}
				>
				<Space direction="horizontal">
					<InputNumber defaultValue={5} onChange={onChangeprice}/>
					<Select defaultValue="eth">
						<Option value="eth">eth</Option>
					</Select>
				</Space>
				</Form.Item>
			</Col>
			<Col span={24}>
				<Form.Item
				name="dateTime"
				label="DateTime"
				rules={[{ required: true, message: 'Please choose the start and end' }]}
				>
				<RangePicker
					showTime={{ format: 'HH:mm:ss' }}
					format="YYYY-MM-DD HH:mm:ss"
					onChange={onChangedata}
					onOk={onOk}
					/>
				</Form.Item>
			</Col>
			</Row>
			<Row gutter={16}>
			<Col span={24}>
				<Form.Item
				name="description"
				label="Description"
				rules={[
					{
					required: true,
					message: 'please enter url description',
					},
				]}
				>
				<Input.TextArea rows={4} placeholder="please enter url description" />
				</Form.Item>
			</Col>
			</Row>
			<Row justify="space-around" align="middle">
			<Col span={12}>
					<Button onClick={onClose}>Cancel</Button>
			</Col>
			<Col span={12}>
				<Button onClick={newAuct(id, startdate, enddate, startprice)} type="primary">
					提交
				</Button>
			</Col>
			</Row>
		</Form>
		</Drawer>
	</>
	);
}

export default NewAuc;

ReactDOM.render(<NewAuc />, document.getElementById('root'));