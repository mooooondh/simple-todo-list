"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Checkbox, IconButton, Spinner } from "@material-tailwind/react";
import { deleteTodo, updateTodo } from "actions/todo-actions";
import { queryClient } from "config/ReactQueryClientProvider";

export default function Todo({ todo }) {
	const [isEditing, setIsEditing] = useState(false);
	const [completed, setComplited] = useState(todo.completed);
	const [title, setTitle] = useState(todo.title);

	const updateTodoMutation = useMutation({
		mutationFn: () =>
			updateTodo({
				id: todo.id,
				title: title,
				completed: completed,
			}),

		onSuccess: () => {
			setIsEditing(false);
			queryClient.invalidateQueries({
				queryKey: ["todos"],
			});
		},
	});

	const deleteTodoMutation = useMutation({
		mutationFn: () => deleteTodo(todo.id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
	});

	return (
		<div className="flex w-full items-center justify-between gap-2">
			<Checkbox
				checked={completed}
				onChange={async (e) => {
					setComplited(e.target.checked);
					updateTodoMutation.mutate();
				}}
			/>

			{isEditing ? (
				<input
					className={"flex-1 border-b border-b-black pb-1"}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			) : (
				<p className={`flex-1 ${completed && "line-through"}`}>
					{title}
				</p>
			)}

			{isEditing ? (
				<IconButton
					onClick={() => {
						updateTodoMutation.mutate();
					}}
				>
					{updateTodoMutation.isPending ? (
						<Spinner />
					) : (
						<i className="fas fa-check" />
					)}
				</IconButton>
			) : (
				<IconButton onClick={() => setIsEditing(true)}>
					<i className="fas fa-pen" />
				</IconButton>
			)}

			<IconButton onClick={() => deleteTodoMutation.mutate()}>
				<i className="fas fa-trash" />
			</IconButton>
		</div>
	);
}
