import { faker } from '@faker-js/faker';

export type TUser = {
  id: number;
  name: string;
  email: string;
  joinedOn: Date;
  commentCount: number;
};

export function fetchUsers() {
  const users: TUser[] = [];

  for (let i = 0; i < 25000; i++) {
    const id = i + 1;
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const joinedOn = faker.date.recent();
    const commentCount = faker.number.int({ min: 0, max: 100 });
    const user = {
      id,
      name,
      email,
      joinedOn,
      commentCount
    };
    users.push(user);
  }

  return Promise.resolve(users);
}
