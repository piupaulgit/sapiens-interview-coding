const mockSchema = jest.fn().mockImplementation(() => ({}));
const mockModel = jest.fn().mockImplementation(() => ({}));

const mongoose = {
  Schema: mockSchema,
  model: mockModel,
  connect: jest.fn().mockResolvedValue({}),
  connection: {
    once: jest.fn(),
    on: jest.fn(),
  },
};

export default mongoose;
