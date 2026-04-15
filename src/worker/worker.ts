import { fetchUsers } from '@/worker/data';

const ctx: Worker = self as unknown as Worker;

ctx.addEventListener('message', async (_event) => {
  const data = await fetchUsers();

  ctx.postMessage({ data });
});
