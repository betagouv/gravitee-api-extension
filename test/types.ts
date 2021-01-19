import { Repository } from 'typeorm';

/* eslint-disable-next-line */
// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    save: jest.fn(),
  }),
);
export type MockType<T> = {
  [P in keyof T]: jest.Mock<Record<string, unknown>>;
};
