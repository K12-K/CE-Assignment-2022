import { Button, Card, Input, Layout, Space, Table, Tag } from 'antd'
import PageHeader from './PageHeader'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { deleteProject, searchProjects, setAllProjects } from '../actions'
import { deleteProject as deleteProjectApi, getAllProjects } from '../getApiData'
const { Content } = Layout
const { Search } = Input

const Home = () => {
    const { projects } = useSelector((state) => state.projects)
    const { searchprojects } = useSelector((state) => state.searchProjects)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searchRef = useRef('null')

    const columns = [
        {
            title: 'Project Name',
            dataIndex: 'name',
        },
        {
            title: 'Project Description',
            dataIndex: 'description',
        },
        {
            title: 'Skill Set',
            dataIndex: 'skillset',
            render: skillset => (
                <>
                {skillset.map((skill, index) => (
                    <Tag color="blue" key={index}>
                        {skill}
                    </Tag>
                ))}
                </>
            )
        },
        {
            title: 'No of Members',
            dataIndex: 'noofmembers',
        },
        {
            title: 'Is Active?',
            dataIndex: 'isactive',
        },
        {
            title: 'Created Date',
            dataIndex: 'createddate',
        },
        {
            render: (record) => (
            <Space size="middle">
                <a onClick={() => editProjectMethod(record._id)}>Edit</a>
                <a onClick={() => deleteProjectMethod(record._id)}>Delete</a>
            </Space>
            ),
        }
    ]

    const addProjectMethod = () => {
        navigate('/add')
    }
    const editProjectMethod = (projectId) => {
        navigate(`/edit/${projectId}`)
    }
    const deleteProjectMethod = (projectId) => {
        deleteProjectApi(projectId).then((response) => dispatch(deleteProject(projectId))).catch((error) => console.log(error))
    }

    useEffect(() => {
        getAllProjects().then((response) => dispatch(setAllProjects(response))).catch((error) => console.log(error))
    }, [])

    const handleSearch = (ev) => {
        searchRef.current = ev
        const spro = projects.filter((ele) => {
            const regex =  new RegExp(ev,'gi');
            if (ele.name.match(regex) || ele.description.match(regex))
                return true
            else
                return false
        })
        dispatch(searchProjects(spro))
    }

    return (
        <>
            <Layout>
                <PageHeader />
                <Content>
                    <Layout style={{ margin: 20, backgroundColor: 'white' }}>
                        <Card
                            title={<h3>My Project</h3>}
                            style={{ width: '100%' }}
                            headStyle={{ textAlign: 'center', fontSize: '20px' }}>
                                <Button style={{ backgroundColor: '#1b7ca7', color: 'white' }} size="middle" shape="round" onClick={addProjectMethod}>Add Project</Button>
                                <Search placeholder='Search..' allowClear enterButton onSearch={handleSearch}
                                    style={{ width: 250, float: 'right' }} />
                                <Table columns={columns} dataSource={searchRef.current !== 'null' ? searchprojects : projects} pagination={false} sticky={true} style={{ marginTop: '20px' }} />
                        </Card>
                    </Layout>
                </Content>
            </Layout>
        </>
    )
}

export default Home