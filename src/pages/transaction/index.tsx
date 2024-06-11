import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Layout from "@/components/layout";
import NumberFormatter from "@/components/number-formatter";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PaymentType, Transaction, getOrder } from "@/utils/apis/products";
import { useAuth } from "@/utils/contexts/auth";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";

const Payment: FC = () => {
  // const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [transactionData, setTransactionData] = useState<Partial<Transaction>>({});

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [bank, setBank] = useState<string>("");
  const [payment, setPayment] = useState<Partial<PaymentType>>({});

  useEffect(() => {
    getOrderData(id);
  }, []);

  const getOrderData = async (id?: string) => {
    try {
      const result = await getOrder(id);
      setTransactionData(result.data);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    Swal.fire({
      title: "Confirmation",
      text: "Anda Mau Melanjutkan Pembayaran",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "NO",
      confirmButtonColor: "rgb(3 150 199)",
    }).then((res: any) => {
      if (res.isConfirmed) {
        if (bank) {
          const pembayaran = {
            payment_method: bank,
            order_id: Number(id),
          };
          axiosWithConfig
            .post("https://zyannstore.my.id/payments", pembayaran)
            .then((response) => {
              console.log(response);
              setPayment(response.data.data.payment);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Proceed to payment",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((error: any) => {
              throw new Error(error);
            });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Select Virtual Account",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center pt-20 gap-8 font-Poppins">
        <div className="flex flex-col px-10 gap-3">
          <span className="text-2xl md:text-3xl lg:text-4xl text-center">Payment</span>
        </div>
      </div>

      <div className="w-1/2 mx-auto flex gap-5 my-10">
        <div className="flex flex-col gap-2 my-3">
          <h1 className="text-base font-bold">User</h1>
          <h1>{user.full_name}</h1>
        </div>
        <div className="flex flex-col gap-2 my-3">
          <h1 className="text-base font-bold">Address</h1>
          <h1>{user.address}</h1>
        </div>
      </div>
      <form onSubmit={handlePayment} className="flex justify-center items-center gap-3 h-auto my-3">
        <div className="flex flex-col justify-center gap-3 w-full md:w-1/2">
          <label className="font-semibold md:text-base text-sm">Payment Methods</label>
          <Select required name="bank_account" value={bank} onValueChange={(value) => setBank(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose Virtual Account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bca">BCA</SelectItem>
              <SelectItem value="bri">BRI</SelectItem>
              <SelectItem value="bni">BNI</SelectItem>
            </SelectContent>
          </Select>
          <div className="mt-4">
            <span className="text-sm font-bold">Product name : </span>
            <span className="font-bold text-lg">{transactionData.product_name}</span>
          </div>
          <div className="mt-4">
            <span className="text-sm font-bold">Qty : </span>
            <span className="font-bold text-lg">{transactionData.quantity}</span>
          </div>
          <div className="mt-4">
            <span className="text-sm font-bold">Total : </span>
            <span className="font-bold text-lg">
              <NumberFormatter value={transactionData.price} />
            </span>
          </div>
          {transactionData.payment?.id || payment?.id ? (
            <Button type="button" onClick={() => setShowPopup(true)} className="flex justify-center items-center mt-10 font-semibold bg-sky-600 w-full text-white py-2.5 rounded-md">
              Open VA Number
            </Button>
          ) : (
            <Button type="submit" className="flex justify-center items-center mt-10 font-semibold bg-sky-600 w-full text-white py-2.5 rounded-md">
              Continue
            </Button>
          )}
        </div>
      </form>

      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="p-8 bg-white rounded shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-blue-700">Detail Pembayaran</DialogTitle>
          </DialogHeader>
          <div className="my-2 text-sm">Nama: {user.full_name}</div>
          <hr />
          <div className="my-2 text-sm">Alamat: {user.address}</div>
          <hr />
          <div className="my-2 text-sm">Metode Pembayaran: {payment.payment_method ? payment?.payment_method?.toUpperCase() : transactionData.payment?.payment_method?.toUpperCase()}</div>
          <hr />
          <div className="my-2 text-sm">Status: {transactionData.status}</div>
          <hr />
          <div className="my-2 text-sm font-semibold">
            Total Pembayaran:{" "}
            <span className="font-bold text-lg">
              <NumberFormatter value={transactionData.price} />
            </span>
          </div>
          <div className="mb-4 bg-orange-200 p-3 rounded text-lg font-bold">kode VA : {payment.va_number ? payment?.va_number : transactionData.payment?.va_number}</div>
          <div className="flex gap-3 mt-4">
            <Button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={() => setShowPopup(false)}>
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Payment;
