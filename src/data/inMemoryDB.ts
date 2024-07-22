export interface IComemntsTable {
  id: string;
  content: string;
  parent_id: string;
}

export const commentsTable: IComemntsTable[] = [
  {
    id: "1",
    content: "1",
    parent_id: "",
  },
  {
    id: "2",
    content: "2",
    parent_id: "",
  },
  {
    id: "3",
    content: "3",
    parent_id: "",
  },
  {
    id: "4",
    content: "1.1",
    parent_id: "1",
  },
  {
    id: "5",
    content: "1.2",
    parent_id: "1",
  },
  {
    id: "6",
    content: "1.2.1",
    parent_id: "5",
  },
];

// 1 "" null
// 2 "" null
// 3 "" null
// 4 "" 1
// 5 "" 1
// 6 "" 4
