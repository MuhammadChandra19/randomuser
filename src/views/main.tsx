
import { Button, TablePaginationConfig } from "antd"
import { Input, Space, Select } from 'antd'
import React, { useState, useEffect } from "react"
import UserAPI, { FetchParams } from "../api/userAPI"
import { User } from "../utils/model/user"
import UserTable from "./components/UserTable"
import { debounce } from "lodash"

const { Search } = Input
const { Option } = Select

const Main:React.FC<any> = () => {
  const userAPI = new UserAPI()
  const [ users, setUsers ] = useState([] as User[])
  const [loadingUser, setLoadingUser] = useState(false)
  const [filter, setFilter] = useState({ page: 1, pageSize: 10, results: 10 } as FetchParams)



  const fetchUser = async (filter: FetchParams) => {
    setLoadingUser(true)
    try {
      const { results } = await userAPI.getUserList(filter)
      setUsers(results)
      setFilter(filter)
    } catch (e) {
      console.log(e)
    } finally {
      setLoadingUser(false)
    }
  }

  const handleTableChange = (page: TablePaginationConfig, sort: any) => {
    fetchUser({ ...filter, sortBy: sort.column?.dataIndex, sortOrder: sort.order, page: page.current })
  }

  const handleSearch = (value: string) => {
    fetchUser({ ...filter, keyword: value})
  }

  const debounceSearch = React.useRef(
    debounce((value: string) => {
      fetchUser({ ...filter, keyword: value})
    }, 300)
  ).current

  const handleFilterByGender = (value: string) => {
    fetchUser({ ...filter, gender: value})
  }

  useEffect(() => {
    fetchUser(filter)
    return () => {
      debounceSearch.cancel()
    }
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <Space direction="horizontal">
        <div>
          <div>Search</div>
          <Search placeholder="input search text" onChange={(e) => debounceSearch(e.target.value)} onSearch={handleSearch} style={{ width: 200 }} />
        </div>
        <div>
          <div>Gender</div>
          <Select defaultValue="" style={{ width: 200 }} onChange={handleFilterByGender}>
            <Option value="">All</Option>
            <Option value="female">female</Option>
            <Option value="male">male</Option>
          </Select>
          <Button onClick={() => fetchUser({ page: 1, pageSize: 10, results: 10 })} style={{ marginLeft: 12 }}>Reset Filter</Button>
        </div>
       
      </Space>
      <UserTable 
        users={users}
        handleChange={handleTableChange}
        current={filter.page || 1}
        isLoading={loadingUser}
      />
    </div>
  )
}

export default Main