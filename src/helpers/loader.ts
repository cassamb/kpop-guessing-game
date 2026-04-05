export const fetchName = async (id: number): Promise<string> => {
    const res = await fetch(`http://localhost:3000/groups/${id}`);
    const data = await res.json();
    return data.name;
};