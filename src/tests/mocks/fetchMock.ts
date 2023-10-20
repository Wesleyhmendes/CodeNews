import apiResponse from './apiResponse';

const fetchMock = () => Promise.resolve({
  json: () => Promise.resolve(apiResponse),
});

export default fetchMock;
