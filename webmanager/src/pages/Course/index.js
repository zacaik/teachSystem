import React, { memo } from 'react'
import { Table, Button } from "antd";
import { CourseWrapper } from './style';

const Course = memo(() => {
  const columns = [
    {
      title: '课程名称',
      key: 'name',
      dataIndex: 'name',
      render: text => <a onClick={(e) => e.defaultPrevented()}>{text}</a>,
    },
    {
      title: '课程号',
      key: 'curriculumId',
      dataIndex: 'curriculumId',
    },
    {
      title: '上课时间',
      key: 'curriculumTime',
      dataIndex: 'curriculumTime',
    },
    {
      title: '上课教室',
      key: 'classroom',
      dataIndex: 'classroom',
    },
    {
      title: '学生人数',
      key: 'studentNumber',
      dataIndex: 'studentNumber',
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      render: (text, record) => (
        <>
          <Button type="primary" className='btn'>修改</Button>
          <Button type="primary" danger>删除</Button>
        </>
      ),
    },
  ];
  
  const data = [
    {
      name: '软件开发环境1-3班',
      curriculumId: 81420,
      curriculumTime: "9-16周",
      classroom: '致用106',
      studentNumber: "106人",
    },
    {
      name: '软件开发环境1-3班',
      curriculumId: 81420,
      curriculumTime: "9-16周",
      classroom: '致用106',
      studentNumber: "106人",
    },
    {
      name: '软件开发环境1-3班',
      curriculumId: 81420,
      curriculumTime: "9-16周",
      classroom: '致用106',
      studentNumber: "106人",
    },
    {
      name: '软件开发环境1-3班',
      curriculumId: 81420,
      curriculumTime: "9-16周",
      classroom: '致用106',
      studentNumber: "106人",
    },
  ];
  return (
    <CourseWrapper>
      <Table columns={columns} dataSource={data} />
    </CourseWrapper>
  )
})

export default Course