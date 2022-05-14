import React from 'react'
import { ColumnProps } from "antd/lib/table"
import { User } from '../../../utils/model/user'

export const generateColumn = ({}): ColumnProps<User>[] => ([
  {
    title: 'Username',
    dataIndex: 'name',
    render: (_, data) => <div>{ data.name.title } { data.name.last }</div>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    render: (_, data) => <div>{ data.name.first } { data.name.last }</div>,
    sorter: true
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: true
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    sorter: true
  },
  {
    title: 'Registered Date',
    dataIndex: 'registered',
    render: (_, data) => <div>{ data.registered.date }</div>,
    sorter: true
  },
])

