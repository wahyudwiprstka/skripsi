export async function userHasStore(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/store/u/${id}`);
    const data = await res.json();
    if (data) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.error(error.message);
  }
}
