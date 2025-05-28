import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Home() {
  const [item, setItem] = useState([]);

  const [name, setName] = useState("");
  const [searchName, setSearchName] = useState("")
  const [searchList, setSearchList] = useState("")

  const check_data = () => {

    if(name == ""){
      Swal.fire({
        title: "oops!",
        text: "can not add empty  task",
        icon: "error",
        confirmButtonText: "OK",
      })
      return    
    }

    axios({
      method: "post",
      url: "https://682199fa259dad2655afc100.mockapi.io/tasks",
      data: { 
        name: name
      },
    }).then((res) => {
      setItem([...item, res.data])
    })
  }

  const Search = () => {

    let result = item.find((character) => {
      return character.name == searchName;
    })

    if (result) {
      setItem([result])
    } else {
      Swal.fire({
        title: "task not found",
        icon: "error",
        confirmButtonText: "OK",
      })
    }
  }

  useEffect(() => {
    fetch(`https://682199fa259dad2655afc100.mockapi.io/tasks`)
      .then((response) => response.json())
      .then((data) => {
        console.log("fetch data")
        setItem(data)
      })
  }, [])

  const deleteItem = (id) => {
    axios
      .delete(`https://682199fa259dad2655afc100.mockapi.io/tasks/${id}`)
        .then(() => {
          let filteredList = item.filter((del) => {
            return del.id != id
          })
          setItem(filteredList)
        })
  }

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center">
      <div className="lg:flex justify-center items-center">
        <div className="flex  gap-2 p-3">
          <input
            type="text"
            className="bg-gray-50 border   border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2"
            placeholder="Search"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button
            className="rounded text-white bg-blue-500 hover:bg-blue-900 px-1 text-center"
            onClick={Search}
          >
            Search
          </button>
        </div>

        <div className="flex flex-col gap-2 p-3">
          <h1 className="text-xl font-bold leading-tight tracking-tight">
            Add new task
          </h1>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2"
            placeholder="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="rounded p-1 text-white bg-green-500 hover:bg-green-900 text-center"
            onClick={check_data}
            required  
          >
            Add
          </button>
        </div>
      </div>
      <div className="lg:w-9/10">
        <ul className="p-5 flex flex-wrap justify-center  gap-3">
          {item.map((element, index) => (
            <li key={index}>
              <div className=" flex flex-col justify-around   w-[35vh] p-3 rounded bg-white  hover:translate-1 transition delay-50 shadow-2xl">
                <div className="flex justify-between gap-5">
                  <p className="text-center">{element.name}</p>
                  <button
                    className="rounded font-bold self-start text-white bg-red-500 hover:bg-red-900 p-1 px-2 text-center"
                    onClick={() => deleteItem(element.id)}
                  >
                    X
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home;
