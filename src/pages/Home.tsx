import { Button, Card, Label, TextInput } from "flowbite-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { TextInputTheme } from "../themes/TextInputTheme";

interface Todo {
  id: number;
  status: string;
  description: string;
}

const Home = () => {
  // Load login user data from context
  const { userDetails } = useAuth();
  const [data, setData] = useState<Todo[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  console.log(userDetails);

  const todoList = async (page: number) => {
    try {
      const apiToken = userDetails?.data?.token;
      console.log(apiToken);

      if (!apiToken) {
        throw new Error("Missing authorization token");
      }

      const response = await axios.get("http://localhost:8000/todos", {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        params: {
          page,
          limit: itemsPerPage,
        },
      });
      setLoading(false);
      setData(response.data.data);
      setTotalItems(response.data.total);
    } catch (error: any) {
      console.error(error.message || "Error fetching todo list");
      throw error;
    }
  };

  useEffect(() => {
    todoList(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // download CSV File
  const downloadCSV = async () => {
    try {
      const apiToken = userDetails?.data?.token;
      console.log(apiToken);

      if (!apiToken) {
        throw new Error("Missing authorization token");
      }

      const response = await axios.get("http://localhost:8000/todos/download", {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "todos.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error: any) {
      console.error(error.message || "Error fetching todo list");
      throw error;
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-center items-center mt-5">
          <h3 className="font-extrabold text-3xl">Todo List</h3>
        </div>
        <div className="flex justify-center items-center mt-5">
          <div className="max-w-2xl flex-1">
            <div className="mb-2 block">
              <Label htmlFor="email4" value="Your email" />
            </div>
            <TextInput
              theme={TextInputTheme}
              id="email4"
              type="email"
              rightIcon={() => (
                <span
                  onClick={(e) => {
                    alert("clicked");
                  }}
                  className="icon-[zondicons--add-solid] text-2xl cursor-pointer z-40"
                ></span>
              )}
              placeholder="name@flowbite.com"
              required
            />
          </div>
        </div>
        <div className="flex justify-center items-center mt-5">
          <Card className="max-w-2xl flex-1">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Latest Todos
              </h5>
              <a
                href="#"
                className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                onClick={downloadCSV}
              >
                View all
              </a>
            </div>
            <div className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {data?.map((todo) => (
                  <li key={todo.id} className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          {todo.description}
                        </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          {todo.status}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <Button.Group>
                          <Button color="gray">
                            <span className="icon-[tabler--edit] text-xl cursor-pointer z-40"></span>
                          </Button>
                          <Button color="gray">
                            <span className="icon-[material-symbols--delete-outline] text-2xl cursor-pointer z-40"></span>
                          </Button>
                        </Button.Group>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-1 px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Home;
