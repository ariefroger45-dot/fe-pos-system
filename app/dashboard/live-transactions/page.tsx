// import { unstable_noStore as noStore } from "next/cache";

// async function getLiveTransactionReceipts() {
//   noStore();
//   const res = await fetch("https://dummyjson.com/carts");

//   if (!res.ok) {
//     throw new Error("Gagal ngambil data transaksi");
//   }

//   const data = await res.json();

//   return data;
// }

export const dynamic = "force-dynamic";

export default async function LiveTransactionPage() {
  //   const data = await getLiveTransactionReceipts();

  const res = await fetch("https://dummyjson.com/users");

  if (!res.ok) {
    throw new Error("Gagal ngambil data user");
  }

  const data = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Monitor transaksi kasir realtime</h1>

      <p>Total pengguna terhubung aktif</p>
      {data.users.map((user: any) => (
        <div key={user.id}>
          <p>
            {user.firstName} {user.lastName}
          </p>
        </div>
      ))}

      {/* 
      <p className="mt-2">Total transaksi: {data.total}</p> */}

      {/* <div className="mt-6 space-y-4">
        {data.carts.map((cart: any) => (
          <div key={cart.id} className="rounded-lg border p-4">
            <p className="font-semibold">Cart #{cart.id}</p>
            <p className="text-sm text-gray-500">Total: ${cart.total}</p>
            <p className="text-sm text-gray-500">
              Produk: ${cart.totalProducts}
            </p>
          </div>
        ))}
      </div> */}
    </main>
  );
}
