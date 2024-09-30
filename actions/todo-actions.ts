"use server";

import { Database } from "types_db";
import { createServerSupabaseClient } from "utils/supabase/server";

export type TodoRow = Database["public"]["Tables"]["simpleTodoList"]["Row"];
export type TodoRowInsert =
	Database["public"]["Tables"]["simpleTodoList"]["Insert"];
export type TodoRowUpdate =
	Database["public"]["Tables"]["simpleTodoList"]["Update"];

function handleError(error) {
	console.error(error);
	throw new Error(error.message);
}

export async function getTodos({ searchInput = "" }): Promise<TodoRow[]> {
	const supabase = await createServerSupabaseClient();
	const { data, error } = await supabase
		.from("simpleTodoList")
		.select("*")
		.like("title", `%${searchInput}%`) // searchInput을 앞, 뒤로 포함하고 있는 것 전부 가져오기
		.order("created_at", { ascending: true });

	if (error) handleError(error);

	return data;
}

export async function createTodo(todo: TodoRowInsert) {
	const supabase = await createServerSupabaseClient();
	const { data, error } = await supabase.from("simpleTodoList").insert({
		...todo,
	});

	if (error) handleError(error);

	return data;
}

export async function updateTodo(todo: TodoRowUpdate) {
	const supabase = await createServerSupabaseClient();
	const { data, error } = await supabase
		.from("simpleTodoList")
		.update({
			...todo,
		})
		.eq("id", todo.id);

	if (error) handleError(error);

	return data;
}

export async function deleteTodo(id: number) {
	const supabase = await createServerSupabaseClient();
	const { data, error } = await supabase
		.from("simpleTodoList")
		.delete()
		.eq("id", id);

	if (error) handleError(error);

	return data;
}
