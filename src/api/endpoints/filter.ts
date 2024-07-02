import {Filter} from '@/lib/types';

const BASE_URL = 'http://localhost:8080/api/filter';

export async function getAllFilters() {
  const response = await fetch(`${BASE_URL}/get`);
  console.log(response)
  if (!response.ok) {
    throw new Error('Failed to get all filters');
  }
  return response.json();
}

export async function upsertFilter(filterRequest: Filter) {
  const response = await fetch(`${BASE_URL}/upsert`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filterRequest),
  });
  if (!response.ok) {
    throw new Error('Failed to upsert filter');
  }
  return response.json();
}

export async function deleteFilterById(id: string) {
  const response = await fetch(`${BASE_URL}/delete/filter/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete filter with id ${id}`);
  }
}
