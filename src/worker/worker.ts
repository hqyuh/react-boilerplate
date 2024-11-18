import { fetchUsers } from '@/worker/data';

const ctx: Worker = self as unknown as Worker;

ctx.addEventListener('message', async (event) => {
  console.log('🐔 =>  event worker, data:', event.data);

  const data = await fetchUsers();
  console.log('🐔 =>  data:', data);

  ctx.postMessage({ data });
});
