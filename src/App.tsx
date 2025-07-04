import { NumberFormatter } from "@internationalized/number";
import { Table } from "@/components/table";
import { useState } from "react";
import { TextField } from "./components/text-field";
import { DatePicker } from "./components/date-picker";
import { Select } from "./components/select";
import { getLocalTimeZone, today } from "@internationalized/date";
import type { Key } from "react-aria-components";

// ... (const transactions, accounts, categories tidak berubah) ...

export const transactions = [
  {
    id: "40c1f2f3-2451-420f-8243-14a5f02ee46d",
    description: "Salary",
    amount: 10000000,
    date: "2023-10-01",
    category: "Income",
    account: "BCA",
    update_status: "updated",
  },
  {
    id: "78426994-c985-49b3-92ad-dee3a654d7aa",
    description: "Groceries",
    amount: 200000,
    date: "2023-10-02",
    category: "Expenses",
    account: "Cash",
    update_status: "updated",
  },
  {
    id: "20c772b0-0e56-4be4-818c-80027337e133",
    description: "Rent",
    amount: 12000,
    date: "2023-10-03",
    category: "Expenses",
    account: "BCA",
    update_status: "updated",
  },
];

export const accounts = [
  { id: 1, name: "BCA" },
  { id: 2, name: "Gopay" },
  { id: 3, name: "Cash" },
  { id: 4, name: "Jago" },
];

export const categories = [
  { id: 1, name: "Income" },
  { id: 2, name: "Expense" },
];


export default function App() {
  const [data, setData] = useState([
    ...transactions,
    {
      id: "new-transaction",
      description: "",
      amount: 0,
      date: "",
      category: "",
      account: "",
      update_status: "new",
    },
  ]);

  const [date, setDate] = useState(today(getLocalTimeZone()));
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState<Key | null>(null);
  const [category, setCategory] = useState<Key | null>(null);

  const handleAddItem = () => {
    if (!description || !amount || !account || !category) {
      alert("Please fill out all fields to add a transaction.");
      return;
    }
    const newTransaction = {
      id: crypto.randomUUID(),
      date: date.toString(),
      description: description,
      amount: parseFloat(amount),
      account: accounts.find((a) => a.id == account)?.name ?? "",
      category: categories.find((c) => c.id == category)?.name ?? "",
      update_status: "updated",
    };
    const newBlankRow = {
      id: "new-transaction",
      description: "",
      amount: 0,
      date: "",
      category: "",
      account: "",
      update_status: "new",
    };
    setData((currentData) => [
      ...currentData.slice(0, -1),
      newTransaction,
      newBlankRow,
    ]);
    setDescription("");
    setAmount("");
    setAccount(null);
    setCategory(null);
    setDate(today(getLocalTimeZone()));
  };

  // ✅ New handler for the form's onSubmit event
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page reload
    handleAddItem();
  };


  return (
    <div className="w-[1080px] mx-auto overflow-y-auto">
      {/* ✅ Wrap the table with a form and use onSubmit */}
      <form onSubmit={handleSubmit}>
        <Table aria-label="Products">
          <Table.Header>
            <Table.Column isRowHeader>Date</Table.Column>
            <Table.Column>Description</Table.Column>
            <Table.Column>Amount</Table.Column>
            <Table.Column>Account</Table.Column>
            <Table.Column>Category</Table.Column>
          </Table.Header>
          <Table.Body items={data}>
            {(item) =>
              item.update_status !== "new" ? (
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
              ) : (
                // ✅ onKeyDown is removed from here
                <Table.Row id={item.id}>
                  <Table.Cell>
                    <DatePicker
                      aria-label="Date"
                      value={date}
                      onChange={(newValue) => setDate(newValue!)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <TextField
                      aria-label="Description"
                      value={description}
                      onChange={setDescription}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <TextField
                      aria-label="Amount"
                      type="number"
                      value={amount}
                      onChange={setAmount}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Select
                      aria-label="Account"
                      selectedKey={account}
                      onSelectionChange={setAccount}
                    >
                      <Select.Trigger />
                      <Select.List items={accounts}>
                        {(item) => (
                          <Select.Option id={item.id} textValue={item.name}>
                            {item.name}
                          </Select.Option>
                        )}
                      </Select.List>
                    </Select>
                  </Table.Cell>
                  <Table.Cell>
                    <Select
                      aria-label="Category"
                      selectedKey={category}
                      onSelectionChange={setCategory}
                    >
                      <Select.Trigger />
                      <Select.List items={categories}>
                        {(item) => (
                          <Select.Option id={item.id} textValue={item.name}>
                            {item.name}
                          </Select.Option>
                        )}
                      </Select.List>
                    </Select>
                  </Table.Cell>
                </Table.Row>
              )
            }
          </Table.Body>
        </Table>
      </form>
    </div>
  );
}