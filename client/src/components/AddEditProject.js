import { Button, Card, Checkbox, Col, Form, Input, Layout, Row, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addProject, deleteProjectView, getProjectView, updateProject } from '../actions'
import { addProject as addProjectApi, getProject, updateProject as updateProjectApi } from '../getApiData'
import PageHeader from './PageHeader'
const { Content } = Layout
const { Option } = Select

const AddEditProject = ({ task }) => {
    const { projectId } = useParams()
    const projectView = useSelector((state) => state.projectView)
    const dispatch = useDispatch()
    const history = useNavigate()
    const [ form ] = Form.useForm()
    const onSave = (values) => {
        if (values.isactive)
            values.isactive = 'Yes'
        else
            values.isactive = 'No'
        if (task === 'add') {
            addProjectApi(values).then((response) => dispatch(addProject(response))).catch((error) => console.log(error))
        } else {
            updateProjectApi(projectId, values).then((response) => dispatch(updateProject(response))).catch((error) => console.log(error))
        }
        onBack()
    }
    const onBack = () => {
        history('/')
    };
    useEffect(() => {
        if (task === 'edit') {
            if (projectId && projectId !== "") getProject(projectId).then((response) => dispatch(getProjectView(response))).catch((error) => console.log(error))
            return () => {
                dispatch(deleteProjectView(projectId))
            }
        }
    }, [])
    useEffect(() => {
        form.setFieldsValue(projectView)
        form.setFieldsValue({ isactive: projectView.isactive === 'Yes' ? true : false })
    }, [projectView])
    const skillsetList = [ "Asp.Net", "PHP", "Java", "ReactJS", "React Native", "NodeJs",
                        "PWA", "Flutter", "VueJs", "Vanilla Js", "SQL Server", "My SQL", "MongoDB",
                        "HTML", "CSS", "JavaScript/jQuery"]


    return (
        <>
            <Layout>
                <PageHeader />
                <Content>
                    <Layout style={{ margin: 20, backgroundColor: 'white' }}>
                        <Card
                            title={<h3>{task === 'add'? 'Add': 'Edit'} Project</h3>}
                            style={{ width: '100%' }}
                            headStyle={{ textAlign: 'center', fontSize: '20px' }}
                            bodyStyle={{ padding: '20px' }}>
                                <Form form={form} onFinish={onSave}>
                                    <Form.Item
                                        name="name"
                                        label="Project Name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Project Name is required!!'
                                            },
                                        ]}>
                                            <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="description"
                                        label="Project Description"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Project Description is required!!'
                                            },
                                        ]}>
                                            <TextArea showCount maxLength={1000} autoSize={{minRows: 2, maxRows: 5}}     />
                                    </Form.Item>
                                    <Form.Item
                                        name="skillset"
                                        label="Skill Set"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Skill Set is required!!'
                                            },
                                        ]}>
                                            <Select mode="tags" style={{ width: '100%' }} placeholder="Skill Set">
                                                {
                                                    skillsetList.map((element, index) => {
                                                        return <Option key={index} value={element}>{element}</Option>
                                                    })
                                                }
                                            </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="noofmembers"
                                        label="No of Members"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'No of members is required!!'
                                            },
                                        ]}>
                                            <Select style={{ width: '100%' }} placeholder="No of members">
                                                <Option value="1">1</Option>
                                                <Option value="2">2</Option>
                                                <Option value="3">3</Option>
                                                <Option value="4">4</Option>
                                                <Option value="5">5</Option>
                                                <Option value="5+">5+</Option>
                                            </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="isactive"
                                        label="Is Active?"
                                        valuePropName='checked'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Is Active is required!!'
                                            }
                                        ]}>
                                        <Checkbox checked />
                                    </Form.Item>
                                    <Form.Item>
                                        <Row>
                                            <Col offset={10} span={2}>
                                                <Button type="primary" htmlType="submit" >
                                                    Save
                                                </Button>
                                            </Col>
                                            <Col span={10}>
                                                <Button htmlType="button" onClick={onBack}>
                                                    Back
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </Form>
                        </Card>
                    </Layout>
                </Content>
            </Layout>
        </>
    )
}

export default AddEditProject