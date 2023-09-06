type Base = {
  code: number;
  message: string;
};

// export type PocketbaseError = Base & {
//   data: { [key: string]: Base };
// };
export type PocketbaseError = {
  code: number;
  message: string;
  data: {
    code: number;
    message: string;
    data: {
      [key: string]: {
        code: number;
        message: string;
      };
    };
  };
};
