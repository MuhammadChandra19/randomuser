import { userList } from '../../api/mock/userAPI.mock'
import { userAPI } from '../../api/userAPI'
import { render, cleanup, waitFor, within, fireEvent, screen } from '../../utils/test/test-utils'
import MainApp from '../main'

jest.mock('lodash/debounce', () => jest.fn(fn => fn))
jest.mock('../../api/userAPI', () => ({
  userAPI: {
    getUserList: jest.fn()
  }
}))

Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

afterEach(cleanup)

describe('Should render correctly', () => {
  test('Should load user correctly', async () => {
    userAPI.getUserList = jest.fn().mockResolvedValue(userList)
    const { getByTestId } = render(<MainApp />, {})

    await waitFor(() => {
      expect(userAPI.getUserList).toHaveBeenLastCalledWith({ page : 1, pageSize: 10, results: 10 })
    })

    //simulate page change
    const page2 = getByTestId('user-list-table').querySelector('.ant-pagination') as HTMLElement
    await fireEvent.click(within(page2).getByText('2'))
    await waitFor(() => {
      expect(userAPI.getUserList).toHaveBeenLastCalledWith({ page : 2, pageSize: 10, results: 10 })
    })

    //simulate search
    const searhField = getByTestId('user-search-field')
    fireEvent.change(searhField, { target: { value: 'a'}})
    await waitFor(() => {
      expect(userAPI.getUserList).toHaveBeenLastCalledWith({ page : 1, pageSize: 10, results: 10, keyword: 'a' })
    })

    //simulate choose gender
    const genderField = document.querySelector(
      `[data-testid="user-gender-field"] > .ant-select-selector`
    ) as HTMLElement 

    fireEvent.mouseDown(genderField)
    await waitFor(() => {
      return expect(
        document.querySelector(".ant-select-dropdown")
      ).toBeInTheDocument();
    })

    fireEvent.click(
      within(document.querySelector(".ant-select-dropdown") as HTMLElement
    ).getAllByText('female')[1])
    
    await waitFor(() => {
      expect(userAPI.getUserList)
        .toHaveBeenLastCalledWith({ page : 1, pageSize: 10, results: 10, keyword: 'a', gender: 'female' })
    })

  })
})