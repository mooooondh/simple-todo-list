"use client";

import { useState } from "react";
import { Checkbox, IconButton } from "@material-tailwind/react";

export default function Todo({}) {
	const [isEditing, setIsEditing] = useState(false);
	const [completed, setComplited] = useState(false);
	const [title, setTitle] = useState("");

	return (
		<div className="flex w-full items-center justify-between gap-2">
			<Checkbox
				checked={completed}
				onChange={(e) => setComplited(e.target.checked)}
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
				<IconButton onClick={() => setIsEditing(false)}>
					<i className="fas fa-check" />
				</IconButton>
			) : (
				<IconButton onClick={() => setIsEditing(true)}>
					<i className="fas fa-pen" />
				</IconButton>
			)}

			<IconButton>
				<i className="fas fa-trash" />
			</IconButton>
		</div>
	);
}
