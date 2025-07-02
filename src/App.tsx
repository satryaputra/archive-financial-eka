import { NumberFormatter } from "@internationalized/number";
import { Table } from "@/components/table";
import { Button } from "./components/ui/button";
import { useState } from "react";

export const transactions = [
  {
    id: "1",
    description: "Salary",
    amount: 10000000,
    date: "2023-10-01",
    category: "Income",
    account: "BCA",
    update_status: "updated",
  },
  {
    id: "2",
    description: "Groceries",
    amount: 200000,
    date: "2023-10-02",
    category: "Expenses",
    account: "Cash",
    update_status: "updated",
  },
  {
    id: "3",
    description: "Rent",
    amount: 12000,
    date: "2023-10-03",
    category: "Expenses",
    account: "BCA",
    update_status: "updated",
  },
];

export default function App() {
  const [data, setData] = useState(transactions);

  const addTransaction = () => {
    const newTransaction = {
      id: "",
      description: "",
      amount: 0,
      date: "",
      category: "",
      account: "",
      update_status: "new",
    };

    setData((prev) => [...prev, newTransaction]);
  };

  return (
    <div className="w-[1080px] mx-auto overflow-y-auto">
      <Table aria-label="Products">
        <Table.Header>
          <Table.Column>Date</Table.Column>
          <Table.Column>Description</Table.Column>
          <Table.Column>Amount</Table.Column>
          <Table.Column>Account</Table.Column>
          <Table.Column>Category</Table.Column>
        </Table.Header>
        <Table.Body items={data}>
          {(item) => (
            <Table.Row id={item.id}>
              <Table.Cell>{item.date}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>
                {new NumberFormatter("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(item.amount)}
              </Table.Cell>
              <Table.Cell>{item.account}</Table.Cell>
              <Table.Cell>{item.category}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <Button
        intent="secondary"
        isCircle
        className="w-full my-3 h-8 cursor-pointer"
        onClick={addTransaction}
      >
        Add
      </Button>
    </div>
  );
}
