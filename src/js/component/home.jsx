import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
	
	const [ inputValue, setInputValue ] = useState("");
	const [ todos, setTodos ] = useState([]);
    const fetchTodos = () => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/sarandonga', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(data => {
			setTodos(data);
        })
        .catch(error => {
            console.log(error);
        });
    };

	useEffect(() => {
        fetchTodos();
        const intervalId = setInterval(fetchTodos, 5000);

        return () => clearInterval(intervalId);
    }, []);

	const handleDeleteTodo = (index) => {
		const updatedTodos = todos.filter((_, currentIndex) => index !== currentIndex);
		updateTodosOnServer(updatedTodos);
	};
	
	const handleAddTodo = () => {
		const updatedTodos = [...todos, { label: inputValue, done: false }];
		updateTodosOnServer(updatedTodos);
	};
	

	const updateTodosOnServer = (updatedTodos) => {
		console.log(updatedTodos)
		console.log(JSON.stringify(updatedTodos))
        fetch('https://playground.4geeks.com/apis/fake/todos/user/sarandonga', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTodos)
        })
        .then(() => {
            console.log("Todos updated on server successfully");
			fetchTodos();
        })
        .catch(error => {
            console.log("Error updating todos on server:", error);
        });
    };

	return (
		<React.Fragment>
			<head>
				<link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
      		</head>

		<h1>Todos</h1>
		<div className="container">
			<ul>
				<li>
					<input 
						type="text"
						onChange={(e) => setInputValue(e.target.value)} 
						value={inputValue} 
						onKeyUp={(e) => {
							if (e.key === "Enter") { 
								handleAddTodo();
								setInputValue("");
							}
						}}
						placeholder="What do you need to do?"></input>
				</li>
				{todos.map((item, index) => (
					<li key={index}>
						{item.label}
						<FontAwesomeIcon icon={faTrashCan} className="trashcan" onClick={() => handleDeleteTodo(index)} />
					</li>
				))}

			</ul>
			<div>{todos.length} tasks</div>
		</div>
		
		</React.Fragment>
	);
};

export default Home;
