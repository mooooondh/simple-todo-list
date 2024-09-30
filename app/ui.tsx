"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Input, Button } from "@material-tailwind/react";
import Todo from "components/todo";
import { createTodo, getTodos } from "actions/todo-actions";

export default function UI() {
	const [searchInput, setSearchInput] = useState("");

	const todoQuery = useQuery({
		queryKey: ["todos"],
		queryFn: () => getTodos({ searchInput }),
	});

	const createTodoMutation = useMutation({
		mutationFn: () =>
			createTodo({
				title: "New Todo",
				completed: false,
			}),

		onSuccess: () => todoQuery.refetch(),
	});

	return (
		<div className="w-2/3 mx-auto flex flex-col items-center py-10 gap-2">
			<h1 className="text-xl">Todo List</h1>

			<Input
				label={"Search your TODO"}
				placeholder={"Search your TODO"}
				icon={
					<i
						className="fas fa-search"
						onClick={() => todoQuery.refetch()}
					/>
				}
				value={searchInput}
				onChange={(e) => setSearchInput(e.target.value)}
			/>

			{todoQuery.isPending && <p>Loading...</p>}
			{todoQuery.data &&
				todoQuery.data.map((todo) => (
					<Todo key={todo.id} todo={todo} />
				))}

			<Button
				onClick={() => createTodoMutation.mutate()}
				loading={createTodoMutation.isPending}
			>
				<i className="fas fa-plus mr-2" />
				ADD TODO
			</Button>
		</div>
	);
}
