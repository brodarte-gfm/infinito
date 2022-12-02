import { faker } from "@faker-js/faker";
import useSWRInfinite from "swr/infinite";
import { User } from "../types";

const TOTAL_NUM_FAKE_USERS = 100;

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const allUsers = Array(TOTAL_NUM_FAKE_USERS)
  .fill(null)
  .map((_, idx) => ({
    id: idx,
    name: faker.name.fullName(),
    company: faker.company.name(),
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
  }));

// simulates API calls w/ the allUsers array acting as the data store
export const fetchUsers = (
  pageNum: number
): Promise<{ users: User[]; hasNext: boolean }> => {
  const offset = pageNum * 10;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        users: allUsers.slice(offset, offset + 10),
        hasNext: allUsers.length > offset + 10,
      });
    }, randomIntFromInterval(500, 1000)); // random delay between 500-1000ms
  });
};

export const useUsers = (listKey: string) => {
  const { data, isValidating, setSize } = useSWRInfinite(
    (pageNum) => [pageNum, "USERS", listKey],
    fetchUsers,
    {
      revalidateFirstPage: false,
      revalidateAll: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  let allUsers: User[] = [];
  let hasNext = false;

  if (data) {
    allUsers = data.reduce((_allUsers: User[], res) => {
      return _allUsers.concat(res.users);
    }, []);
    hasNext = data[data.length - 1].hasNext;
  }

  const loadNextPage = () => {
    if (!isValidating && hasNext) {
      setSize((prevSize) => prevSize + 1);
    }
  };

  return {
    users: allUsers,
    hasNext,
    loading: isValidating,
    loadNextPage,
  };
};
