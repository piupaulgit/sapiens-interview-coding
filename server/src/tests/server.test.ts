import { startServer } from '../server';
import app from '../app';

jest.mock('../app');

describe('Server', () => {
  it('should start the server and listen on the specified port', () => {
    const listenMock = jest.fn();
    (app.listen as jest.Mock).mockImplementation(listenMock);

    startServer();

    expect(listenMock).toHaveBeenCalledWith(expect.any(String), expect.any(Function));
  });
});
