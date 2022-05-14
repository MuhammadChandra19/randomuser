import React from 'react'
import { Table, TablePaginationConfig } from 'antd'
import { generateColumn } from './columns'
import { User } from '../../../utils/model/user'
import { SorterResult } from 'antd/lib/table/interface'


type UserTableType = {
  users: User[]
  handleChange: (page: TablePaginationConfig, sort: SorterResult<User> | SorterResult<User> []) => void
  isLoading: boolean,
  current: number
}

const UserTable: React.FC<UserTableType> = ({ users, handleChange, isLoading, current }) => {

  return (
    <Table 
      columns={generateColumn({})}
      rowKey={record => record.email}
      dataSource={users}
      onChange={(pagination, _, sorter) => handleChange(pagination, sorter)}
      loading={isLoading}
      pagination={{ current, pageSize: 10, total: 100 }}
    />
  )
}

export default UserTable
