## How To Run
Make sure your node is above v14

Clone this repository

    $ git clone https://github.com/MuhammadChandra19/randomuser
    
Install Dependencies

    $ yarn
    
Run dev server

    $ yarn start

## Project structure
```
/
├── build/
    |── index.html
├── src/
    |── api/
    |    ├── base.api.ts
    |    └── yourapi.ts
    |── utils/
    |     └── testUtil/
    └── views/
    |    |── components
    |    └── __tests__
    └── styles

```

## References
#### 1. API
This folder stores all HTTP requests to **backend**. You extends `BaseAPI` class and use the `makeRequest` 

```
makeRequest(url);
```

Example :
```javascript
class YourAPI extends BaseAPI {
  constructor() {
    super('/api')
  }

  public async getExample(params: Params): Promise<APIResponse<Example[]>> {
    return this.makeRequest('GET', '', params)
  }
}

export const yourAPI = new YourAPI()
```

#### 2. utils
Utils folder contains helper methods.
A helper method is a method that helps another method to perform it's task. These are typically used when a method has to perform a complicated task that is composed of several smaller tasks. The smaller tasks are often performed by helper methods.


## Resources
- [ReactJS Documentation](https://reactjs.org/docs/getting-started.html)
- [Axios Documentation](https://github.com/axios/axios)
- [Ant Design of React](https://ant.design/docs/react/)
